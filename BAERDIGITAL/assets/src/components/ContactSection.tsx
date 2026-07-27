import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Clock, Video } from 'lucide-react';
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
    <section id="contact" className="cinematic-band py-16 lg:py-24 bg-[#050607]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-reveal">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 px-4 py-2 mb-6">
            <span className="text-[#9beeff] font-medium">Production Consult</span>
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
            }}
            className="text-3xl md:text-4xl lg:text-5xl text-white mb-6"
          >
            Let's Plan Your Next <span className="text-[#00d4ff]">Production</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', Helvetica, sans-serif",
              lineHeight: "1.6",
            }}
            className="text-lg text-[#d6dde1] max-w-3xl mx-auto"
          >
            Tell us what you're making. We'll help shape the production, capture plan, and content rollout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-[#101418]/95 border-white/10 shadow-2xl shadow-black/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Request a Consult</CardTitle>
                <p className="text-[#d6dde1]">Share the essentials and we'll follow up with a clear next step.</p>
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
                        className="bg-[#050607] border-white/15 text-white placeholder:text-[#7f8a93] focus-visible:ring-[#00d4ff]"
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
                        className="bg-[#050607] border-white/15 text-white placeholder:text-[#7f8a93] focus-visible:ring-[#00d4ff]"
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
                        className="bg-[#050607] border-white/15 text-white placeholder:text-[#7f8a93] focus-visible:ring-[#00d4ff]"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Select 
                        onValueChange={(value) => handleInputChange('service', value)} 
                        value={formData.service}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-[#050607] border-white/15 text-white focus:ring-[#00d4ff]">
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

                  <div>
                    <Textarea
                      placeholder="What are you making, and when do you need it? *"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-[#050607] border-white/15 text-white placeholder:text-[#7f8a93] min-h-[120px] focus-visible:ring-[#00d4ff]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-[#00d4ff] hover:bg-[#9beeff] text-[#050607] flex items-center space-x-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#050607]/30 border-t-[#050607]"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Request Consult</span>
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
            <Card className="bg-[#f4f7f8] border-[#d6dde1] text-[#050607] shadow-2xl shadow-black/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-[#050607] mb-6">What Happens Next</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#00d4ff]/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-[#050607] font-medium">Response within 24 hours</p>
                      <p className="text-[#3d4751] text-sm">We'll review the project and suggest the cleanest next step.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#00d4ff]/20 flex items-center justify-center">
                      <Video className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-[#050607] font-medium">Studio + on-location production</p>
                      <p className="text-[#3d4751] text-sm">Video, podcasts, and multi-platform content planning.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#050607]/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[#050607]" />
                    </div>
                    <div>
                      <p className="text-[#050607] font-medium">contact@baerdigitalstudios.com</p>
                      <p className="text-[#3d4751] text-sm">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#050607]/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#050607]" />
                    </div>
                    <div>
                      <p className="text-[#050607] font-medium">1525 N Bailey St</p>
                      <p className="text-[#3d4751] text-sm">Philadelphia, PA</p>
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
