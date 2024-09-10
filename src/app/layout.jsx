import "./globals.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import DataProvider from "../provider/database";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen antialiased bg-custom-body")}>
        <DataProvider>
          <ThemeProvider
            storageKey="theme"
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="indigo"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #818cf8,0 0 5px #818cf8"
            />
            <Header />
            <div className=" translate-y-[20px] mb-[50px]">{children}</div>
            <Footer />
          </ThemeProvider>
        </DataProvider>
      </body>
    </html>
  );
}
