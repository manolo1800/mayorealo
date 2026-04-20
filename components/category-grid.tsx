"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Wrench, Briefcase, HardHat, Shirt, Apple, Truck, Lightbulb } from "lucide-react"

const categories = [
  { name: "Electrónica", icon: Laptop, count: "12,450" },
  { name: "Maquinaria", icon: Wrench, count: "8,320" },
  { name: "Oficina", icon: Briefcase, count: "15,680" },
  { name: "Construcción", icon: HardHat, count: "6,890" },
  { name: "Textil", icon: Shirt, count: "9,540" },
  { name: "Alimentos", icon: Apple, count: "11,230" },
  { name: "Logística", icon: Truck, count: "4,560" },
  { name: "Energía", icon: Lightbulb, count: "3,780" },
]

export function CategoryGrid() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Explorar por Categoría</h2>
        <p className="text-sm text-muted-foreground mt-1">Encuentra productos de todas las industrias</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon
          const isEven = index % 2 === 0
          return (
            <Card
              key={category.name}
              className="hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                <div
                  className={`p-4 rounded-full ${isEven ? "bg-primary/10 group-hover:bg-primary/20" : "bg-secondary/10 group-hover:bg-secondary/20"} transition-colors`}
                >
                  <Icon className={`h-8 w-8 ${isEven ? "text-primary" : "text-secondary"} transition-colors`} />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{category.count} productos</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
