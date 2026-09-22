import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const API_BASE = 'https://bahbah-backend-production.up.railway.app';
const translations = {
  ar: {
    home: "Home",
    menu: "Menu",
    offers: "Offers",
    about: "About",
    all: "الكل",
    orderNow: "اطلب أكلتك دلوقتي",
    ourMenu: "OUR\nMENU",
    menuSubtitle: "قائمة العظمة",
    menuDesc: "من البرجر الكلاسيك لحد التركيبات الخاصة .. كل لقمة في بحبح ليها حكاية.",
    viewAll: "عرض الكل",
    total: "إجمالي الطلب:",
    whatsappOrder: "إرسال الطلب عبر الواتساب",
    cart: "السلة",
  },
  en: {
    home: "Home",
    menu: "Menu",
    offers: "Offers",
    about: "About",
    all: "All",
    orderNow: "Order Now",
    ourMenu: "OUR\nMENU",
    menuSubtitle: "The Great Menu",
    menuDesc: "From classic burgers to special mixes.. every bite at Bahbah has a story.",
    viewAll: "View All",
    total: "Total:",
    whatsappOrder: "Order via WhatsApp",
    cart: "Cart",
  }
};

const getDiscountedPrice = (price, discountPercent) => {
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
};

// CSS مخصص للتأثيرات اللي في الصورة (الخطوط والشريط المتحرك)
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Cairo:wght@400;700;900&display=swap');
  
  .font-anton { font-family: 'Anton', sans-serif; }
  .font-cairo { font-family: 'Cairo', sans-serif; }
  
  .grunge-text-white {
    color: white;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.8), -1px -1px 0px rgba(255,255,255,0.2);
  }
  .grunge-text-red {
    color: #e11d48;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.9), 0 0 20px rgba(225, 29, 72, 0.4);
  }
  
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    display: inline-block;
    white-space: nowrap;
    animation: marquee 20s linear infinite;
  }
  
  .card-gradient {
    background: linear-gradient(180deg, rgba(30,10,10,1) 0%, rgba(10,5,5,1) 100%);
  }
  
  .fire-glow {
    box-shadow: inset 0px 40px 50px -30px rgba(225, 29, 72, 0.15);
  }
