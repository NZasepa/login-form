export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface User {
  email: string;
  password: string;
}

export interface MockResponse {
  status: number;
  data: any;
}
