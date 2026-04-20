"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  company: string
  badge?: string
  minOrder?: string
}

interface ProductCarouselProps {
  title: string
  subtitle?: string
  products: Product[]
}

export function ProductCarousel({ title, subtitle, products }: ProductCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useState<HTMLDivElement | null>(null)[0]

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`carousel-${title.replace(/\s/g, "-")}`)
    if (container) {
      const scrollAmount = 320
      const newPosition = direction === "left" ? scrollPosition - scrollAmount : scrollPosition + scrollAmount

      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-9 w-9 border-primary/30 hover:bg-primary/10 hover:border-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-9 w-9 border-primary/30 hover:bg-primary/10 hover:border-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products */}
      <div
        id={`carousel-${title.replace(/\s/g, "-")}`}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex-shrink-0 w-[280px] hover:shadow-lg transition-shadow cursor-pointer group hover:border-primary/50"
          >
            <CardContent className="p-0">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Company */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  <span>{product.company}</span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-sm line-clamp-2 text-card-foreground">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">${product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Min Order */}
                {product.minOrder && <p className="text-xs text-muted-foreground">Pedido mínimo: {product.minOrder}</p>}

                {/* Action Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
