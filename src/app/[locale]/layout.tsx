import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "../../styles/global.css";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>TopHub — Top Heroes Companion & Automation</title>
        <meta name="description" content="Tự động săn Giftcode, điểm danh hàng ngày và theo dõi sự kiện game Top Heroes." />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers session={session}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
