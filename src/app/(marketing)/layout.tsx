import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WhatsappButton } from "@/components/marketing/whatsapp-button";
import { BottomNav } from "@/components/marketing/bottom-nav";
import { SidebarNav } from "@/components/marketing/sidebar-nav";
import {
  getContactInfo,
  getSiteSetting,
} from "@/server/repositories/site-setting.repository";
import type { NavStyle } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navStyle, contact] = await Promise.all([
    getSiteSetting<NavStyle>("nav_style", "bottombar"),
    getContactInfo(),
  ]);
  const isSidebar = navStyle === "sidebar";
  const isBottomBar = navStyle === "bottombar";

  return (
    <>
      {isSidebar && <SidebarNav />}
      <SiteHeader
        navStyle={navStyle}
        phone={contact.phone}
        phoneRaw={contact.phoneRaw}
      />
      <main className={cn("flex-1", isSidebar && "lg:pl-64", isBottomBar && "pb-16 lg:pb-0")}>
        {children}
      </main>
      <SiteFooter className={cn(isSidebar && "lg:pl-64")} />
      <WhatsappButton className={cn(isBottomBar && "bottom-20 lg:bottom-8")} />
      {isBottomBar && <BottomNav />}
    </>
  );
}
