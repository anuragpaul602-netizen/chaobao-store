"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitted">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Milestone 2 wires this to a real /api/newsletter route + email provider.
    setStatus("submitted");
  }

  return (
    <section className="bg-lacquer py-14 text-lacquer-foreground">
      <div className="container flex flex-col items-center text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Get 10% Off Your First Order</h2>
        <p className="mt-2 max-w-md text-sm text-lacquer-foreground/80">
          Join the ChaoBao list for new drops, restocks, and flash sale alerts.
        </p>

        {status === "submitted" ? (
          <p className="mt-6 font-semibold">Thanks — check your inbox for your code! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-md gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-xl border-0 bg-paper px-4 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ink"
            />
            <button type="submit" className={cn(buttonVariants({ variant: "secondary" }), "h-12")}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
