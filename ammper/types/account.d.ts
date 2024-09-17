export interface PublicIdentification {
  name: string;
  value: string;
}

export interface FundData {
  balance: number;
  collected_at: string;
  name: string;
  percentage: number;
  public_identifications: PublicIdentification[];
  type: string;
}

export interface Balance {
  available: number;
  current: number;
}

export interface Institution {
  name: string;
  type: string;
}

export interface CreditData {
  collected_at: string;
  credit_limit: number;
  cutting_date: string;
  interest_rate: number | null;
  last_payment_date: string;
  last_period_balance: number | null;
  minimum_payment: number;
  monthly_payment: number | null;
  next_payment_date: string;
  no_interest_payment: number | null;
}

export interface LoanData {
  collected_at: string;
  contract_number: string | null;
  contract_start_date: string | null;
  credit_limit: number;
  cutting_date: string;
  cutting_day: string;
  fees: any | null;
  interest_rate: number | null;
  interest_rates: any | null;
  last_payment_date: string;
  last_period_balance: any | null;
  limit_date: string;
  limit_day: string;
  loan_type: any | null;
  monthly_payment: any | null;
  next_payment_date: string;
  no_interest_payment: any | null;
  number_of_installments_outstanding: any | null;
  number_of_installments_total: any | null;
  outstanding_balance: any | null;
  outstanding_principal: any | null;
  payment_due_day: any | null;
  principal: any | null;
}

export interface AccountResult {
  agency: string | null;
  balance: Balance;
  balance_type: 'ASSET' | 'LIABILITY';
  bank_product_id: string;
  category:
    | 'PENSION_FUND_ACCOUNT'
    | 'LOAN_ACCOUNT'
    | 'CREDIT_CARD'
    | 'CHECKING_ACCOUNT'
    | 'EMPLOYMENT_RECORDS'
    | 'CONTAS'
    | 'fiscal';
  collected_at: string;
  created_at: string;
  credit_data: CreditData | null;
  currency: 'BRL' | string;
  funds_data?: FundData[];
  id: string;
  institution: Institution;
  internal_identification: string;
  last_accessed_at: string;
  link: string;
  loan_data: LoanData | null;
  name: string;
  number: string;
  public_identification_name: string;
  public_identification_value: string;
  type: 'REGRESSIVA' | 'Crédito pessoal' | 'Contas' | 'fiscal' | string;
}

export interface AccountsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AccountResult[];
}

export interface ErrorResponse {
  code: string;
  field: string;
  message: string;
  request_id: string;
}
