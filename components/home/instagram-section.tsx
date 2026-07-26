import Image from "next/image";
import { Instagram } from "lucide-react";
import { categoryImage } from "@/lib/data/category-images";

// One shot per category so the grid reads as a spread of the actual range.
const POSTS = ["candy", "instant-noodles", "chips", "bubble-tea", "cookies", "sauces"].map(
  (category, i) => ({
    id: i,
    category,
    image: categoryImage(category, i + 1, { w: 400, h: 400 }),
  }),
);

export function InstagramSection() {
  return (
    <section className="container py-12 md:py-16">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">@chaobao.in</h2>
        <p className="mt-1 text-sm text-muted-foreground">Tag us to be featured — new hauls every week.</p>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
        {POSTS.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-xl"
          >
            <Image src={post.image} alt="ChaoBao customer post" fill sizes="200px" className="object-cover transition-transform group-hover:scale-105" />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-paper opacity-0 transition-opacity group-hover:bg-ink/40 group-hover:opacity-100">
              <Instagram className="h-6 w-6" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
