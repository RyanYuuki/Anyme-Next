import "./globals.css";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          <div className=" translate-y-[90px]" >{children}</div>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
