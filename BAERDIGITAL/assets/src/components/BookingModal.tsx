import { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, X, CalendarDays, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import api from '../utils/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

interface BookingDetails {
  service: string;
  date: Date | null;
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
}

interface AvailableSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

export default function BookingModal({ isOpen, onClose, selectedService = '' }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<'booking' | 'payment' | 'confirmation'>('booking');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    service: selectedService,
    date: null,
    time: '',
    duration: 2,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    },
    projectDetails: '',
    totalCost: 0
  });

  const services = [
    { id: 'studio-tour', name: 'Studio Consultation', rate: 0, duration: 1, description: 'Free consultation and tour of our facilities' },
    { id: 'drive-in-studio', name: 'Video Studio with Greenscreen', rate: 150, duration: 4, description: 'Multicamera setup with video switcher, livestream capability, professional audio - bulk rates available' },
    { id: 'podcast-recording', name: 'Podcast Recording', rate: 100, duration: 2, description: 'Audio recording and mixing' },
    { id: 'digital-marketing', name: 'Digital Marketing', rate: -1, duration: 0, description: 'Complete marketing solutions including video content and website development' },
    { id: 'mobile-ad-campaign', name: 'Mobile Ad Campaign', rate: -1, duration: 0, description: 'Complete campaign production - contact for custom quote' },
    { id: 'ai-filmmaking', name: 'AI Filmmaking', rate: -1, duration: 0, description: 'AI-enhanced content creation - contact for project pricing' }
  ];

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  });

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability();
    }
  }, [selectedDate]);

  useEffect(() => {
    const selectedServiceData = services.find(s => s.id === bookingDetails.service);
    if (selectedServiceData) {
      setBookingDetails(prev => ({
        ...prev,
        duration: selectedServiceData.duration,
        totalCost: selectedServiceData.rate * selectedServiceData.duration
      }));
    }
  }, [bookingDetails.service]);

  const fetchAvailability = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const response = await api.getAvailability(dateString);
      setAvailableSlots(response.availability || []);
    } catch (error) {
      toast.error('Failed to fetch availability');
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setBookingDetails(prev => ({ ...prev, date, time: '' }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setBookingDetails(prev => ({ ...prev, time }));
  };

  const handleServiceSelect = (service: string) => {
    setBookingDetails(prev => ({ ...prev, service }));
  };

  const handleCustomerInfoChange = (field: keyof BookingDetails['customerInfo'], value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value }
    }));
  };

  const validateBookingDetails = () => {
    return (
      bookingDetails.service &&
      bookingDetails.date &&
      bookingDetails.time &&
      bookingDetails.customerInfo.name &&
      bookingDetails.customerInfo.email &&
      bookingDetails.customerInfo.phone
    );
  };

  const handleBookingSubmit = async () => {
    if (!validateBookingDetails()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        ...bookingDetails,
        date: bookingDetails.date!.toISOString().split('T')[0]
      };

      const response = await api.createBooking(bookingData);
      
      if (response.success) {
        setConfirmedBookingId(response.booking.id);
        
        if (bookingDetails.totalCost === 0) {
          // Free studio tour - go directly to confirmation
          setCurrentStep('confirmation');
          toast.success('Free studio tour booked successfully!');
        } else {
          // Paid service - go to payment
          setCurrentStep('payment');
        }
      } else {
        throw new Error(response.message || 'Booking failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.cardholderName) {
      toast.error('Please fill in all payment details');
      return;
    }

    setProcessingPayment(true);
    try {
      const response = await api.processPayment(confirmedBookingId, paymentData);
      
      if (response.success) {
        setCurrentStep('confirmation');
        toast.success('Payment processed successfully!');
      } else {
        throw new Error(response.error || 'Payment failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setProcessingPayment(false);
    }
  };

  const selectedServiceData = services.find(s => s.id === bookingDetails.service);

  const resetAndClose = () => {
    setCurrentStep('booking');
    setSelectedDate(null);
    setConfirmedBookingId('');
    setPaymentData({ cardNumber: '', expiryDate: '', cvc: '', cardholderName: '' });
    setBookingDetails({
      service: selectedService,
      date: null,
      time: '',
      duration: 2,
      customerInfo: { name: '', email: '', phone: '', company: '' },
      projectDetails: '',
      totalCost: 0
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-[#d4af37]/30">
        <DialogHeader className="border-b border-[#d4af37]/20 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl text-white">
                {currentStep === 'booking' && 'Book Studio Time'}
                {currentStep === 'payment' && 'Payment Details'}
                {currentStep === 'confirmation' && 'Booking Confirmed'}
              </DialogTitle>
              <DialogDescription className="text-gray-300 mt-2">
                {currentStep === 'booking' && 'Select your service, choose a date and time, and provide your details'}
                {currentStep === 'payment' && 'Complete your booking with secure payment processing'}
                {currentStep === 'confirmation' && 'Your booking has been successfully confirmed'}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAndClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {currentStep === 'booking' && (
          <div className="space-y-6">
            <Tabs defaultValue="service" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#2a2a2a]">
                <TabsTrigger value="service" className="text-white data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#1a1a1a]">
                  Select Service
                </TabsTrigger>
                <TabsTrigger value="datetime" className="text-white data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#1a1a1a]">
                  Date & Time
                </TabsTrigger>
                <TabsTrigger value="details" className="text-white data-[state=active]:bg-[#d4af37] data-[state=active]:text-[#1a1a1a]">
                  Your Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="service" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        bookingDetails.service === service.id
                          ? 'bg-[#d4af37]/20 border-[#d4af37]'
                          : 'bg-[#2a2a2a] border-[#d4af37]/20 hover:border-[#d4af37]/40'
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-bold">{service.name}</h3>
                          {service.rate === 0 ? (
                            <Badge className="bg-[#00d4ff] text-[#1a1a1a]">FREE</Badge>
                          ) : service.rate === -1 ? (
                            <Badge className="bg-[#d4af37] text-[#1a1a1a]">CONTACT</Badge>
                          ) : (
                            <span className="text-[#d4af37] font-bold">${service.rate}/hr</span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                        {service.duration > 0 && (
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration} hours
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="datetime" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-2 block">Select Date</Label>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="bg-[#2a2a2a] border-[#d4af37]/20 text-white rounded-lg"
                    />
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <Label className="text-white mb-2 block">Available Times</Label>
                      {loading ? (
                        <div className="flex items-center justify-center h-32">
                          <Loader2 className="h-6 w-6 text-[#d4af37] animate-spin" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                          {availableSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={bookingDetails.time === slot.time ? "default" : "outline"}
                              disabled={!slot.available}
                              onClick={() => handleTimeSelect(slot.time)}
                              className={`h-12 ${
                                bookingDetails.time === slot.time
                                  ? 'bg-[#d4af37] text-[#1a1a1a]'
                                  : slot.available
                                  ? 'border-[#d4af37]/40 text-white hover:bg-[#d4af37]/20'
                                  : 'opacity-50 cursor-not-allowed'
                              }`}
                            >
                              {slot.time}
                              {slot.booked && <span className="ml-1 text-xs">(Booked)</span>}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Name *</Label>
                    <Input
                      id="name"
                      value={bookingDetails.customerInfo.name}
                      onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                      className="bg-[#2a2a2a] border-[#d4af37]/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingDetails.customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                      className="bg-[#2a2a2a] border-[#d4af37]/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone *</Label>
                    <Input
                      id="phone"
                      value={bookingDetails.customerInfo.phone}
                      onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                      className="bg-[#2a2a2a] border-[#d4af37]/30 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-white">Company</Label>
                    <Input
                      id="company"
                      value={bookingDetails.customerInfo.company}
                      onChange={(e) => handleCustomerInfoChange('company', e.target.value)}
                      className="bg-[#2a2a2a] border-[#d4af37]/30 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="project" className="text-white">Project Details</Label>
                  <Textarea
                    id="project"
                    value={bookingDetails.projectDetails}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, projectDetails: e.target.value }))}
                    className="bg-[#2a2a2a] border-[#d4af37]/30 text-white"
                    placeholder="Tell us about your project..."
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Booking Summary */}
            {selectedServiceData && bookingDetails.date && bookingDetails.time && (
              <Card className="bg-[#2a2a2a] border-[#d4af37]/20">
                <CardHeader>
                  <h3 className="text-white font-bold">Booking Summary</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>Service:</span>
                    <span>{selectedServiceData.name}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Date:</span>
                    <span>{bookingDetails.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Time:</span>
                    <span>{bookingDetails.time}</span>
                  </div>
                  {selectedServiceData.rate > 0 && (
                    <div className="flex justify-between text-xl font-bold text-[#d4af37] border-t border-[#d4af37]/20 pt-2">
                      <span>Rate:</span>
                      <span>${selectedServiceData.rate}/hr</span>
                    </div>
                  )}
                  {selectedServiceData.rate === -1 && (
                    <div className="flex justify-between text-white border-t border-[#d4af37]/20 pt-2">
                      <span className="text-[#d4af37] font-bold">Custom Pricing:</span>
                      <span>Contact for quote</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={resetAndClose}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBookingSubmit}
                disabled={!validateBookingDetails() || loading}
                className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : selectedServiceData?.rate === -1 ? (
                  'Submit Inquiry'
                ) : (
                  bookingDetails.totalCost === 0 ? 'Book Free Consultation' : 'Proceed to Payment'
                )}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'payment' && (
          <div className="space-y-6">
            <Card className="bg-[#2a2a2a] border-[#d4af37]/20">
              <CardHeader>
                <h3 className="text-white font-bold">Payment Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>{selectedServiceData?.name}</span>
                    <span>${selectedServiceData?.rate}/hr × {bookingDetails.duration}hr</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-[#d4af37] border-t border-[#d4af37]/20 pt-2">
                    <span>Total:</span>
                    <span>${bookingDetails.totalCost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="bg-[#2a2a2a] border-[#d4af37]/20">
              <CardHeader>
                <h3 className="text-white font-bold flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Details
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Card Number</Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="bg-[#1a1a1a] border-[#d4af37]/30 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Expiry Date</Label>
                    <Input
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="bg-[#1a1a1a] border-[#d4af37]/30 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">CVC</Label>
                    <Input
                      placeholder="123"
                      value={paymentData.cvc}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, cvc: e.target.value }))}
                      className="bg-[#1a1a1a] border-[#d4af37]/30 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-white">Cardholder Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className="bg-[#1a1a1a] border-[#d4af37]/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('booking')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                disabled={processingPayment}
              >
                Back
              </Button>
              <Button
                onClick={handlePayment}
                disabled={processingPayment}
                className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a]"
              >
                {processingPayment ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ${bookingDetails.totalCost}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-[#00d4ff]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="text-gray-300">
                Your {selectedServiceData?.name} has been booked for{' '}
                {bookingDetails.date?.toLocaleDateString()} at {bookingDetails.time}.
              </p>
              {confirmedBookingId && (
                <p className="text-sm text-gray-400 mt-2">
                  Booking ID: {confirmedBookingId}
                </p>
              )}
            </div>
            
            <Card className="bg-[#2a2a2a] border-[#d4af37]/20">
              <CardContent className="p-6">
                <h3 className="text-white font-bold mb-4">What's Next?</h3>
                <div className="space-y-2 text-left text-gray-300">
                  <p>• You'll receive a confirmation email shortly</p>
                  <p>• Our team will contact you 24 hours before your session</p>
                  <p>• Arrive 15 minutes early for setup</p>
                  <p>• Bring any specific equipment or props needed</p>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={resetAndClose}
              className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a]"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}