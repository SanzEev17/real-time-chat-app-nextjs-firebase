import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextTopLoader from "nextjs-toploader";

const fontFamily = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guff-Gaf",
  description: "Real time chat app created with NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontFamily.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader color="#B32914" showSpinner={false} />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
