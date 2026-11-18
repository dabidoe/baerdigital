import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (window.location.protocol === 'file:') {
      setSubmitStatus('error');
      setStatusMessage('This file is a preview. Use the email link to get in touch.');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-57d11996/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          projectType: '',
          budget: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setStatusMessage("Your message couldn’t be sent. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  return (
    <section id="contact" className="lean-contact">
      <div className="cinema-section-inner lean-contact-grid">
        <div>
          <h2>Start a project.</h2>
          <a href="mailto:contact@baerdigitalstudios.com">contact@baerdigitalstudios.com</a>
        </div>
        <form className="lean-inquiry" onSubmit={handleSubmit}>
          <div className="lean-field-row">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" name="name" autoComplete="name" required disabled={isSubmitting} value={formData.name} onChange={e => handleInputChange('name', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" name="email" type="email" autoComplete="email" required disabled={isSubmitting} value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="contact-service">Service <span>(optional)</span></Label>
            <Select value={formData.service} disabled={isSubmitting} onValueChange={value => handleInputChange('service', value)}>
              <SelectTrigger id="contact-service"><SelectValue placeholder="Choose a service" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="website-content-launch">Advertising</SelectItem>
                <SelectItem value="website-app-development">Web Design &amp; Development</SelectItem>
                <SelectItem value="video-production">Video Production</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contact-message">Project details</Label>
            <Textarea id="contact-message" name="message" rows={4} required disabled={isSubmitting} value={formData.message} onChange={e => handleInputChange('message', e.target.value)} />
          </div>
          <Button className="cinema-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send inquiry'}</Button>
          {submitStatus !== 'idle' && <p role={submitStatus === 'error' ? 'alert' : 'status'}>{statusMessage}</p>}
        </form>
      </div>
    </section>
  );
}
