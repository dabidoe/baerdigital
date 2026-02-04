import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-57d11996`;

interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private async request<T = any>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Contact form submission
  async submitContact(contactData: {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    projectType?: string;
    budget?: string;
    message: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Booking availability
  async getAvailability(date: string) {
    return this.request(`/availability/${date}`);
  }

  // Create booking
  async createBooking(bookingData: {
    service: string;
    date: string;
    time: string;
    duration: number;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      company: string;
    };
    projectDetails: string;
    totalCost: number;
  }) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  // Get booking by ID
  async getBooking(bookingId: string) {
    return this.request(`/bookings/${bookingId}`);
  }

  // Update booking status
  async updateBookingStatus(bookingId: string, updates: {
    status?: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus?: 'unpaid' | 'paid' | 'refunded';
  }) {
    return this.request(`/bookings/${bookingId}/status`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Process payment
  async processPayment(bookingId: string, paymentData: {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardholderName: string;
  }) {
    return this.request(`/bookings/${bookingId}/payment`, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Get customer bookings
  async getCustomerBookings(email: string) {
    return this.request(`/customers/${encodeURIComponent(email)}/bookings`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const api = new ApiClient();
export default api;