// Definición para los valores en 'form_fields' cuando el 'type' es 'select'
export interface FormFieldValue {
  code: string;
  label: string;
  placeholder?: string;
  validation?: string;
  validation_message?: string;
}

// Definición para los objetos en 'form_fields'
export interface FormField {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  validation?: string;
  validation_message?: string;
  length?: string;
  optional?: boolean;
  pre_selected?: number;
  values?: FormFieldValue[];
  value?: string; // Para campos con 'type': 'hidden'
}

// Definición para los objetos en 'features'
export interface Feature {
  description: string;
  name: string;
}

// Definición para 'openbanking_information'
export interface OpenBankingInformation {
  description: string;
  participants: string[];
}

// Definición principal para los objetos en 'results'
export interface Institution {
  code: string | null;
  country_code: string;
  country_codes: string[];
  display_name: string;
  features: Feature[];
  form_fields: FormField[];
  icon_logo: string | null;
  id: number;
  integration_type: string;
  logo: string | null;
  name: string;
  openbanking_information: OpenBankingInformation | null;
  primary_color: string;
  resources: string[];
  status: string;
  text_logo: string | null;
  type: string;
  website: string | null;
}

export type InvalidJWTError = 'invalid_jwt';

// Definición para el objeto completo que contiene 'results'
export interface InstitutionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Institution[];
  error?: InvalidJWTError;
}
