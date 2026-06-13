import React, { useState } from 'react'
import './App.css'

// ============================================
// 1. PRODUCT DATA (images from public/images/)
// ============================================
const products = [
  {
    id: 1,
    name: "Stich - Purple tumbler",
    price: 650,
    category: "1-Color Tumblers",
    image: "/images/1-1.png",
    description: "",
  },
  {
    id: 2,
    name: "Kuromi - purple tumbler",
    price: 650,
    category: "1-Color Tumblers",
    image: "/images/1-2.png",
    description: "",
  },
  {
    id: 3,
    name: "Teddy Bear - Pink Tumbler",
    price: 650,
    category: "1-Color Tumblers",
    image: "/images/1-3.png",
    description: "",
  },
  {
    id: 4,
    name: "Small Pink - Doraemon Tumbler",
    price: 650,
    category: "Special Collection",
    image: "/images/1-4.png",
    description: "",
  },
  {
    id: 5,
    name: "Cute 2 colours tumbler",
    price: 700,
    category: "2-Color Tumblers",
    image: "/images/2-2.png",
    description: "Light Purple and Dark Purple",
  },
  {
    id: 6,
    name: "Special Colour",
    price: 650,
    category: "Special Collection",
    image: "/images/3-1.png",
    description: "",
  },
  {
    id: 7,
    name: "Extra Sticker (+50)",
    price: "+50",
    category: "Other",
    image: "/images/stiker.jpg",
    description: "",
  },
  {
    id: 8,
    name: "Extra Glitter (+25)",
    price: "+25",
    category: "Other",
    image: "/images/gliter.png",
    description: "",
  },
  {
    id: 9,
    name: "Cute Rabbit - Purple Tumbler",
    price: 650,
    category: "1-Color Tumblers",
    image: "/images/ungu.jpeg",
    description: "",
  },
  {
    id: 10,
    name: "Blue Tumbler",
    price: 650,
    category: "1-Color Tumblers",
    image: "/images/biruu.jpeg",
    description: "",
  },
  {
    id: 11,
    name: "Cute Rabbit - Pink Tumbler",
    price: 650,
    category: "1-Color Tumblers",
    image: "/images/pink.jpeg",
    description: "",
  }
]

// ============================================
// 2. MANUAL PRICE LIST (fully editable)
// ============================================
const manualPriceList = [
  { name: "1 Warna / 1 colour", price: 650 },
  { name: "2 Warna / 2 colours", price: 700 },
  { name: "Warna Gliter / Glitter colour", price: 700 },
  { name: "Extra Sticker", price: 25 },
  { name: "Extra Glitter", price: 50 },
  { name: "Couple Package (2 Tumbler)", price: 1250 },
  { name: "7-11 & Family Mart shipping", price: "free shipping" },
  { name: "Post office shipping", price: 50 },
]

// Helper: format price (no decimals)
const formatPrice = (price) => {
  if (typeof price === 'number') {
    return `$${price}`
  }
  return price
}

const getProductById = (id) => products.find(p => p.id === parseInt(id))

const groupProductsByCategory = () => {
  const grouped = {}
  products.forEach(product => {
    if (!grouped[product.category]) grouped[product.category] = []
    grouped[product.category].push(product)
  })
  return grouped
}

const ShopCatalog = () => {
  const [currentView, setCurrentView] = useState('catalog')
  const [selectedProductId, setSelectedProductId] = useState(null)

  const navigateToCatalog = () => {
    setCurrentView('catalog')
    setSelectedProductId(null)
  }

  const navigateToDetail = (id) => {
    setCurrentView('detail')
    setSelectedProductId(id)
  }

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
  )
}

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={onNavigate}>SlurpTumbler</div>
        <div className="navbar-links">
          <button className="navbar-link" onClick={onNavigate}>Catalog</button>
        </div>
      </div>
    </nav>
  )
}

const CatalogView = ({ onProductClick }) => {
  const groupedProducts = groupProductsByCategory()
  const categoryOrder = ["1-Color Tumblers", "2-Color Tumblers", "Special Collection", "Other"]

  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="hero-title">Snowglobe Tumblers</h1>
        <p className="hero-subtitle">Beautiful, handcrafted drinkware that tells a story</p>
      </div>

      <div className="catalog-layout">
        {/* Left: Product Grid */}
        <div className="product-grid-section">
          {categoryOrder.map(category => {
            const productsInCat = groupedProducts[category]
            if (!productsInCat) return null
            return (
              <div key={category} className="category-group">
                <h2 className="category-title">{category}</h2>
                <div className="product-grid">
                  {productsInCat.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onViewDetails={() => onProductClick(product.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Price List Sidebar with WhatsApp Button */}
        <div className="price-sidebar">
          <div className="price-sidebar-card">
            <h3 className="price-sidebar-title">📋 Daftar Harga / Price Guide</h3>
            <div className="price-list">
              {manualPriceList.map((item, idx) => (
                <div key={idx} className="price-item">
                  <span className="price-item-name">{item.name}</span>
                  <span className="price-item-value">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
            <div className="price-sidebar-note">
              <span>✨ Click any product to view details</span>
            </div>
            
            {/* WhatsApp Order Button */}
            <a 
              href="https://wa.me/886984174145" 
              target="_blank" 
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              📱 Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="product-card" onClick={onViewDetails}>
      <div className="product-card-image-wrapper">
        <img 
          className="product-card-image" 
          src={product.image} 
          alt={product.name}
          loading="lazy"
        />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <button className="btn-view-details">View details →</button>
      </div>
    </div>
  )
}

const DetailView = ({ productId, onBack }) => {
  const product = getProductById(productId)
  
  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Product not found</h2>
          <button className="btn-back" onClick={onBack}>Back to catalog</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <button className="btn-back-link" onClick={onBack}>← Back to catalog</button>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-specs">
            <h4>Details</h4>
            <ul>
              <li>Waterproff sticker</li>
              <li>Double-wall insulated</li>
              <li>Leak-proof lid included</li>
              <li>Hand wash recommended</li>
            </ul>
          </div>
          <button className="btn-back" onClick={onBack}>Browse all products</button>
        </div>
      </div>
    </div>
  )
}

export default ShopCatalog