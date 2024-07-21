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
          "min-h-screen bg-background antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
