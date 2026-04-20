"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/form-field"

interface LegalRepresentativeStepProps {
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  errors: Record<string, string>
}

export function LegalRepresentativeStep({ formData, handleInputChange, errors }: LegalRepresentativeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Representante Legal</h2>
        <p className="text-muted-foreground">Información del representante legal de tu empresa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Nombre" error={errors.firstName}>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Juan"
          />
        </FormField>

        <FormField label="Apellido" error={errors.lastName}>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Pérez"
          />
        </FormField>

        <FormField label="Cargo" error={errors.position}>
          <Input
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="Ej: Gerente General, Presidente"
          />
        </FormField>

        <FormField label="Tipo de Identificación" error={errors.identificationType}>
          <select
            name="identificationType"
            value={formData.identificationType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="V">Venezolano (V)</option>
            <option value="E">Extranjero (E)</option>
            <option value="J">Jurídico (J)</option>
          </select>
        </FormField>

        <FormField label="Número de Identificación" error={errors.identificationNumber}>
          <Input
            name="identificationNumber"
            value={formData.identificationNumber}
            onChange={handleInputChange}
            placeholder="Ej: V-12345678"
          />
        </FormField>

        <FormField label="Email" error={errors.email}>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="juan@empresa.com"
          />
        </FormField>

        <FormField label="Teléfono" error={errors.phone}>
          <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+58 212 1234567" />
        </FormField>

        <FormField label="Clave de Usuario" error={errors.password}>
          <Input 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            placeholder="Min. 8 caracteres" 
          />
        </FormField>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <strong>⚠️ Importante:</strong> Verifica que los datos del representante legal sean exactos. Estos serán
          validados posteriormente.
        </p>
      </div>
    </div>
  )
}
