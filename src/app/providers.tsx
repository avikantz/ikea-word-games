"use client";

import { Suspense } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Next13ProgressBar } from "next13-progressbar";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

import theme from "@/theme";
import { Footer } from "@/components/footer";
import { HomeButton } from "@/components/homeButton";

const CACHE_TIME = 60 * 60 * 24 * 30; // 30 days

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: CACHE_TIME,
      staleTime: CACHE_TIME,
    },
  },
});

export function Providers({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* Use suspense for providers, else this causes "deopted to client rendering warning" */}
          <Suspense fallback={<div />}>
            <Next13ProgressBar height="4px" color="#008AFF" showOnShallow />
            <Analytics />
            <GoogleAnalytics trackPageViews={false} />
          </Suspense>

          {children}

          <Footer lang={lang} />
          <HomeButton lang={lang} />
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
