export interface ApiResponse<T> {
  status: boolean;
  response: T;
}