import { Hero } from "@/components/home/hero";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { TrendingSnacks } from "@/components/home/trending-snacks";
import { NewArrivals } from "@/components/home/new-arrivals";
import { WhyBuyFromUs } from "@/components/home/why-buy";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { InstagramSection } from "@/components/home/instagram-section";
import { DataProvenance } from "@/components/home/data-provenance";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <TrendingSnacks />
      <WhyBuyFromUs />
      <NewArrivals />
      <Testimonials />
      <Newsletter />
      <InstagramSection />
      <DataProvenance />
    </>
  );
}
