import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

interface LoginPageProps {
  params: {
    locale: string;
  };
}

export default function LoginPage({ params: { locale } }: LoginPageProps) {
  setRequestLocale(locale);
  redirect(`/${locale}/admin/login`);
}
