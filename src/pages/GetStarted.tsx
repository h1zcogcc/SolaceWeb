import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CalendarIcon, 
  Clock, 
  User,
  Package,
  CreditCard,
  Shield,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

type PurchaseType = 'package' | 'duration';

const packages = [
  { name: 'Basic', price: 750, duration: '2 Weeks' },
  { name: 'Standard', price: 1200, duration: '1 Month' },
  { name: 'Enhanced', price: 2800, duration: '3 Months' },
  { name: 'Premium', price: 3200, duration: '6 Months' },
];

const durationOptions = [
  { id: '2-weeks', label: '2 Weeks' },
  { id: '1-month', label: '1 Month' },
  { id: '3-months', label: '3 Months' },
  { id: '6-months', label: '6 Months' },
];

const durationPricing: Record<string, Record<string, number>> = {
  '2-weeks': { Basic: 750, Standard: 900, Enhanced: 1400, Premium: 1900 },
  '1-month': { Basic: 1200, Standard: 1500, Enhanced: 2400, Premium: 3200 },
  '3-months': { Basic: 2800, Standard: 3600, Enhanced: 5500, Premium: 7500 },
  '6-months': { Basic: 5000, Standard: 6500, Enhanced: 9500, Premium: 13000 },
};

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const DEPOSIT_AMOUNT = 50;

