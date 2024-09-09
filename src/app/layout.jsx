import "./globals.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen antialiased bg-custom-body")}>
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
          <div className=" translate-y-[90px] mb-[90px]">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
