"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { StepIndicator } from "@/components/step-indicator"
import { CompanyInfoStep } from "@/components/steps/company-info-step"
import { LegalRepresentativeStep } from "@/components/steps/legal-representative-step"
import { PersonalInfoStep } from "@/components/steps/personal-info-step"
import { ReviewStep } from "@/components/steps/review-step"
import { Building2, User, CheckCircle2 } from "lucide-react"
import { registerB2B, registerB2C } from "@/lib/api"

type FormStep = "type-selection" | "company" | "representative" | "personal" | "review"
type AccountType = "business" | "personal"

interface FormData {
  // Company fields
  accountType: AccountType
  cityId: number | ""
  legalName: string
  tradingName: string
  businessTypeId: number | ""
  taxIdentificationNumber: string
  fiscalAddress: string
  verifiedPhone: string
  corporateEmail: string
  logo: string
  logoFile: File | null

  // Legal Representative fields
  firstName: string
  lastName: string
  identificationNumber: string
  identificationType: string
  position: string
  email: string
  phone: string

  // Personal fields (B2C)
  personalFirstName: string
  personalLastName: string
  personalIdentification: string
  personalEmail: string
  personalPhone: string
}

const BUSINESS_STEPS: { id: FormStep; label: string; title: string }[] = [
  { id: "company", label: "Información de Empresa", title: "Datos de tu empresa" },
  { id: "representative", label: "Representante Legal", title: "Representante legal" },
  { id: "review", label: "Revisión", title: "Confirma tus datos" },
]

const PERSONAL_STEPS: { id: FormStep; label: string; title: string }[] = [
  { id: "personal", label: "Información Personal", title: "Tus datos personales" },
  { id: "review", label: "Revisión", title: "Confirma tus datos" },
]

const INITIAL_FORM_DATA: FormData = {
  accountType: "business",
  // Company
  cityId: "",
  legalName: "",
  tradingName: "",
  businessTypeId: "",
  taxIdentificationNumber: "",
  fiscalAddress: "",
  verifiedPhone: "",
  corporateEmail: "",
  logo: "",
  logoFile: null,

  // Representative
  firstName: "",
  lastName: "",
  identificationNumber: "",
  identificationType: "V",
  position: "",
  email: "",
  phone: "",

  // Personal
  personalFirstName: "",
  personalLastName: "",
  personalIdentification: "",
  personalEmail: "",
  personalPhone: "",
}

