import React, { useState } from 'react';
import { Screen } from '../types';
import FlameIcon from '../components/FlameIcon';
import BottomNav from '../components/BottomNav';
import { CompassIcon, AddToCartIcon } from '../components/Icons';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const productData = [
  { id: 1, name: 'Aço 6KG', price: '750.00 AOA', identifier: 'botija_pequena', image: 'https://vale-luanhi.com/images/levita11.png' },
  { id: 2, name: 'Aço 12KG', price: '1800.00 AOA', identifier: 'botija_media', image: 'https://vale-luanhi.com/images/bottle_site.png' },
  { id: 3, name: 'Aço 51KG', price: '6100.00 AOA', identifier: 'botija_grande', image: 'https://vale-luanhi.com/images/botija51.png' },
  { id: 4, name: 'Mangueira Especial', price: '1000.00 AOA', identifier: 'mangueira', image: 'https://www.go-system.co.uk/cdn/shop/products/a59089c5-2fbc-4bb2-932a-d9bdf32fede9_800x.jpg?v=1616753397' },
];

const categories = [
    { name: 'Aço 6KG', image: 'https://vale-luanhi.com/images/levita11.png'},
    { name: 'Aço 12KG', image: 'https://vale-luanhi.com/images/bottle_site.png'},
    { name: 'Aço 51KG', image: 'https://vale-luanhi.com/images/botija51.png'},
    { name: 'Mangueira', image: 'https://www.go-system.co.uk/cdn/shop/products/a59089c5-2fbc-4bb2-932a-d9bdf32fede9_800x.jpg?v=1616753397'},
];

const ProductCard: React.FC<{ product: typeof productData[0]; onAdd: () => void }> = ({ product, onAdd }) => (
  <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-200 flex flex-col">
    <div className="bg-gray-100 rounded-xl mb-3 flex items-center justify-center h-28">
        <img src={product.image} alt={product.name} className="h-24 object-contain" />
    </div>
    <div className="flex-grow">
      <h3 className="font-bold text-gray-800">{product.name}</h3>
      <p className="text-sm font-semibold text-gray-600">{product.price}</p>
      <p className="text-xs text-gray-400">{product.identifier}</p>
    </div>
    <div className="mt-2">
      <button onClick={onAdd} className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-transform transform active:scale-95 hover:bg-orange-600">
        <AddToCartIcon className="w-4 h-4" />
        <span>Add</span>
      </button>
    </div>
  </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <header className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FlameIcon className="w-6 h-6 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500">Testado</p>
              <h1 className="font-bold text-lg text-gray-800">Bem Vindo</h1>
            </div>
          </div>
          <button className="text-gray-600">
            <CompassIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <section className="px-4">
        <div className="bg-orange-500 rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-light">Lista de todos os produtos</p>
            <h2 className="text-4xl font-bold my-1">50%</h2>
            <button className="bg-white text-orange-500 text-sm font-semibold px-4 py-1.5 rounded-lg mt-2 shadow-md">
              Ultimas ofertas
            </button>
          </div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQI5_BKObF6Ing4FVxmqLTP3PGv20lYixweByeeoMeBn9nVO8ms1D1HPD6zIgI5y_mN9I&usqp=CAU" alt="Botijas" className="absolute -right-8 -bottom-4 w-48 opacity-90 z-0" />
        </div>
      </section>

      <section className="py-4">
        <div className="flex space-x-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {categories.map(category => (
            <div key={category.name} className="flex-shrink-0 flex flex-col items-center space-y-2">
               <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                 <img src={category.image} alt={category.name} className="h-12"/>
               </div>
               <p className="text-xs font-semibold text-gray-700 text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {productData.map(product => (
            <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
          ))}
        </div>
      </main>

      <BottomNav cartCount={cartCount} notificationCount={0} onNavigate={onNavigate} />
    </div>
  );
};

export default HomeScreen;