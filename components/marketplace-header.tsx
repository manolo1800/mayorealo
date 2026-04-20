"use client"

import { Search, ShoppingCart, User, Menu, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-secondary" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary-foreground">Mayorealo</span>
              <span className="text-[10px] text-primary-foreground/80">B2B & B2C Marketplace</span>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden flex-1 max-w-2xl md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos, empresas, categorías..."
                className="w-full pl-10 pr-4 bg-white text-foreground border-primary-foreground/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-secondary text-secondary-foreground border-0">
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building2 className="mr-2 h-4 w-4" />
                  Mi Empresa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Iniciar Sesión</DropdownMenuItem>
                <DropdownMenuItem className="text-primary font-medium">Registrarse</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="hidden md:flex items-center gap-6 py-3 text-sm border-t border-primary-foreground/20">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10"
          >
            Electrónica
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10"
          >
            Maquinaria
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10"
          >
            Oficina
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10"
          >
            Construcción
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10"
          >
            Textil
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/90 hover:text-secondary hover:bg-primary-foreground/10"
          >
            Alimentos
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary hover:text-secondary hover:bg-primary-foreground/10 font-semibold"
          >
            Ver todas →
          </Button>
        </nav>
      </div>
    </header>
  )
}
