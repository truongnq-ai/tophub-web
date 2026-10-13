import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

interface PricingPageProps {
  params: {
    locale: string;
  };
}

export default function PricingPage({ params: { locale } }: PricingPageProps) {
  setRequestLocale(locale);
  // Giai đoạn đầu miễn phí 100% để thu hút người dùng -> Chuyển hướng về trang chủ
  redirect(`/${locale}`);
}
