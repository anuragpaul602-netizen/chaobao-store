import Link from "next/link";
import { redirect } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Awaiting payment",
  PAID: "Paid",
  PLACED: "Placed (COD)",
  CANCELLED: "Cancelled",
  FAILED: "Payment failed",
};

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="container max-w-2xl py-10 md:py-14">
      <h1 className="font-display text-2xl font-extrabold md:text-3xl">Your orders</h1>

      {orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
          <PackageSearch className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-lg font-semibold">No orders yet</p>
          <Link href="/shop" className="mt-4 text-sm font-semibold text-lacquer underline underline-offset-4">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/orders/${order.id}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-lacquer"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    {order.items.length} item{order.items.length === 1 ? "" : "s"} ·{" "}
                    {formatINR(order.totalPaise)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {order.createdAt.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {STATUS_LABEL[order.status] ?? order.status}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  #{order.id.slice(-8)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
