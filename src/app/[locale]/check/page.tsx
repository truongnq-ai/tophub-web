import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";

interface CheckPageProps {
  params: {
    locale: string;
  };
}

export default function CheckRedirectPage({ params: { locale } }: CheckPageProps) {
  setRequestLocale(locale);
  redirect({ href: "/", locale });
}
