import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const API_BASE = 'https://bahbah-backend-production.up.railway.app';
const translations = {
  ar: {
    home: "الرئيسية",
    menu: "المنيو",
    cart: "السلة",
    admin: "لوحة الإدارة",
    all: "الكل",
    orderNow: "اطلب أكلتك دلوقتي 🍔",
    ourMenu: "قائمة العظمة (المنيو)",
    bestOffers: "العروض النارية 🔥",
    seeMore: "عرض الكل ➔",
    hotlineText: "الخط الساخن السريع",
    rights: "جميع الحقوق محفوظة © 2026 بحبح برجر - Bahbah Burger",
    addToCart: "أضف للسلة 🛒",
    customizeBox: "صمم بوكس الأحلام ⚙️",
    details: "اختيار و تخصيص",
    emptyCart: "السلة فاضية خالص!",
    backToMenu: "يلا بينا نرجع للمنيو ونختار الأكل",
    total: "إجمالي الطلب:",
    whatsappOrder: "📲 إرسال الطلب عبر الواتساب",
    delete: "حذف",
    edit: "تعديل",
    save: "حفظ",
    cancel: "إلغاء",
    addItem: "➕ إضافة صنف جديد للمنيو",
    addCat: "➕ إضافة قسم جديد",
    catManage: "📁 تنظيم وترتيب أقسام المنيو",
    itemManage: "🍔 إدارة وتعديل أصناف البرجر والوجبات",
    siteSettings: "🖼️ تخصيص اللوجو والواجهة والبوستر",
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

// ================= 1. صفحة الرئيسية =================
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
    <div className="bg-[#0A0506] min-h-screen text-white selection:bg-[#FF4500] selection:text-white">
      {/* Hero Section بنمط عصري مختلف */}
      <header className="relative w-full min-h-[560px] md:min-h-[660px] bg-[#0A0506] flex flex-col items-center justify-center overflow-hidden border-b border-[#FF4500]/20 shadow-2xl py-12">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 scale-105 transition duration-1000 blur-[1px]"
          style={{ backgroundImage: `url(${siteSettings.heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0506] via-[#0A0506]/70 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="bg-[#FF4500]/20 border border-[#FF4500]/50 text-[#FFB800] px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-4 uppercase backdrop-blur-md">
            🔥 طعم السعادة الحقيقي في كل قرمشة
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8C00] to-[#FFB800] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-6 leading-tight">
            {title}
          </h1>
          <Link to="/menu" className="inline-block bg-gradient-to-r from-[#FF4500] to-[#FF6B35] hover:from-[#E03D00] hover:to-[#D25A2B] text-white px-10 py-4 text-xl font-black rounded-full hover:scale-105 transition shadow-[0_0_30px_rgba(255,69,0,0.5)] mb-8">
            {t.orderNow}
          </Link>

          {siteSettings.promoBannerImage && (
            <div className="w-full max-w-xl mt-2 px-4">
              <img 
                src={siteSettings.promoBannerImage} 
                alt="Banner Offer" 
                className="w-full h-auto max-h-[300px] object-cover rounded-3xl border border-[#FF4500]/40 shadow-[0_0_35px_rgba(255,69,0,0.3)] hover:scale-[1.02] transition duration-500" 
              />
            </div>
          )}
        </div>
      </header>

      {/* قسم العروض المميزة */}
      <section className="px-6 py-16 max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center mb-10 border-b border-[#200D12] pb-4">
          <div>
            <h2 className="text-3xl font-black text-[#FFB800] tracking-wide">{t.bestOffers}</h2>
            <p className="text-zinc-400 text-sm mt-1">عروض خاصة لفترة محدودة، جربها دلوقتي!</p>
          </div>
          <Link to="/menu" className="text-[#FF4500] font-bold hover:text-white text-base flex items-center gap-1 transition">
            {t.seeMore}
          </Link>
        </div>

        {offerItems.length > 0 ? (
          <div className="relative overflow-hidden px-2">
            {offerItems.length > 3 && (
              <>
                <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#14080B] border border-[#FF4500]/40 text-[#FF4500] w-12 h-12 rounded-full font-black text-xl flex items-center justify-center shadow-2xl hover:bg-[#FF4500] hover:text-white transition">❮</button>
                <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#14080B] border border-[#FF4500]/40 text-[#FF4500] w-12 h-12 rounded-full font-black text-xl flex items-center justify-center shadow-2xl hover:bg-[#FF4500] hover:text-white transition">❯</button>
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
                    className="bg-[#12080B] border border-[#220E13] rounded-3xl overflow-hidden shadow-2xl hover:border-[#FF4500] transition-all duration-500 group flex flex-col relative pt-8 hover:-translate-y-1"
                  >
                    {item.discount > 0 && (
                      <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FF4500] text-white text-center py-2 font-black text-sm md:text-base shadow-lg tracking-wider">
                        ⚡ خصم دمار {item.discount}% ⚡
                      </div>
                    )}
                    <div onClick={() => handleOpenItemDetails(item)} className="w-full h-[280px] bg-[#0A0506] overflow-hidden relative cursor-pointer">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <div className="p-5 flex items-center justify-between bg-[#14080B] border-t border-[#220E13]">
                      <div>
                        <h4 className="font-extrabold text-xl text-white group-hover:text-[#FFB800] transition">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          {item.discount > 0 ? (
                            <>
                              <span className="text-zinc-500 line-through text-sm font-bold">{item.price} ج</span>
                              <span className="text-[#FFB800] font-black text-xl">{finalPrice} ج</span>
                            </>
                          ) : (
                            <span className="text-[#FFB800] font-black text-xl">{item.price} ج</span>
                          )}
                        </div>
                      </div>
                      
                      {quantity === 0 ? (
                        <button onClick={() => handleOpenItemDetails(item)} className="bg-[#FF4500] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md hover:bg-[#E03D00] transition active:scale-95">
                          اطلب 🛒
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#0A0506] border border-[#FF4500] rounded-2xl px-3 py-1.5 gap-3">
                          <button onClick={() => {
                            const idx = cart.findIndex(i => i.name === item.name);
                            if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); }
                          }} className="text-[#FF4500] font-black text-lg px-1 hover:text-white">-</button>
                          <span className="font-black text-white">{quantity}</span>
                          <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="text-[#FF4500] font-black text-lg px-1 hover:text-white">+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center text-zinc-500 py-12 bg-[#12080B] rounded-3xl border border-[#220E13]">لا توجد عروض رئيسية حالياً.</div>
      )}
      </section>
    </div>
  );
};

// ================= 2. صفحة المنيو =================
const MenuPage = ({ menuItems, categories, lang, handleOpenBox, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categoriesToShow = selectedCategory === 'الكل' || selectedCategory === 'All'
    ? categories 
    : categories.filter(cat => cat.name === selectedCategory);

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto min-h-screen relative bg-[#0A0506] text-white">
      <h2 className="text-3xl font-black text-[#FFB800] mb-6 border-b border-[#200D12] pb-4">{t.ourMenu}</h2>
      
      {/* الأقسام بتصميم بيلز (Pills) عصرية */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none sticky top-20 bg-[#0A0506]/90 py-4 z-30 backdrop-blur-md">
        <button
          onClick={() => setSelectedCategory(lang === 'ar' ? 'الكل' : 'All')}
          className={`px-7 py-3 rounded-2xl font-extrabold whitespace-nowrap transition-all duration-300 border ${
            selectedCategory === 'الكل' || selectedCategory === 'All'
              ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-[0_0_20px_rgba(255,69,0,0.5)] scale-105' 
              : 'bg-[#12080B] text-zinc-400 border-[#220E13] hover:border-[#FF4500] hover:text-white'
          }`}
        >
          {t.all}
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-7 py-3 rounded-2xl font-extrabold whitespace-nowrap transition-all duration-300 border ${
              selectedCategory === cat.name 
                ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-[0_0_20px_rgba(255,69,0,0.5)] scale-105' 
                : 'bg-[#12080B] text-zinc-400 border-[#220E13] hover:border-[#FF4500] hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {categoriesToShow.length === 0 ? (
        <div className="text-zinc-400 text-center py-20 text-xl">لا توجد أقسام مضافة بعد... ⏳</div>
      ) : (
        <div className="space-y-16">
          {categoriesToShow.map(cat => {
            const catItems = menuItems.filter(item => item.category === cat.name).sort((a, b) => (a.order || 0) - (b.order || 0));
            
            if (catItems.length === 0 && selectedCategory !== 'الكل' && selectedCategory !== 'All') {
              return (
                <div key={cat._id} className="border-b border-[#200D12] pb-10">
                  <h3 className="text-2xl font-black text-[#FFB800] mb-6 border-r-4 border-[#FF4500] pr-3">{cat.name}</h3>
                  <p className="text-zinc-500 text-sm">لا توجد أصناف في هذا القسم حالياً.</p>
                </div>
              );
            }
            if (catItems.length === 0) return null;

            return (
              <div key={cat._id} className="border-b border-[#200D12] pb-14">
                <h3 className="text-2xl font-black text-[#FFB800] mb-8 border-r-4 border-[#FF4500] pr-3 flex items-center gap-3">
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
                        className="bg-[#12080B] border border-[#220E13] rounded-3xl overflow-hidden flex flex-col hover:border-[#FF4500] transition-all duration-500 group shadow-xl relative pt-8 hover:-translate-y-1"
                      >
                        {item.discount > 0 && (
                          <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FF4500] text-white text-center py-2 font-black text-sm md:text-base shadow-lg tracking-wider">
                            ⚡ خصم {item.discount}% ⚡
                          </div>
                        )}
                        <div onClick={() => item.type === 'box' ? handleOpenBox(item) : handleOpenItemDetails(item)} className="w-full h-52 object-cover bg-[#0A0506] overflow-hidden cursor-pointer">
                          <img src={item.image || "https://via.placeholder.com/400x300/12080B/FF4500?text=Bahbah+Burger"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col bg-[#12080B]">
                          <h3 className="text-xl font-extrabold mb-1.5 text-white group-hover:text-[#FFB800] transition">{item.name}</h3>
                          <p className="text-xs text-zinc-400 mb-4 line-clamp-2 leading-relaxed">{item.description || "..."}</p>
                          
                          <div className="flex items-center gap-3 mb-5 mt-auto">
                            {item.discount > 0 ? (
                              <>
                                <span className="text-zinc-500 line-through text-sm font-bold">{item.price} ج</span>
                                <span className="text-[#FFB800] text-2xl font-black">{finalPrice} ج</span>
                              </>
                            ) : (
                              <span className="text-[#FFB800] text-2xl font-black">{item.price} ج</span>
                            )}
                          </div>
                          
                          {item.type === 'box' ? (
                              <button onClick={() => handleOpenBox(item)} className="w-full bg-[#FF4500] text-white font-extrabold py-3 rounded-2xl hover:bg-[#E03D00] transition shadow-md">
                              {t.customizeBox}
                              </button>
                          ) : (
                              quantity === 0 ? (
                                <button onClick={() => handleOpenItemDetails(item)} className="w-full border border-[#FF4500] text-[#FF4500] font-extrabold py-3 rounded-2xl hover:bg-[#FF4500] hover:text-white transition shadow-md">
                                  {t.details} 🛒
                              </button>
                            ) : (
                              <div className="flex items-center justify-between bg-[#0A0506] border border-[#FF4500] rounded-2xl px-4 py-2.5">
                                <span className="text-xs text-[#FF4500] font-bold">الكمية:</span>
                                <div className="flex items-center gap-4">
                                  <button onClick={() => {
                                    const idx = cart.findIndex(i => i.name === item.name);
                                    if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); }
                                  }} className="w-8 h-8 bg-[#12080B] rounded-xl text-[#FF4500] font-black hover:bg-[#FF4500] hover:text-white transition">-</button>
                                  <span className="font-black text-white text-base">{quantity}</span>
                                  <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="w-8 h-8 bg-[#12080B] rounded-xl text-[#FF4500] font-black hover:bg-[#FF4500] hover:text-white transition">+</button>
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

// ================= 3. لوحة التحكم الشاملة =================
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
      image: image || "https://via.placeholder.com/400x300/12080B/FF4500?text=Bahbah+Burger",
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
    <section className="px-6 py-12 max-w-5xl mx-auto min-h-[80vh] bg-[#0A0506] text-white">
      <div className="flex justify-between items-center mb-8 border-b border-[#200D12] pb-4">
        <h2 className="text-3xl font-black text-[#FFB800]">⚙️ لوحة الإدارة الذكية</h2>
        <Link className="text-zinc-400 hover:text-white underline font-bold" to="/menu">{t.menu}</Link>
      </div>

      <div className="bg-[#12080B] p-6 rounded-3xl border border-[#FF4500]/40 mb-8 shadow-xl">
        <h3 className="text-xl font-bold text-[#FFB800] mb-4">🚚 إدارة مناطق التوصيل وأسعارها</h3>
        <form onSubmit={handleAddZone} className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="اسم المنطقة (مثل: الشروق)" 
            value={zoneName} 
            onChange={(e) => setZoneName(e.target.value)}
            className="flex-1 bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white text-sm"
          />
          <input 
            type="number" 
            placeholder="سعر التوصيل (مثل: 30)" 
            value={zoneFee} 
            onChange={(e) => setZoneFee(e.target.value)}
            className="w-full md:w-40 bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white text-sm"
          />
          <button type="submit" className="bg-[#FF4500] text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-[#E03D00] transition shadow cursor-pointer">
            ➕ إضافة منطقة
          </button>
        </form>

        <div className="space-y-3">
          {deliveryZones.length === 0 ? (
            <p className="text-zinc-500 text-sm">لم يتم إضافة مناطق توصيل بعد.</p>
          ) : (
            deliveryZones.map((zone) => (
              <div key={zone._id} className="bg-[#0A0506] border border-[#220E13] px-4 py-3 rounded-2xl flex items-center justify-between text-sm">
                <span className="font-bold text-[#FFB800]">{zone.name} — <span className="text-white">{zone.fee} جنيه</span></span>
                <button onClick={() => handleDeleteZone(zone._id)} className="text-red-400 bg-red-500/10 px-3 py-1.5 rounded-xl font-bold text-xs">✕ مسح</button>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-[#12080B] p-6 rounded-3xl border border-[#FF4500]/40 mb-8 shadow-xl">
        <h3 className="text-xl font-bold text-[#FFB800] mb-4">{t.siteSettings}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm mb-2 text-zinc-300">شعار المطعم (اللوجو)</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-1 text-white text-sm cursor-pointer mb-2" />
            {logoImg && <img src={logoImg} alt="Logo Preview" className="w-20 h-20 object-contain rounded-2xl border border-[#220E13] bg-[#0A0506]" />}
          </div>
          <div>
            <label className="block text-sm mb-2 text-zinc-300">خلفية الهيدر الثابتة فوق</label>
            <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-1 text-white text-sm cursor-pointer mb-2" />
            <img src={heroImg} alt="Hero" className="w-full h-20 object-cover rounded-2xl border border-[#220E13]" />
          </div>

          <div className="md:col-span-2 bg-[#0A0506] p-4 rounded-2xl border border-[#FF4500]/30">
            <label className="block text-sm mb-2 text-[#FFB800] font-bold">🖼️ صورة العرض الكبيرة (البوستر تحت زرار اطلب دلوقتي)</label>
            <input type="file" accept="image/*" onChange={handleBannerImageUpload} className="w-full bg-[#12080B] border border-[#220E13] rounded-2xl p-1 text-white text-sm cursor-pointer mb-2" />
            <div className="flex items-center gap-4 mt-2">
              {bannerImg ? (
                <>
                  <img src={bannerImg} alt="Banner Preview" className="w-40 h-24 object-cover rounded-2xl border border-[#FF4500]" />
                  <button type="button" onClick={() => { setBannerImg(''); }} className="bg-red-600/20 text-red-400 px-4 py-2 rounded-xl text-xs font-bold border border-red-500/30">🗑️ إزالة البوستر</button>
                </>
              ) : (
                <span className="text-zinc-500 text-xs">لا توجد صورة بوستر مفعلة حالياً.</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 text-zinc-300">العنوان بالعربي</label>
            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs mb-1 text-zinc-300">العنوان بالإنجليزي</label>
            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3 text-white text-sm" />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#FF4500] text-white font-bold py-3.5 rounded-2xl hover:bg-[#E03D00] transition shadow">
          💾 حفظ تعديلات اللوجو والواجهة وصورة العرض
        </button>
      </form>

      <div className="bg-[#12080B] p-6 rounded-3xl border border-[#220E13] mb-8 shadow-xl">
        <h3 className="text-xl font-bold text-[#FFB800] mb-4">{t.catManage}</h3>
        <form onSubmit={handleSaveCategory} className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Category Name..." 
            value={catName} 
            onChange={(e) => setCatName(e.target.value)}
            className="flex-1 bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white"
          />
          <button type="submit" className="bg-[#FF4500] text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-[#E03D00] transition shadow">
            {editCatId ? t.save : t.addCat}
          </button>
          {editCatId && (
            <button type="button" onClick={() => { setEditCatId(null); setCatName(''); }} className="bg-zinc-700 text-white px-5 rounded-2xl font-bold">
              {t.cancel}
            </button>
          )}
        </form>

        <div className="space-y-3">
          {categories.map((cat, index) => (
            <div key={cat._id} className="bg-[#0A0506] border border-[#220E13] px-5 py-3.5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 font-bold text-sm">#{index + 1}</span>
                <span className="font-bold text-[#FFB800]">{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => handleMoveCategory(index, 'up')}
                  disabled={index === 0}
                  className={`px-3 py-1.5 rounded-xl text-sm font-bold ${index === 0 ? 'bg-[#12080B] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#220E13]'}`}
                >
                  ◀ تحريك للخارج
                </button>
                <button 
                  type="button" 
                  onClick={() => handleMoveCategory(index, 'down')}
                  disabled={index === categories.length - 1}
                  className={`px-3 py-1.5 rounded-xl text-sm font-bold ${index === categories.length - 1 ? 'bg-[#12080B] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#220E13]'}`}
                >
                  تحريك للداخل ▶
                </button>
                <button onClick={() => handleEditCategoryClick(cat)} className="text-[#FFB800] bg-[#FF4500]/20 px-3 py-1.5 rounded-xl text-xs font-bold">✏️</button>
                <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-400 bg-red-500/10 px-3 py-1.5 rounded-xl text-xs font-bold">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    <form onSubmit={handleSaveItem} className="bg-[#12080B] p-6 rounded-3xl border border-[#220E13] mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-xl">
      <h3 className="md:col-span-2 text-xl font-bold text-[#FFB800] mb-2">{t.itemManage}</h3>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Item Name *</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white" placeholder="Name" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Price *</label>
        <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white" placeholder="Price" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-[#FFB800]">نسبة الخصم % (اختياري)</label>
        <input type="number" placeholder="مثال: 20" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full bg-[#0A0506] border border-[#FF4500]/50 rounded-2xl p-3.5 text-white" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Category *</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white">
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-1 text-white text-sm cursor-pointer" />
      </div>

      <div className="md:col-span-2 bg-[#0A0506] p-4 rounded-2xl border border-[#FF4500]/30 flex items-center gap-3">
        <input 
          type="checkbox" 
          id="isOfferCheck" 
          checked={isOffer} 
          onChange={(e) => setIsOffer(e.target.checked)}
          className="w-5 h-5 accent-[#FF4500] cursor-pointer" 
        />
        <label htmlFor="isOfferCheck" className="text-[#FFB800] font-bold cursor-pointer">
          🔥 عرض في الصفحة الرئيسية (اجعل هذا الصنف يظهر كعرض متحرك في الواجهة)
        </label>
      </div>

      <div>
        <label className="block text-sm mb-2 text-zinc-300">Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white">
          <option value="normal">Normal (سندوتش أو وجبة عادية)</option>
          <option value="box">Box (بوكس مخصص قابل للاختيار)</option>
        </select>
      </div>

      {type === 'box' && (
        <div>
          <label className="block text-sm mb-2 text-[#FFB800]">Max Items in Box *</label>
          <input type="number" value={maxItems} onChange={(e) => setMaxItems(e.target.value)} className="w-full bg-[#0A0506] border border-[#FF4500]/50 rounded-2xl p-3.5 text-white" placeholder="3" />
        </div>
      )}

      {type === 'box' && (
        <div className="md:col-span-2 bg-[#0A0506] p-4 rounded-2xl border border-[#FF4500]/40">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">📦 أسماء المكونات التي تظهر داخل البوكس</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم المكون" 
              value={boxItemNameInput} 
              onChange={(e) => setBoxItemNameInput(e.target.value)}
              className="flex-1 bg-[#12080B] border border-[#220E13] rounded-2xl p-3 text-white text-sm"
            />
            <button type="button" onClick={handleAddBoxItemName} className="bg-[#FF4500] text-white px-5 rounded-2xl font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة
            </button>
          </div>

          {boxItemsList.length > 0 && (
            <div className="space-y-2 mt-2">
              {boxItemsList.map((bItem, index) => (
                <div key={index} className="flex justify-between items-center bg-[#0A0506] px-3.5 py-2 rounded-xl border border-[#220E13] text-sm">
                  <span className="text-[#FFB800] font-bold">{bItem.name}</span>
                  <button type="button" onClick={() => handleRemoveBoxItemName(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="md:col-span-2 bg-[#0A0506] p-4 rounded-2xl border border-[#FF4500]/40">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">⚖️ أحجام الصنف وأسعارها (مثل: كيلو، نص، ربع)</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم الحجم (مثل: كبير)" 
              value={sizeNameInput} 
              onChange={(e) => setSizeNameInput(e.target.value)}
              className="flex-1 bg-[#12080B] border border-[#220E13] rounded-2xl p-3 text-white text-sm"
            />
            <input 
              type="number" 
              placeholder="السعر (مثل: 400)" 
              value={sizePriceInput} 
              onChange={(e) => setSizePriceInput(e.target.value)}
              className="w-32 bg-[#12080B] border border-[#220E13] rounded-2xl p-3 text-white text-sm"
            />
            <button type="button" onClick={handleAddSize} className="bg-[#FF4500] text-white px-5 rounded-2xl font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة حجم
            </button>
          </div>

          {sizesList.length > 0 && (
            <div className="space-y-2 mt-2">
              {sizesList.map((sz, index) => (
                <div key={index} className="flex justify-between items-center bg-[#0A0506] px-3.5 py-2 rounded-xl border border-[#220E13] text-sm">
                  <span className="text-[#FFB800] font-bold">{sz.name} — {sz.price} ج</span>
                  <button type="button" onClick={() => handleRemoveSize(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="md:col-span-2 bg-[#0A0506] p-4 rounded-2xl border border-[#220E13]">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">✨ الإضافات الاختيارية</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم الإضافة (مثلاً: إضافة جبنة)" 
              value={addonName} 
              onChange={(e) => setAddonName(e.target.value)}
              className="flex-1 bg-[#12080B] border border-[#220E13] rounded-2xl p-3 text-white text-sm"
            />
            <input 
              type="number" 
              placeholder="السعر (مثلاً: 10)" 
              value={addonPrice} 
              onChange={(e) => setAddonPrice(e.target.value)}
              className="w-32 bg-[#12080B] border border-[#220E13] rounded-2xl p-3 text-white text-sm"
            />
            <button type="button" onClick={handleAddAddon} className="bg-[#FF4500] text-white px-5 rounded-2xl font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة
            </button>
          </div>

          {addonsList.length > 0 && (
            <div className="space-y-2 mt-2">
              {addonsList.map((addon, index) => (
                <div key={index} className="flex justify-between items-center bg-[#0A0506] px-3.5 py-2 rounded-xl border border-[#220E13] text-sm">
                  <span>{addon.name} (+{addon.price} ج)</span>
                  <button type="button" onClick={() => handleRemoveAddon(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="md:col-span-2">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">Description *</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white" placeholder="Description..." />
      </div>

      <div className="md:col-span-2 mt-4 flex gap-4">
          <button type="submit" className="flex-1 bg-[#FF4500] text-white font-bold py-4 rounded-2xl hover:bg-[#E03D00] transition shadow">
            {editId ? t.save : t.addItem}
          </button>
          {editId && (
            <button type="button" onClick={resetForm} className="bg-zinc-700 text-white px-6 rounded-2xl font-bold">
              {t.cancel}
            </button>
          )}
      </div>
    </form>

    <div className="space-y-10 mt-10">
      <h3 className="text-2xl font-bold text-[#FFB800] border-b border-[#200D12] pb-3">📋 إدارة وترتيب الأصناف حسب الأقسام</h3>
        
      {categories.map(cat => {
        const catItems = menuItems.filter(item => item.category === cat.name).sort((a, b) => (a.order || 0) - (b.order || 0));
          
        return (
          <div key={cat._id} className="bg-[#12080B] border border-[#220E13] rounded-3xl p-6 shadow-xl">
            <h4 className="text-xl font-black text-[#FFB800] mb-4 border-r-4 border-[#FF4500] pr-3">
              📁 قسم: {cat.name} ({catItems.length} صنف)
            </h4>

            {catItems.length === 0 ? (
              <p className="text-zinc-500 text-sm">لا توجد أصناف في هذا القسم حالياً.</p>
            ) : (
              <div className="space-y-3">
                {catItems.map((item, itemIndex) => (
                  <div key={item._id} className="bg-[#0A0506] border border-[#220E13] p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-500 font-bold text-sm">#{itemIndex + 1}</span>
                      <img src={item.image} alt="" className="w-16 h-12 object-cover rounded-xl bg-[#12080B]" />
                      <div>
                        <h4 className="font-bold text-white">
                          {item.name} 
                          {item.discount > 0 && <span className="bg-[#FF4500] text-white text-xs px-2.5 py-0.5 rounded-lg font-black mr-2">خصم {item.discount}%</span>}
                        </h4>
                        <span className="text-xs text-[#FFB800]">
                          {item.discount > 0 ? `${getDiscountedPrice(item.price, item.discount)} ج (بدل ${item.price})` : `${item.price} ج`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        type="button" 
                        onClick={() => handleMoveItem(itemIndex, 'up', catItems)}
                        disabled={itemIndex === 0}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${itemIndex === 0 ? 'bg-[#12080B] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#220E13]'}`}
                      >
                        ▲
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleMoveItem(itemIndex, 'down', catItems)}
                        disabled={itemIndex === catItems.length - 1}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${itemIndex === catItems.length - 1 ? 'bg-[#12080B] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#220E13]'}`}
                      >
                        ▼
                      </button>
                      <button onClick={() => handleEditItemClick(item)} className="text-[#FFB800] bg-[#FF4500]/20 px-4 py-1.5 rounded-xl text-xs font-bold">✏️ تعديل</button>
                      <button onClick={() => handleDeleteItem(item._id)} className="text-red-400 bg-red-500/10 px-4 py-1.5 rounded-xl text-xs font-bold">✕ مسح</button>
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

// ================= 4. صفحة السلة وإدخال بيانات التوصيل =================
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
      <section className="px-6 py-12 max-w-4xl mx-auto min-h-[60vh] bg-[#0A0506] text-white flex flex-col items-center justify-center">
        <div className="bg-[#12080B] border border-[#25D366] rounded-3xl p-10 text-center shadow-[0_0_30px_rgba(37,211,102,0.2)] w-full">
          <div className="text-7xl mb-4">✅</div>
          <h2 className="text-3xl font-black text-[#25D366] mb-4">تم إرسال طلبك بنجاح!</h2>
          <p className="text-xl mb-6 text-zinc-300">رقم الأوردر بتاعك هو:</p>
          <div className="bg-[#0A0506] border-2 border-[#FFB800] text-[#FFB800] text-4xl font-black py-4 px-8 rounded-2xl inline-block mb-8 tracking-widest shadow-lg">
            {placedOrderId}
          </div>
          <p className="text-sm text-zinc-400 mb-8">تم تحويلك للواتساب لإرسال الطلب للمطعم.</p>
          <button 
            onClick={() => setPlacedOrderId(null)} 
            className="text-white bg-[#FF4500] hover:bg-[#E03D00] px-8 py-3.5 rounded-2xl font-bold transition shadow-lg"
          >
            رجوع للسلة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto min-h-screen bg-[#0A0506] text-white">
      <h2 className="text-3xl font-black text-[#FFB800] mb-8 border-b border-[#200D12] pb-4">{t.cart}</h2>
      
      {cart.length === 0 ? (
        <div className="border border-[#220E13] bg-[#12080B] rounded-3xl p-12 text-center shadow-2xl">
          <div className="text-zinc-600 text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-zinc-400 mb-4">{t.emptyCart}</h2>
          <Link to="/menu" className="text-[#FF4500] underline hover:text-white font-bold">{t.backToMenu}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#12080B] rounded-3xl p-6 border border-[#220E13] shadow-xl">
            <h3 className="text-xl font-bold text-[#FFB800] mb-4">محتويات السلة</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {groupedCart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-[#220E13] pb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">{item.name}</h4>
                    <p className="text-[#FFB800] font-bold text-sm">{item.price * item.quantity} ج</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#0A0506] border border-[#220E13] rounded-2xl px-2.5 py-1 gap-3">
                      <button onClick={() => handleDecrease(item.name)} className="text-[#FF4500] font-black text-lg hover:text-white">-</button>
                      <span className="font-black text-white">{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.name)} className="text-[#FF4500] font-black text-lg hover:text-white">+</button>
                    </div>
                    
                    <button onClick={() => handleRemoveCompletely(item.name)} className="text-red-400 bg-red-500/10 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-500/20">❌</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#220E13] space-y-2 text-sm text-zinc-300">
              <div className="flex justify-between"><span>سعر الأصناف:</span><span className="font-bold text-white">{itemsTotal} ج</span></div>
              {orderType === 'delivery' && (
                <div className="flex justify-between"><span>سعر التوصيل:</span><span className="font-bold text-[#FFB800]">{deliveryFee} ج</span></div>
              )}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-[#FF4500] flex justify-between items-center">
            <span className="text-lg font-bold">{t.total}</span>
            <span className="text-2xl font-black text-[#FFB800]">{grandTotal} جنيه</span>
          </div>
        </div>

        <div className="bg-[#12080B] rounded-3xl p-6 border border-[#220E13] flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FFB800] mb-2">بيانات التوصيل والاستلام</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button 
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-3.5 rounded-2xl font-bold text-sm transition ${orderType === 'delivery' ? 'bg-[#FF4500] text-white border border-[#FF4500] shadow-md' : 'bg-[#0A0506] text-zinc-400 border border-[#220E13]'}`}
              >
                🛵 توصيل دليفري
              </button>
              <button 
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-3.5 rounded-2xl font-bold text-sm transition ${orderType === 'pickup' ? 'bg-[#FF4500] text-white border border-[#FF4500] shadow-md' : 'bg-[#0A0506] text-zinc-400 border border-[#220E13]'}`}
              >
                🏪 استلام من الفرع
              </button>
          </div>

          <div>
            <label className="block text-xs text-zinc-300 mb-1">الاسم الكامل *</label>
            <input type="text" placeholder="اكتب اسمك..." value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-zinc-300 mb-1">رقم التليفون (11 رقم) *</label>
            <input type="text" maxLength="11" placeholder="010xxxxxxxx" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white text-sm tracking-wider" />
          </div>

          {orderType === 'delivery' && (
            <>
              <div>
                <label className="block text-xs text-zinc-300 mb-1">اختر منطقة التوصيل *</label>
                <select 
                  value={selectedZone ? selectedZone._id : ''}
                  onChange={(e) => {
                    const zone = deliveryZones.find(z => z._id === e.target.value);
                    setSelectedZone(zone);
                  }}
                  className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white text-sm cursor-pointer"
                >
                  {deliveryZones.map(zone => (
                    <option key={zone._id} value={zone._id}>
                      {zone.name} ({zone.fee} جنيه)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-300 mb-1">العنوان بالتفصيل *</label>
                <textarea rows="2" placeholder="الشارع، رقم العمارة، الدور..." value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full bg-[#0A0506] border border-[#220E13] rounded-2xl p-3.5 text-white text-sm" />
              </div>
            </>
          )}
        </div>

        <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-black font-black text-lg py-4 rounded-2xl hover:bg-[#20bd5a] transition mt-6 flex items-center justify-center gap-2 shadow-xl cursor-pointer">
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
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#0A0506] text-white font-sans flex flex-col justify-between relative selection:bg-[#FF4500] selection:text-white">
      {/* النافبار العصرية */}
      <nav className="bg-[#12080B]/90 border-b border-[#FF4500]/30 sticky top-0 z-50 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-3.5 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center cursor-pointer select-none">
            {siteSettings.logoImage ? (
              <img src={siteSettings.logoImage} alt="Logo" style={{ height: '70px', width: 'auto' }} className="object-contain hover:scale-105 transition duration-300" />
            ) : (
              <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFB800] tracking-tighter">Bahbah Burger</span>
            )}
          </Link>
          
          <ul className="hidden md:flex gap-3 text-base font-bold">
            <li><Link to="/" className="bg-[#0A0506] hover:bg-[#FF4500] text-zinc-300 hover:text-white border border-[#220E13] px-6 py-2.5 rounded-2xl transition shadow">{t.home}</Link></li>
            <li><Link to="/menu" className="bg-[#0A0506] hover:bg-[#FF4500] text-zinc-300 hover:text-white border border-[#220E13] px-6 py-2.5 rounded-2xl transition shadow">{t.menu}</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-center border-l border-[#220E13] pl-4 ml-2">
              <span className="text-[#FF4500] text-[10px] font-black tracking-widest">{t.hotlineText}</span>
              <span className="text-white font-bold text-sm tracking-wider">01042281510</span>
            </div>
            
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
              className="bg-[#0A0506] text-zinc-300 border border-[#220E13] px-3.5 py-2 rounded-2xl text-sm font-extrabold hover:text-white hover:border-[#FF4500] transition"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            <Link to="/cart" className="flex items-center gap-2.5 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] text-white px-6 py-3 rounded-2xl font-black hover:scale-105 transition shadow-[0_0_20px_rgba(255,69,0,0.4)]">
              <span>🛒 {t.cart}</span>
              <span className="bg-[#0A0506] text-[#FFB800] px-2 py-0.5 rounded-full text-xs font-black">{cart.length}</span>
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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="bg-[#12080B] border border-[#FF4500]/50 rounded-3xl w-full max-w-lg p-8 relative shadow-2xl">
            <button onClick={() => setSelectedItemDetail(null)} className="absolute top-5 left-5 text-red-400 text-xl font-bold bg-red-500/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-500/20">✕</button>
            <h3 className="text-3xl font-black text-white mb-6">{selectedItemDetail.name}</h3>
              
            {selectedItemDetail.sizes && selectedItemDetail.sizes.length > 0 && (
              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-extrabold text-[#FFB800]">اختر الحجم:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedItemDetail.sizes.map((sz, idx) => {
                    const finalSzPrice = getDiscountedPrice(sz.price, selectedItemDetail.discount);
                    return (
                      <div key={idx} onClick={() => setSelectedSize(sz)} className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center justify-center transition ${selectedSize === sz ? 'bg-[#FF4500]/20 border-[#FF4500] text-[#FFB800] shadow-md' : 'bg-[#0A0506] border-[#220E13] text-zinc-300'}`}>
                        <span className="font-bold">{sz.name}</span>
                        {selectedItemDetail.discount > 0 ? (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-zinc-500 line-through font-bold">{sz.price} ج</span>
                            <span className="text-sm font-black text-[#FFB800]">{finalSzPrice} ج</span>
                          </div>
                        ) : (
                          <span className="text-sm font-black text-[#FFB800]">{sz.price} ج</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedItemDetail.addons && selectedItemDetail.addons.length > 0 && (
              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-extrabold text-[#FFB800]">✨ الإضافات الاختيارية:</h4>
                <div className="flex flex-col gap-3">
                    
                  <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition ${!selectedAddon ? 'bg-[#FF4500]/20 border-[#FF4500] text-[#FFB800]' : 'bg-[#0A0506] border-[#220E13] text-zinc-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="addon" checked={!selectedAddon} onChange={() => setSelectedAddon(null)} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!selectedAddon ? 'border-[#FF4500]' : 'border-[#220E13]'}`}>
                        {!selectedAddon && <div className="w-2.5 h-2.5 bg-[#FF4500] rounded-full"></div>}
                      </div>
                      <span className="font-bold text-sm">بدون إضافات</span>
                    </div>
                    <span className="text-sm font-black">+0 ج</span>
                  </label>

                  {selectedItemDetail.addons.map((addon, idx) => (
                    <label key={idx} className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition ${selectedAddon === addon ? 'bg-[#FF4500]/20 border-[#FF4500] text-[#FFB800]' : 'bg-[#0A0506] border-[#220E13] text-zinc-300'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="addon" checked={selectedAddon === addon} onChange={() => setSelectedAddon(addon)} className="hidden" />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddon === addon ? 'border-[#FF4500]' : 'border-[#220E13]'}`}>
                          {selectedAddon === addon && <div className="w-2.5 h-2.5 bg-[#FF4500] rounded-full"></div>}
                        </div>
                        <span className="font-bold text-sm">{addon.name}</span>
                      </div>
                      <span className="text-sm font-black text-[#FFB800]">+{addon.price} ج</span>
                    </label>
                  ))}

                </div>
              </div>
            )}
            <button onClick={handleAddCustomizedItemToCart} className="w-full bg-[#FF4500] text-white font-black py-4 rounded-2xl hover:bg-[#E03D00] transition text-lg shadow-xl">
              أضف للسلة • {currentItemTotalPrice} ج
            </button>
          </div>
        </div>
      )}

      {isBoxModalOpen && activeBox && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="bg-[#12080B] border border-[#FF4500]/50 rounded-3xl w-full max-w-lg p-8 relative shadow-2xl">
            <button onClick={() => setIsBoxModalOpen(false)} className="absolute top-5 left-5 text-red-400 text-xl font-bold bg-red-500/10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-500/20">✕</button>
              
            <h3 className="text-3xl font-black text-[#FFB800] mb-1">{activeBox.name}</h3>
            <p className="text-zinc-300 mb-6 border-b border-[#220E13] pb-4 text-sm">
              اختر {activeBox.maxItems} أصناف. 
              <span className={`block mt-1 font-extrabold text-base ${totalSelected === activeBox.maxItems ? 'text-green-400' : 'text-[#FFB800]'}`}>
                تم اختيار: ({totalSelected} / {activeBox.maxItems})
              </span>
            </p>

            <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-1">
              {activeBox.boxItems && activeBox.boxItems.map((bItem, idx) => (
                <div key={idx} className="flex justify-between items-center bg-[#0A0506] p-4 rounded-2xl border border-[#220E13]">
                  <span className="font-bold text-base text-white">{bItem.name}</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleUpdateSelection(bItem.name, 'remove')} className="w-9 h-9 bg-[#12080B] rounded-xl text-[#FF4500] font-black text-lg hover:bg-[#FF4500] hover:text-white transition">-</button>
                    <span className="text-xl w-6 text-center font-black text-white">{boxSelections[bItem.name] || 0}</span>
                    <button onClick={() => handleUpdateSelection(bItem.name, 'add')} className="w-9 h-9 bg-[#12080B] rounded-xl text-[#FF4500] font-black text-lg hover:bg-[#FF4500] hover:text-white transition">+</button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleAddBoxToCart} disabled={totalSelected !== activeBox.maxItems} className={`w-full py-4 rounded-2xl font-black text-lg transition ${totalSelected === activeBox.maxItems ? 'bg-[#FF4500] text-white hover:bg-[#E03D00] cursor-pointer shadow-xl' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <footer onClick={handleSecretLogoClick} className="bg-[#12080B] border-t border-[#220E13] mt-24 text-zinc-400 py-8 text-center text-xs cursor-default select-none">
        جميع الحقوق محفوظة © 2026 بحبح برجر — Bahbah Burger
      </footer>
    </div>
  );
}

export default App;