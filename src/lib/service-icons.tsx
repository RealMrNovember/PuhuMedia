import {
  Stethoscope,
  Plane,
  Search,
  MousePointerClick,
  Megaphone,
  MessagesSquare,
  Bot,
  Palette,
  MonitorSmartphone,
  PenTool,
  Clapperboard,
  ShoppingBag,
  CalendarHeart,
  Camera,
} from "lucide-react";

export const serviceIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "saglik-reklamciligi": Stethoscope,
  "saglik-turizmi-pazarlamasi": Plane,
  seo: Search,
  "google-ads": MousePointerClick,
  "meta-reklamlari": Megaphone,
  "sosyal-medya-yonetimi": MessagesSquare,
  "yapay-zeka-destekli-pazarlama": Bot,
  "kurumsal-kimlik": Palette,
  "web-tasarim": MonitorSmartphone,
  "icerik-uretimi": PenTool,
  "video-produksiyon": Clapperboard,
  "urun-fotografciligi": ShoppingBag,
  "ozel-gun-cekimleri": CalendarHeart,
  "kurumsal-fotograf": Camera,
};
