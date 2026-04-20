"use client"

import { CheckCircle } from "lucide-react"

interface ReviewStepProps {
  formData: any
  accountType: "business" | "personal"
}

export function ReviewStep({ formData, accountType }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Revisa tus datos</h2>
        <p className="text-muted-foreground">Confirma que toda la información sea correcta antes de enviar</p>
      </div>

      <div className="space-y-6">
        {accountType === "business" && (
          <>
            <div className="border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Información de la Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Razón Social</p>
                  <p className="font-medium text-foreground">{formData.legalName}</p>
                </div>
                {formData.tradingName && (
                  <div>
                    <p className="text-muted-foreground mb-1">Nombre Comercial</p>
                    <p className="font-medium text-foreground">{formData.tradingName}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground mb-1">RIF</p>
                  <p className="font-medium text-foreground">{formData.taxIdentificationNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email Corporativo</p>
                  <p className="font-medium text-foreground">{formData.corporateEmail}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Tipo de Empresa</p>
                  <p className="font-medium text-foreground">
                    {
                      [
                        "",
                        "Sociedad Anónima (SA)",
                        "Sociedad de Responsabilidad Limitada (SRL)",
                        "Compañía Anónima (CA)",
                        "Cooperativa",
                        "Persona Natural",
                      ][formData.businessTypeId]
                    }
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Ciudad</p>
                  <p className="font-medium text-foreground">
                    {["", "Caracas", "Valencia", "Maracaibo", "Barquisimeto", "Puerto La Cruz"][formData.cityId]}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Representante Legal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Nombre Completo</p>
                  <p className="font-medium text-foreground">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Cargo</p>
                  <p className="font-medium text-foreground">{formData.position}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Identificación</p>
                  <p className="font-medium text-foreground">
                    {formData.identificationType}-{formData.identificationNumber}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">{formData.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary">
                <strong>✓ Todo listo:</strong> Al hacer clic en "Completar Registro", tu empresa será registrada y
                podrás acceder a la plataforma. Los datos legales serán validados en los próximos días.
              </p>
            </div>
          </>
        )}

        {accountType === "personal" && (
          <>
            <div className="border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Tu Información Personal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Nombre Completo</p>
                  <p className="font-medium text-foreground">{formData.personalFirstName} {formData.personalLastName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Número de Identificación</p>
                  <p className="font-medium text-foreground">{formData.personalIdentification}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">{formData.personalEmail}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Teléfono</p>
                  <p className="font-medium text-foreground">{formData.personalPhone}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary">
                <strong>✓ Todo listo:</strong> Al hacer clic en "Completar Registro", tu cuenta será creada y podrás
                comenzar a vender en la plataforma.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
