import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, dispatch } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Carrito</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <ShoppingBag size={48} className="mb-4" />
            <p>Tu carrito esta vacio.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b border-gray-700">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-gray-400">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) } })}
                        className="text-gray-400 hover:text-white"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-3 text-white">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                        className="text-gray-400 hover:text-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                    className="text-gray-400 hover:text-white ml-4"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4">
              <div className="flex justify-between text-white mb-4">
                <span>Total:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  className="w-full py-2 px-4 border border-gray-600 rounded text-white hover:bg-gray-800"
                >
                  Vaciar carrito
                </button>
                <button 
                  onClick={onCheckout}
                  className="w-full py-2 px-4 bg-white text-gray-900 rounded font-medium hover:bg-gray-100"
                >
                  Pagar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;