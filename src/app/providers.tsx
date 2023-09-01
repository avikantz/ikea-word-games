"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Next13ProgressBar } from "next13-progressbar";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

import theme from "@/theme";
import { Footer } from "@/components/footer";
import { CacheProvider } from "@chakra-ui/next-js";

const CACHE_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: CACHE_TIME,
      staleTime: Infinity,
    },
  },
});

export function Providers({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Next13ProgressBar height="4px" color="#008AFF" showOnShallow />

          <Analytics />
          <GoogleAnalytics trackPageViews={false} />

          {children}

          <Footer lang={lang} />
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
