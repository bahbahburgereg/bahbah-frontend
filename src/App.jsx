import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const API_BASE = 'https://bahbah-backend-production.up.railway.app';
const translations = {
  ar: {
    home: "الرئيسية",
    menu: "المنيو",
    cart: "السلة",
    admin: "الإدارة",
    all: "الكل",
    orderNow: "اطلب أكلتك دلوقتي 🍔",
    ourMenu: "قائمة العظمة (المنيو)",
    bestOffers: "العروض النارية 🔥",
    seeMore: "عرض الكل ➔",
    hotlineText: "الخط الساخن",
    rights: "جميع الحقوق محفوظة © 2026 بحبح برجر - Bahbah Burger",
    addToCart: "أضف للسلة 🛒",
    customizeBox: "صمم بوكس الأحلام ⚙️",
    details: "اختيار و تخصيص",
    emptyCart: "السلة فاضية خالص!",
    backToMenu: "رجعني للمنيو",
    total: "إجمالي الطلب:",
    whatsappOrder: "📲 إرسال الطلب عبر الواتساب",
    delete: "حذف",
    edit: "تعديل",
    save: "حفظ",
    cancel: "إلغاء",
    addItem: "➕ إضافة صنف جديد للمنيو",
    addCat: "➕ إضافة قسم جديد",
    catManage: "📁 تنظيم وترتيب أقسام المنيو",
    itemManage: "🍔 إدارة وتعديل أصناف البرجر",
    siteSettings: "🖼️ تخصيص اللوجو والواجهة",
  },
  en: {
    home: "Home",
    menu: "Menu",
    cart: "Cart",
    admin: "Admin",
    all: "All",
    orderNow: "Order Now 🍔",
    ourMenu: "Our Menu",
    bestOffers: "Hot Offers 🔥",
    seeMore: "See All ➔",
    hotlineText: "HOTLINE",
    addToCart: "Add to Cart 🛒",
    customizeBox: "Customize Box ⚙️",
    details: "Customize & Order",
    emptyCart: "Your cart is empty!",
    backToMenu: "Back to menu",
    total: "Total:",
    whatsappOrder: "📲 Send Order via WhatsApp",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    addItem: "➕ Add New Item",
    addCat: "➕ Add Category",
    catManage: "📁 Manage Menu Categories",
    itemManage: "🍔 Manage Menu Items",
    siteSettings: "🖼️ Control Website Settings",
  }
};

const getDiscountedPrice = (price, discountPercent) => {
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
};

