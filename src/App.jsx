import React, { useState } from 'react';
import './App.css';

// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals. Over-ear design with plush memory foam earcups, Bluetooth 5.0, and built-in mic for calls.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone notifications. Water-resistant design with AMOLED display, GPS, and up to 5 days battery life. Stay connected on the go.",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description: "Ergonomic aluminum laptop stand that improves posture and workspace organization. Adjustable height and angle, foldable design for portability. Compatible with MacBook, Dell, Lenovo, and other laptops up to 17 inches.",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
    description: "RGB backlit mechanical keyboard with Cherry MX switches. Perfect for gaming and typing enthusiasts. Tenkeyless design, durable keycaps, and programmable macros. Enjoy tactile feedback and customizable lighting.",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Expand your laptop connectivity instantly. 4K HDMI output, 100W power delivery pass-through, compact design perfect for travel.",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    description: "Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for extended use, silent clicks, and adjustable DPI. Connects via 2.4GHz USB receiver and Bluetooth dual mode.",
  },
  {
    id: 7,
    name: "Monitor Stand",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    description: "Dual monitor stand with adjustable height and tilt. Frees up desk space and improves ergonomics. Heavy-duty steel construction, clamp or grommet mount, supports up to 27 inch monitors each.",
  },
  {
    id: 8,
    name: "Webcam HD",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
    description: "1080p HD webcam with auto-focus and built-in microphone. Ideal for video calls and streaming. Low-light correction, privacy shutter, and universal mounting clip.",
  }
];

// Helper functions
const getProductById = (id) => products.find(p => p.id === parseInt(id));

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigateToCatalog = () => {
    setCurrentView('catalog');
    setSelectedProductId(null);
  };

  const navigateToDetail = (id) => {
    setCurrentView('detail');
    setSelectedProductId(id);
  };

  return (
    <div className="app">
      <Navbar onNavigate={navigateToCatalog} />
      <main className="page">
        {currentView === 'catalog' && (
          <CatalogView onProductClick={navigateToDetail} />
        )}
        {currentView === 'detail' && selectedProductId && (
          <DetailView 
            productId={selectedProductId} 
            onBack={navigateToCatalog} 
          />
        )}
      </main>
    </div>
  );
};

// Navbar Component
const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={onNavigate} style={{ cursor: 'pointer' }}>
          📦 MyShop Catalog <span className="catalog-badge">catalog only</span>
        </div>
        <div className="navbar-links">
          <button className="navbar-link" onClick={onNavigate}>🏠 Home</button>
          <button className="navbar-link" onClick={onNavigate}>📋 All Products</button>
        </div>
      </div>
    </nav>
  );
};

// Catalog View - shows all products (photo, title, price)
const CatalogView = ({ onProductClick }) => {
  return (
    <div className="container">
      <div className="home-hero">
        <h1 className="home-title">✨ My Shop Catalog ✨</h1>
        <p className="home-subtitle">Browse our handpicked collection — view product details, descriptions, and inspiration.</p>
        <p style={{ color: '#666', fontSize: '0.95rem' }}>Click on any product card to see full description.</p>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onProductClick(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Product Card Component (photo, title, price only)
const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img 
        className="product-card-image" 
        src={product.image} 
        alt={product.name}
        loading="lazy"
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Detail View - shows full product details including description
const DetailView = ({ productId, onBack }) => {
  const product = getProductById(productId);
  
  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Product not found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <button className="btn btn-secondary" onClick={onBack}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ margin: '1rem 0 0.5rem 0' }}>
        <button className="back-link" onClick={onBack}>
          ← Back to all products
        </button>
      </div>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-content">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <div className="product-detail-description">
            {product.description}
          </div>
          <button className="btn btn-secondary" onClick={onBack}>
            Browse More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;