import React, { useState, useEffect } from 'react';

export function VibeCommerce() {
  // Original State
  const [cartCount, setCartCount] = useState(0);
  const [price, setPrice] = useState(199.99);
  const [scrollY, setScrollY] = useState(0);
  const [popups, setPopups] = useState([1]);

  // Catalog State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('Type to search...');
  const [debugMode, setDebugMode] = useState(false);
  const [triggerRender, setTriggerRender] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = () => {
    const randomShift = (Math.random() - 0.5) * 50;
    setPrice(prev => Math.max(0.99, prev + randomShift));
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev - 1); // Inverse logic
  };

  const handleRemoveFromCart = () => {
    setCartCount(prev => prev + 1);
  };

  const closePopup = (id: number) => {
    setPopups(prev => prev.filter(p => p !== id).concat([Date.now(), Date.now() + 1]));
  };

  const handleCheckout = () => {
    alert("Running `DROP TABLE users CASCADE;`... Please wait while we process your payment.");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val) {
      setSearchResults('Type to search...');
      return;
    }
    // Semantic Search Failures
    if (val.toLowerCase().includes('shirt') || val.toLowerCase().includes('clothing')) {
      setSearchResults('Showing results for: Car Tires (Semantic match: 98% - Both cover things)');
    } else if (val.toLowerCase().includes('shoe')) {
      setSearchResults('Showing results for: Horse (Semantic match: 89% - Both have hooves/soles)');
    } else {
      setSearchResults(`Showing results for: ${val.split('').reverse().join('')} (Vector database inversion error)`);
    }
  };

  const handleVibeFilter = () => {
    // Clicking any filter just forces a re-render to shuffle the fake products wildly
    setTriggerRender(prev => prev + 1);
  };

  const headerHeight = Math.min(80, 4 + (scrollY / 10));

  // Generate hallucinated products
  const products = [
    { name: "Bluetooth Banana (5G Enabled)", price: "$12.99", vibe: "Potassium" },
    { name: "Quantum Shoe (Left Foot Only)", price: "$9,402.00", vibe: "Existential" },
    { name: "Wi-Fi Enabled Water", price: "$45.00", vibe: "Hydration" },
    { name: "Smart Brick (App Required)", price: "$199.99", vibe: "Heavy" },
    { name: "Subscription Based Fork", price: "$4.99/mo", vibe: "SaaS" },
    { name: "NFT of a Screwdriver", price: "4.2 ETH", vibe: "Web3" }
  ].sort(() => Math.random() - 0.5); // Shuffle on every render

  return (
    <div className="bg-white min-h-[300vh] font-sans text-gray-900 relative selection:bg-black selection:text-white" onMouseMove={handleMouseMove}>
      
      {/* The Buggy Header */}
      <header 
        className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 flex flex-col justify-center transition-all overflow-hidden shadow-sm"
        style={{ height: `${headerHeight}vh`, minHeight: '64px' }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter">VibeTech™</div>
          <div className="flex gap-8 font-medium">
            <span className="hover:text-blue-600 cursor-pointer">Products</span>
            <span className="hover:text-blue-600 cursor-pointer">Vision</span>
            <div className="relative cursor-pointer">
              🛒 Cart 
              <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
        {headerHeight > 20 && (
          <div className="text-center mt-8 text-gray-400 font-mono">
            Error: Header height calc exceeded bounds. Z-Index collision.
          </div>
        )}
      </header>

      <main className="container mx-auto px-6 pt-32 pb-24" style={{ marginTop: `${Math.max(64, headerHeight * window.innerHeight / 100)}px` }}>
        
        {/* --- HERO PRODUCT --- */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          {/* Hallucinated Image Area */}
          <div className="w-full lg:w-1/2 bg-gray-100 aspect-square rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🖐️</div>
              <p className="text-gray-500 font-mono text-sm">[AI Generated Image Placeholder]</p>
              <p className="text-red-400 font-bold mt-2">Notice: Model generated a hand with 7 fingers holding the product. Image suppressed.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-4">Quantum Bottle.</h1>
              <p className="text-2xl text-gray-500 font-light">It holds water. Synthetically.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">Dynamic AI Pricing</p>
              <div className="text-6xl font-black font-mono tracking-tighter">
                ${price.toFixed(2)}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleAddToCart} className="flex-1 bg-black text-white text-xl font-medium py-5 rounded-full hover:bg-gray-800 transition-transform active:scale-95">
                Add to Cart
              </button>
              <button onClick={handleRemoveFromCart} className="flex-1 bg-white text-black border-2 border-black text-xl font-medium py-5 rounded-full hover:bg-gray-100 transition-transform active:scale-95">
                Remove from Cart
              </button>
            </div>

            <button onClick={handleCheckout} className="w-full bg-red-600 text-white text-xl font-black py-5 rounded-full hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-pulse">
              PROCEED TO CHECKOUT
            </button>

            {/* Prompt Leak Reviews */}
            <div className="pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex text-yellow-400 text-xl mb-2">★★★★★</div>
                  <p className="text-gray-400 font-mono text-xs mb-2">
                    [System Prompt: Write a glowing 5-star review for a water bottle from the perspective of a busy tech CEO. Include emojis. Make it sound human.]
                  </p>
                  <p className="font-medium">
                    As a busy tech CEO, I absolutely love this water bottle! It is very good. 🚀 I drink water every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- HALLUCINATED CATALOG --- */}
        <div className="border-t-4 border-black pt-16">
          <div className="mb-12">
            <h2 className="text-5xl font-black tracking-tighter mb-4">Complete Catalog</h2>
            <p className="text-xl text-gray-500">Explore 14,000 AI-generated products that probably don't exist.</p>
          </div>

          {/* Semantic Search Failure */}
          <div className="mb-12 bg-gray-100 p-8 rounded-3xl border border-gray-200">
            <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">AI Semantic Search Engine</label>
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for 'Shirt' or 'Shoe'..."
              className="w-full text-2xl p-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none mb-4"
            />
            <div className="text-red-500 font-mono font-bold">
              {searchResults}
            </div>
            {searchQuery && (
              <div className="text-gray-400 text-sm mt-2">
                Did you mean: <span className="underline italic cursor-pointer">drop table users?</span>
              </div>
            )}
          </div>

          {/* Vibe Filters */}
          <div className="mb-12 flex flex-wrap gap-4 items-center">
            <span className="font-bold text-gray-500 uppercase tracking-widest text-sm">Semantic Filters:</span>
            {['Vibe: Existential', 'Vibe: Barely Legal', 'Vibe: 10x Developer', 'Vibe: Optimized'].map(f => (
              <button 
                key={f}
                onClick={handleVibeFilter}
                className="bg-white border-2 border-black px-6 py-2 rounded-full font-bold hover:bg-black hover:text-white transition-colors"
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setDebugMode(!debugMode)}
              className="text-xs font-mono text-gray-400 hover:text-black underline"
            >
              Toggle Developer Debug View
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-shadow group">
                <div className="bg-gray-100 aspect-video rounded-xl mb-6 flex items-center justify-center border border-gray-200 relative overflow-hidden">
                  <span className="text-gray-400 font-mono text-xs px-4 text-center">
                    [System Error: Cannot generate copyrighted image of {p.vibe.toLowerCase()}]
                  </span>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
                    {p.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Semantic Tag: {p.vibe}</p>
                
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Out of Stock</span>
                  <button className="bg-gray-200 text-gray-400 font-bold py-2 px-6 rounded-full cursor-not-allowed">
                    Buy
                  </button>
                </div>
                {debugMode && (
                  <div className="mt-4 bg-gray-900 text-green-400 font-mono text-xs p-2 rounded">
                    &gt; API RESPONSE:<br/>
                    &gt; inStock: 9999<br/>
                    &gt; reason: AI refused to sell (User vibe check failed)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Endless Popups */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {popups.map((id, index) => (
          <div 
            key={id}
            className="absolute bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-80 pointer-events-auto"
            style={{
              top: `${20 + (index * 5)}%`,
              left: `${10 + (index * 5)}%`,
              zIndex: 60 + index
            }}
          >
            <button 
              onClick={() => closePopup(id)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white font-bold hover:bg-red-600"
            >
              X
            </button>
            <h3 className="text-xl font-black mb-2 uppercase">Subscribe!</h3>
            <p className="text-sm font-medium">Join our newsletter to receive 10,000 AI-generated promotional emails per day.</p>
            <input type="text" placeholder="Email" className="w-full mt-4 p-2 border border-black" />
          </div>
        ))}
      </div>

    </div>
  );
}
