export interface AuthResponse {
  token: string;
  data?: {
    error: string;
  };
}