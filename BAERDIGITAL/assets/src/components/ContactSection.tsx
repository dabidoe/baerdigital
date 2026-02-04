import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
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
      setStatusMessage('Sorry, there was an error sending your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  return (
    <section id="contact" className="py-12 lg:py-16 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-full px-4 py-2 mb-6">
            <span className="text-[#d4af37] font-medium">Get Started</span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
            }}
            className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
          >
            Ready to Tell Your <span className="text-[#d4af37]">Story?</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', Helvetica, sans-serif",
              lineHeight: "1.6",
            }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Let's discuss your project and bring your vision to life with our unique capabilities and proven expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Start Your Project</CardTitle>
                <p className="text-gray-300">Tell us about your vision and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{statusMessage}</AlertDescription>
                  </Alert>
                )}
                
                {submitStatus === 'error' && (
                  <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{statusMessage}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-[#1a1a1a] border-[#d4af37]/30 text-white placeholder:text-gray-400"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-[#1a1a1a] border-[#d4af37]/30 text-white placeholder:text-gray-400"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-[#1a1a1a] border-[#d4af37]/30 text-white placeholder:text-gray-400"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Select 
                        onValueChange={(value) => handleInputChange('service', value)} 
                        value={formData.service}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-[#1a1a1a] border-[#d4af37]/30 text-white">
                          <SelectValue placeholder="Service Needed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="drive-in">Video Studio with Greenscreen</SelectItem>
                          <SelectItem value="podcast">Podcast Production</SelectItem>
                          <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                          <SelectItem value="mobile-ads">Mobile Advertising</SelectItem>
                          <SelectItem value="ai-filmmaking">AI Filmmaking</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Select 
                        onValueChange={(value) => handleInputChange('projectType', value)} 
                        value={formData.projectType}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-[#1a1a1a] border-[#d4af37]/30 text-white">
                          <SelectValue placeholder="Project Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="automotive">Automotive Content</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="podcast">Podcast</SelectItem>
                          <SelectItem value="ai-campaign">AI-Enhanced Campaign</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select 
                        onValueChange={(value) => handleInputChange('budget', value)} 
                        value={formData.budget}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-[#1a1a1a] border-[#d4af37]/30 text-white">
                          <SelectValue placeholder="Budget Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1k">Under $1,000</SelectItem>
                          <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-plus">$10,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Textarea
                      placeholder="Tell us about your project... *"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-[#1a1a1a] border-[#d4af37]/30 text-white placeholder:text-gray-400 min-h-[120px]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a] flex items-center space-x-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a]"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Pricing */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="bg-[#1a1a1a] border-[#d4af37]/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#00d4ff]/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">contact@baerdigitalstudios.com</p>
                      <p className="text-gray-400 text-sm">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">1525 N Bailey St</p>
                      <p className="text-gray-400 text-sm">Philadelphia, PA</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>


      </div>
    </section>
  );
}