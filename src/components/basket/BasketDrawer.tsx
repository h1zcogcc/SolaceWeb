import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Plus, Minus, X, Tag, ArrowRight, Percent } from 'lucide-react';
import { useBasket } from '@/contexts/BasketContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const BasketDrawer = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeItem,
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

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-terracotta text-[10px] font-bold text-primary-foreground flex items-center justify-center"
            >
              {itemCount}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">Your Basket</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Your basket is empty</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add a package to get started
            </p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.packageName} Package</h4>
                      <p className="text-sm text-muted-foreground">
                        £{item.price.toLocaleString()} per person
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Couples Discount Notice */}
              {couplesDiscount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-sand/50 rounded-lg border border-gold/30"
                >
                  <Percent className="h-4 w-4 text-gold" />
                  <span className="text-sm text-foreground">
                    💕 Couples discount applied: <strong>-£{couplesDiscount.toFixed(2)}</strong>
                  </span>
                </motion.div>
              )}

              {/* Promo Code */}
              <div className="space-y-2">
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
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                )}
                {promoError && (
                  <p className="text-sm text-destructive">{promoError}</p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>£{subtotal.toLocaleString()}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm text-terracotta">
                  <span>Discounts</span>
                  <span>-£{totalDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-terracotta">£{total.toFixed(2)}</span>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full mt-4 group"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure checkout • Klarna financing available
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
