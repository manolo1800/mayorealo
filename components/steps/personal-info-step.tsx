"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/form-field"

interface PersonalInfoStepProps {
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  errors: Record<string, string>
}

export function PersonalInfoStep({ formData, handleInputChange, errors }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Tu Información Personal</h2>
        <p className="text-muted-foreground">Proporciona tus datos personales para crear tu cuenta</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Nombre" error={errors.personalFirstName}>
          <Input
            name="personalFirstName"
            value={formData.personalFirstName}
            onChange={handleInputChange}
            placeholder="Juan"
          />
        </FormField>

        <FormField label="Apellido" error={errors.personalLastName}>
          <Input
            name="personalLastName"
            value={formData.personalLastName}
            onChange={handleInputChange}
            placeholder="Pérez"
          />
        </FormField>

        <FormField label="Número de Identificación" error={errors.personalIdentification}>
          <Input
            name="personalIdentification"
            value={formData.personalIdentification}
            onChange={handleInputChange}
            placeholder="Ej: V-12345678"
          />
        </FormField>

        <FormField label="Email" error={errors.personalEmail}>
          <Input
            name="personalEmail"
            type="email"
            value={formData.personalEmail}
            onChange={handleInputChange}
            placeholder="tu@correo.com"
          />
        </FormField>

        <FormField label="Teléfono" error={errors.personalPhone}>
          <Input
            name="personalPhone"
            value={formData.personalPhone}
            onChange={handleInputChange}
            placeholder="+58 212 1234567"
          />
        </FormField>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-primary">
          <strong>✓ Registro simplificado:</strong> Puedes completar tu perfil y adicionar más información después.
        </p>
      </div>
    </div>
  )
}
