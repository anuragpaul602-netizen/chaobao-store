import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { products, brands } from "@/lib/data/products";
import { categoryImage } from "@/lib/data/category-images";
import { cn } from "@/lib/utils";

const MARQUEE = [
  "辣 Spicy latiao",
  "螺蛳粉 Snail noodles",
  "珍珠奶茶 Bubble tea",
  "老干妈 Chilli crisp",
  "麻辣 Mala hot pot",
  "凤梨酥 Pineapple cake",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="cjk-accent inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-xs font-semibold text-lacquer shadow-card">
            新 · {products.length} products now in stock
          </span>

          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.03] md:text-6xl">
            China&rsquo;s snack aisle,
            <br />
            delivered to <span className="text-lacquer">your door.</span>
          </h1>

          <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
            Snail noodles, chilli crisp, mochi and bubble tea kits — imported straight from
            China&rsquo;s biggest snack brands and shipped across India.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "group")}>
              Shop All Snacks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop?category=instant-noodles"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Browse Noodles
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-8">
            <div>
              <dt className="font-display text-2xl font-bold">{products.length}</dt>
              <dd className="text-sm text-muted-foreground">Products</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-bold">{brands.length}</dt>
              <dd className="text-sm text-muted-foreground">Chinese brands</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-bold">28</dt>
              <dd className="text-sm text-muted-foreground">States delivered</dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-soft lg:aspect-[4/5]">
          <Image
            src={categoryImage("candy", 0, { w: 900, h: 1100 })}
            alt="Assorted imported Chinese snacks, candy and drinks"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* infinite marquee strip */}
      <div className="overflow-hidden border-y border-border bg-ink py-3">
        <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="cjk-accent whitespace-nowrap text-sm font-semibold text-paper/80">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
