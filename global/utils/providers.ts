import { IProvider } from "@/stores/manga/mangaStore";

// NOTE: Most providers have been removed due to DMCA concerns.
// The Consumet library that powered this app is no longer available.
// Only legal alternatives are kept below:
export const providers = [
  { name: "MangaDex" }, // Legal, licensed source
  { name: "ComicK" }, // Licensed source
  // Other providers removed due to copyright concerns
] as IProvider[];
