"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <Zap className="h-4 w-4" />
                Plataforma Profesional B2B & B2C
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Conectamos empresas con <span className="text-primary">oportunidades</span>
            </h1>

            <p className="text-lg text-muted-foreground text-pretty max-w-xl">
              La plataforma de comercio más confiable para empresas y consumidores. Miles de productos, proveedores
              verificados y transacciones seguras.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg w-full sm:w-auto"
                >
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-secondary text-secondary-foreground hover:bg-secondary/10 hover:border-secondary bg-transparent w-full sm:w-auto"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t">
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Productos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2K+</div>
                <div className="text-sm text-muted-foreground">Empresas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-6 rounded-lg bg-card border hover:shadow-md transition-shadow hover:border-primary/30">
              <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Transacciones Seguras</h3>
                <p className="text-sm text-muted-foreground">
                  Protección garantizada en cada compra con nuestro sistema de pagos verificado
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-card border hover:shadow-md transition-shadow hover:border-secondary/30">
              <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Mejores Precios</h3>
                <p className="text-sm text-muted-foreground">
                  Compara entre miles de proveedores y obtén las mejores ofertas del mercado
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-card border hover:shadow-md transition-shadow hover:border-primary/30">
              <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Envío Rápido</h3>
                <p className="text-sm text-muted-foreground">
                  Logística optimizada para entregas rápidas en todo el país
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
