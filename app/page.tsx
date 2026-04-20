import { MarketplaceHeader } from "@/components/marketplace-header"
import { HeroBanner } from "@/components/hero-banner"
import { CategoryGrid } from "@/components/category-grid"
import { ProductCarousel } from "@/components/product-carousel"

// Mock data para productos
const featuredProducts = [
  {
    id: "1",
    name: "Laptop Dell XPS 15 - Intel Core i7, 16GB RAM, 512GB SSD",
    price: 1299,
    originalPrice: 1599,
    image: "/laptop-profesional.jpg",
    rating: 4.8,
    reviews: 234,
    company: "TechCorp Solutions",
    badge: "Destacado",
  },
  {
    id: "2",
    name: "Impresora Industrial HP LaserJet Pro - Alta velocidad",
    price: 899,
    image: "/impresora-industrial.jpg",
    rating: 4.6,
    reviews: 156,
    company: "Office Supplies Inc",
    minOrder: "5 unidades",
  },
  {
    id: "3",
    name: "Silla Ergonómica Ejecutiva - Soporte lumbar ajustable",
    price: 349,
    originalPrice: 449,
    image: "/silla-oficina-ergonomica.jpg",
    rating: 4.9,
    reviews: 412,
    company: "Ergo Furniture Co",
    badge: "Oferta",
  },
  {
    id: "4",
    name: "Monitor LG UltraWide 34' - 4K, HDR10",
    price: 599,
    image: "/monitor-ultrawide.jpg",
    rating: 4.7,
    reviews: 189,
    company: "Display Tech Ltd",
  },
  {
    id: "5",
    name: "Escritorio Ejecutivo de Madera - 180x80cm",
    price: 799,
    originalPrice: 999,
    image: "/escritorio-ejecutivo-madera.jpg",
    rating: 4.8,
    reviews: 267,
    company: "Premium Office",
    badge: "Nuevo",
  },
]

const machineryProducts = [
  {
    id: "6",
    name: "Taladro Industrial Bosch - 1200W, Velocidad Variable",
    price: 459,
    image: "/taladro-industrial.jpg",
    rating: 4.9,
    reviews: 345,
    company: "Industrial Tools SA",
    minOrder: "10 unidades",
  },
  {
    id: "7",
    name: "Compresor de Aire 50L - 3HP, Portátil",
    price: 689,
    image: "/compresor-aire-industrial.jpg",
    rating: 4.7,
    reviews: 198,
    company: "PowerTools Corp",
  },
  {
    id: "8",
    name: "Sierra Circular Profesional - Corte preciso 2000W",
    price: 329,
    originalPrice: 429,
    image: "/sierra-circular-profesional.jpg",
    rating: 4.6,
    reviews: 223,
    company: "CutPro Industries",
    badge: "Oferta",
  },
  {
    id: "9",
    name: "Soldadora MIG/MAG - 200A, Profesional",
    price: 1199,
    image: "/soldadora-industrial.jpg",
    rating: 4.8,
    reviews: 167,
    company: "WeldMaster Inc",
    minOrder: "3 unidades",
  },
  {
    id: "10",
    name: "Generador Eléctrico 5000W - Gasolina, Portátil",
    price: 899,
    image: "/generador-electrico-portatil.jpg",
    rating: 4.7,
    reviews: 289,
    company: "PowerGen Solutions",
  },
]

const textileProducts = [
  {
    id: "11",
    name: "Camisas Corporativas - Algodón Premium, Pack 50 unidades",
    price: 1250,
    image: "/camisas-corporativas.jpg",
    rating: 4.8,
    reviews: 412,
    company: "Corporate Wear Ltd",
    minOrder: "50 unidades",
    badge: "B2B",
  },
  {
    id: "12",
    name: "Uniformes Industriales - Resistentes, Tallas variadas",
    price: 890,
    image: "/uniformes-industriales.jpg",
    rating: 4.6,
    reviews: 234,
    company: "WorkWear Pro",
    minOrder: "30 unidades",
  },
  {
    id: "13",
    name: "Chalecos Reflectantes - Alta visibilidad, Pack 100",
    price: 450,
    originalPrice: 550,
    image: "/chalecos-reflectantes.jpg",
    rating: 4.9,
    reviews: 567,
    company: "Safety First Co",
    badge: "Oferta",
    minOrder: "100 unidades",
  },
  {
    id: "14",
    name: "Toallas Hoteleras Premium - 100% Algodón, Pack 200",
    price: 1890,
    image: "/toallas-hoteleras.jpg",
    rating: 4.7,
    reviews: 189,
    company: "Hotel Supplies Inc",
    minOrder: "200 unidades",
  },
  {
    id: "15",
    name: "Delantales Profesionales - Cocina, Pack 50",
    price: 340,
    image: "/delantales-profesionales.jpg",
    rating: 4.8,
    reviews: 298,
    company: "Chef Wear Solutions",
    minOrder: "50 unidades",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />

      <main>
        <HeroBanner />

        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Categories */}
          <CategoryGrid />

          {/* Featured Products */}
          <ProductCarousel
            title="Productos Destacados"
            subtitle="Los más vendidos de la semana"
            products={featuredProducts}
          />

          {/* Machinery */}
          <ProductCarousel
            title="Maquinaria Industrial"
            subtitle="Herramientas profesionales para tu negocio"
            products={machineryProducts}
          />

          {/* Textile */}
          <ProductCarousel
            title="Textil y Uniformes"
            subtitle="Soluciones corporativas en volumen"
            products={textileProducts}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-foreground">TradePro</h3>
              <p className="text-sm text-muted-foreground">
                La plataforma B2B y B2C más confiable para empresas y consumidores.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Carreras
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Privacidad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Vendedores</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Vender en TradePro
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 TradePro. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
