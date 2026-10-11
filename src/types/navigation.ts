export interface NavigationItem {
  name: string
  href: string
  isActive?: boolean
}

export interface HeaderProps {
  navigationItems?: NavigationItem[]
}
