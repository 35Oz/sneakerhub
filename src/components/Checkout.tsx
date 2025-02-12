import React, { useState} from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, Wallet, ShoppingBag } from 'lucide-react';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'card' | 'cash' | 'mercadopago';

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const { state } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardType, setCardType] = useState<string>('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const detectCardType = (number: string) => {
    const cleanNumber = number.replace(/\s+/g, '');
    let type = '';
    
    if (cleanNumber.startsWith('4')) {
      type = 'Visa';
    } else if (/^5[1-5]/.test(cleanNumber)) {
      type = 'Mastercard';
    } else if (/^3[47]/.test(cleanNumber)) {
      type = 'American Express';
    }
    
    setCardType(type);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    detectCardType(formattedValue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Confirmar pago</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Tú orden</h3>
            <div className="space-y-2">
              {state.items.map(item => (
                <div key={item.id} className="flex justify-between text-gray-300">
                  <span>
                    {item.name} x {item.quantity}
                    {item.selectedSize && ` - Size ${item.selectedSize}`}
                    {item.selectedColor && ` - ${item.selectedColor}`}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Método de pago</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'card'
                    ? 'border-white bg-gray-800'
                    : 'border-gray-700 hover:border-gray-500'
                } flex flex-col items-center gap-2`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="text-white" size={24} />
                <span className="text-white text-sm">Tarjeta de crédito</span>
              </button>
              <button
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'cash'
                    ? 'border-white bg-gray-800'
                    : 'border-gray-700 hover:border-gray-500'
                } flex flex-col items-center gap-2`}
                onClick={() => setPaymentMethod('cash')}
              >
                <Wallet className="text-white" size={24} />
                <span className="text-white text-sm">Efectivo</span>
              </button>
              <button
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'mercadopago'
                    ? 'border-white bg-gray-800'
                    : 'border-gray-700 hover:border-gray-500'
                } flex flex-col items-center gap-2`}
                onClick={() => setPaymentMethod('mercadopago')}
              >
                <ShoppingBag className="text-white" size={24} />
                <span className="text-white text-sm">Mercado Pago</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Número</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
                    maxLength={19}
                  />
                  {cardType && (
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {cardType}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Nombre</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Fecha de vencimiento</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">CVV</label>
                  <input
                    type="text"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
                    maxLength={3}
                  />
                </div>
              </div>
            </form>
          )}

          {paymentMethod === 'cash' && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Instrucciones de pago</h4>
              <p className="text-gray-300 mb-4">
                Puedes pagar en cualquier Rapi Pago o Pago Fácil. Muestra este código:
              </p>
              <div className="bg-white text-gray-900 p-4 rounded text-center font-mono text-xl">
                8391 2748 9102 3456
              </div>
              <p className="text-gray-400 mt-2 text-sm">
                Recuerda que el codigo solo es válido por 48 horas. Tu orden será confirmada una vez que llegue el pago.
              </p>
            </div>
          )}

          {paymentMethod === 'mercadopago' && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Mercado Pago</h4>
              <p className="text-gray-300 mb-4">
                Serás redirijido a la app de Mercado Pago.
              </p>
            </div>
          )}

          <div className="mt-6 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-700 rounded-md text-white hover:bg-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                alert('Pago aceptado, muchas grácias!');
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100"
            >
              {paymentMethod === 'mercadopago' ? 'Continue to Mercado Pago' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;