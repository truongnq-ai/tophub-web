/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import {
  Sparkles,
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  Gift,
  CreditCard,
  Home,
  ChevronDown,
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
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const tNav = useTranslations("Navigation");

  const navigationItems = [
    { name: tNav("home"), href: "/", icon: Home },
    { name: tNav("giftcodes"), href: "/giftcodes", icon: Gift },
    { name: tNav("pricing"), href: "/pricing", icon: CreditCard },
    ...(session?.user
      ? [{ name: tNav("dashboard"), href: "/dashboard", icon: LayoutDashboard }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
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
                  className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-card/95 backdrop-blur-2xl border-border/80 p-6">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2.5 text-left">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-purple-600 to-amber-500 text-white shadow-md shadow-primary/25">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading font-black text-xl tracking-tight text-foreground">TopHub</span>
                      <span className="text-[10px] text-primary font-mono font-bold uppercase tracking-wider">Top Heroes Companion</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-1.5">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px]",
                          isActive
                            ? "bg-primary/15 text-primary font-bold shadow-sm shadow-primary/10 border border-primary/25"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-purple-600 to-amber-500 text-white shadow-md shadow-primary/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl sm:text-2xl leading-none tracking-tight text-foreground group-hover:text-primary transition-colors">
                TopHub
              </span>
              <span className="text-[10px] text-primary/80 font-mono font-bold uppercase tracking-widest mt-1">
                Top Heroes Companion
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all",
                  isActive
                    ? "bg-primary/15 text-primary font-bold shadow-sm shadow-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <ThemeSwitcher />

          {/* Auth Button or User Dropdown */}
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2.5 px-2.5 sm:px-3 h-10 min-h-[44px] rounded-full border border-border/80 bg-card/60 hover:border-primary/60 hover:bg-card hover:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      className="h-6 w-6 rounded-full object-cover ring-2 ring-primary/40"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <span className="hidden sm:inline-block max-w-[100px] truncate text-xs font-bold text-foreground">
                    {session.user.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/80">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none text-foreground font-heading">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate font-mono">
                      ID: {session.user.discord_id || "Discord Member"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center gap-2 min-h-[40px]">
                    <LayoutDashboard className="h-4 w-4 text-primary" />
                    <span className="font-medium">{tNav("dashboard")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2 min-h-[40px]"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">{tNav("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="font-bold gap-2 min-h-[44px] px-4 py-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white shadow-md shadow-primary/25 active:scale-95 transition-transform"
            >
              <Link href="/login">
                <User className="h-4 w-4" />
                <span className="hidden xs:inline-block">{tNav("login")}</span>
                <span className="xs:hidden">Đăng Nhập</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
