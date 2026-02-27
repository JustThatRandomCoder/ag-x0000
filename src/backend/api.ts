// Backend API Utilities
// Hier können API-Endpoints und Backend-Logik definiert werden

export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  error?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      return await response.json();
    } catch (error) {
      return {
        data: null as T,
        message: 'Request failed',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {
        data: null as T,
        message: 'Request failed',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {
        data: null as T,
        message: 'Request failed',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      return {
        data: null as T,
        message: 'Request failed',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Globaler API Client
export const api = new ApiClient();