import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const API_BASE = 'https://bahbah-backend-production.up.railway.app';
const translations = {
  ar: {
    home: "الرئيسية", menu: "المنيو", offers: "العروض", about: "عن المطعم",
    all: "الكل", orderNow: "اطلب أكلتك دلوقتي -", ourMenu: "OUR\nMENU",
    menuSubtitle: "قائمة العظمة", menuDesc: "من البرجر الكلاسيك لحد التركيبات الخاصة .. كل لقمة في بحبح ليها حكاية.",
    viewAll: "عرض الكل +", total: "إجمالي الطلب:", whatsappOrder: "إرسال الطلب عبر الواتساب",
    cart: "السلة", emptyCart: "السلة فاضية!", backToMenu: "العودة للمنيو"
  },
  en: {
    home: "Home", menu: "Menu", offers: "Offers", about: "About",
    all: "All", orderNow: "Order Now -", ourMenu: "OUR\nMENU",
    menuSubtitle: "The Great Menu", menuDesc: "From classic burgers to special mixes.. every bite at Bahbah has a story.",
    viewAll: "View All +", total: "Total:", whatsappOrder: "Order via WhatsApp",
    cart: "Cart", emptyCart: "Cart is empty!", backToMenu: "Back to Menu"
  }
};

const getDiscountedPrice = (price, discountPercent) => {
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
};

