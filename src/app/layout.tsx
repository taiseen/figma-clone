import { metaRootInfo } from "@/meta";
import { LayoutType } from "@/types";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { ...metaRootInfo };

const RootLayout = ({ children }: Readonly<LayoutType>) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
