/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Shield,
  Menu,
  User,
  LogOut,
  Home,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useUidSession } from "@/hooks/use-uid-session";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const tNav = useTranslations("Navigation");
  const tHeader = useTranslations("Header");
  const { activeAccount, savedAccounts, selectAccount, logout, isLoaded } = useUidSession();

  const navigationItems = [
    { name: tNav("home"), href: "/", icon: Home, badge: null },
    {
      name: tNav("guides"),
      href: "/guides",
      icon: BookOpen,
      badge: tNav("guidesNewBadge"),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 dark:border-amber-500/15 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Sheet */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-card/95 backdrop-blur-2xl border-border/80 p-6">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2.5 text-left">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-md shadow-amber-500/25 border border-amber-300/30">
                      <Shield className="h-5 w-5 fill-current" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading font-black text-xl tracking-tight text-foreground">TopHub</span>
                      <span className="text-[10px] text-amber-500 dark:text-amber-400 font-heading font-extrabold uppercase tracking-wider">Top Heroes Companion</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-1.5">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px]",
                          isActive
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold shadow-sm shadow-amber-500/10 border border-amber-500/30"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-md shadow-amber-500/25 border border-amber-300/30 group-hover:scale-105 transition-transform duration-200">
              <Shield className="h-5 w-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl sm:text-2xl leading-none tracking-tight text-foreground group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                TopHub
              </span>
              <span className="text-[10px] text-amber-600/90 dark:text-amber-400/90 font-heading font-extrabold uppercase tracking-widest mt-1">
                Top Heroes Companion
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all min-h-[44px]",
                  isActive
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold shadow-sm shadow-amber-500/10 border border-amber-500/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    data-testid="header-guides-new-badge"
                    className="rounded-full bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase leading-none text-amber-600 dark:text-amber-400"
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <ThemeSwitcher />

          {/* Active Account Dropdown (If selected on this device) */}
          {isLoaded && activeAccount && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-3 py-1.5 h-10 min-h-[44px] rounded-full border border-amber-500/30 bg-amber-500/10 hover:border-amber-500/50 hover:bg-amber-500/15 transition-all shadow-sm shadow-amber-500/10"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 text-xs font-bold font-mono shadow-sm">
                    {activeAccount.nickname ? activeAccount.nickname.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="hidden sm:inline-block max-w-[110px] truncate text-xs font-bold text-foreground leading-tight">
                      {activeAccount.nickname}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono leading-none">
                      S{activeAccount.server_id}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-0.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-xl border-border/80 shadow-2xl">
                <DropdownMenuLabel className="font-normal pb-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-foreground font-heading">
                      {activeAccount.nickname}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      UID: {activeAccount.uid} (Server {activeAccount.server_id})
                    </p>
                    <div className="pt-1.5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {tHeader("botRunning")}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Quick Switch to other saved accounts on this device */}
                {savedAccounts.filter((a) => a.uid !== activeAccount.uid).length > 0 && (
                  <>
                    <div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {tHeader("switchAccount")}
                    </div>
                    {savedAccounts
                      .filter((a) => a.uid !== activeAccount.uid)
                      .map((acc) => (
                        <DropdownMenuItem
                          key={acc.uid}
                          onClick={() => selectAccount(acc)}
                          className="cursor-pointer flex items-center justify-between py-2 text-xs"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <User className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                            <span className="font-medium truncate">{acc.nickname}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground font-mono ml-2 shrink-0">
                            S{acc.server_id}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    <DropdownMenuSeparator />
                  </>
                )}

                <DropdownMenuItem
                  onClick={() => logout()}
                  className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2 min-h-[40px]"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium text-xs">{tHeader("logoutAccount")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
