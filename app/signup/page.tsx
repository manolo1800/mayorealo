import { SignupForm } from "@/components/signup-form"

export const metadata = {
  title: "Crear Cuenta - Marketplace B2B/B2C",
  description: "Registro de empresas y personas naturales en nuestro marketplace",
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Crea tu cuenta</h1>
          <p className="text-muted-foreground">Regístrate como empresa o como persona natural</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
