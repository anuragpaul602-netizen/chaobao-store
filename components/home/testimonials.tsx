import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/**
 * Placeholder testimonials for layout purposes. Replace with real, verified
 * customer reviews before launch — fabricated social proof is both a trust
 * risk and, for a food business in India, a compliance risk.
 */
const REVIEWS = [
  {
    name: "Ananya R.",
    location: "Bengaluru",
    rating: 5,
    text: "The latiao and White Rabbit candy arrived in four days, perfectly packed. Tastes exactly like the ones I had in Chengdu.",
  },
  {
    name: "Rohan K.",
    location: "Mumbai",
    rating: 5,
    text: "Ordered snail noodles on a dare and now I'm three orders deep. Packaging held up perfectly.",
  },
  {
    name: "Priya S.",
    location: "Delhi",
    rating: 4,
    text: "Great range of sauces you genuinely can't find in Indian supermarkets. Prices are fair for imports.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted py-14 md:py-20">
      <div className="container">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
            What Our Customers Say
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 90}>
              <figure className="h-full rounded-2xl bg-paper p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={
                        s < review.rating
                          ? "h-4 w-4 fill-gold text-gold"
                          : "h-4 w-4 text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  {review.name}{" "}
                  <span className="font-normal text-muted-foreground">· {review.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
