import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { getAllProducts, getCategories } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/data/category-labels";
import { categoryImage } from "@/lib/data/category-images";

export async function Categories() {
  const products = await getAllProducts();
  const categories = await getCategories();
  const cats = categories.map((c) => ({
    value: c,
    label: CATEGORY_LABELS[c] ?? c,
    count: products.filter((p) => p.category === c).length,
    image: categoryImage(c, 0, { w: 400, h: 400 }),
  }));

  return (
    <section className="bg-muted py-14 md:py-20">
      <div className="container">
        <Reveal>
          <h2 className="font-display text-2xl font-bold md:text-3xl">Shop by Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} imported products, sorted so you can find your flavour fast.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {cats.map((cat, i) => (
            <Reveal key={cat.value} delay={i * 45}>
              <Link
                href={`/shop?category=${cat.value}`}
                className="group flex flex-col items-center gap-2.5 text-center"
              >
                <span className="relative block aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(min-width: 1024px) 16vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <span className="absolute bottom-2 left-0 right-0 text-[11px] font-bold text-paper">
                    {cat.count} items
                  </span>
                </span>
                <span className="text-xs font-semibold sm:text-sm">{cat.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
