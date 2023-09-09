export * as JUMBLE from "./jumble";
export * as BILDVAL from "./bildval";
export * as ORDVAL from "./ordval";
export * as VADARJAG from "./vadarjag";

export const BASE_URL =
  (typeof window !== "undefined" && window.location.origin) ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL && `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`) ||
  `http://localhost:${process.env.PORT ?? 3000}/`;