export function SignupForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>("type-selection")
  const [accountType, setAccountType] = useState<AccountType>("business")
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type)
    setFormData((prev) => ({ ...prev, accountType: type }))
    setCurrentStep(type === "business" ? "company" : "personal")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]
      }))
      if (errors[name]) {
        setErrors((prev) => {
          const { [name]: _, ...rest } = prev
          return rest
        })
      }
    }
  }

  const validateCompanyStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.cityId) newErrors.cityId = "La ciudad es requerida"
    if (!formData.legalName.trim()) newErrors.legalName = "La razón social es requerida"
    if (!formData.businessTypeId) newErrors.businessTypeId = "El tipo de empresa es requerido"
    if (!formData.taxIdentificationNumber.trim()) {
      newErrors.taxIdentificationNumber = "El RIF es requerido"
    }
    if (!formData.corporateEmail.trim()) {
      newErrors.corporateEmail = "El email corporativo es requerido"
    } else if (!formData.corporateEmail.includes("@")) {
      newErrors.corporateEmail = "Email inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRepresentativeStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido"
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido"
    if (!formData.identificationNumber.trim()) {
      newErrors.identificationNumber = "El número de identificación es requerido"
    }
    if (!formData.position.trim()) newErrors.position = "El cargo es requerido"
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email inválido"
    }
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePersonalStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.personalFirstName.trim()) newErrors.personalFirstName = "El nombre es requerido"
    if (!formData.personalLastName.trim()) newErrors.personalLastName = "El apellido es requerido"
    if (!formData.personalIdentification.trim()) {
      newErrors.personalIdentification = "El número de identificación es requerido"
    }
    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = "El email es requerido"
    } else if (!formData.personalEmail.includes("@")) {
      newErrors.personalEmail = "Email inválido"
    }
    if (!formData.personalPhone.trim()) newErrors.personalPhone = "El teléfono es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === "company" && validateCompanyStep()) {
      setCurrentStep("representative")
    } else if (currentStep === "representative" && validateRepresentativeStep()) {
      setCurrentStep("review")
    } else if (currentStep === "personal" && validatePersonalStep()) {
      setCurrentStep("review")
    }
  }

  const handlePrevious = () => {
    if (currentStep === "company") {
      setCurrentStep("type-selection")
    } else if (currentStep === "representative") {
      setCurrentStep("company")
    } else if (currentStep === "personal") {
      setCurrentStep("type-selection")
    } else if (currentStep === "review") {
      setCurrentStep(accountType === "business" ? "representative" : "personal")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setErrors({})
    try {
      let finalFormData = { ...formData };
      
      // Upload logo directly to S3 if it exists
      if (accountType === "business" && finalFormData.logoFile) {
        const { getPresignedUploadUrl } = await import('@/lib/api');
        const { presignedUrl, publicUrl } = await getPresignedUploadUrl(
          finalFormData.logoFile.name, 
          finalFormData.logoFile.type
        );
        
        const uploadRes = await fetch(presignedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': finalFormData.logoFile.type },
          body: finalFormData.logoFile
        });
        
        if (!uploadRes.ok) throw new Error("Error subiendo el logo de la empresa.");
        
        finalFormData.logo = publicUrl;
      }

      const result =
        accountType === "business"
          ? await registerB2B(finalFormData)
          : await registerB2C(finalFormData)

      setSuccessMessage(result.message || "¡Registro completado exitosamente!")
    } catch (error) {
      console.error("Registration error:", error)
      const message =
        error instanceof Error
          ? error.message
          : "Error al registrar. Intenta nuevamente."
      setErrors({ submit: message })
    } finally {
      setIsLoading(false)
    }
  }

  // Success screen
  if (successMessage) {
    return (
      <div className="space-y-8">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-foreground">¡Registro Exitoso!</h2>
            <p className="text-muted-foreground max-w-md">{successMessage}</p>
            <div className="flex gap-3 mt-4">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="/login">Iniciar Sesión</a>
              </Button>
              <Button variant="outline" onClick={() => {
                setSuccessMessage(null)
                setCurrentStep("type-selection")
                setFormData(INITIAL_FORM_DATA)
                setErrors({})
              }}>
                Nuevo Registro
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Step selection view
  if (currentStep === "type-selection") {
    return (
      <div className="space-y-8">
        <Card className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">¿Qué tipo de cuenta necesitas?</h2>
            <p className="text-muted-foreground">Elige la opción que mejor se adapte a tu necesidad</p>
          </div>

          <RadioGroup value={accountType} onValueChange={handleAccountTypeSelect} className="space-y-4">
            <div className="space-y-4">
              <div>
                <RadioGroupItem value="business" id="business" className="peer sr-only" />
                <Label
                  htmlFor="business"
                  className="flex items-center gap-4 p-6 border-2 border-border rounded-lg cursor-pointer hover:bg-primary/5 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                >
                  <Building2 className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-foreground">Cuenta de Empresa (B2B)</div>
                    <div className="text-sm text-muted-foreground mt-1">Para sociedades, PYMES y comercios B2B</div>
                  </div>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="personal" id="personal" className="peer sr-only" />
                <Label
                  htmlFor="personal"
                  className="flex items-center gap-4 p-6 border-2 border-border rounded-lg cursor-pointer hover:bg-primary/5 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                >
                  <User className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-foreground">Cuenta Personal (B2C)</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Para vendedores independientes y personas naturales
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>

          <div className="flex gap-3 justify-between mt-8">
            <Button variant="outline" disabled>
              Anterior pantalla
            </Button>
            <Button onClick={() => handleAccountTypeSelect(accountType)} className="bg-primary hover:bg-primary/90">
              Continuar
            </Button>
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Inicia sesión
          </a>
        </div>
      </div>
    )
  }

  const steps = accountType === "business" ? BUSINESS_STEPS : PERSONAL_STEPS

  return (
    <div className="space-y-8">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <Card className="p-8">
        {currentStep === "company" && (
          <CompanyInfoStep 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleFileChange={handleFileChange}
            errors={errors} 
          />
        )}

        {currentStep === "representative" && (
          <LegalRepresentativeStep formData={formData} handleInputChange={handleInputChange} errors={errors} />
        )}

        {currentStep === "personal" && (
          <PersonalInfoStep formData={formData} handleInputChange={handleInputChange} errors={errors} />
        )}

        {currentStep === "review" && <ReviewStep formData={formData} accountType={accountType} />}

        <div className="flex gap-3 justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={isLoading}>
            Anterior
          </Button>

          {currentStep !== "review" ? (
            <Button onClick={handleNext} disabled={isLoading}>
              Siguiente
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading ? "Registrando..." : "Completar Registro"}
            </Button>
          )}
        </div>

        {errors.submit && <div className="text-destructive text-sm mt-4">{errors.submit}</div>}
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-primary hover:underline font-medium">
          Inicia sesión
        </a>
      </div>
    </div>
  )
}
