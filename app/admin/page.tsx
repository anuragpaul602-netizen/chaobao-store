import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AdminProductTable } from "@/components/admin/product-table";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");

  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      brand: true,
      image: true,
      pricePaise: true,
      mrpPaise: true,
      stock: true,
      badges: true,
    },
  });

  return (
    <div className="container max-w-6xl py-10 md:py-14">
      <h1 className="font-display text-2xl font-extrabold md:text-3xl">Admin — Catalogue</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Edit stock, price and badges directly. Changes save immediately to the database.
      </p>
      <AdminProductTable products={products} />
    </div>
  );
}
