import { Hero } from "@/components/hero/Hero";
import { StopScrolling } from "@/components/sections/StopScrolling";
import { RecentSongs } from "@/components/sections/RecentSongs";
import { ScrollSong } from "@/components/sections/ScrollSong";
import { Tour } from "@/components/sections/Tour";
import { Gallery } from "@/components/sections/Gallery";
import { Merch } from "@/components/sections/Merch";
import { Subscribe } from "@/components/sections/Subscribe";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StopScrolling />
      <RecentSongs />
      <ScrollSong />
      <Tour />
      <Gallery />
      <Merch />
      <Subscribe />
      <Footer />
    </>
  );
}
