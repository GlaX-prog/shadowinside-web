import { Hero } from "@/components/hero/Hero";
import { TurnItUp } from "@/components/sections/TurnItUp";
import { RecentSongs } from "@/components/sections/RecentSongs";
import { Socials } from "@/components/sections/Socials";
import { Tour } from "@/components/sections/Tour";
import { Gallery } from "@/components/sections/Gallery";
import { Merch } from "@/components/sections/Merch";
import { Subscribe } from "@/components/sections/Subscribe";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <TurnItUp />
      <RecentSongs />
      <Socials />
      <Tour />
      <Gallery />
      <Merch />
      <Subscribe />
      <Footer />
    </>
  );
}
