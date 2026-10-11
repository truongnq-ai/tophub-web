"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("switchLocale")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={pathname} locale="vi" className="cursor-pointer">
            Tiếng Việt (VI)
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={pathname} locale="en" className="cursor-pointer">
            English (EN)
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
