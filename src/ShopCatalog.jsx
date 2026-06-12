import React from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=600&auto=format&fit=crop&q=80', // Styled matching your mouse/stand vibe
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Wireless Mouse',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
  },
];

export default function ShopCatalog() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="border-b border-slate-200 pb-5 mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Our Products
          </h2>
        </div>

        {/* Simplified Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
            >
              {/* Image Container with subtle hover zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover