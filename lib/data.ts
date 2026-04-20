export const FEATURED_YT_ID = "EQ4Iz7BdJGk";
export const FEATURED_YT_TITLE = "Shadow Inside — Featured Track";

export const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "featured", label: "Turn It Up" },
  { id: "songs", label: "Songs" },
  { id: "socials", label: "Socials" },
  { id: "tour", label: "Tour" },
  { id: "gallery", label: "Gallery" },
  { id: "merch", label: "Merch" },
  { id: "subscribe", label: "Subscribe" },
];

export const NAV_LINKS = [
  { label: "Songs", href: "#songs" },
  { label: "Socials", href: "#socials" },
  { label: "Tour", href: "#tour" },
  { label: "Gallery", href: "#gallery" },
  { label: "Merch", href: "#merch" },
];

export interface Song {
  title: string;
  duration: string;
  year: string;
  cover: string;
  tag: string;
  spotifyId: string;
}

export const SONGS: Song[] = [
  {
    title: "Rain Bright",
    duration: "—",
    year: "2026",
    cover: "/images/gallery-5.jpg",
    tag: "LATEST",
    spotifyId: "0GmsrNqB2UdRbKMyaWFu2L",
  },
  {
    title: "To The Silence",
    duration: "—",
    year: "2025",
    cover: "/images/gallery-4.jpg",
    tag: "FEAT. NEKOMATA",
    spotifyId: "7HPPb1oLCEr0IklgGPR1sP",
  },
  {
    title: "Stop Your Scrolling",
    duration: "—",
    year: "2025",
    cover: "/images/gallery-3.jpg",
    tag: "SINGLE",
    spotifyId: "25mr1AYrju6DwxdO7uhzpa",
  },
  {
    title: "Canada Across The Sky",
    duration: "—",
    year: "2025",
    cover: "/images/gallery-1.jpg",
    tag: "B-SIDE",
    spotifyId: "45oMo8E7C7j9IBIESqX7ub",
  },
  {
    title: "Underground",
    duration: "—",
    year: "2024",
    cover: "/images/gallery-2.jpg",
    tag: "LIVE",
    spotifyId: "64gtR0unEJn0U9JVOkocqK",
  },
  {
    title: "Loud / Loops",
    duration: "—",
    year: "2024",
    cover: "/images/gallery-3.jpg",
    tag: "EP",
    spotifyId: "1gUTGTZ09SlHhowAdTiVeI",
  },
];

export const TOUR_DATES = [
  {
    date: "29 MAY 2026",
    city: "MILANO, IT",
    venue: "LA CRIPTA",
    note: "w/ Nekomata · to the silence tour",
    status: "AVAILABLE",
  },
  {
    date: "13 JUN 2026",
    city: "OHIO, US",
    venue: "SKIBIDI ARENA",
    note: "Ohio Metalcore Fest · headlining the Gyatt Stage",
    status: "2 LEFT",
  },
  {
    date: "04 JUL 2026",
    city: "ONLY IN OHIO",
    venue: "THE LIMINAL BACKROOMS",
    note: "entrance through the vending machine",
    status: "SOLD OUT",
  },
  {
    date: "19 JUL 2026",
    city: "ROMA, IT",
    venue: "SIGMA COLOSSEUM",
    note: "support: Bonk & The Mewing Mentors",
    status: "AVAILABLE",
  },
  {
    date: "02 AUG 2026",
    city: "BERLIN, DE",
    venue: "RIZZ-KELLER",
    note: "mogging the scene · 21+ only",
    status: "LIMITED",
  },
  {
    date: "14 SEP 2026",
    city: "LONDON, UK",
    venue: "THE HUZZ",
    note: "co-headline w/ Fanum Tax",
    status: "AVAILABLE",
  },
  {
    date: "26 OCT 2026",
    city: "TOKYO, JP",
    venue: "KAWAII DOOMCORE HALL",
    note: "first ever asian date · please be normal",
    status: "PRESALE",
  },
];

// Unsplash hotlink CDN URLs. Free to hotlink per Unsplash terms.
export const MERCH = [
  {
    name: "THIS IS FINE — Hoodie",
    price: "€75",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    tag: "BLACK",
    status: "OUT OF STOCK",
  },
  {
    name: "SKILL ISSUE — Tee",
    price: "€35",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    tag: "ICE BLUE",
    status: "OUT OF STOCK",
  },
  {
    name: "RAIN BRIGHT — 12\" Vinyl",
    price: "€42",
    image:
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=900&q=80",
    tag: "TRANSPARENT BLUE",
    status: "OUT OF STOCK",
  },
  {
    name: "LET HIM COOK — Snapback",
    price: "€30",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
    tag: "EMBROIDERED",
    status: "OUT OF STOCK",
  },
  {
    name: "OHIO FINAL BOSS — Long Sleeve",
    price: "€55",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
    tag: "DISTRESSED",
    status: "OUT OF STOCK",
  },
  {
    name: "BONK TOTE BAG",
    price: "€22",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
    tag: "CANVAS · HEAVY",
    status: "OUT OF STOCK",
  },
  {
    name: "GYATT — Beanie",
    price: "€25",
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=80",
    tag: "KNIT · WOOL",
    status: "OUT OF STOCK",
  },
  {
    name: "SIGMA — Cropped Tee",
    price: "€38",
    image:
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=900&q=80",
    tag: "LIMITED · 100PCS",
    status: "OUT OF STOCK",
  },
  {
    name: "RIZZ VILLAIN — Cap",
    price: "€32",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
    tag: "5-PANEL",
    status: "OUT OF STOCK",
  },
];

export const GALLERY_IMAGES = [
  { src: "/images/gallery-1.jpg", alt: "Live at La Cripta", span: "col-span-2 row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Studio session", span: "col-span-1 row-span-1" },
  { src: "/images/gallery-3.jpg", alt: "Soundcheck", span: "col-span-1 row-span-2" },
  { src: "/images/gallery-4.jpg", alt: "Backstage", span: "col-span-2 row-span-1" },
  { src: "/images/gallery-5.jpg", alt: "Crowd shot", span: "col-span-1 row-span-1" },
];

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: "instagram" | "youtube" | "spotify" | "tiktok";
  blurb: string;
}

export const SOCIALS: Social[] = [
  {
    label: "Instagram",
    handle: "@shadowinsideband",
    href: "https://www.instagram.com/shadowinsideband/",
    icon: "instagram",
    blurb: "reels, stories, chaos.",
  },
  {
    label: "YouTube",
    handle: "Shadow Inside",
    href: `https://www.youtube.com/watch?v=${FEATURED_YT_ID}`,
    icon: "youtube",
    blurb: "videos & live footage.",
  },
  {
    label: "Spotify",
    handle: "Shadow Inside",
    href: "https://open.spotify.com/artist/",
    icon: "spotify",
    blurb: "the whole discography.",
  },
  {
    label: "TikTok",
    handle: "@shadowinsideband",
    href: "#",
    icon: "tiktok",
    blurb: "short clips, tour snippets.",
  },
];

export const BAND_LINEUP = [
  { role: "VOCALS", name: "—" },
  { role: "GUITAR", name: "—" },
  { role: "BASS", name: "—" },
  { role: "DRUMS", name: "—" },
];
