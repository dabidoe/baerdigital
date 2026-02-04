import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import bookingsApp from './bookings.tsx';

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Add logging
app.use('*', logger(console.log));

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Health check endpoint
app.get('/make-server-57d11996/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: ['contact', 'bookings']
  });
});

// Contact form endpoint (existing)
app.post('/make-server-57d11996/contact', async (c) => {
  try {
    const body = await c.req.json();
    console.log('Contact form submission:', body);

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Store the contact submission
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const contactData = {
      id: contactId,
      ...body,
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    // In a real implementation, you might want to store this in a database table
    // For now, we'll use the KV store
    const kv = await import('./kv_store.tsx');
    await kv.set(`contact:${contactId}`, contactData);

    console.log('Contact form stored successfully:', contactId);

    return c.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      contactId: contactId
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Mount booking routes
app.route('/make-server-57d11996', bookingsApp);

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Start the server
Deno.serve(app.fetch);