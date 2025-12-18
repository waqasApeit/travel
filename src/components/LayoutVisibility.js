"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import IslamicHeader from "./Header/IslamicHeader";
export default function LayoutVisibility({ children }) {
  const pathname = usePathname();

  // Hide header/footer on voucher or invoice pages
  const hideLayout =
    pathname?.startsWith("/hotels/voucher") ||
    pathname?.startsWith("/hotels/invoice") || pathname?.startsWith("/packages/invoice") || pathname?.startsWith("/packages/voucher")
    || pathname?.startsWith("/activities/voucher") || pathname?.startsWith("/activities/invoice");

  return (
    <>
      {!hideLayout && <IslamicHeader />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
