import { redirect } from "next/navigation";

interface PricingPageProps {
  params: {
    locale: string;
  };
}

export default function PricingPage({ params: { locale } }: PricingPageProps) {
  // Giai đoạn đầu miễn phí 100% để thu hút người dùng -> Chuyển hướng về trang chủ
  redirect(`/${locale}`);
}
