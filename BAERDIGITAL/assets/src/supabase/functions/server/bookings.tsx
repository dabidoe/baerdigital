import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Enable CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

interface Booking {
  id: string;
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
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

interface AvailabilitySlot {
  date: string;
  time: string;
  available: boolean;
  booked: boolean;
}

// Get available time slots for a specific date
app.get('/availability/:date', async (c) => {
  try {
    const date = c.req.param('date');
    
    if (!date) {
      return c.json({ error: 'Date parameter is required' }, 400);
    }

    // Get existing bookings for the date
    const bookingsKey = `bookings:${date}`;
    const existingBookings = await kv.get(bookingsKey) || [];
    
    const timeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    const availability = timeSlots.map(time => {
      const isBooked = existingBookings.some((booking: Booking) => 
        booking.time === time && booking.status === 'confirmed'
      );
      
      return {
        time,
        available: !isBooked,
        booked: isBooked
      };
    });

    return c.json({ date, availability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return c.json({ error: 'Failed to fetch availability' }, 500);
  }
});

// Create a new booking
app.post('/bookings', async (c) => {
  try {
    const bookingData = await c.req.json();
    
    // Validate required fields
    const requiredFields = ['service', 'date', 'time', 'customerInfo'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return c.json({ error: `Missing required field: ${field}` }, 400);
      }
    }

    // Generate booking ID
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create booking object
    const booking: Booking = {
      id: bookingId,
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      duration: bookingData.duration || 2,
      customerInfo: bookingData.customerInfo,
      projectDetails: bookingData.projectDetails || '',
      totalCost: bookingData.totalCost || 0,
      status: bookingData.totalCost === 0 ? 'confirmed' : 'pending',
      paymentStatus: bookingData.totalCost === 0 ? 'paid' : 'unpaid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Check availability before booking
    const dateKey = `bookings:${booking.date}`;
    const existingBookings = await kv.get(dateKey) || [];
    
    const conflictingBooking = existingBookings.find((existing: Booking) => 
      existing.time === booking.time && existing.status === 'confirmed'
    );

    if (conflictingBooking) {
      return c.json({ error: 'Time slot is no longer available' }, 409);
    }

    // Store booking
    await kv.set(`booking:${bookingId}`, booking);
    
    // Update date availability
    const updatedBookings = [...existingBookings, booking];
    await kv.set(dateKey, updatedBookings);
    
    // Store in customer bookings list
    const customerKey = `customer:${booking.customerInfo.email}:bookings`;
    const customerBookings = await kv.get(customerKey) || [];
    customerBookings.push(bookingId);
    await kv.set(customerKey, customerBookings);

    // Send confirmation email (mock)
    console.log(`Booking confirmation email sent to ${booking.customerInfo.email}`);
    
    return c.json({
      success: true,
      booking: booking,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return c.json({ error: 'Failed to create booking' }, 500);
  }
});

// Get booking by ID
app.get('/bookings/:id', async (c) => {
  try {
    const bookingId = c.req.param('id');
    const booking = await kv.get(`booking:${bookingId}`);
    
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }
    
    return c.json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return c.json({ error: 'Failed to fetch booking' }, 500);
  }
});

// Update booking status
app.put('/bookings/:id/status', async (c) => {
  try {
    const bookingId = c.req.param('id');
    const { status, paymentStatus } = await c.req.json();
    
    const booking = await kv.get(`booking:${bookingId}`);
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }
    
    const updatedBooking = {
      ...booking,
      status: status || booking.status,
      paymentStatus: paymentStatus || booking.paymentStatus,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`booking:${bookingId}`, updatedBooking);
    
    // Update date availability if status changed
    if (status) {
      const dateKey = `bookings:${booking.date}`;
      const bookings = await kv.get(dateKey) || [];
      const updatedBookings = bookings.map((b: Booking) => 
        b.id === bookingId ? updatedBooking : b
      );
      await kv.set(dateKey, updatedBookings);
    }
    
    return c.json({
      success: true,
      booking: updatedBooking,
      message: 'Booking updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating booking:', error);
    return c.json({ error: 'Failed to update booking' }, 500);
  }
});

// Process payment (mock Stripe integration)
app.post('/bookings/:id/payment', async (c) => {
  try {
    const bookingId = c.req.param('id');
    const paymentData = await c.req.json();
    
    const booking = await kv.get(`booking:${bookingId}`);
    if (!booking) {
      return c.json({ error: 'Booking not found' }, 404);
    }
    
    // Mock payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment success (90% success rate)
    const paymentSuccess = Math.random() > 0.1;
    
    if (!paymentSuccess) {
      return c.json({ error: 'Payment failed. Please try again.' }, 400);
    }
    
    // Update booking with payment information
    const updatedBooking = {
      ...booking,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentInfo: {
        transactionId: `txn_${Date.now()}`,
        amount: booking.totalCost,
        currency: 'USD',
        method: 'card',
        processedAt: new Date().toISOString()
      },
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`booking:${bookingId}`, updatedBooking);
    
    // Update date availability
    const dateKey = `bookings:${booking.date}`;
    const bookings = await kv.get(dateKey) || [];
    const updatedBookings = bookings.map((b: Booking) => 
      b.id === bookingId ? updatedBooking : b
    );
    await kv.set(dateKey, updatedBookings);
    
    return c.json({
      success: true,
      booking: updatedBooking,
      paymentConfirmation: updatedBooking.paymentInfo,
      message: 'Payment processed successfully'
    });
    
  } catch (error) {
    console.error('Error processing payment:', error);
    return c.json({ error: 'Failed to process payment' }, 500);
  }
});

// Get customer bookings
app.get('/customers/:email/bookings', async (c) => {
  try {
    const email = c.req.param('email');
    const customerKey = `customer:${email}:bookings`;
    const bookingIds = await kv.get(customerKey) || [];
    
    const bookings = await Promise.all(
      bookingIds.map((id: string) => kv.get(`booking:${id}`))
    );
    
    return c.json({ bookings: bookings.filter(Boolean) });
  } catch (error) {
    console.error('Error fetching customer bookings:', error);
    return c.json({ error: 'Failed to fetch customer bookings' }, 500);
  }
});

export default app;