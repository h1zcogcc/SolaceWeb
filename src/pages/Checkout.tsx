import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useBasket } from '@/contexts/BasketContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Lock, Check, Tag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

import visaLogo from '@/assets/payments/visa.svg';
import mastercardLogo from '@/assets/payments/mastercard.svg';
import amexLogo from '@/assets/payments/amex.svg';
import klarnaLogo from '@/assets/payments/klarna.svg';
import stripeLogo from '@/assets/payments/stripe.svg';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    items,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    subtotal,
    couplesDiscount,
    totalDiscount,
    total,
    itemCount,
  } = useBasket();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-4">Your basket is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add a package to proceed with checkout.
            </p>
            <Button variant="hero" onClick={() => navigate('/#packages')}>
              View Packages
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+44 7700 900000" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  {/* Card Payment */}
                  <div
                    className={`relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-terracotta bg-terracotta/5'
                        : 'border-border hover:border-terracotta/50'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <RadioGroupItem value="card" id="card" className="sr-only" />
                    <div className="flex items-center gap-4 flex-1">
                      <CreditCard className="h-6 w-6 text-terracotta" />
                      <div>
                        <p className="font-medium">Credit / Debit Card</p>
                        <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={visaLogo} alt="Visa" className="h-6" />
                      <img src={mastercardLogo} alt="Mastercard" className="h-6" />
                      <img src={amexLogo} alt="Amex" className="h-6" />
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-5 w-5 text-terracotta" />
                      </div>
                    )}
                  </div>

                  {/* Klarna */}
                  <div
                    className={`relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'klarna'
                        ? 'border-terracotta bg-terracotta/5'
                        : 'border-border hover:border-terracotta/50'
                    }`}
                    onClick={() => setPaymentMethod('klarna')}
                  >
                    <RadioGroupItem value="klarna" id="klarna" className="sr-only" />
                    <div className="flex items-center gap-4 flex-1">
                      <img src={klarnaLogo} alt="Klarna" className="h-8" />
                      <div>
                        <p className="font-medium">Pay with Klarna</p>
                        <p className="text-sm text-muted-foreground">
                          Split into 3 interest-free payments of £{(total / 3).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {paymentMethod === 'klarna' && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-5 w-5 text-terracotta" />
                      </div>
                    )}
                  </div>
                </RadioGroup>

                {/* Card Details (shown when card is selected) */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-border space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </motion.div>
                )}

                {/* Klarna Info */}
                {paymentMethod === 'klarna' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-border"
                  >
                    <div className="bg-[#FFB3C7]/20 rounded-xl p-4 space-y-3">
                      <h4 className="font-medium text-sm">How Klarna works:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="bg-terracotta text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">1</span>
                          Pay the first instalment today
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-terracotta text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">2</span>
                          Second payment in 30 days
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-terracotta text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">3</span>
                          Final payment in 60 days
                        </li>
                      </ul>
                      <p className="text-xs text-muted-foreground">
                        No interest. No fees when you pay on time.
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border sticky top-24"
              >
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.packageName} Package</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × £{item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-medium">
                        £{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="border-t border-border pt-4 mb-4">
                  {promoCode ? (
                    <div className="flex items-center justify-between p-3 bg-sand/50 rounded-lg border border-terracotta/30">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-terracotta" />
                        <span className="text-sm font-medium">{promoCode}</span>
                        <span className="text-sm text-muted-foreground">
                          ({(promoDiscount * 100).toFixed(0)}% off)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removePromoCode}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" onClick={handleApplyPromo} size="sm">
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-sm text-destructive">{promoError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>£{subtotal.toLocaleString()}</span>
                  </div>
                  {couplesDiscount > 0 && (
                    <div className="flex justify-between text-sm text-terracotta">
                      <span>💕 Couples discount (20%)</span>
                      <span>-£{couplesDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  {promoCode && (
                    <div className="flex justify-between text-sm text-terracotta">
                      <span>Promo: {promoCode}</span>
                      <span>-£{((subtotal - couplesDiscount) * promoDiscount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-terracotta">£{total.toFixed(2)}</span>
                  </div>

                  {paymentMethod === 'klarna' && (
                    <p className="text-sm text-center text-muted-foreground bg-muted/50 rounded-lg p-2">
                      3 payments of <strong>£{(total / 3).toFixed(2)}</strong>
                    </p>
                  )}
                </div>

                {/* Pay Button */}
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full mt-6 group"
                  onClick={() => alert('Stripe integration not yet enabled. This is a preview.')}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {paymentMethod === 'klarna' ? 'Continue with Klarna' : `Pay £${total.toFixed(2)}`}
                </Button>

                {/* Security Notice */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <img src={stripeLogo} alt="Stripe" className="h-5" />
                  <span>Secure payment powered by Stripe</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
