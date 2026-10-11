import { useTranslations } from "next-intl"

export default function PrivacyPolicy() {
  const t = useTranslations("TermsOfUse")
  const sections = [
    "Introduction",
    "UseOfServices",
    "UserObligations",
    "IntellectualProperty",
    "LimitationOfLiability",
    "Termination",
    "GoverningLaw",
    "ChangesToTerms",
    "Conclusion",
  ] as const

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("description")}</p>
      </div>
      <main className="min-w-0 space-y-6 md:px-16">
        {sections.map((section) => (
          <div key={section} className="space-y-2">
            <h2 className="text-xl font-bold">
              {t(`Sections.${section}.title`)}
            </h2>
            <p>{t(`Sections.${section}.content`)}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
