import { redirect } from "next/navigation";

interface LoginPageProps {
  params: {
    locale: string;
  };
}

export default function LoginPage({ params: { locale } }: LoginPageProps) {
  redirect(`/${locale}/admin/login`);
}