const GetStarted = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = location.state as { 
    selectedPackage?: string; 
    selectedDuration?: string;
    price?: number;
  } | null;

  const [step, setStep] = useState(1);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('package');
  const [selectedPackage, setSelectedPackage] = useState(initialState?.selectedPackage || '');
  const [selectedDuration, setSelectedDuration] = useState(initialState?.selectedDuration || '1-month');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    experience: '',
  });
  const [interviewDate, setInterviewDate] = useState<Date | undefined>();
  const [interviewTime, setInterviewTime] = useState('');
  const [paymentOption, setPaymentOption] = useState<'deposit' | 'full'>('deposit');

  // Calculate total price
  const calculatePrice = () => {
    if (purchaseType === 'package') {
      const pkg = packages.find(p => p.name === selectedPackage);
      return pkg?.price || 0;
    } else {
      return durationPricing[selectedDuration]?.[selectedPackage] || 0;
    }
  };

  const totalPrice = calculatePrice();
  const amountDue = paymentOption === 'deposit' ? DEPOSIT_AMOUNT : totalPrice;

  // Minimum date is 3 days from now
  const minDate = addDays(startOfDay(new Date()), 3);

  const isDateDisabled = (date: Date) => {
    return isBefore(date, minDate) || date.getDay() === 0; // Disable Sundays too
  };

  const handleNext = () => {
    if (step === 1 && !selectedPackage) {
      toast.error('Please select a package');
      return;
    }
    if (step === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
    }
    if (step === 3) {
      if (!interviewDate || !interviewTime) {
        toast.error('Please select an interview date and time');
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    toast.success('Booking submitted successfully!', {
      description: paymentOption === 'deposit' 
        ? 'Your £50 refundable deposit has been processed.'
        : 'Your payment has been processed.',
    });
    navigate('/');
  };

  const steps = [
    { number: 1, title: 'Package', icon: Package },
    { number: 2, title: 'Details', icon: User },
    { number: 3, title: 'Interview', icon: CalendarIcon },
    { number: 4, title: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Get Started with Solace Egypt
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Complete the steps below to begin your journey
              </p>
            </motion.div>

            {/* Progress Steps */}
            <div className="mb-8 md:mb-12">
              <div className="flex justify-between items-center relative">
                {/* Progress line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-border hidden sm:block" />
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-terracotta transition-all duration-500 hidden sm:block"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
                
                {steps.map((s) => (
                  <div key={s.number} className="relative z-10 flex flex-col items-center flex-1">
                    <div 
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                        step >= s.number 
                          ? 'bg-terracotta text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step > s.number ? (
                        <Check className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <s.icon className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </div>
                    <span className={`mt-2 text-xs md:text-sm font-medium hidden sm:block ${
                      step >= s.number ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-soft border border-border"
              >
                {/* Step 1: Package Selection */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6">Choose Your Plan</h2>
                    
                    {/* Purchase Type Toggle */}
                    <div className="flex gap-2 md:gap-4 mb-6 md:mb-8">
                      <button
                        onClick={() => setPurchaseType('package')}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all text-sm md:text-base ${
                          purchaseType === 'package'
                            ? 'bg-terracotta text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <Package className="w-4 h-4 inline mr-2" />
                        Set Package
                      </button>
                      <button
                        onClick={() => setPurchaseType('duration')}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all text-sm md:text-base ${
                          purchaseType === 'duration'
                            ? 'bg-terracotta text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <Clock className="w-4 h-4 inline mr-2" />
                        By Duration
                      </button>
                    </div>

                    {purchaseType === 'duration' && (
                      <div className="mb-6">
                        <Label className="text-sm font-medium mb-3 block">Select Duration</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                          {durationOptions.map((dur) => (
                            <button
                              key={dur.id}
                              onClick={() => setSelectedDuration(dur.id)}
                              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                                selectedDuration === dur.id
                                  ? 'bg-gold text-terracotta-dark'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                            >
                              {dur.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Package Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {packages.map((pkg) => {
                        const price = purchaseType === 'package' 
                          ? pkg.price 
                          : durationPricing[selectedDuration]?.[pkg.name] || 0;
                        const isSelected = selectedPackage === pkg.name;
                        
                        return (
                          <button
                            key={pkg.name}
                            onClick={() => setSelectedPackage(pkg.name)}
                            className={`p-4 md:p-5 rounded-xl text-left transition-all ${
                              isSelected
                                ? 'bg-terracotta text-white ring-2 ring-terracotta ring-offset-2'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-base md:text-lg">{pkg.name}</span>
                              {isSelected && <Check className="w-5 h-5" />}
                            </div>
                            <div className={`text-xl md:text-2xl font-bold ${isSelected ? 'text-gold' : 'text-terracotta'}`}>
                              £{price.toLocaleString()}
                            </div>
                            <div className={`text-sm mt-1 ${isSelected ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {purchaseType === 'package' ? pkg.duration : durationOptions.find(d => d.id === selectedDuration)?.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Details */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6">Your Details</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="mt-1.5"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="mt-1.5"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1.5"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1.5"
                          placeholder="+44 123 456 7890"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country of Residence</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                          className="mt-1.5"
                          placeholder="United Kingdom"
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Arabic Experience</Label>
                        <Input
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                          className="mt-1.5"
                          placeholder="Beginner, Intermediate, etc."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Interview Scheduling */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Schedule Your Interview</h2>
                    <p className="text-muted-foreground text-sm mb-6">
                      Select a date and time for your online interview (minimum 3 days from today)
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Date Selection */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Select Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !interviewDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {interviewDate ? format(interviewDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={interviewDate}
                              onSelect={setInterviewDate}
                              disabled={isDateDisabled}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Selection */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Select Time (UK) *</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setInterviewTime(time)}
                              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                                interviewTime === time
                                  ? 'bg-terracotta text-white'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {interviewDate && interviewTime && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-sand rounded-xl"
                      >
                        <div className="flex items-center gap-2 text-foreground font-medium">
                          <Check className="w-5 h-5 text-terracotta" />
                          Interview scheduled for {format(interviewDate, "EEEE, MMMM d, yyyy")} at {interviewTime} (UK time)
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Step 4: Payment */}
                {step === 4 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6">Payment</h2>

                    {/* Order Summary */}
                    <div className="bg-sand rounded-xl p-4 md:p-5 mb-6">
                      <h3 className="font-semibold mb-3">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Package</span>
                          <span className="font-medium">{selectedPackage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="font-medium">
                            {purchaseType === 'package' 
                              ? packages.find(p => p.name === selectedPackage)?.duration
                              : durationOptions.find(d => d.id === selectedDuration)?.label
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Interview</span>
                          <span className="font-medium">
                            {interviewDate && format(interviewDate, "MMM d")} at {interviewTime}
                          </span>
                        </div>
                        <div className="h-px bg-border my-3" />
                        <div className="flex justify-between text-base">
                          <span className="font-semibold">Total Price</span>
                          <span className="font-bold text-terracotta">£{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium mb-3 block">Payment Option</Label>
                      <RadioGroup 
                        value={paymentOption} 
                        onValueChange={(v) => setPaymentOption(v as 'deposit' | 'full')}
                        className="space-y-3"
                      >
                        <div className={`flex items-start space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                          paymentOption === 'deposit' ? 'border-terracotta bg-terracotta/5' : 'border-border'
                        }`}
                        onClick={() => setPaymentOption('deposit')}
                        >
                          <RadioGroupItem value="deposit" id="deposit" className="mt-0.5" />
                          <div className="flex-1">
                            <Label htmlFor="deposit" className="font-semibold cursor-pointer">
                              Pay £50 Refundable Deposit
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Secure your spot with a refundable deposit. If interview is unsuccessful, you'll receive a full refund. 
                              If successful, £50 is deducted from the total.
                            </p>
                          </div>
                        </div>
                        <div className={`flex items-start space-x-3 p-4 rounded-xl border transition-all cursor-pointer ${
                          paymentOption === 'full' ? 'border-terracotta bg-terracotta/5' : 'border-border'
                        }`}
                        onClick={() => setPaymentOption('full')}
                        >
                          <RadioGroupItem value="full" id="full" className="mt-0.5" />
                          <div className="flex-1">
                            <Label htmlFor="full" className="font-semibold cursor-pointer">
                              Pay Full Amount
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              Pay the full amount now. Refundable if interview is unsuccessful.
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Deposit Info */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl mb-6">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium">Refundable Deposit Policy</p>
                        <p className="mt-1">
                          Your £50 deposit is fully refundable if your interview is not successful. 
                          If successful, it will be deducted from your total package cost.
                        </p>
                      </div>
                    </div>

                    {/* Amount Due */}
                    <div className="bg-terracotta/10 rounded-xl p-4 flex justify-between items-center">
                      <span className="font-semibold">Amount Due Now</span>
                      <span className="text-2xl font-bold text-terracotta">£{amountDue.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 md:mt-8 gap-4">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  className="gap-2 bg-terracotta hover:bg-terracotta-dark text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="gap-2 bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white"
                >
                  <Shield className="w-4 h-4" />
                  Pay £{amountDue.toLocaleString()}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