`;

// ================= 1. الصفحة الرئيسية (نفس تصميم الصورة بالمللي) =================
const HomePage = ({ lang, siteSettings, menuItems, categories, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categoriesToShow = selectedCategory === 'الكل' || selectedCategory === 'All'
    ? categories 
    : categories.filter(cat => cat.name === selectedCategory);

  return (
    <div className="bg-[#050000] min-h-screen text-white font-cairo overflow-hidden">
      <style>{customStyles}</style>
      
      {/* 1. Hero Section */}
      <header className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-between overflow-hidden px-6 md:px-16 pt-24 pb-12">
        {/* تأثيرات الخلفية والنار */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/30 via-[#050000] to-[#050000] z-0 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/10 to-transparent blur-3xl z-0 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          
          {/* النص على الشمال */}
          <div className="flex flex-col z-20 md:w-1/2 transform -rotate-3 mt-10 md:mt-0">
            <span className="text-[#e11d48] font-anton tracking-widest text-sm md:text-lg mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2L15 9H22L16.5 14L18 21L12 17L6 21L7.5 14L2 9H9L12 2Z"/></svg>
              BIGGER · JUICIER · HOTTER
            </span>
            <h1 className="font-anton text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.8] grunge-text-white uppercase tracking-tighter">
              THE FIRE
            </h1>
            <h1 className="font-anton text-[5rem] md:text-[8rem] lg:text-[10rem] leading-[0.8] grunge-text-red uppercase tracking-tighter">
              IS COMING
            </h1>
            <p className="text-white text-lg md:text-2xl mt-6 font-bold tracking-wide">
              مش مجرد برجر .. ده بحبح!
            </p>
            <button className="mt-8 bg-[#e11d48] hover:bg-red-700 text-white px-8 py-3 rounded-full w-fit font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)] transition flex items-center gap-3 text-sm">
              <span className="w-4 h-px bg-white/50 block"></span>
              {t.orderNow}
            </button>
          </div>

          {/* صورة البرجر العملاقة على اليمين */}
          <div className="relative z-10 md:w-1/2 flex justify-end mt-12 md:mt-0">
            <div className="relative w-[120%] md:w-[140%] max-w-[800px] right-[-10%] md:right-[-20%]">
              {/* استبدل الرابط ده بصورة البرجر المقصوصة (PNG) عالية الجودة بتاعتك */}
              <img 
                src={siteSettings.heroImage || "https://png.pngtree.com/png-clipart/20230413/original/pngtree-burger-food-png-image_9049449.png"} 
                alt="Bahbah Burger Giant" 
                className="w-full h-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)] z-20 relative"
              />
              {/* نصوص شفافة في الخلفية */}
              <div className="absolute top-10 right-10 opacity-10 font-anton text-5xl md:text-7xl text-red-500 leading-none text-right -rotate-6 z-0 pointer-events-none">
                Real Chicken<br/>Real Taste
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
          <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          <span className="text-xs font-bold tracking-widest uppercase">Scroll Down</span>
        </div>
      </header>

      {/* 2. Marquee Divider */}
      <div className="w-full bg-[#0a0505] border-y border-red-900/40 py-3 overflow-hidden flex whitespace-nowrap relative z-20">
        <div className="animate-marquee flex items-center gap-8 font-anton text-red-900/60 text-xl tracking-widest">
          {Array(10).fill().map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2 text-white/80"><b className="text-2xl">B</b> Bahbah Burger</span>
              <span>·</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2L15 9H22L16.5 14L18 21L12 17L6 21L7.5 14L2 9H9L12 2Z"/></svg>
              <span>BIGGER · JUICIER · HOTTER</span>
              <span>·</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. Menu Section */}
      <section className="px-6 md:px-12 py-20 max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* العمود الأول (العنوان والوصف) */}
          <div className="lg:col-span-3 flex flex-col pt-10">
            <h2 className="font-anton text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 transform -rotate-3 leading-[0.8] mb-4">
              {t.ourMenu.split('\n')[0]}<br/><span className="text-white">{t.ourMenu.split('\n')[1]}</span>
            </h2>
            <h3 className="text-xl font-black text-white mt-4">{t.menuSubtitle}</h3>
            <p className="text-zinc-500 text-sm mt-3 leading-relaxed max-w-[250px]">
              {t.menuDesc}
            </p>
            <button className="mt-8 flex items-center gap-3 border border-zinc-800 hover:border-red-600 text-white px-5 py-2.5 rounded-lg w-fit text-sm font-bold transition">
              {t.viewAll} <span className="text-red-600">+</span>
            </button>
          </div>

          {/* العمود التاني والتالت (الأقسام والكروت) */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Tabs الأقسام */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none mb-10 pb-2">
              <button
                onClick={() => setSelectedCategory('الكل')}
                className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === 'الكل' ? 'bg-[#e11d48] text-white shadow-lg' : 'bg-transparent text-zinc-500 hover:text-white'
                }`}
              >
                {t.all}
              </button>
              {categories.map(cat => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.name ? 'bg-[#e11d48] text-white shadow-lg' : 'bg-transparent text-zinc-500 hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* شبكة الكروت */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categoriesToShow.map(cat => {
                const catItems = menuItems.filter(item => item.category === cat.name);
                return catItems.map(item => {
                  const finalPrice = getDiscountedPrice(item.price, item.discount);
                  
                  return (
                    <div key={item._id} className="card-gradient border border-zinc-900/80 rounded-2xl overflow-hidden fire-glow flex flex-col group relative">
                      {item.isOffer && (
                        <div className="absolute top-4 left-4 z-20 bg-[#e11d48] text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                          الأكثر مبيعاً
                        </div>
                      )}
                      
                      <div className="w-full h-48 relative overflow-hidden flex items-center justify-center p-4 cursor-pointer" onClick={() => handleOpenItemDetails(item)}>
                        {/* الخلفية ورا البرجر جوه الكارت عشان تدي عمق */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(225,29,72,0.15)_0%,_transparent_70%)]"></div>
                        <img src={item.image || "https://via.placeholder.com/300x250"} alt={item.name} className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition duration-500" />
                      </div>
                      
                      <div className="p-5 flex flex-col flex-1 border-t border-zinc-900/50">
                        <h4 className="font-anton text-xl text-white tracking-wide">{item.name}</h4>
                        <p className="text-[11px] text-zinc-500 mt-2 line-clamp-2 leading-relaxed font-bold">{item.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4">
                          <span className="text-[#e11d48] font-anton text-2xl tracking-widest">EGP {finalPrice}</span>
                          <button onClick={() => handleOpenItemDetails(item)} className="w-8 h-8 bg-zinc-900 hover:bg-[#e11d48] rounded border border-zinc-700 flex items-center justify-center text-white transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>

          {/* العمود الرابع (بانر جانبي ترويجي) */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="w-full h-full min-h-[500px] rounded-2xl relative overflow-hidden border border-red-900/30 group">
              <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Promo" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-700 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-[#e11d48]/20 to-transparent"></div>
              <div className="absolute bottom-10 left-0 w-full text-center z-20">
                <h3 className="font-anton text-6xl text-[#e11d48] transform -rotate-6 opacity-80 leading-none drop-shadow-2xl">BAHBAH<br/>BURGER</h3>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};


// ================= Navbar Component (بنفس ستايل الصورة) =================
const Navbar = ({ lang, setLang, cartLength, siteSettings }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="bg-white text-black font-anton text-2xl w-10 h-10 flex items-center justify-center rounded-sm">B</div>
          <div className="flex flex-col leading-none font-anton text-white">
            <span className="text-xl">Bahbah</span>
            <span className="text-xl text-[#e11d48]">Burger</span>
          </div>
        </Link>

        {/* Links (Centered - Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-10 font-bold text-xs uppercase tracking-widest text-zinc-400">
          <Link to="/" className="text-white hover:text-[#e11d48] transition">Home</Link>
          <Link to="/menu" className="hover:text-[#e11d48] transition">Menu</Link>
          <Link to="/#offers" className="hover:text-[#e11d48] transition">Offers</Link>
          <Link to="/#about" className="hover:text-[#e11d48] transition">About</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="text-xs font-bold text-zinc-400 hover:text-white transition">
            {lang === 'ar' ? 'EN | عربي' : 'عربي | EN'}
          </button>
          
          <Link to="/cart" className="relative text-white hover:text-[#e11d48] transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            {cartLength > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartLength}
              </span>
            )}
          </Link>

          <button className="text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};


// ================= التطبيق الرئيسي =================
function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteSettings, setSiteSettings] = useState({ heroImage: '', heroTitleAr: '', heroTitleEn: '', logoImage: '' });
  const [lang, setLang] = useState('ar');

  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  // Fetch logic omitted for brevity (same as your existing code)
  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/items`);
      const data = await res.json();
      setMenuItems(data.map(i => ({ ...i, discount: Number(i.discount) || 0 })));
    } catch (err) {}
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/categories`);
      setCategories(await res.json());
    } catch (err) {}
  };
  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings`);
      setSiteSettings(await res.json());
    } catch (err) {}
  };

  useEffect(() => { fetchItems(); fetchCategories(); fetchSettings(); }, []);

  const handleOpenItemDetailsModal = (item) => {
    // For simplicity in this demo, directly add to cart or open your existing modal logic
    const finalPrice = getDiscountedPrice(item.price, item.discount);
    setCart([...cart, { ...item, price: finalPrice }]);
    // If you have size/addons logic, set it here like in your previous code.
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-[#050000] min-h-screen">
      <Navbar lang={lang} setLang={setLang} cartLength={cart.length} siteSettings={siteSettings} />
      
      <Routes>
        <Route path="/" element={<HomePage lang={lang} siteSettings={siteSettings} menuItems={menuItems} categories={categories} handleOpenItemDetails={handleOpenItemDetailsModal} cart={cart} setCart={setCart} />} />
        {/* حط باقي الروابط بتاعتك هنا زي الكارت والادمن */}
      </Routes>
    </div>
  );
}

export default App;