// ================= 1. صفحة الرئيسية (ستايل سينمائي مختلف) =================
const HomePage = ({ lang, siteSettings, menuItems, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const title = lang === 'ar' ? siteSettings.heroTitleAr : siteSettings.heroTitleEn;
  const offerItems = menuItems.filter(item => item.isOffer);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (offerItems.length <= 3) return;
    setCurrentIndex((prev) => (prev + 1) % (offerItems.length - 2));
  };

  const prevSlide = () => {
    if (offerItems.length <= 3) return;
    setCurrentIndex((prev) => (prev === 0 ? offerItems.length - 3 : prev - 1));
  };

  useEffect(() => {
    if (offerItems.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, offerItems.length - 2));
    }, 3500);
    return () => clearInterval(interval);
  }, [offerItems.length]);

  return (
    <div className="bg-[#F7F3EF] min-h-screen text-[#241F1C] selection:bg-[#7A1F2B] selection:text-white">
      {/* Hero Section بتصميم مختلف كلياً */}
      <header className="relative w-full min-h-[600px] md:min-h-[700px] bg-[#F7F3EF] flex flex-col items-center justify-center overflow-hidden border-b border-[#7A1F2B]/20 py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition duration-1000 blur-[2px]"
          style={{ backgroundImage: `url(${siteSettings.heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050304] via-[#050304]/80 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#7A1F2B]/10 border border-[#7A1F2B]/30 text-[#9A6A2F] px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-widest mb-6 backdrop-blur-xl shadow-lg">
            <span>🔥</span> الليلة دي أحلى برجر في مصر <span>🔥</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#241F1C] via-[#7A1F2B] to-[#9A6A2F] drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] mb-8 leading-tight">
            {title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/menu" className="bg-gradient-to-r from-[#7A1F2B] to-[#9A6A2F] hover:from-[#E03D00] hover:to-[#D25A2B] text-[#241F1C] px-10 py-4 text-lg font-black rounded-full hover:scale-105 transition shadow-[0_0_35px_rgba(255,69,0,0.6)]">
              {t.orderNow}
            </Link>
          </div>

          {siteSettings.promoBannerImage && (
            <div className="w-full max-w-2xl mt-10 px-4">
              <img 
                src={siteSettings.promoBannerImage} 
                alt="Banner Offer" 
                className="w-full h-auto max-h-[340px] object-cover rounded-lg border border-[#7A1F2B]/40 shadow-[0_0_40px_rgba(255,69,0,0.3)] hover:scale-[1.02] transition duration-500" 
              />
            </div>
          )}
        </div>
      </header>

      {/* قسم العروض النارية */}
      <section className="px-6 py-16 max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center mb-12 border-b border-[#1A0B0E] pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#9A6A2F] tracking-wide">{t.bestOffers}</h2>
            <p className="text-[#7A716B] text-sm mt-1">عروض دمار مش هتتكرر تاني!</p>
          </div>
          <Link to="/menu" className="text-[#7A1F2B] font-black hover:text-[#241F1C] text-base flex items-center gap-2 bg-white border border-[#220B11] px-5 py-2.5 rounded-lg transition">
            {t.seeMore}
          </Link>
        </div>

        {offerItems.length > 0 ? (
          <div className="relative overflow-hidden px-2">
            {offerItems.length > 3 && (
              <>
                <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#7A1F2B]/40 text-[#7A1F2B] w-12 h-12 rounded-full font-black text-xl flex items-center justify-center shadow-lg hover:bg-[#7A1F2B] hover:text-[#241F1C] transition">❮</button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#7A1F2B]/40 text-[#7A1F2B] w-12 h-12 rounded-full font-black text-xl flex items-center justify-center shadow-lg hover:bg-[#7A1F2B] hover:text-[#241F1C] transition">❯</button>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 transition-all duration-300">
              {offerItems.slice(currentIndex, currentIndex + 3).map((item) => {
                const finalPrice = getDiscountedPrice(item.price, item.discount);
                const cartItem = cart.find(i => i.name === item.name);
                const quantity = cartItem ? cart.filter(i => i.name === item.name).length : 0;

                return (
                  <div 
                    key={item._id} 
                    className="bg-[#0D0507] border border-[#E8DDD5] rounded-lg overflow-hidden shadow-lg hover:border-[#7A1F2B] transition-all duration-500 group flex flex-col relative pt-10 hover:-translate-y-2"
                  >
                    {item.discount > 0 && (
                      <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-r from-[#7A1F2B] via-[#FF8C00] to-[#FF4500] text-[#241F1C] text-center py-2 font-black text-sm md:text-base shadow-xl tracking-wider">
                        ⚡ خصم دمار {item.discount}% ⚡
                      </div>
                    )}
                    <div onClick={() => handleOpenItemDetails(item)} className="w-full h-[300px] bg-[#F7F3EF] overflow-hidden relative cursor-pointer">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <div className="p-6 flex items-center justify-between bg-white border-t border-[#E8DDD5]">
                      <div>
                        <h4 className="font-black text-xl text-[#241F1C] group-hover:text-[#9A6A2F] transition">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          {item.discount > 0 ? (
                            <>
                              <span className="text-[#968C85] line-through text-sm font-bold">{item.price} ج</span>
                              <span className="text-[#9A6A2F] font-black text-2xl">{finalPrice} ج</span>
                            </>
                          ) : (
                            <span className="text-[#9A6A2F] font-black text-2xl">{item.price} ج</span>
                          )}
                        </div>
                      </div>
                      
                      {quantity === 0 ? (
                        <button onClick={() => handleOpenItemDetails(item)} className="bg-[#7A1F2B] text-white px-6 py-3 rounded-lg font-black text-sm shadow-xl hover:bg-[#E03D00] transition active:scale-95">
                          اطلب 🛒
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#F7F3EF] border border-[#7A1F2B] rounded-lg px-4 py-2 gap-3 shadow-inner">
                          <button onClick={() => {
                            const idx = cart.findIndex(i => i.name === item.name);
                            if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); }
                          }} className="text-[#7A1F2B] font-black text-lg px-1 hover:text-[#241F1C]">-</button>
                          <span className="font-black text-[#241F1C]">{quantity}</span>
                          <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="text-[#7A1F2B] font-black text-lg px-1 hover:text-[#241F1C]">+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center text-[#968C85] py-16 bg-white rounded-lg border border-[#E8DDD5]">لا توجد عروض رئيسية حالياً.</div>
      )}
      </section>
    </div>
  );
};

// ================= 2. صفحة المنيو (بتصميم جديد كلياً) =================
const MenuPage = ({ menuItems, categories, lang, handleOpenBox, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categoriesToShow = selectedCategory === 'الكل' || selectedCategory === 'All'
    ? categories 
    : categories.filter(cat => cat.name === selectedCategory);

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto min-h-screen relative bg-[#F7F3EF] text-[#241F1C]">
      <h2 className="text-3xl md:text-4xl font-black text-[#9A6A2F] mb-8 border-b border-[#1A0B0E] pb-6">{t.ourMenu}</h2>
      
      {/* فلتر الأقسام بتصميم بيلز سينمائي */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-14 scrollbar-none sticky top-24 bg-[#F7F3EF]/90 py-4 z-30 backdrop-blur-xl">
        <button
          onClick={() => setSelectedCategory(lang === 'ar' ? 'الكل' : 'All')}
          className={`px-8 py-3.5 rounded-lg font-black whitespace-nowrap transition-all duration-300 border ${
            selectedCategory === 'الكل' || selectedCategory === 'All'
              ? 'bg-[#7A1F2B] text-white border-[#7A1F2B] shadow-[0_0_25px_rgba(255,69,0,0.6)] scale-105' 
              : 'bg-white text-[#7A716B] border-[#E8DDD5] hover:border-[#7A1F2B] hover:text-[#241F1C]'
          }`}
        >
          {t.all}
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-8 py-3.5 rounded-lg font-black whitespace-nowrap transition-all duration-300 border ${
              selectedCategory === cat.name 
                ? 'bg-[#7A1F2B] text-white border-[#7A1F2B] shadow-[0_0_25px_rgba(255,69,0,0.6)] scale-105' 
                : 'bg-white text-[#7A716B] border-[#E8DDD5] hover:border-[#7A1F2B] hover:text-[#241F1C]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {categoriesToShow.length === 0 ? (
        <div className="text-[#7A716B] text-center py-24 text-xl">لا توجد أقسام مضافة بعد... ⏳</div>
      ) : (
        <div className="space-y-20">
          {categoriesToShow.map(cat => {
            const catItems = menuItems.filter(item => item.category === cat.name).sort((a, b) => (a.order || 0) - (b.order || 0));
            
            if (catItems.length === 0 && selectedCategory !== 'الكل' && selectedCategory !== 'All') {
              return (
                <div key={cat._id} className="border-b border-[#1A0B0E] pb-12">
                  <h3 className="text-2xl font-black text-[#9A6A2F] mb-6 border-r-4 border-[#7A1F2B] pr-4">{cat.name}</h3>
                  <p className="text-[#968C85] text-sm">لا توجد أصناف في هذا القسم حالياً.</p>
                </div>
              );
            }
            if (catItems.length === 0) return null;

            return (
              <div key={cat._id} className="border-b border-[#1A0B0E] pb-16">
                <h3 className="text-2xl md:text-3xl font-black text-[#9A6A2F] mb-8 border-r-4 border-[#7A1F2B] pr-4 flex items-center gap-3">
                  {cat.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {catItems.map(item => {
                    const finalPrice = getDiscountedPrice(item.price, item.discount);
                    const cartItem = cart.find(i => i.name === item.name);
                    const quantity = cartItem ? cart.filter(i => i.name === item.name).length : 0;

                    return (
                      <div 
                        key={item._id} 
                        className="bg-[#0D0507] border border-[#E8DDD5] rounded-lg overflow-hidden flex flex-col hover:border-[#7A1F2B] transition-all duration-500 group shadow-lg relative pt-10 hover:-translate-y-2"
                      >
                        {item.discount > 0 && (
                          <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-r from-[#7A1F2B] via-[#FF8C00] to-[#FF4500] text-[#241F1C] text-center py-2 font-black text-sm md:text-base shadow-xl tracking-wider">
                            ⚡ خصم {item.discount}% ⚡
                          </div>
                        )}
                        <div onClick={() => item.type === 'box' ? handleOpenBox(item) : handleOpenItemDetails(item)} className="w-full h-60 object-cover bg-[#F7F3EF] overflow-hidden cursor-pointer">
                          <img src={item.image || "https://via.placeholder.com/400x300/0D0507/FF4500?text=Bahbah+Burger"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col bg-[#0D0507]">
                          <h3 className="text-xl font-black mb-2 text-[#241F1C] group-hover:text-[#9A6A2F] transition">{item.name}</h3>
                          <p className="text-xs md:text-sm text-[#7A716B] mb-6 line-clamp-2 leading-relaxed">{item.description || "..."}</p>
                          
                          <div className="flex items-center gap-3 mb-6 mt-auto">
                            {item.discount > 0 ? (
                              <>
                                <span className="text-[#968C85] line-through text-base font-bold">{item.price} ج</span>
                                <span className="text-[#9A6A2F] text-3xl font-black">{finalPrice} ج</span>
                              </>
                            ) : (
                              <span className="text-[#9A6A2F] text-3xl font-black">{item.price} ج</span>
                            )}
                          </div>
                          
                          {item.type === 'box' ? (
                              <button onClick={() => handleOpenBox(item)} className="w-full bg-[#7A1F2B] text-white font-black py-3.5 rounded-lg hover:bg-[#E03D00] transition shadow-xl">
                              {t.customizeBox}
                              </button>
                          ) : (
                              quantity === 0 ? (
                                <button onClick={() => handleOpenItemDetails(item)} className="w-full border border-[#7A1F2B] text-[#7A1F2B] font-black py-3.5 rounded-lg hover:bg-[#7A1F2B] hover:text-[#241F1C] transition shadow-xl">
                                  {t.details} 🛒
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-[#F7F3EF] border border-[#7A1F2B] rounded-lg px-5 py-3 shadow-inner">
                                <span className="text-xs text-[#7A1F2B] font-bold">الكمية:</span>
                                <div className="flex items-center gap-5">
                                  <button onClick={() => {
                                    const idx = cart.findIndex(i => i.name === item.name);
                                    if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); }
                                  }} className="w-9 h-9 bg-[#0D0707] rounded-lg text-[#7A1F2B] font-black hover:bg-[#7A1F2B] hover:text-[#241F1C] transition">-</button>
                                  <span className="font-black text-[#241F1C] text-lg">{quantity}</span>
                                  <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="w-9 h-9 bg-[#0D0707] rounded-lg text-[#7A1F2B] font-black hover:bg-[#7A1F2B] hover:text-[#241F1C] transition">+</button>
                                </div>
                              </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  )}
    </section>
  );
};

// ================= 3. لوحة التحكم =================
const AdminDashboard = ({ menuItems, categories, siteSettings, lang, fetchItems, fetchCategories, fetchSettings, isAuthenticated }) => {
  const t = translations[lang];
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/menu');
  }, [isAuthenticated, navigate]);

  const [heroImg, setHeroImg] = useState(siteSettings.heroImage);
  const [bannerImg, setBannerImg] = useState(siteSettings.promoBannerImage || '');
  const [titleAr, setTitleAr] = useState(siteSettings.heroTitleAr);
  const [titleEn, setTitleEn] = useState(siteSettings.heroTitleEn);
  const [logoImg, setLogoImg] = useState(siteSettings.logoImage || '');

  const [deliveryZones, setDeliveryZones] = useState([]);
  const [zoneName, setZoneName] = useState('');
  const [zoneFee, setZoneFee] = useState('');

  const fetchZones = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/zones`);
      const data = await res.json();
      setDeliveryZones(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (!zoneName.trim() || !zoneFee) return;
    try {
      const res = await fetch(`${API_BASE}/api/zones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: zoneName.trim(), fee: Number(zoneFee) })
      });
      if (res.ok) {
        setZoneName('');
        setZoneFee('');
        fetchZones();
      }
    } catch (err) {}
  };

  const handleDeleteZone = async (id) => {
    if (!window.confirm("حذف هذه المنطقة؟")) return;
    try {
      const res = await fetch(`${API_BASE}/api/zones/${id}`, { method: 'DELETE' });
      if (res.ok) fetchZones();
    } catch (err) {}
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width; let height = img.height;
          const MAX_WIDTH = 1200; const MAX_HEIGHT = 800;
          if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
          else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setHeroImg(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width; let height = img.height;
          const MAX_WIDTH = 1000; const MAX_HEIGHT = 600;
          if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
          else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          setBannerImg(compressed);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width; let height = img.height;
          const MAX_WIDTH = 300; const MAX_HEIGHT = 300;
          if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
          else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setLogoImg(canvas.toDataURL('image/png', 0.9));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          heroImage: heroImg, 
          heroTitleAr: titleAr, 
          heroTitleEn: titleEn, 
          logoImage: logoImg, 
          promoBannerImage: bannerImg 
        })
      });
      if (res.ok) {
        alert("تم تحديث الواجهة واللوجو وصورة العرض بنجاح! 🚀🔥");
        fetchSettings();
      }
    } catch (err) {
      alert("خطأ أثناء الحفظ");
    }
  };

  const handleMoveCategory = async (index, direction) => {
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCategories.length) return;
    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;

    try {
      await Promise.all(
        newCategories.map((cat, idx) => 
          fetch(`${API_BASE}/api/categories/${cat._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: idx })
          })
        )
      );
      fetchCategories();
    } catch (err) {}
  };

  const handleMoveItem = async (index, direction, catItems) => {
    const newItems = [...catItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    try {
      await Promise.all(
        newItems.map((itm, idx) => 
          fetch(`${API_BASE}/api/items/${itm._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...itm, order: idx })
          })
        )
      );
      fetchItems();
    } catch (err) {}
  };

  const [editCatId, setEditCatId] = useState(null);
  const [catName, setCatName] = useState('');

  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState(''); 
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || '');
  const [type, setType] = useState('normal');
  const [maxItems, setMaxItems] = useState('');
  const [isOffer, setIsOffer] = useState(false);
  
  const [addonName, setAddonName] = useState('');
  const [addonPrice, setAddonPrice] = useState('');
  const [addonsList, setAddonsList] = useState([]);

  const [boxItemNameInput, setBoxItemNameInput] = useState('');
  const [boxItemsList, setBoxItemsList] = useState([]);

  const [sizeNameInput, setSizeNameInput] = useState('');
  const [sizePriceInput, setSizePriceInput] = useState('');
  const [sizesList, setSizesList] = useState([]);

  const handleAddSize = () => {
    if (!sizeNameInput.trim() || !sizePriceInput) return;
    setSizesList([...sizesList, { name: sizeNameInput.trim(), price: Number(sizePriceInput) }]);
    setSizeNameInput('');
    setSizePriceInput('');
  };

  const handleRemoveSize = (index) => {
    setSizesList(sizesList.filter((_, i) => i !== index));
  };

  const handleAddBoxItemName = () => {
    if (!boxItemNameInput.trim()) return;
    setBoxItemsList([...boxItemsList, { name: boxItemNameInput.trim() }]);
    setBoxItemNameInput('');
  };

  const handleRemoveBoxItemName = (index) => {
    setBoxItemsList(boxItemsList.filter((_, i) => i !== index));
  };

  const handleAddAddon = () => {
    if (!addonName.trim() || !addonPrice) return;
    setAddonsList([...addonsList, { name: addonName.trim(), price: Number(addonPrice) }]);
    setAddonName('');
    setAddonPrice('');
  };

  const handleRemoveAddon = (index) => {
    setAddonsList(addonsList.filter((_, i) => i !== index));
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;
    try {
      let res;
      if (editCatId) {
        res = await fetch(`${API_BASE}/api/categories/${editCatId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: catName.trim() })
        });
      } else {
        res = await fetch(`${API_BASE}/api/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: catName.trim() })
        });
      }

      if (res.ok) {
        setCatName('');
        setEditCatId(null);
        fetchCategories();
      }
    } catch (err) {}
  };

  const handleEditCategoryClick = (cat) => {
    setEditCatId(cat._id);
    setCatName(cat.name);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCategories();
    } catch (err) {}
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width; let height = img.height;
          const MAX_WIDTH = 800; const MAX_HEIGHT = 800;
          if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } }
          else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setImage(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const itemData = {
      name,
      price: Number(price),
      discount: Number(discount) || 0,
      image: image || "https://via.placeholder.com/400x300/0D0507/FF4500?text=Bahbah+Burger",
      description,
      category: category || categories[0]?.name || 'General',
      type,
      maxItems: type === 'box' ? Number(maxItems) : undefined,
      isOffer,
      addons: addonsList,
      boxItems: type === 'box' ? boxItemsList : [],
      sizes: sizesList
    };

    try {
      let res;
      if (editId) {
        res = await fetch(`${API_BASE}/api/items/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData)
        });
      } else {
        res = await fetch(`${API_BASE}/api/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData)
        });
      }

      if (res.ok) {
        resetForm();
        fetchItems();
        alert("تم حفظ الصنف بنجاح! 🚀");
      }
    } catch (err) {}
  };

  const handleEditItemClick = (item) => {
    setEditId(item._id);
    setName(item.name);
    setPrice(item.price);
    setDiscount(item.discount || '');
    setImage(item.image);
    setDescription(item.description || '');
    setCategory(item.category);
    setType(item.type || 'normal');
    setMaxItems(item.maxItems || '');
    setIsOffer(item.isOffer || false);
    setAddonsList(item.addons || []);
    setBoxItemsList(item.boxItems || []);
    setSizesList(item.sizes || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditId(null);
    setName(''); setPrice(''); setDiscount(''); setImage(''); setDescription(''); setMaxItems(''); setType('normal');
    setIsOffer(false);
    setAddonsList([]);
    setBoxItemsList([]);
    setSizesList([]);
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete item?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (err) {}
  };

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto min-h-[80vh] bg-[#F7F3EF] text-[#241F1C]">
      <div className="flex justify-between items-center mb-8 border-b border-[#1A0B0E] pb-4">
        <h2 className="text-3xl font-black text-[#9A6A2F]">⚙️ لوحة الإدارة الذكية</h2>
        <Link className="text-[#7A716B] hover:text-[#241F1C] underline font-bold" to="/menu">{t.menu}</Link>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#7A1F2B]/40 mb-8 shadow-lg">
        <h3 className="text-xl font-bold text-[#9A6A2F] mb-4">🚚 إدارة مناطق التوصيل وأسعارها</h3>
        <form onSubmit={handleAddZone} className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="اسم المنطقة (مثل: الشروق)" 
            value={zoneName} 
            onChange={(e) => setZoneName(e.target.value)}
            className="flex-1 bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C] text-sm"
          />
          <input 
            type="number" 
            placeholder="سعر التوصيل (مثل: 30)" 
            value={zoneFee} 
            onChange={(e) => setZoneFee(e.target.value)}
            className="w-full md:w-40 bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C] text-sm"
          />
          <button type="submit" className="bg-[#7A1F2B] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#E03D00] transition shadow cursor-pointer">
            ➕ إضافة منطقة
          </button>
        </form>

        <div className="space-y-3">
          {deliveryZones.length === 0 ? (
            <p className="text-[#968C85] text-sm">لم يتم إضافة مناطق توصيل بعد.</p>
          ) : (
            deliveryZones.map((zone) => (
              <div key={zone._id} className="bg-[#F7F3EF] border border-[#E8DDD5] px-5 py-3.5 rounded-lg flex items-center justify-between text-sm">
                <span className="font-bold text-[#9A6A2F]">{zone.name} — <span className="text-[#241F1C]">{zone.fee} جنيه</span></span>
                <button onClick={() => handleDeleteZone(zone._id)} className="text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-lg font-bold text-xs">✕ مسح</button>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-lg border border-[#7A1F2B]/40 mb-8 shadow-lg">
        <h3 className="text-xl font-bold text-[#9A6A2F] mb-4">{t.siteSettings}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm mb-2 text-[#5F5752]">شعار المطعم (اللوجو)</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-1 text-[#241F1C] text-sm cursor-pointer mb-2" />
            {logoImg && <img src={logoImg} alt="Logo Preview" className="w-20 h-20 object-contain rounded-lg border border-[#E8DDD5] bg-[#F7F3EF]" />}
          </div>
          <div>
            <label className="block text-sm mb-2 text-[#5F5752]">خلفية الهيدر الثابتة فوق</label>
            <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-1 text-[#241F1C] text-sm cursor-pointer mb-2" />
            <img src={heroImg} alt="Hero" className="w-full h-20 object-cover rounded-lg border border-[#E8DDD5]" />
          </div>

          <div className="md:col-span-2 bg-[#F7F3EF] p-4 rounded-lg border border-[#7A1F2B]/30">
            <label className="block text-sm mb-2 text-[#9A6A2F] font-bold">🖼️ صورة العرض الكبيرة (البوستر تحت زرار اطلب دلوقتي)</label>
            <input type="file" accept="image/*" onChange={handleBannerImageUpload} className="w-full bg-white border border-[#E8DDD5] rounded-lg p-1 text-[#241F1C] text-sm cursor-pointer mb-2" />
            <div className="flex items-center gap-4 mt-2">
              {bannerImg ? (
                <>
                  <img src={bannerImg} alt="Banner Preview" className="w-40 h-24 object-cover rounded-lg border border-[#7A1F2B]" />
                  <button type="button" onClick={() => { setBannerImg(''); }} className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-xs font-bold border border-red-500/30">🗑️ إزالة البوستر</button>
                </>
              ) : (
                <span className="text-[#968C85] text-xs">لا توجد صورة بوستر مفعلة حالياً.</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 text-[#5F5752]">العنوان بالعربي</label>
            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-3.5 text-[#241F1C] text-sm" />
          </div>
          <div>
            <label className="block text-xs mb-1 text-[#5F5752]">العنوان بالإنجليزي</label>
            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-3.5 text-[#241F1C] text-sm" />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#7A1F2B] text-white font-bold py-4 rounded-lg hover:bg-[#E03D00] transition shadow-lg">
          💾 حفظ تعديلات اللوجو والواجهة وصورة العرض
        </button>
      </form>

      <div className="bg-white p-8 rounded-lg border border-[#E8DDD5] mb-8 shadow-lg">
        <h3 className="text-xl font-bold text-[#9A6A2F] mb-4">{t.catManage}</h3>
        <form onSubmit={handleSaveCategory} className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Category Name..." 
            value={catName} 
            onChange={(e) => setCatName(e.target.value)}
            className="flex-1 bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C]"
          />
          <button type="submit" className="bg-[#7A1F2B] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#E03D00] transition shadow">
            {editCatId ? t.save : t.addCat}
          </button>
          {editCatId && (
            <button type="button" onClick={() => { setEditCatId(null); setCatName(''); }} className="bg-zinc-700 text-[#241F1C] px-5 rounded-lg font-bold">
              {t.cancel}
            </button>
          )}
        </form>

        <div className="space-y-3">
          {categories.map((cat, index) => (
            <div key={cat._id} className="bg-[#F7F3EF] border border-[#E8DDD5] px-5 py-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[#968C85] font-bold text-sm">#{index + 1}</span>
                <span className="font-bold text-[#9A6A2F]">{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => handleMoveCategory(index, 'up')}
                  disabled={index === 0}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold ${index === 0 ? 'bg-white text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#7A1F2B] hover:bg-[#1F0A0E]'}`}
                >
                  ◀ تحريك للخارج
                </button>
                <button 
                  type="button" 
                  onClick={() => handleMoveCategory(index, 'down')}
                  disabled={index === categories.length - 1}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold ${index === categories.length - 1 ? 'bg-white text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#7A1F2B] hover:bg-[#1F0A0E]'}`}
                >
                  تحريك للداخل ▶
                </button>
                <button onClick={() => handleEditCategoryClick(cat)} className="text-[#9A6A2F] bg-[#7A1F2B]/20 px-3.5 py-1.5 rounded-lg text-xs font-bold">✏️</button>
                <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-lg text-xs font-bold">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    <form onSubmit={handleSaveItem} className="bg-white p-8 rounded-lg border border-[#E8DDD5] mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg">
      <h3 className="md:col-span-2 text-xl font-bold text-[#9A6A2F] mb-2">{t.itemManage}</h3>
      <div>
        <label className="block text-sm mb-2 text-[#5F5752]">Item Name *</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C]" placeholder="Name" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-[#5F5752]">Price *</label>
        <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C]" placeholder="Price" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-[#9A6A2F]">نسبة الخصم % (اختياري)</label>
        <input type="number" placeholder="مثال: 20" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#7A1F2B]/50 rounded-lg p-4 text-[#241F1C]" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-[#5F5752]">Category *</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C]">
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-2 text-[#5F5752]">Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-1 text-[#241F1C] text-sm cursor-pointer" />
      </div>

      <div className="md:col-span-2 bg-[#F7F3EF] p-4 rounded-lg border border-[#7A1F2B]/30 flex items-center gap-3">
        <input 
          type="checkbox" 
          id="isOfferCheck" 
          checked={isOffer} 
          onChange={(e) => setIsOffer(e.target.checked)}
          className="w-5 h-5 accent-[#FF4500] cursor-pointer" 
        />
        <label htmlFor="isOfferCheck" className="text-[#9A6A2F] font-bold cursor-pointer">
          🔥 عرض في الصفحة الرئيسية (اجعل هذا الصنف يظهر كعرض متحرك في الواجهة)
        </label>
      </div>

      <div>
        <label className="block text-sm mb-2 text-[#5F5752]">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C]">
          <option value="normal">Normal (سندوتش أو وجبة عادية)</option>
          <option value="box">Box (بوكس مخصص قابل للاختيار)</option>
        </select>
      </div>

      {type === 'box' && (
        <div>
          <label className="block text-sm mb-2 text-[#9A6A2F]">Max Items in Box *</label>
          <input type="number" value={maxItems} onChange={(e) => setMaxItems(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#7A1F2B]/50 rounded-lg p-4 text-[#241F1C]" placeholder="3" />
        </div>
      )}

      {type === 'box' && (
        <div className="md:col-span-2 bg-[#F7F3EF] p-4 rounded-lg border border-[#7A1F2B]/40">
          <label className="block text-sm mb-2 text-[#9A6A2F] font-bold">📦 أسماء المكونات التي تظهر داخل البوكس</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم المكون" 
              value={boxItemNameInput} 
              onChange={(e) => setBoxItemNameInput(e.target.value)}
              className="flex-1 bg-white border border-[#E8DDD5] rounded-lg p-3 text-[#241F1C] text-sm"
            />
            <button type="button" onClick={handleAddBoxItemName} className="bg-[#7A1F2B] text-white px-5 rounded-lg font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة
            </button>
          </div>

          {boxItemsList.length > 0 && (
            <div className="space-y-2 mt-2">
              {boxItemsList.map((bItem, index) => (
                <div key={index} className="flex justify-between items-center bg-[#F7F3EF] px-4 py-2.5 rounded-lg border border-[#E8DDD5] text-sm">
                  <span className="text-[#9A6A2F] font-bold">{bItem.name}</span>
                  <button type="button" onClick={() => handleRemoveBoxItemName(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="md:col-span-2 bg-[#F7F3EF] p-4 rounded-lg border border-[#7A1F2B]/40">
          <label className="block text-sm mb-2 text-[#9A6A2F] font-bold">⚖️ أحجام الصنف وأسعارها (مثل: كيلو، نص، ربع)</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم الحجم (مثل: كبير)" 
              value={sizeNameInput} 
              onChange={(e) => setSizeNameInput(e.target.value)}
              className="flex-1 bg-white border border-[#E8DDD5] rounded-lg p-3 text-[#241F1C] text-sm"
            />
            <input 
              type="number" 
              placeholder="السعر (مثل: 400)" 
              value={sizePriceInput} 
              onChange={(e) => setSizePriceInput(e.target.value)}
              className="w-32 bg-white border border-[#E8DDD5] rounded-lg p-3 text-[#241F1C] text-sm"
            />
            <button type="button" onClick={handleAddSize} className="bg-[#7A1F2B] text-white px-5 rounded-lg font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة حجم
            </button>
          </div>

          {sizesList.length > 0 && (
            <div className="space-y-2 mt-2">
              {sizesList.map((sz, index) => (
                <div key={index} className="flex justify-between items-center bg-[#F7F3EF] px-4 py-2.5 rounded-lg border border-[#E8DDD5] text-sm">
                  <span className="text-[#9A6A2F] font-bold">{sz.name} — {sz.price} ج</span>
                  <button type="button" onClick={() => handleRemoveSize(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="md:col-span-2 bg-[#F7F3EF] p-4 rounded-lg border border-[#E8DDD5]">
          <label className="block text-sm mb-2 text-[#9A6A2F] font-bold">✨ الإضافات الاختيارية</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم الإضافة (مثلاً: إضافة جبنة)" 
              value={addonName} 
              onChange={(e) => setAddonName(e.target.value)}
              className="flex-1 bg-white border border-[#E8DDD5] rounded-lg p-3 text-[#241F1C] text-sm"
            />
            <input 
              type="number" 
              placeholder="السعر (مثلاً: 10)" 
              value={addonPrice} 
              onChange={(e) => setAddonPrice(e.target.value)}
              className="w-32 bg-white border border-[#E8DDD5] rounded-lg p-3 text-[#241F1C] text-sm"
            />
            <button type="button" onClick={handleAddAddon} className="bg-[#7A1F2B] text-white px-5 rounded-lg font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة
            </button>
          </div>

          {addonsList.length > 0 && (
            <div className="space-y-2 mt-2">
              {addonsList.map((addon, index) => (
                <div key={index} className="flex justify-between items-center bg-[#F7F3EF] px-4 py-2.5 rounded-lg border border-[#E8DDD5] text-sm">
                  <span>{addon.name} (+{addon.price} ج)</span>
                  <button type="button" onClick={() => handleRemoveAddon(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="md:col-span-2">
          <label className="block text-sm mb-2 text-[#9A6A2F] font-bold">Description *</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C]" placeholder="Description..." />
      </div>

      <div className="md:col-span-2 mt-4 flex gap-4">
          <button type="submit" className="flex-1 bg-[#7A1F2B] text-white font-bold py-4 rounded-lg hover:bg-[#E03D00] transition shadow-lg">
            {editId ? t.save : t.addItem}
          </button>
          {editId && (
            <button type="button" onClick={resetForm} className="bg-zinc-700 text-[#241F1C] px-6 rounded-lg font-bold">
              {t.cancel}
            </button>
          )}
      </div>
    </form>

    <div className="space-y-12 mt-12">
      <h3 className="text-2xl font-bold text-[#9A6A2F] border-b border-[#1A0B0E] pb-3">📋 إدارة وترتيب الأصناف حسب الأقسام</h3>
        
      {categories.map(cat => {
        const catItems = menuItems.filter(item => item.category === cat.name).sort((a, b) => (a.order || 0) - (b.order || 0));
          
        return (
          <div key={cat._id} className="bg-white border border-[#E8DDD5] rounded-lg p-8 shadow-lg">
            <h4 className="text-xl font-black text-[#9A6A2F] mb-6 border-r-4 border-[#7A1F2B] pr-4">
              📁 قسم: {cat.name} ({catItems.length} صنف)
            </h4>

            {catItems.length === 0 ? (
              <p className="text-[#968C85] text-sm">لا توجد أصناف في هذا القسم حالياً.</p>
            ) : (
              <div className="space-y-4">
                {catItems.map((item, itemIndex) => (
                  <div key={item._id} className="bg-[#F7F3EF] border border-[#E8DDD5] p-4.5 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-[#968C85] font-bold text-sm">#{itemIndex + 1}</span>
                      <img src={item.image} alt="" className="w-16 h-12 object-cover rounded-lg bg-white" />
                      <div>
                        <h4 className="font-bold text-[#241F1C]">
                          {item.name} 
                          {item.discount > 0 && <span className="bg-[#7A1F2B] text-white text-xs px-2.5 py-0.5 rounded-lg font-black mr-2">خصم {item.discount}%</span>}
                        </h4>
                        <span className="text-xs text-[#9A6A2F]">
                          {item.discount > 0 ? `${getDiscountedPrice(item.price, item.discount)} ج (بدل ${item.price})` : `${item.price} ج`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => handleMoveItem(itemIndex, 'up', catItems)}
                        disabled={itemIndex === 0}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${itemIndex === 0 ? 'bg-white text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#7A1F2B] hover:bg-[#1F0A0E]'}`}
                      >
                        ▲
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleMoveItem(itemIndex, 'down', catItems)}
                        disabled={itemIndex === catItems.length - 1}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${itemIndex === catItems.length - 1 ? 'bg-white text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#7A1F2B] hover:bg-[#1F0A0E]'}`}
                      >
                        ▼
                      </button>
                      <button onClick={() => handleEditItemClick(item)} className="text-[#9A6A2F] bg-[#7A1F2B]/20 px-4 py-2 rounded-lg text-xs font-bold">✏️ تعديل</button>
                      <button onClick={() => handleDeleteItem(item._id)} className="text-red-400 bg-red-500/10 px-4 py-2 rounded-lg text-xs font-bold">✕ مسح</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>
);
};

// ================= 4. صفحة السلة =================
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
    fetch(`${API_BASE}/api/zones`)
      .then(res => res.json())
      .then(data => {
        setDeliveryZones(data);
        if (data.length > 0) setSelectedZone(data[0]);
      })
      .catch(err => {});
  }, []);

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const deliveryFee = orderType === 'delivery' && selectedZone ? selectedZone.fee : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const handleIncrease = (itemName) => {
    const itemToAdd = cart.find(i => i.name === itemName);
    if (itemToAdd) setCart([...cart, { ...itemToAdd }]);
  };

  const handleDecrease = (itemName) => {
    const indexToRemove = cart.findIndex(i => i.name === itemName);
    if (indexToRemove !== -1) {
      const newCart = [...cart];
      newCart.splice(indexToRemove, 1);
      setCart(newCart);
    }
  };

  const handleRemoveCompletely = (itemName) => {
     setCart(cart.filter(i => i.name !== itemName));
  };

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return alert("السلة فارغة!");
    if (!customerName.trim()) return alert("من فضلك اكتب اسمك الكامل.");
    if (!customerPhone.trim() || customerPhone.length !== 11 || isNaN(customerPhone)) {
      return alert("من فضلك اكتب رقم تليفون صحيح مكون من 11 رقم.");
    }
    if (orderType === 'delivery' && !customerAddress.trim()) {
      return alert("من فضلك اكتب عنوان الاستلام بالتفصيل.");
    }

    const orderId = 'BB-' + Date.now().toString().slice(-4) + Math.floor(10 + Math.random() * 90);

    let message = `🍔 أهلاً (بحبح برجر)، عندي أوردر جديد!\n`;
    message += `🆔 *رقم الأوردر:* #${orderId}\n\n`;
    message += `👤 *الاسم:* ${customerName}\n`;
    message += `📞 *التليفون:* ${customerPhone}\n`;
    message += `📦 *نوع الاستلام:* ${orderType === 'delivery' ? 'توصيل دليفري 🛵' : 'استلام من الفرع 🏪'}\n`;
    
    if (orderType === 'delivery') {
      message += `📍 *العنوان:* ${customerAddress}\n`;
      if (selectedZone) {
        message += `🚚 *منطقة التوصيل:* ${selectedZone.name} (${selectedZone.fee} ج)\n`;
      }
    }

    message += `\n🛒 *الأصناف المطلوبة:*\n`;
    groupedCart.forEach((item) => {
      message += `▪️ ${item.quantity}× ${item.name} — (${item.price * item.quantity} ج)\n`;
    });

    message += `\n-------------------\n`;
    message += `🏷️ *قيمة الأصناف:* ${itemsTotal} ج\n`;
    if (orderType === 'delivery') {
      message += `🚚 *سعر التوصيل:* ${deliveryFee} ج\n`;
    }
    message += `💰 *الإجمالي النهائي: ${grandTotal} جنيه*\n`;
    
    const whatsappUrl = `https://wa.me/201042281510?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setCart([]);
    setPlacedOrderId(orderId);
  };

  if (placedOrderId) {
    return (
      <section className="px-6 py-12 max-w-4xl mx-auto min-h-[60vh] bg-[#F7F3EF] text-[#241F1C] flex flex-col items-center justify-center">
        <div className="bg-white border border-[#25D366] rounded-lg p-12 text-center shadow-[0_0_35px_rgba(37,211,102,0.2)] w-full">
          <div className="text-7xl mb-4">✅</div>
          <h2 className="text-3xl font-black text-[#25D366] mb-4">تم إرسال طلبك بنجاح!</h2>
          <p className="text-xl mb-6 text-[#5F5752]">رقم الأوردر بتاعك هو:</p>
          <div className="bg-[#F7F3EF] border-2 border-[#FFB800] text-[#9A6A2F] text-4xl font-black py-4 px-8 rounded-lg inline-block mb-8 tracking-widest shadow-xl">
            {placedOrderId}
          </div>
          <p className="text-sm text-[#7A716B] mb-8">تم تحويلك للواتساب لإرسال الطلب للمطعم.</p>
          <button 
            onClick={() => setPlacedOrderId(null)} 
            className="text-[#241F1C] bg-[#7A1F2B] hover:bg-[#E03D00] px-8 py-4 rounded-lg font-bold transition shadow-lg"
          >
            رجوع للسلة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto min-h-screen bg-[#F7F3EF] text-[#241F1C]">
      <h2 className="text-3xl font-black text-[#9A6A2F] mb-8 border-b border-[#1A0B0E] pb-4">{t.cart}</h2>
      
      {cart.length === 0 ? (
        <div className="border border-[#E8DDD5] bg-white rounded-lg p-16 text-center shadow-lg">
          <div className="text-zinc-600 text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-[#7A716B] mb-4">{t.emptyCart}</h2>
          <Link to="/menu" className="text-[#7A1F2B] underline hover:text-[#241F1C] font-bold">{t.backToMenu}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-8 border border-[#E8DDD5] shadow-lg">
            <h3 className="text-xl font-bold text-[#9A6A2F] mb-6">محتويات السلة</h3>
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {groupedCart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-[#E8DDD5] pb-4">
                  <div>
                    <h4 className="text-base font-bold text-[#241F1C]">{item.name}</h4>
                    <p className="text-[#9A6A2F] font-bold text-sm">{item.price * item.quantity} ج</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg px-3 py-1 gap-3">
                      <button onClick={() => handleDecrease(item.name)} className="text-[#7A1F2B] font-black text-lg hover:text-[#241F1C]">-</button>
                      <span className="font-black text-[#241F1C]">{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.name)} className="text-[#7A1F2B] font-black text-lg hover:text-[#241F1C]">+</button>
                    </div>
                    
                    <button onClick={() => handleRemoveCompletely(item.name)} className="text-red-400 bg-red-500/10 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-500/20">❌</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#E8DDD5] space-y-2 text-sm text-[#5F5752]">
              <div className="flex justify-between"><span>سعر الأصناف:</span><span className="font-bold text-[#241F1C]">{itemsTotal} ج</span></div>
              {orderType === 'delivery' && (
                <div className="flex justify-between"><span>سعر التوصيل:</span><span className="font-bold text-[#9A6A2F]">{deliveryFee} ج</span></div>
              )}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-[#7A1F2B] flex justify-between items-center">
            <span className="text-lg font-bold">{t.total}</span>
            <span className="text-2xl font-black text-[#9A6A2F]">{grandTotal} جنيه</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 border border-[#E8DDD5] flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#9A6A2F] mb-2">بيانات التوصيل والاستلام</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button 
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-4 rounded-lg font-bold text-sm transition ${orderType === 'delivery' ? 'bg-[#7A1F2B] text-white border border-[#7A1F2B] shadow-lg' : 'bg-[#F7F3EF] text-[#7A716B] border border-[#E8DDD5]'}`}
              >
                🛵 توصيل دليفري
              </button>
              <button 
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-4 rounded-lg font-bold text-sm transition ${orderType === 'pickup' ? 'bg-[#7A1F2B] text-white border border-[#7A1F2B] shadow-lg' : 'bg-[#F7F3EF] text-[#7A716B] border border-[#E8DDD5]'}`}
              >
                🏪 استلام من الفرع
              </button>
          </div>

          <div>
            <label className="block text-xs text-[#5F5752] mb-1">الاسم الكامل *</label>
            <input type="text" placeholder="اكتب اسمك..." value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C] text-sm" />
          </div>
          <div>
            <label className="block text-xs text-[#5F5752] mb-1">رقم التليفون (11 رقم) *</label>
            <input type="text" maxLength="11" placeholder="010xxxxxxxx" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C] text-sm tracking-wider" />
          </div>

          {orderType === 'delivery' && (
            <>
              <div>
                <label className="block text-xs text-[#5F5752] mb-1">اختر منطقة التوصيل *</label>
                <select 
                  value={selectedZone ? selectedZone._id : ''}
                  onChange={(e) => {
                    const zone = deliveryZones.find(z => z._id === e.target.value);
                    setSelectedZone(zone);
                  }}
                  className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C] text-sm cursor-pointer"
                >
                  {deliveryZones.map(zone => (
                    <option key={zone._id} value={zone._id}>
                      {zone.name} ({zone.fee} جنيه)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#5F5752] mb-1">العنوان بالتفصيل *</label>
                <textarea rows="2" placeholder="الشارع، رقم العمارة، الدور..." value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full bg-[#F7F3EF] border border-[#E8DDD5] rounded-lg p-4 text-[#241F1C] text-sm" />
              </div>
            </>
          )}
        </div>

        <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-black font-black text-lg py-4.5 rounded-lg hover:bg-[#20bd5a] transition mt-6 flex items-center justify-center gap-2 shadow-lg cursor-pointer">
          {t.whatsappOrder}
        </button>
      </div>
    </div>
  )}
    </section>
  );
};

// ================= التطبيق الرئيسي =================
function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteSettings, setSiteSettings] = useState({ heroImage: '', heroTitleAr: 'أقوى العروض 🔥', heroTitleEn: 'Strongest Offers 🔥', logoImage: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [lang, setLang] = useState('ar');

  const [selectedItemDetail, setSelectedItemDetail] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddon, setSelectedAddon] = useState(null);

  const t = translations[lang];

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/items`);
      let data = await res.json();
      
      data = data.map(item => ({
        ...item,
        discount: Number(item.discount) || 0
      }));

      setMenuItems(data);
    } catch (err) {}
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {}
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings`);
      const data = await res.json();
      setSiteSettings(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchSettings();
  }, []);

  const handleSecretLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        const pass = window.prompt("🔒 Admin Password:");
        if (pass === "15926") {
          setIsAuthenticated(true);
          navigate('/secret-admin-dashboard');
        } else if (pass !== null) { alert("Wrong password!"); }
        return 0;
      }
      return newCount;
    });
  };

  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [activeBox, setActiveBox] = useState(null);
  const [boxSelections, setBoxSelections] = useState({});

  const handleOpenBox = (boxItem) => {
    setActiveBox(boxItem);
    const initialSelections = {};
    if (boxItem.boxItems && boxItem.boxItems.length > 0) {
      boxItem.boxItems.forEach(b => { initialSelections[b.name] = 0; });
    }
    setBoxSelections(initialSelections);
    setIsBoxModalOpen(true);
  };

  const totalSelected = Object.values(boxSelections).reduce((a, b) => a + b, 0);

  const handleUpdateSelection = (name, operation) => {
    if (operation === 'add' && totalSelected < activeBox.maxItems) {
      setBoxSelections({ ...boxSelections, [name]: boxSelections[name] + 1 });
    } else if (operation === 'remove' && boxSelections[name] > 0) {
      setBoxSelections({ ...boxSelections, [name]: boxSelections[name] - 1 });
    }
  };

  const handleAddBoxToCart = () => {
    if (totalSelected === activeBox.maxItems) {
      const detailsStr = Object.entries(boxSelections)
        .filter(([_, count]) => count > 0)
        .map(([name, count]) => `${name}: ${count}`)
        .join(', ');

      const customBoxItem = { ...activeBox, name: `${activeBox.name} (${detailsStr})` };
      setCart([...cart, customBoxItem]);
      setIsBoxModalOpen(false);
    }
  };

  const handleOpenItemDetailsModal = (item) => {
    const finalPrice = getDiscountedPrice(item.price, item.discount);
    const hasSizes = item.sizes && item.sizes.length > 0;
    const hasAddons = item.addons && item.addons.length > 0;
    if (hasSizes || hasAddons) {
      setSelectedItemDetail(item);
      setSelectedSize(hasSizes ? item.sizes[0] : null);
      setSelectedAddon(null);
    } else {
      setCart([...cart, { ...item, price: finalPrice }]);
    }
  };

  const basePrice = selectedSize ? selectedSize.price : (selectedItemDetail ? selectedItemDetail.price : 0);
  const currentItemTotalPrice = getDiscountedPrice(basePrice, selectedItemDetail?.discount) + (selectedAddon ? selectedAddon.price : 0);

  const handleAddCustomizedItemToCart = () => {
    if (!selectedItemDetail) return;
    let itemName = selectedItemDetail.name;
    if (selectedSize) itemName += ` (${selectedSize.name})`;
    if (selectedAddon) itemName += ` - ${selectedAddon.name}`;

    const finalItem = { ...selectedItemDetail, name: itemName, price: currentItemTotalPrice };
    setCart([...cart, finalItem]);
    setSelectedItemDetail(null); setSelectedSize(null); setSelectedAddon(null);
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F7F3EF] text-[#241F1C] font-sans flex flex-col justify-between relative selection:bg-[#7A1F2B] selection:text-white">
      {/* النافبار العائمة العصرية المبتكرة */}
      <nav className="bg-white/80 border-b border-[#7A1F2B]/30 sticky top-0 z-50 backdrop-blur-2xl shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center cursor-pointer select-none">
            {siteSettings.logoImage ? (
              <img src={siteSettings.logoImage} alt="Logo" style={{ height: '70px', width: 'auto' }} className="object-contain hover:scale-105 transition duration-300" />
            ) : (
              <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7A1F2B] to-[#B88A44] tracking-tighter">Bahbah Burger</span>
            )}
          </Link>
          
          <ul className="hidden md:flex gap-4 text-base font-bold">
            <li><Link to="/" className="bg-[#F7F3EF] hover:bg-[#7A1F2B] text-[#5F5752] hover:text-[#241F1C] border border-[#E8DDD5] px-7 py-3 rounded-lg transition shadow-md">{t.home}</Link></li>
            <li><Link to="/menu" className="bg-[#F7F3EF] hover:bg-[#7A1F2B] text-[#5F5752] hover:text-[#241F1C] border border-[#E8DDD5] px-7 py-3 rounded-lg transition shadow-md">{t.menu}</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-center border-l border-[#E8DDD5] pl-4 ml-2">
              <span className="text-[#7A1F2B] text-[10px] font-black tracking-widest">{t.hotlineText}</span>
              <span className="text-[#241F1C] font-bold text-sm tracking-wider">01042281510</span>
            </div>
            
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
              className="bg-[#F7F3EF] text-[#5F5752] border border-[#E8DDD5] px-4 py-2.5 rounded-lg text-sm font-extrabold hover:text-[#241F1C] hover:border-[#7A1F2B] transition"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            <Link to="/cart" className="flex items-center gap-2.5 bg-gradient-to-r from-[#7A1F2B] to-[#9A6A2F] text-[#241F1C] px-7 py-3.5 rounded-lg font-black hover:scale-105 transition shadow-md">
              <span>🛒 {t.cart}</span>
              <span className="bg-[#F7F3EF] text-[#9A6A2F] px-2.5 py-0.5 rounded-full text-xs font-black">{cart.length}</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} siteSettings={siteSettings} menuItems={menuItems} handleOpenItemDetails={handleOpenItemDetailsModal} cart={cart} setCart={setCart} />} />
          <Route path="/menu" element={<MenuPage menuItems={menuItems} categories={categories} lang={lang} handleOpenBox={handleOpenBox} handleOpenItemDetails={handleOpenItemDetailsModal} cart={cart} setCart={setCart} />} />
          <Route path="/secret-admin-dashboard" element={<AdminDashboard menuItems={menuItems} categories={categories} siteSettings={siteSettings} lang={lang} fetchItems={fetchItems} fetchCategories={fetchCategories} fetchSettings={fetchSettings} isAuthenticated={isAuthenticated} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} lang={lang} />} />
        </Routes>
      </div>

      {selectedItemDetail && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-xl">
          <div className="bg-white border border-[#7A1F2B]/50 rounded-lg w-full max-w-lg p-8 relative shadow-lg">
            <button onClick={() => setSelectedItemDetail(null)} className="absolute top-6 left-6 text-red-400 text-xl font-bold bg-red-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20">✕</button>
            <h3 className="text-3xl font-black text-[#241F1C] mb-6">{selectedItemDetail.name}</h3>
              
            {selectedItemDetail.sizes && selectedItemDetail.sizes.length > 0 && (
              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-extrabold text-[#9A6A2F]">اختر الحجم:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedItemDetail.sizes.map((sz, idx) => {
                    const finalSzPrice = getDiscountedPrice(sz.price, selectedItemDetail.discount);
                    return (
                      <div key={idx} onClick={() => setSelectedSize(sz)} className={`p-4 rounded-lg border cursor-pointer flex flex-col items-center justify-center transition ${selectedSize === sz ? 'bg-[#7A1F2B]/20 border-[#7A1F2B] text-[#9A6A2F] shadow-lg' : 'bg-[#F7F3EF] border-[#E8DDD5] text-[#5F5752]'}`}>
                        <span className="font-bold">{sz.name}</span>
                        {selectedItemDetail.discount > 0 ? (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#968C85] line-through font-bold">{sz.price} ج</span>
                            <span className="text-sm font-black text-[#9A6A2F]">{finalSzPrice} ج</span>
                          </div>
                        ) : (
                          <span className="text-sm font-black text-[#9A6A2F]">{sz.price} ج</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedItemDetail.addons && selectedItemDetail.addons.length > 0 && (
              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-extrabold text-[#9A6A2F]">✨ الإضافات الاختيارية:</h4>
                <div className="flex flex-col gap-3">
                    
                  <label className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition ${!selectedAddon ? 'bg-[#7A1F2B]/20 border-[#7A1F2B] text-[#9A6A2F]' : 'bg-[#F7F3EF] border-[#E8DDD5] text-[#5F5752]'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="addon" checked={!selectedAddon} onChange={() => setSelectedAddon(null)} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!selectedAddon ? 'border-[#7A1F2B]' : 'border-[#E8DDD5]'}`}>
                        {!selectedAddon && <div className="w-2.5 h-2.5 bg-[#7A1F2B] rounded-full"></div>}
                      </div>
                      <span className="font-bold text-sm">بدون إضافات</span>
                    </div>
                    <span className="text-sm font-black">+0 ج</span>
                  </label>

                  {selectedItemDetail.addons.map((addon, idx) => (
                    <label key={idx} className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition ${selectedAddon === addon ? 'bg-[#7A1F2B]/20 border-[#7A1F2B] text-[#9A6A2F]' : 'bg-[#F7F3EF] border-[#E8DDD5] text-[#5F5752]'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="addon" checked={selectedAddon === addon} onChange={() => setSelectedAddon(addon)} className="hidden" />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddon === addon ? 'border-[#7A1F2B]' : 'border-[#E8DDD5]'}`}>
                          {selectedAddon === addon && <div className="w-2.5 h-2.5 bg-[#7A1F2B] rounded-full"></div>}
                        </div>
                        <span className="font-bold text-sm">{addon.name}</span>
                      </div>
                      <span className="text-sm font-black text-[#9A6A2F]">+{addon.price} ج</span>
                    </label>
                  ))}

                </div>
              </div>
            )}
            <button onClick={handleAddCustomizedItemToCart} className="w-full bg-[#7A1F2B] text-white font-black py-4 rounded-lg hover:bg-[#E03D00] transition text-lg shadow-lg">
              أضف للسلة • {currentItemTotalPrice} ج
            </button>
          </div>
        </div>
      )}

      {isBoxModalOpen && activeBox && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-xl">
          <div className="bg-white border border-[#7A1F2B]/50 rounded-lg w-full max-w-lg p-8 relative shadow-lg">
            <button onClick={() => setIsBoxModalOpen(false)} className="absolute top-6 left-6 text-red-400 text-xl font-bold bg-red-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20">✕</button>
              
            <h3 className="text-3xl font-black text-[#9A6A2F] mb-1">{activeBox.name}</h3>
            <p className="text-[#5F5752] mb-6 border-b border-[#E8DDD5] pb-4 text-sm">
              اختر {activeBox.maxItems} أصناف. 
              <span className={`block mt-1 font-extrabold text-base ${totalSelected === activeBox.maxItems ? 'text-green-400' : 'text-[#9A6A2F]'}`}>
                تم اختيار: ({totalSelected} / {activeBox.maxItems})
              </span>
            </p>

            <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-1">
              {activeBox.boxItems && activeBox.boxItems.map((bItem, idx) => (
                <div key={idx} className="flex justify-between items-center bg-[#F7F3EF] p-4 rounded-lg border border-[#E8DDD5]">
                  <span className="font-bold text-base text-[#241F1C]">{bItem.name}</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleUpdateSelection(bItem.name, 'remove')} className="w-10 h-10 bg-white rounded-lg text-[#7A1F2B] font-black text-lg hover:bg-[#7A1F2B] hover:text-[#241F1C] transition">-</button>
                    <span className="text-xl w-6 text-center font-black text-[#241F1C]">{boxSelections[bItem.name] || 0}</span>
                    <button onClick={() => handleUpdateSelection(bItem.name, 'add')} className="w-10 h-10 bg-white rounded-lg text-[#7A1F2B] font-black text-lg hover:bg-[#7A1F2B] hover:text-[#241F1C] transition">+</button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleAddBoxToCart} disabled={totalSelected !== activeBox.maxItems} className={`w-full py-4 rounded-lg font-black text-lg transition ${totalSelected === activeBox.maxItems ? 'bg-[#7A1F2B] text-white hover:bg-[#E03D00] cursor-pointer shadow-lg' : 'bg-zinc-800 text-[#968C85] cursor-not-allowed'}`}>
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <footer onClick={handleSecretLogoClick} className="bg-white border-t border-[#E8DDD5] mt-24 text-[#7A716B] py-8 text-center text-xs cursor-default select-none">
        جميع الحقوق محفوظة © 2026 بحبح برجر — Bahbah Burger
      </footer>
    </div>
  );
}

App;
export default App;