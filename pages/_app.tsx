import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TanstackProvider } from "@/components/providers/tanstack-provider";
import { HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TanstackProvider>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </TanstackProvider>
  );
}
