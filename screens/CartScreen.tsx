import React, { useMemo } from 'react';
import { Screen } from '../types';
import type { CartItem } from '../App';
import FlameIcon from '../components/FlameIcon';
import BottomNav from '../components/BottomNav';
import { CompassIcon, TrashIcon } from '../components/Icons';
import Button from '../components/Button';


interface CartScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onNavigate: (screen: Screen) => void;
  activeScreen: Screen;
}

const CartItemCard: React.FC<{ item: CartItem; onUpdate: (id: number, qty: number) => void; onRemove: (id: number) => void; }> = ({ item, onUpdate, onRemove }) => {
    return (
        <div className="bg-white p-3 rounded-2xl border border-orange-300 shadow-sm flex items-center space-x-4">
            <div className="bg-gray-100 rounded-lg p-2 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
            </div>
            <div className="flex-grow min-w-0">
                <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                <div className="flex items-center space-x-2 my-1">
                    <span className="text-sm text-gray-500">Cor:</span>
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color, border: '1px solid #E5E7EB' }}></span>
                </div>
                <p className="font-semibold text-gray-700">{item.price.toFixed(2)} AOA</p>
            </div>
            <div className="flex flex-col items-end justify-between h-full space-y-3">
                <button onClick={() => onRemove(item.id)} aria-label="Remover item">
                    <TrashIcon className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded-md font-bold text-lg transition-transform transform active:scale-90" aria-label="Diminuir quantidade">-</button>
                    <span className="font-bold w-5 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdate(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded-md font-bold text-lg transition-transform transform active:scale-90" aria-label="Aumentar quantidade">+</button>
                </div>
            </div>
        </div>
    );
};


const CartScreen: React.FC<CartScreenProps> = ({ cart, onUpdateQuantity, onRemoveFromCart, onNavigate, activeScreen }) => {
  const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const { subtotal, delivery, iva, total } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const del = sub > 0 ? 200.00 : 0; // Example delivery fee
    const tax = 0.00; // Example IVA
    const tot = sub + del + tax;
    return { subtotal: sub, delivery: del, iva: tax, total: tot };
  }, [cart]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <FlameIcon className="w-6 h-6 text-orange-500" />
          <div>
            <h1 className="font-bold text-lg text-gray-800">Carrinho</h1>
            <p className="text-sm text-gray-500">{cartItemCount} item{cartItemCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button className="text-gray-600">
          <CompassIcon className="w-7 h-7" />
        </button>
      </header>
      
      <main className="px-4 pb-[320px]">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">O seu carrinho está vazio.</p>
            <Button variant="outline" className="mt-4 max-w-xs mx-auto" onClick={() => onNavigate(Screen.Home)}>
              Continuar a comprar
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <CartItemCard 
                key={item.id} 
                item={item} 
                onUpdate={onUpdateQuantity}
                onRemove={onRemoveFromCart}
              />
            ))}
          </div>
        )}
      </main>

      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto z-40">
        <div className="bg-white rounded-t-3xl p-6 pt-5 shadow-[-4px_0_15px_rgba(0,0,0,0.1)]">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Valor a pagar</h2>
            <div className="space-y-2 text-gray-500 font-medium">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Entrega</span>
                    <span>${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>IVA</span>
                    <span>${iva.toFixed(2)}</span>
                </div>
            </div>
            <hr className="my-3 border-dashed" />
            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                <span>TOTAL</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
            </div>
            <Button className="mt-4" onClick={() => alert('Finalizar Compra!')} disabled={cart.length === 0}>
                Finalizar Compra
            </Button>
        </div>
      </div>
      
      <BottomNav cartCount={cartItemCount} notificationCount={0} onNavigate={onNavigate} activeScreen={activeScreen} />
    </div>
  );
};

export default CartScreen;