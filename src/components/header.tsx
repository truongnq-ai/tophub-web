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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Sheet */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-card border-border/80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight">TopHub</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary font-bold"
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
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-primary-foreground shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl leading-tight tracking-tight text-foreground">
                TopHub
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
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
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
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
                  className="flex items-center gap-2 px-2 sm:px-3 h-9 rounded-full border border-border/60 hover:border-primary/50"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <span className="hidden sm:inline-block max-w-[100px] truncate text-xs font-semibold text-foreground">
                    {session.user.name}
                  </span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border/80">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none text-foreground">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      ID: {session.user.discord_id || "Discord Member"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>{tNav("dashboard")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{tNav("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="font-bold gap-1.5 shadow-sm">
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