// ================= CSS مخصص يطابق الصورة بالضبط =================
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Cairo:wght@400;700;900&family=Nothing+You+Could+Do&display=swap');
  
  .font-anton { font-family: 'Anton', sans-serif; }
  .font-cairo { font-family: 'Cairo', sans-serif; }
  .font-handwriting { font-family: 'Nothing You Could Do', cursive; }
  
  .grunge-text-white {
    color: #ffffff;
    text-shadow: 3px 3px 0px rgba(0,0,0,0.9), -1px -1px 0px rgba(255,255,255,0.1);
  }
  .grunge-text-red {
    color: #e11d48;
    text-shadow: 3px 3px 0px rgba(0,0,0,0.9), 0 0 15px rgba(225, 29, 72, 0.5);
  }
  
  .menu-title-outline {
    -webkit-text-stroke: 1px rgba(255,255,255,0.2);
    color: transparent;
  }
  
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 25s linear infinite;
  }

  .card-bg {
    background: linear-gradient(180deg, #110808 0%, #050000 100%);
  }
`;

// ================= Navbar Component (بنفس تصميم الصورة) =================
const Navbar = ({ lang, setLang, cartLength, siteSettings, onSecretClick }) => (
  <nav className="fixed top-0 w-full z-50 bg-[#050000]/95 border-b border-zinc-900 transition-all font-cairo">
    <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3 z-50">
        <div onClick={onSecretClick} className="bg-white text-black font-anton text-2xl w-10 h-10 flex items-center justify-center rounded-sm cursor-pointer">B</div>
        <Link to="/" className="flex flex-col leading-none font-anton text-white">
          <span className="text-xl tracking-wide">Bahbah</span>
          <span className="text-xl text-[#e11d48] tracking-wide">Burger</span>
        </Link>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest text-zinc-300">
        <Link to="/" className="text-white hover:text-[#e11d48] transition">Home</Link>
        <Link to="/menu" className="hover:text-[#e11d48] transition">Menu</Link>
        <Link to="/" className="hover:text-[#e11d48] transition">Offers</Link>
        <Link to="/" className="hover:text-[#e11d48] transition">About</Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="text-xs font-bold text-zinc-400 hover:text-white transition">
          {lang === 'ar' ? 'EN | عربي' : 'عربي | EN'}
        </button>
        <Link to="/cart" className="relative text-white hover:text-[#e11d48] transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          {cartLength > 0 && <span className="absolute -top-2 -right-2 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartLength}</span>}
        </Link>
        <button className="text-white hidden md:block">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>
  </nav>
);

// ================= Home & Menu Page (نفس التصميم في الصورة) =================
const HomePage = ({ lang, siteSettings, menuItems, categories, handleOpenItemDetails }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const categoriesToShow = (selectedCategory === 'الكل' || selectedCategory === 'All') ? categories : categories.filter(cat => cat.name === selectedCategory);

  return (
    <div className="bg-[#050000] min-h-screen text-white font-cairo overflow-hidden selection:bg-[#e11d48] selection:text-white">
      <style>{customStyles}</style>
      
      {/* 1. Hero Section */}
      <header className="relative w-full min-h-screen flex items-center justify-between px-6 md:px-16 pt-20">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(225,29,72,0.15),_transparent_60%)] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[radial-gradient(circle_at_bottom_left,_rgba(225,29,72,0.1),_transparent_70%)] pointer-events-none z-0"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          
          {/* Text Side */}
          <div className="flex flex-col z-20 md:w-1/2 pt-10">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-[#e11d48]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z"/></svg>
              <span className="text-[#e11d48] font-anton tracking-widest text-sm uppercase">BIGGER · JUICIER · HOTTER</span>
            </div>
            
            <div className="transform -rotate-6 mt-4">
              <h1 className="font-anton text-[4.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.85] grunge-text-white tracking-tight uppercase">
                THE FIRE
              </h1>
              <h1 className="font-anton text-[4.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.85] grunge-text-red tracking-tight uppercase">
                IS COMING
              </h1>
            </div>

            <p className="text-white text-lg mt-8 font-bold tracking-wide">
              مش مجرد برجر .. ده بحبح!
            </p>
            
            <button className="mt-8 bg-[#e11d48] hover:bg-red-700 text-white px-8 py-3.5 rounded-lg w-fit font-bold shadow-lg transition flex items-center gap-4 text-sm">
              {t.orderNow}
            </button>
          </div>

          {/* Image Side */}
          <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end mt-16 md:mt-0">
            <div className="relative w-[110%] md:w-[130%] max-w-[700px] md:-mr-10">
              <img src={siteSettings.heroImage || "https://png.pngtree.com/png-clipart/20230413/original/pngtree-burger-food-png-image_9049449.png"} alt="Burger" className="w-full h-auto drop-shadow-[0_40px_40px_rgba(0,0,0,0.8)] relative z-20" />
              <div className="absolute top-10 right-0 font-handwriting text-[#e11d48]/30 text-5xl md:text-7xl -rotate-12 z-0 whitespace-nowrap">
                Real Chicken<br/>Real Taste
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indication */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll Down</span>
        </div>
      </header>

      {/* 2. Marquee Divider */}
      <div className="w-full bg-black border-y border-zinc-900 py-2.5 overflow-hidden flex whitespace-nowrap relative z-20">
        <div className="animate-marquee flex items-center gap-12 font-anton text-[#e11d48]/40 text-lg tracking-widest uppercase">
          {Array(8).fill().map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-3 text-white/60"><b className="text-xl bg-white text-black px-2 rounded-sm">B</b> Bahbah Burger</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z"/></svg>
              <span>BIGGER · JUICIER · HOTTER</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. Menu Section */}
      <section className="px-6 md:px-12 py-24 max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (OUR MENU) */}
          <div className="lg:col-span-3 flex flex-col pt-8">
            <h2 className="font-anton text-6xl md:text-7xl transform -rotate-6 leading-[0.85] mb-6">
              <span className="text-[#e11d48]">{t.ourMenu.split('\n')[0]}</span><br/>
              <span className="text-white">{t.ourMenu.split('\n')[1]}</span>
            </h2>
            <h3 className="text-lg font-black text-white">{t.menuSubtitle}</h3>
            <p className="text-zinc-500 text-xs mt-3 leading-loose max-w-[200px] font-bold">
              {t.menuDesc}
            </p>
            <button className="mt-8 border border-zinc-800 text-white px-5 py-2.5 rounded text-xs font-bold w-fit hover:bg-[#e11d48] hover:border-[#e11d48] transition">
              {t.viewAll}
            </button>
          </div>

          {/* Center Column (Categories + Grid) */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Categories Pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none mb-10 pb-2">
              <button onClick={() => setSelectedCategory('الكل')} className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === 'الكل' ? 'bg-[#e11d48] text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]' : 'bg-transparent text-zinc-500 hover:text-white'}`}>
                {t.all}
              </button>
              {categories.map(cat => (
                <button key={cat._id} onClick={() => setSelectedCategory(cat.name)} className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat.name ? 'bg-[#e11d48] text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]' : 'bg-transparent text-zinc-500 hover:text-white'}`}>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categoriesToShow.map(cat => {
                const catItems = menuItems.filter(item => item.category === cat.name);
                return catItems.map(item => {
                  const finalPrice = getDiscountedPrice(item.price, item.discount);
                  return (
                    <div key={item._id} className="card-bg border border-zinc-900 rounded-2xl overflow-hidden flex flex-col group relative hover:border-red-900/50 transition duration-300">
                      {/* Badges */}
                      {item.isOffer && (
                        <div className="absolute top-4 left-4 z-20 bg-[#e11d48] text-white text-[9px] px-2 py-1 font-bold rounded-sm">
                          الأكثر مبيعاً
                        </div>
                      )}
                      {item.discount > 0 && !item.isOffer && (
                        <div className="absolute top-4 left-4 z-20 bg-red-700 text-white text-[9px] px-2 py-1 font-bold rounded-sm">
                          جديد
                        </div>
                      )}

                      <div className="w-full h-44 relative overflow-hidden flex items-center justify-center p-4 cursor-pointer" onClick={() => handleOpenItemDetails(item)}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(225,29,72,0.1)_0%,_transparent_60%)]"></div>
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition duration-500" />
                      </div>
                      
                      <div className="px-5 pb-5 pt-2 flex flex-col flex-1">
                        <h4 className="font-anton text-lg text-white uppercase tracking-wide">{item.name}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1.5 line-clamp-2 leading-relaxed font-bold">{item.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <span className="text-[#e11d48] font-anton text-xl tracking-wider">EGP {finalPrice}</span>
                          <button onClick={() => handleOpenItemDetails(item)} className="w-8 h-8 flex items-center justify-center text-zinc-500 border border-zinc-800 rounded hover:bg-[#e11d48] hover:text-white hover:border-[#e11d48] transition">
                            <span className="font-bold text-lg leading-none">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>

          {/* Right Banner Column */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="w-full h-full min-h-[500px] rounded-2xl relative overflow-hidden group">
              <img src={siteSettings.promoBannerImage || "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} alt="Promo" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-0 w-full text-center z-20 flex flex-col items-center">
                <div className="bg-white text-black font-anton text-4xl w-14 h-14 flex items-center justify-center rounded-sm mb-2 shadow-2xl">B</div>
                <h3 className="font-anton text-5xl text-[#e11d48] leading-[0.8] drop-shadow-2xl">BAHBAH<br/>BURGER</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ================= 2. Cart Page (بنفس الألوان والثيم) =================
const CartPage = ({ cart, setCart, lang }) => {
  const t = translations[lang];
  const itemsTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const [orderType, setOrderType] = useState('delivery');
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [placedOrderId, setPlacedOrderId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/zones`).then(res => res.json()).then(data => { setDeliveryZones(data); if (data.length > 0) setSelectedZone(data[0]); }).catch(() => {});
  }, []);

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.name === item.name);
    if (existing) existing.quantity += 1;
    else acc.push({ ...item, quantity: 1 });
    return acc;
  }, []);

  const deliveryFee = orderType === 'delivery' && selectedZone ? selectedZone.fee : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const handleIncrease = (itemName) => { const itemToAdd = cart.find(i => i.name === itemName); if (itemToAdd) setCart([...cart, { ...itemToAdd }]); };
  const handleDecrease = (itemName) => { const idx = cart.findIndex(i => i.name === itemName); if (idx !== -1) { const newCart = [...cart]; newCart.splice(idx, 1); setCart(newCart); } };
  const handleRemoveCompletely = (itemName) => { setCart(cart.filter(i => i.name !== itemName)); };

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return alert("السلة فارغة!");
    if (!customerName.trim()) return alert("من فضلك اكتب اسمك الكامل.");
    if (!customerPhone.trim() || customerPhone.length !== 11) return alert("رقم تليفون غير صحيح.");
    if (orderType === 'delivery' && !customerAddress.trim()) return alert("اكتب العنوان بالتفصيل.");

    const orderId = 'BB-' + Date.now().toString().slice(-4);
    let message = `🍔 أهلاً بحبح برجر، أوردر جديد!\n🆔 *رقم الأوردر:* #${orderId}\n👤 *الاسم:* ${customerName}\n📞 *التليفون:* ${customerPhone}\n📦 *نوع الاستلام:* ${orderType === 'delivery' ? 'دليفري 🛵' : 'من الفرع 🏪'}\n`;
    if (orderType === 'delivery') message += `📍 *العنوان:* ${customerAddress}\n🚚 *المنطقة:* ${selectedZone?.name} (${selectedZone?.fee} ج)\n`;
    message += `\n🛒 *الأصناف:*\n`;
    groupedCart.forEach((item) => { message += `▪️ ${item.quantity}× ${item.name} — (${item.price * item.quantity} ج)\n`; });
    message += `\n💰 *الإجمالي النهائي: ${grandTotal} جنيه*\n`;
    
    window.open(`https://wa.me/201042281510?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]); setPlacedOrderId(orderId);
  };

  if (placedOrderId) {
    return (
      <div className="pt-24 px-6 min-h-screen flex items-center justify-center font-cairo bg-[#050000]">
        <div className="bg-[#110808] border border-[#25D366]/30 p-10 rounded-2xl text-center shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-black text-[#25D366] mb-2">تم إرسال طلبك!</h2>
          <div className="text-white text-3xl font-anton tracking-widest mb-6">{placedOrderId}</div>
          <button onClick={() => setPlacedOrderId(null)} className="bg-[#e11d48] text-white px-8 py-3 rounded text-sm font-bold">العودة للسلة</button>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen font-cairo text-white bg-[#050000]">
      <h2 className="text-4xl font-anton text-[#e11d48] tracking-widest uppercase mb-8">{t.cart}</h2>
      {cart.length === 0 ? (
        <div className="border border-zinc-900 bg-[#110808] rounded-2xl p-16 text-center">
          <div className="text-zinc-700 text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-zinc-500 mb-4">{t.emptyCart}</h2>
          <Link to="/" className="text-[#e11d48] underline font-bold text-sm">{t.backToMenu}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#110808] rounded-2xl p-6 border border-zinc-900">
            <h3 className="text-lg font-bold text-white mb-6">محتويات السلة</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {groupedCart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-zinc-900 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-[#e11d48] font-anton tracking-wider">{item.price * item.quantity} EGP</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-black border border-zinc-800 rounded px-2 py-1 gap-3">
                      <button onClick={() => handleDecrease(item.name)} className="text-[#e11d48] font-bold">-</button>
                      <span className="font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.name)} className="text-[#e11d48] font-bold">+</button>
                    </div>
                    <button onClick={() => handleRemoveCompletely(item.name)} className="text-zinc-600 hover:text-red-500 font-bold text-sm">✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
              <span className="font-bold">{t.total}</span>
              <span className="text-3xl font-anton text-[#e11d48]">{grandTotal} EGP</span>
            </div>
          </div>

          <div className="bg-[#110808] rounded-2xl p-6 border border-zinc-900 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">بيانات التوصيل</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button type="button" onClick={() => setOrderType('delivery')} className={`py-3 rounded font-bold text-xs transition ${orderType === 'delivery' ? 'bg-[#e11d48] text-white' : 'bg-black text-zinc-500 border border-zinc-800'}`}>دليفري 🛵</button>
              <button type="button" onClick={() => setOrderType('pickup')} className={`py-3 rounded font-bold text-xs transition ${orderType === 'pickup' ? 'bg-[#e11d48] text-white' : 'bg-black text-zinc-500 border border-zinc-800'}`}>استلام من الفرع 🏪</button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="الاسم الكامل" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-black border border-zinc-900 rounded p-3 text-sm focus:border-[#e11d48] outline-none" />
              <input type="text" maxLength="11" placeholder="رقم الموبايل (11 رقم)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-black border border-zinc-900 rounded p-3 text-sm focus:border-[#e11d48] outline-none" />
              {orderType === 'delivery' && (
                <>
                  <select value={selectedZone ? selectedZone._id : ''} onChange={(e) => setSelectedZone(deliveryZones.find(z => z._id === e.target.value))} className="w-full bg-black border border-zinc-900 rounded p-3 text-sm focus:border-[#e11d48] outline-none">
                    {deliveryZones.map(zone => <option key={zone._id} value={zone._id}>{zone.name} ({zone.fee} ج)</option>)}
                  </select>
                  <textarea rows="2" placeholder="العنوان بالتفصيل..." value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full bg-black border border-zinc-900 rounded p-3 text-sm focus:border-[#e11d48] outline-none" />
                </>
              )}
            </div>
            <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-black font-black py-3.5 rounded hover:bg-[#20bd5a] transition mt-6">
              {t.whatsappOrder}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// ================= 3. Admin Dashboard (Full Functionality Retained) =================
const AdminDashboard = ({ menuItems, categories, siteSettings, lang, fetchItems, fetchCategories, fetchSettings, isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => { if (!isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

  const [heroImg, setHeroImg] = useState(siteSettings.heroImage);
  const [bannerImg, setBannerImg] = useState(siteSettings.promoBannerImage || '');
  const [titleAr, setTitleAr] = useState(siteSettings.heroTitleAr);
  const [titleEn, setTitleEn] = useState(siteSettings.heroTitleEn);
  const [logoImg, setLogoImg] = useState(siteSettings.logoImage || '');
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [zoneName, setZoneName] = useState('');
  const [zoneFee, setZoneFee] = useState('');

  const fetchZones = async () => { try { const res = await fetch(`${API_BASE}/api/zones`); setDeliveryZones(await res.json()); } catch (err) {} };
  useEffect(() => { fetchZones(); }, []);

  const handleAddZone = async (e) => {
    e.preventDefault(); if (!zoneName.trim() || !zoneFee) return;
    try {
      const res = await fetch(`${API_BASE}/api/zones`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: zoneName.trim(), fee: Number(zoneFee) }) });
      if (res.ok) { setZoneName(''); setZoneFee(''); fetchZones(); }
    } catch (err) {}
  };
  const handleDeleteZone = async (id) => { if (!window.confirm("حذف؟")) return; try { const res = await fetch(`${API_BASE}/api/zones/${id}`, { method: 'DELETE' }); if (res.ok) fetchZones(); } catch (err) {} };

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) { const reader = new FileReader(); reader.onload = (event) => setter(event.target.result); reader.readAsDataURL(file); }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ heroImage: heroImg, heroTitleAr: titleAr, heroTitleEn: titleEn, logoImage: logoImg, promoBannerImage: bannerImg }) });
      if (res.ok) { alert("تم الحفظ!"); fetchSettings(); }
    } catch (err) {}
  };

  const [catName, setCatName] = useState('');
  const handleSaveCategory = async (e) => {
    e.preventDefault(); if (!catName.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/categories`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: catName.trim() }) });
      if (res.ok) { setCatName(''); fetchCategories(); }
    } catch (err) {}
  };
  const handleDeleteCategory = async (id) => { if (!window.confirm("حذف؟")) return; try { const res = await fetch(`${API_BASE}/api/categories/${id}`, { method: 'DELETE' }); if (res.ok) fetchCategories(); } catch (err) {} };

  // Item states
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState(''); const [price, setPrice] = useState(''); const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(''); const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || ''); const [type, setType] = useState('normal');
  const [maxItems, setMaxItems] = useState(''); const [isOffer, setIsOffer] = useState(false);
  const [addonName, setAddonName] = useState(''); const [addonPrice, setAddonPrice] = useState(''); const [addonsList, setAddonsList] = useState([]);
  const [boxItemName, setBoxItemName] = useState(''); const [boxItemsList, setBoxItemsList] = useState([]);
  const [sizeName, setSizeName] = useState(''); const [sizePrice, setSizePrice] = useState(''); const [sizesList, setSizesList] = useState([]);

  const handleListAdd = (n, p, list, setList, setN, setP) => { if (!n.trim()) return; const item = p ? { name: n.trim(), price: Number(p) } : { name: n.trim() }; setList([...list, item]); setN(''); if(setP) setP(''); };
  const handleListRemove = (idx, list, setList) => { setList(list.filter((_, i) => i !== idx)); };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const itemData = { name, price: Number(price), discount: Number(discount) || 0, image: image || "https://via.placeholder.com/300", description, category: category || categories[0]?.name || 'عام', type, maxItems: type === 'box' ? Number(maxItems) : undefined, isOffer, addons: addonsList, boxItems: type === 'box' ? boxItemsList : [], sizes: sizesList };
    try {
      const url = editId ? `${API_BASE}/api/items/${editId}` : `${API_BASE}/api/items`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(itemData) });
      if (res.ok) {
        setEditId(null); setName(''); setPrice(''); setDiscount(''); setImage(''); setDescription(''); setMaxItems(''); setType('normal'); setIsOffer(false); setAddonsList([]); setBoxItemsList([]); setSizesList([]); fetchItems(); alert("تم الحفظ!");
      }
    } catch (err) {}
  };
  const handleDeleteItem = async (id) => { if (!window.confirm("حذف الصنف؟")) return; try { const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE' }); if (res.ok) fetchItems(); } catch (err) {} };
  const handleEditItemClick = (item) => { setEditId(item._id); setName(item.name); setPrice(item.price); setDiscount(item.discount || ''); setImage(item.image); setDescription(item.description || ''); setCategory(item.category); setType(item.type || 'normal'); setMaxItems(item.maxItems || ''); setIsOffer(item.isOffer || false); setAddonsList(item.addons || []); setBoxItemsList(item.boxItems || []); setSizesList(item.sizes || []); window.scrollTo(0,0); };

  return (
    <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen font-cairo text-white bg-[#050000]">
      <h2 className="text-3xl font-anton text-[#e11d48] tracking-widest mb-8">ADMIN PANEL</h2>

      {/* Categories & Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#110808] p-6 rounded-2xl border border-zinc-900">
          <h3 className="font-bold mb-4">🚚 التوصيل</h3>
          <form onSubmit={handleAddZone} className="flex gap-2 mb-4">
            <input type="text" placeholder="المنطقة" value={zoneName} onChange={e => setZoneName(e.target.value)} className="w-1/2 bg-black border border-zinc-800 rounded p-2 text-sm" />
            <input type="number" placeholder="السعر" value={zoneFee} onChange={e => setZoneFee(e.target.value)} className="w-1/4 bg-black border border-zinc-800 rounded p-2 text-sm" />
            <button type="submit" className="bg-[#e11d48] px-4 rounded text-sm font-bold w-1/4">إضافة</button>
          </form>
          <div className="space-y-2">{deliveryZones.map(z => <div key={z._id} className="flex justify-between text-sm bg-black p-2 border border-zinc-800 rounded"><span>{z.name} - {z.fee} ج</span><button onClick={() => handleDeleteZone(z._id)} className="text-red-500">✕</button></div>)}</div>
        </div>
        
        <div className="bg-[#110808] p-6 rounded-2xl border border-zinc-900">
          <h3 className="font-bold mb-4">📁 الأقسام</h3>
          <form onSubmit={handleSaveCategory} className="flex gap-2 mb-4">
            <input type="text" placeholder="اسم القسم" value={catName} onChange={e => setCatName(e.target.value)} className="flex-1 bg-black border border-zinc-800 rounded p-2 text-sm" />
            <button type="submit" className="bg-[#e11d48] px-4 rounded text-sm font-bold">إضافة</button>
          </form>
          <div className="flex flex-wrap gap-2">{categories.map(c => <div key={c._id} className="bg-black border border-zinc-800 px-3 py-1 rounded flex gap-2 text-sm"><span>{c.name}</span><button onClick={() => handleDeleteCategory(c._id)} className="text-red-500">✕</button></div>)}</div>
        </div>
      </div>

      <form onSubmit={handleSaveItem} className="bg-[#110808] p-6 rounded-2xl border border-zinc-900 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h3 className="md:col-span-2 font-bold text-white mb-2">🍔 {editId ? 'تعديل الصنف' : 'إضافة صنف'}</h3>
        <input type="text" placeholder="الاسم *" required value={name} onChange={(e) => setName(e.target.value)} className="bg-black border border-zinc-800 rounded p-3 text-sm" />
        <input type="number" placeholder="السعر *" required value={price} onChange={(e) => setPrice(e.target.value)} className="bg-black border border-zinc-800 rounded p-3 text-sm" />
        <input type="number" placeholder="الخصم %" value={discount} onChange={(e) => setDiscount(e.target.value)} className="bg-black border border-zinc-800 rounded p-3 text-sm" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-black border border-zinc-800 rounded p-3 text-sm">{categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}</select>
        <div className="md:col-span-2 flex gap-4"><input type="file" onChange={(e) => handleFileUpload(e, setImage)} className="flex-1 bg-black border border-zinc-800 rounded p-2 text-xs" /><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={isOffer} onChange={(e) => setIsOffer(e.target.checked)} className="accent-[#e11d48]" /> عرض رئيسي</label></div>
        <select value={type} onChange={(e) => setType(e.target.value)} className="bg-black border border-zinc-800 rounded p-3 text-sm"><option value="normal">عادي</option><option value="box">بوكس مخصص</option></select>
        {type === 'box' && <input type="number" placeholder="أقصى عدد *" value={maxItems} onChange={(e) => setMaxItems(e.target.value)} className="bg-black border border-zinc-800 rounded p-3 text-sm" />}
        
        {/* Lists (Box Items, Sizes, Addons) */}
        {type === 'box' && (
          <div className="md:col-span-2 bg-black p-4 rounded border border-zinc-800">
            <h4 className="text-xs text-zinc-400 mb-2">مكونات البوكس</h4>
            <div className="flex gap-2 mb-2"><input type="text" value={boxItemName} onChange={e=>setBoxItemName(e.target.value)} className="flex-1 bg-[#110808] border border-zinc-800 rounded p-2 text-sm"/><button type="button" onClick={()=>handleListAdd(boxItemName, null, boxItemsList, setBoxItemsList, setBoxItemName, null)} className="bg-zinc-800 px-3 rounded">+</button></div>
            {boxItemsList.map((b, i) => <div key={i} className="flex justify-between text-xs bg-[#110808] p-2 rounded mb-1"><span>{b.name}</span><button type="button" onClick={()=>handleListRemove(i, boxItemsList, setBoxItemsList)} className="text-red-500">✕</button></div>)}
          </div>
        )}
        <div className="bg-black p-4 rounded border border-zinc-800">
          <h4 className="text-xs text-zinc-400 mb-2">أحجام مختلفة</h4>
          <div className="flex gap-2 mb-2"><input type="text" placeholder="الحجم" value={sizeName} onChange={e=>setSizeName(e.target.value)} className="w-1/2 bg-[#110808] border border-zinc-800 rounded p-2 text-xs"/><input type="number" placeholder="السعر" value={sizePrice} onChange={e=>setSizePrice(e.target.value)} className="w-1/4 bg-[#110808] border border-zinc-800 rounded p-2 text-xs"/><button type="button" onClick={()=>handleListAdd(sizeName, sizePrice, sizesList, setSizesList, setSizeName, setSizePrice)} className="bg-zinc-800 px-2 rounded">+</button></div>
          {sizesList.map((s, i) => <div key={i} className="flex justify-between text-xs bg-[#110808] p-2 rounded mb-1"><span>{s.name} ({s.price})</span><button type="button" onClick={()=>handleListRemove(i, sizesList, setSizesList)} className="text-red-500">✕</button></div>)}
        </div>
        <div className="bg-black p-4 rounded border border-zinc-800">
          <h4 className="text-xs text-zinc-400 mb-2">إضافات</h4>
          <div className="flex gap-2 mb-2"><input type="text" placeholder="الإضافة" value={addonName} onChange={e=>setAddonName(e.target.value)} className="w-1/2 bg-[#110808] border border-zinc-800 rounded p-2 text-xs"/><input type="number" placeholder="السعر" value={addonPrice} onChange={e=>setAddonPrice(e.target.value)} className="w-1/4 bg-[#110808] border border-zinc-800 rounded p-2 text-xs"/><button type="button" onClick={()=>handleListAdd(addonName, addonPrice, addonsList, setAddonsList, setAddonName, setAddonPrice)} className="bg-zinc-800 px-2 rounded">+</button></div>
          {addonsList.map((a, i) => <div key={i} className="flex justify-between text-xs bg-[#110808] p-2 rounded mb-1"><span>{a.name} ({a.price})</span><button type="button" onClick={()=>handleListRemove(i, addonsList, setAddonsList)} className="text-red-500">✕</button></div>)}
        </div>

        <textarea placeholder="وصف الصنف..." rows="2" value={description} onChange={(e) => setDescription(e.target.value)} className="md:col-span-2 bg-black border border-zinc-800 rounded p-3 text-sm" />
        <div className="md:col-span-2 flex gap-3 mt-2"><button type="submit" className="flex-1 bg-[#e11d48] py-3 rounded font-bold">{editId ? 'تحديث' : 'إضافة'}</button>{editId && <button type="button" onClick={() => {setEditId(null); setName(''); setPrice(''); setDiscount(''); setType('normal'); setSizesList([]); setAddonsList([]);}} className="px-6 bg-zinc-800 rounded font-bold text-sm">إلغاء</button>}</div>
      </form>

      {/* Items List */}
      <div className="space-y-6">
        {categories.map(cat => {
          const catItems = menuItems.filter(item => item.category === cat.name);
          if (catItems.length === 0) return null;
          return (
            <div key={cat._id} className="bg-[#110808] border border-zinc-900 rounded-2xl p-6">
              <h4 className="font-anton text-xl text-[#e11d48] tracking-widest mb-4">{cat.name}</h4>
              <div className="space-y-3">
                {catItems.map((item) => (
                  <div key={item._id} className="bg-black border border-zinc-800 p-3 rounded flex justify-between items-center">
                    <div className="flex gap-4 items-center"><img src={item.image} className="w-12 h-12 rounded object-cover bg-zinc-900" /><div><p className="font-bold text-sm">{item.name}</p><p className="text-[#e11d48] font-anton">{item.price} EGP</p></div></div>
                    <div className="flex gap-2"><button onClick={() => handleEditItemClick(item)} className="bg-zinc-900 px-3 py-1 rounded text-xs font-bold">تعديل</button><button onClick={() => handleDeleteItem(item._id)} className="bg-zinc-900 px-3 py-1 rounded text-xs text-red-500 font-bold">✕</button></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ================= 4. Main App (Routing & Modals) =================
function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteSettings, setSiteSettings] = useState({ heroImage: '', heroTitleAr: '', heroTitleEn: '', logoImage: '' });
  const [lang, setLang] = useState('ar');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const [selectedItemDetail, setSelectedItemDetail] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [activeBox, setActiveBox] = useState(null);
  const [boxSelections, setBoxSelections] = useState({});

  const fetchItems = async () => { try { const res = await fetch(`${API_BASE}/api/items`); const data = await res.json(); setMenuItems(data.map(i => ({ ...i, discount: Number(i.discount) || 0 }))); } catch (err) {} };
  const fetchCategories = async () => { try { const res = await fetch(`${API_BASE}/api/categories`); setCategories(await res.json()); } catch (err) {} };
  const fetchSettings = async () => { try { const res = await fetch(`${API_BASE}/api/settings`); setSiteSettings(await res.json()); } catch (err) {} };

  useEffect(() => { fetchItems(); fetchCategories(); fetchSettings(); }, []);

  const handleSecretLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        const pass = window.prompt("🔒 كلمة مرور الإدارة:");
        if (pass === "15926") { setIsAuthenticated(true); navigate('/secret-admin-dashboard'); } 
        else if (pass !== null) { alert("كلمة المرور خاطئة!"); }
        return 0;
      }
      return newCount;
    });
  };

  const handleOpenItemDetailsModal = (item) => {
    if (item.sizes?.length > 0 || item.addons?.length > 0) {
      setSelectedItemDetail(item); setSelectedSize(item.sizes?.[0] || null); setSelectedAddon(null);
    } else {
      const finalPrice = getDiscountedPrice(item.price, item.discount);
      setCart([...cart, { ...item, price: finalPrice }]);
    }
  };

  const basePrice = selectedSize ? selectedSize.price : (selectedItemDetail?.price || 0);
  const currentItemTotalPrice = getDiscountedPrice(basePrice, selectedItemDetail?.discount) + (selectedAddon?.price || 0);

  const handleAddCustomizedItemToCart = () => {
    if (!selectedItemDetail) return;
    let itemName = selectedItemDetail.name;
    if (selectedSize) itemName += ` (${selectedSize.name})`;
    if (selectedAddon) itemName += ` - ${selectedAddon.name}`;
    setCart([...cart, { ...selectedItemDetail, name: itemName, price: currentItemTotalPrice }]);
    setSelectedItemDetail(null); setSelectedSize(null); setSelectedAddon(null);
  };

  const handleOpenBox = (boxItem) => {
    setActiveBox(boxItem); const init = {}; boxItem.boxItems?.forEach(b => { init[b.name] = 0; });
    setBoxSelections(init); setIsBoxModalOpen(true);
  };
  const totalSelected = Object.values(boxSelections).reduce((a, b) => a + b, 0);
  const handleAddBoxToCart = () => {
    if (totalSelected === activeBox.maxItems) {
      const details = Object.entries(boxSelections).filter(([_, c]) => c > 0).map(([n, c]) => `${n}: ${c}`).join(', ');
      setCart([...cart, { ...activeBox, name: `${activeBox.name} (${details})`, price: getDiscountedPrice(activeBox.price, activeBox.discount) }]);
      setIsBoxModalOpen(false);
    }
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-[#050000] min-h-screen">
      <Navbar lang={lang} setLang={setLang} cartLength={cart.length} siteSettings={siteSettings} onSecretClick={handleSecretLogoClick} />
      
      <Routes>
        <Route path="/" element={<HomePage lang={lang} siteSettings={siteSettings} menuItems={menuItems} categories={categories} handleOpenItemDetails={handleOpenItemDetailsModal} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} lang={lang} />} />
        <Route path="/secret-admin-dashboard" element={<AdminDashboard menuItems={menuItems} categories={categories} siteSettings={siteSettings} lang={lang} fetchItems={fetchItems} fetchCategories={fetchCategories} fetchSettings={fetchSettings} isAuthenticated={isAuthenticated} />} />
      </Routes>

      {/* Popups (Item Details & Boxes) */}
      {selectedItemDetail && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 font-cairo">
          <div className="bg-[#110808] border border-zinc-900 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setSelectedItemDetail(null)} className="absolute top-4 left-4 text-zinc-500 hover:text-white font-bold">✕</button>
            <h3 className="text-2xl font-anton text-[#e11d48] tracking-widest mb-6">{selectedItemDetail.name}</h3>
            
            {selectedItemDetail.sizes?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-2">الحجم:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedItemDetail.sizes.map((sz, idx) => (
                    <div key={idx} onClick={() => setSelectedSize(sz)} className={`p-3 rounded border cursor-pointer text-center transition ${selectedSize === sz ? 'bg-[#e11d48]/20 border-[#e11d48] text-[#e11d48]' : 'bg-black border-zinc-800 text-zinc-400'}`}>
                      <span className="block font-bold text-sm">{sz.name}</span><span className="block font-anton tracking-wider mt-1">{getDiscountedPrice(sz.price, selectedItemDetail.discount)} EGP</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedItemDetail.addons?.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-2">إضافات:</h4>
                <div className="flex flex-col gap-2">
                  <label className={`p-3 rounded border cursor-pointer flex items-center justify-between transition ${!selectedAddon ? 'bg-[#e11d48]/20 border-[#e11d48] text-[#e11d48]' : 'bg-black border-zinc-800 text-zinc-400'}`}>
                    <div className="flex items-center gap-3"><input type="radio" checked={!selectedAddon} onChange={() => setSelectedAddon(null)} className="hidden" /><span className="font-bold text-sm">بدون إضافات</span></div><span className="font-anton tracking-widest">+0</span>
                  </label>
                  {selectedItemDetail.addons.map((addon, idx) => (
                    <label key={idx} className={`p-3 rounded border cursor-pointer flex items-center justify-between transition ${selectedAddon === addon ? 'bg-[#e11d48]/20 border-[#e11d48] text-[#e11d48]' : 'bg-black border-zinc-800 text-zinc-400'}`}>
                      <div className="flex items-center gap-3"><input type="radio" checked={selectedAddon === addon} onChange={() => setSelectedAddon(addon)} className="hidden" /><span className="font-bold text-sm">{addon.name}</span></div><span className="font-anton tracking-widest">+{addon.price} EGP</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button onClick={handleAddCustomizedItemToCart} className="w-full bg-[#e11d48] text-white py-3.5 rounded font-bold">إضافة للسلة • {currentItemTotalPrice} EGP</button>
          </div>
        </div>
      )}

      {isBoxModalOpen && activeBox && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 font-cairo">
          <div className="bg-[#110808] border border-zinc-900 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsBoxModalOpen(false)} className="absolute top-4 left-4 text-zinc-500 hover:text-white font-bold">✕</button>
            <h3 className="text-2xl font-anton text-[#e11d48] tracking-widest mb-2">{activeBox.name}</h3>
            <p className="text-sm text-zinc-400 mb-6 border-b border-zinc-900 pb-4">اختر {activeBox.maxItems} أصناف (متبقي: <span className="text-[#e11d48] font-bold">{activeBox.maxItems - totalSelected}</span>)</p>
            <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
              {activeBox.boxItems?.map((b, i) => (
                <div key={i} className="flex justify-between items-center bg-black border border-zinc-800 p-3 rounded text-sm">
                  <span className="font-bold text-white">{b.name}</span>
                  <div className="flex gap-4 items-center">
                    <button onClick={() => setBoxSelections({ ...boxSelections, [b.name]: Math.max(0, boxSelections[b.name] - 1) })} className="text-[#e11d48] font-bold text-xl w-6 hover:text-white">-</button>
                    <span className="font-bold text-lg w-4 text-center">{boxSelections[b.name] || 0}</span>
                    <button onClick={() => { if (totalSelected < activeBox.maxItems) setBoxSelections({ ...boxSelections, [b.name]: (boxSelections[b.name] || 0) + 1 }); }} className="text-[#e11d48] font-bold text-xl w-6 hover:text-white">+</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleAddBoxToCart} disabled={totalSelected !== activeBox.maxItems} className={`w-full py-4 rounded font-bold transition ${totalSelected === activeBox.maxItems ? 'bg-[#e11d48] text-white' : 'bg-zinc-900 text-zinc-600'}`}>تأكيد الإضافة</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;