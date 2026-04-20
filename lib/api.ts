// lib/api.ts — Servicio de conexión con el backend Mercator

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ---------- Tipos ----------

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

interface FormData {
  accountType: "business" | "personal";
  // Company
  cityId: number | "";
  legalName: string;
  tradingName: string;
  businessTypeId: number | "";
  taxIdentificationNumber: string;
  fiscalAddress: string;
  verifiedPhone: string;
  corporateEmail: string;
  logo: string;
  logoFile?: File | null;
  // Legal Representative
  firstName: string;
  lastName: string;
  identificationNumber: string;
  identificationType: string;
  position: string;
  email: string;
  phone: string;
  // Personal (B2C)
  personalFirstName: string;
  personalLastName: string;
  personalIdentification: string;
  personalEmail: string;
  personalPhone: string;
}

// ---------- Helpers ----------

// ---------- Helpers / Utilidades de Storage ----------

export async function getPresignedUploadUrl(filename: string, mimeType: string): Promise<{ presignedUrl: string, objectKey: string, publicUrl: string }> {
  const res = await fetch(`${API_BASE_URL}/storage/presigned-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, mimeType })
  });

  if (!res.ok) {
    throw new Error('Error al obtener URL firmada para subir archivo');
  }

  const { data } = await res.json();
  return data;
}

// ---------- Registro B2B ----------

interface B2BPayload {
  company: {
    legalName: string;
    tradingName: string;
    businessTypeId: number;
    taxIdentificationNumber: string;
    additionalTaxId: number;
    fiscalAddress: string;
    verifiedPhone: string;
    corporateEmail: string;
    verificationStatusId: number;
    verificationLevelId: number;
    logo: string;
    cityId: number;
  };
  user: {
    firstName: string;
    lastName: string;
    identificationNumber: string;
    identificationType?: string;
    phone?: string;
    email: string;
  };
  legalRepresentative: {
    position: string;
  };
}

function buildB2BPayload(formData: FormData): B2BPayload {
  return {
    company: {
      legalName: formData.legalName,
      tradingName: formData.tradingName || formData.legalName,
      businessTypeId: Number(formData.businessTypeId),
      taxIdentificationNumber: formData.taxIdentificationNumber,
      additionalTaxId: 0,
      fiscalAddress: formData.fiscalAddress || "Por definir",
      verifiedPhone: formData.verifiedPhone || "",
      corporateEmail: formData.corporateEmail,
      verificationStatusId: 1,
      verificationLevelId: 1,
      logo: formData.logo || "default",
      cityId: Number(formData.cityId),
    },
    user: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      identificationNumber: formData.identificationNumber,
      identificationType: formData.identificationType || undefined,
      phone: formData.phone || undefined,
      email: formData.email,
    },
    legalRepresentative: {
      position: formData.position,
    },
  };
}

export async function registerB2B(
  formData: FormData
): Promise<ApiResponse> {
  const payload = buildB2BPayload(formData);

  const res = await fetch(`${API_BASE_URL}/registration/b2b`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody: ApiError = await res.json();
    const message = Array.isArray(errorBody.message)
      ? errorBody.message.join(". ")
      : errorBody.message;
    throw new Error(message || "Error al registrar (B2B)");
  }

  return res.json();
}

// ---------- Registro B2C ----------

interface B2CPayload {
  user: {
    firstName: string;
    lastName: string;
    identificationNumber: string;
    phone?: string;
    email: string;
  };
}

function buildB2CPayload(formData: FormData): B2CPayload {
  return {
    user: {
      firstName: formData.personalFirstName,
      lastName: formData.personalLastName,
      identificationNumber: formData.personalIdentification,
      phone: formData.personalPhone || undefined,
      email: formData.personalEmail,
    },
  };
}

export async function registerB2C(
  formData: FormData
): Promise<ApiResponse> {
  const payload = buildB2CPayload(formData);

  const res = await fetch(`${API_BASE_URL}/registration/b2c`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody: ApiError = await res.json();
    const message = Array.isArray(errorBody.message)
      ? errorBody.message.join(". ")
      : errorBody.message;
    throw new Error(message || "Error al registrar (B2C)");
  }

  return res.json();
}
