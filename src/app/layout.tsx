import { Work_Sans } from "next/font/google";
import { metaRootInfo } from "@/meta";
import { LayoutType } from "@/types";
import { Room } from "./Room";

import type { Metadata } from "next";
import "../style/index.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = { ...metaRootInfo };

const RootLayout = ({ children }: Readonly<LayoutType>) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${workSans.className} bg-primary-grey-200`} suppressHydrationWarning={true}>
        <Room>
          {/* <TooltipProvider> */}
          {children}
          {/* </TooltipProvider> */}
        </Room>
      </body>
    </html>
  );
};

export default RootLayout;
