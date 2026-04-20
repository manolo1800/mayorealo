"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/form-field"

interface CompanyInfoStepProps {
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: Record<string, string>
}

export function CompanyInfoStep({ formData, handleInputChange, handleFileChange, errors }: CompanyInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Información de tu Empresa</h2>
        <p className="text-muted-foreground">Proporciona los datos principales de tu empresa para verificación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Razón Social" error={errors.legalName}>
          <Input
            name="legalName"
            value={formData.legalName}
            onChange={handleInputChange}
            placeholder="Ej: Mi Empresa C.A."
          />
        </FormField>

        <FormField label="Nombre Comercial (Opcional)" error={errors.tradingName}>
          <Input
            name="tradingName"
            value={formData.tradingName}
            onChange={handleInputChange}
            placeholder="Ej: Mi Tienda Online"
          />
        </FormField>

        <FormField label="RIF (Identificación Fiscal)" error={errors.taxIdentificationNumber}>
          <Input
            name="taxIdentificationNumber"
            value={formData.taxIdentificationNumber}
            onChange={handleInputChange}
            placeholder="Ej: J-123456789-0"
          />
        </FormField>

        <FormField label="Tipo de Empresa" error={errors.businessTypeId}>
          <select
            name="businessTypeId"
            value={formData.businessTypeId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">Selecciona un tipo</option>
            <option value="1">Sociedad Anónima (SA)</option>
            <option value="2">Sociedad de Responsabilidad Limitada (SRL)</option>
            <option value="3">Compañía Anónima (CA)</option>
            <option value="4">Cooperativa</option>
            <option value="5">Persona Natural</option>
          </select>
        </FormField>

        <FormField label="Ciudad" error={errors.cityId}>
          <select
            name="cityId"
            value={formData.cityId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">Selecciona una ciudad</option>
            <option value="1">Caracas</option>
            <option value="2">Valencia</option>
            <option value="3">Maracaibo</option>
            <option value="4">Barquisimeto</option>
            <option value="5">Puerto La Cruz</option>
          </select>
        </FormField>

        <FormField label="Email Corporativo" error={errors.corporateEmail}>
          <Input
            name="corporateEmail"
            type="email"
            value={formData.corporateEmail}
            onChange={handleInputChange}
            placeholder="empresa@ejemplo.com"
          />
        </FormField>
        <FormField label="Logo de la Empresa" error={errors.logoFile}>
          <Input
            name="logoFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormField label="Dirección Fiscal (Opcional)" error={errors.fiscalAddress}>
          <Input
            name="fiscalAddress"
            value={formData.fiscalAddress}
            onChange={handleInputChange}
            placeholder="Calle principal, número, ciudad..."
          />
        </FormField>

        <FormField label="Teléfono Verificado (Opcional)" error={errors.verifiedPhone}>
          <Input
            name="verifiedPhone"
            value={formData.verifiedPhone}
            onChange={handleInputChange}
            placeholder="+58 212 1234567"
          />
        </FormField>
      </div>

      {/*<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>💡 Tip:</strong> Puedes completar más detalles después. Enfócate en los datos esenciales ahora.
        </p>
      </div>*/}
    </div>
  )
}
