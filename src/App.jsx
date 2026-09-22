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

// ================= 1. صفحة الرئيسية (ستايل بيلو جراوند حديث ومميز) =================
const HomePage = ({ lang, siteSettings, menuItems, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const title = lang === 'ar' ? siteSettings.heroTitleAr : siteSettings.heroTitleEn;
  const offerItems = menuItems.filter(item => item.isOffer);

  return (
    <div className="bg-[#030203] min-h-screen text-white">
      {/* Hero Section بتصميم Split Screen فخم ومختلف تماماً */}
      <header className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-zinc-900 px-6 py-12">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 filter blur-sm"
          style={{ backgroundImage: `url(${siteSettings.heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030203] via-[#030203]/90 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-right">
            <span className="inline-block bg-[#FF4500]/10 border border-[#FF4500]/40 text-[#FFB800] px-4 py-2 rounded-xl text-sm font-black tracking-wider">
              🍔 برجر لحم وستريت فود حقيقي
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
              {title}
            </h1>
            <p className="text-zinc-400 text-lg max-w-lg">
              انسى أي طعم تاني، وعيش تجربة البرجر الأصلي بأعلى جودة وصوصات خاصة بينا لوحدنا.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/menu" className="bg-[#FF4500] hover:bg-[#e03d00] text-white px-8 py-4 text-lg font-black rounded-2xl shadow-xl transition transform hover:-translate-y-1">
                {t.orderNow}
              </Link>
            </div>
          </div>

          {siteSettings.promoBannerImage && (
            <div className="relative hidden lg:block">
              <img 
                src={siteSettings.promoBannerImage} 
                alt="Promo Banner" 
                className="w-full h-[400px] object-cover rounded-3xl border-2 border-[#FF4500]/30 shadow-2xl rotate-1 hover:rotate-0 transition duration-500"
              />
            </div>
          )}
        </div>
      </header>

      {/* قسم العروض النارية بستايل شبكي عصري */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-zinc-900 pb-6">
          <div>
            <span className="text-[#FF4500] font-black tracking-widest text-sm uppercase">Hot Deals</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-1">{t.bestOffers}</h2>
          </div>
          <Link to="/menu" className="text-zinc-400 hover:text-[#FF4500] font-bold text-sm transition">
            {t.seeMore}
          </Link>
        </div>

        {offerItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerItems.slice(0, 3).map((item) => {
              const finalPrice = getDiscountedPrice(item.price, item.discount);
              const cartItem = cart.find(i => i.name === item.name);
              const quantity = cartItem ? cart.filter(i => i.name === item.name).length : 0;

              return (
                <div 
                  key={item._id} 
                  className="bg-[#0A0708] border border-zinc-900 rounded-3xl overflow-hidden hover:border-[#FF4500]/60 transition-all duration-300 flex flex-col group shadow-2xl"
                >
                  <div onClick={() => handleOpenItemDetails(item)} className="w-full h-64 bg-black overflow-hidden relative cursor-pointer">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    {item.discount > 0 && (
                      <span className="absolute top-4 right-4 bg-[#FF4500] text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg">
                        خصم {item.discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-black text-xl text-white group-hover:text-[#FFB800] transition">{item.name}</h4>
                      <p className="text-zinc-400 text-xs mt-2 line-clamp-2">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-900/80">
                      <div>
                        {item.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-600 line-through text-xs font-bold">{item.price} ج</span>
                            <span className="text-[#FFB800] font-black text-2xl">{finalPrice} ج</span>
                          </div>
                        ) : (
                          <span className="text-[#FFB800] font-black text-2xl">{item.price} ج</span>
                        )}
                      </div>

                      {quantity === 0 ? (
                        <button onClick={() => handleOpenItemDetails(item)} className="bg-[#FF4500] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#e03d00] transition">
                          اطلب 🛒
                        </button>
                      ) : (
                        <div className="flex items-center bg-black border border-zinc-800 rounded-xl px-3 py-1 gap-3">
                          <button onClick={() => {
                            const idx = cart.findIndex(i => i.name === item.name);
                            if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); }
                          }} className="text-[#FF4500] font-black text-lg">-</button>
                          <span className="font-black text-white text-sm">{quantity}</span>
                          <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="text-[#FF4500] font-black text-lg">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-zinc-600 py-12 bg-[#0A0708] rounded-3xl border border-zinc-900">لا توجد عروض حالياً.</div>
        )}
      </section>
    </div>
  );
};

// ================= 2. صفحة المنيو (تصميم عصري متطور جداً) =================
const MenuPage = ({ menuItems, categories, lang, handleOpenBox, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categoriesToShow = selectedCategory === 'الكل' || selectedCategory === 'All'
    ? categories 
    : categories.filter(cat => cat.name === selectedCategory);

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto min-h-screen bg-[#030203] text-white">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-white tracking-tight">{t.ourMenu}</h2>
        <p className="text-zinc-400 text-sm mt-1">اختر وجبتك المفضلة واستمتع بالطعم الأصلي</p>
      </div>
      
      {/* تاب الأقسام بشكل عصري شيك جداً */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none">
        <button
          onClick={() => setSelectedCategory(lang === 'ar' ? 'الكل' : 'All')}
          className={`px-6 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
            selectedCategory === 'الكل' || selectedCategory === 'All'
              ? 'bg-[#FF4500] text-white shadow-lg shadow-[#FF4500]/30' 
              : 'bg-[#0A0708] text-zinc-400 border border-zinc-900 hover:text-white'
          }`}
        >
          {t.all}
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-6 py-3 rounded-2xl font-black text-sm whitespace-nowrap transition-all ${
              selectedCategory === cat.name 
                ? 'bg-[#FF4500] text-white shadow-lg shadow-[#FF4500]/30' 
                : 'bg-[#0A0708] text-zinc-400 border border-zinc-900 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {categoriesToShow.length === 0 ? (
        <div className="text-zinc-500 text-center py-20 text-lg">لا توجد أقسام متاحة حالياً.</div>
      ) : (
        <div className="space-y-16">
          {categoriesToShow.map(cat => {
            const catItems = menuItems.filter(item => item.category === cat.name).sort((a, b) => (a.order || 0) - (b.order || 0));
            if (catItems.length === 0) return null;

            return (
              <div key={cat._id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black text-[#FFB800]">{cat.name}</h3>
                  <div className="flex-1 h-[1px] bg-zinc-900"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {catItems.map(item => {
                    const finalPrice = getDiscountedPrice(item.price, item.discount);
                    const cartItem = cart.find(i => i.name === item.name);
                    const quantity = cartItem ? cart.filter(i => i.name === item.name).length : 0;

                    return (
                      <div 
                        key={item._id} 
                        className="bg-[#0A0708] border border-zinc-900 rounded-3xl overflow-hidden flex flex-col hover:border-[#FF4500]/50 transition-all group shadow-xl"
                      >
                        <div onClick={() => item.type === 'box' ? handleOpenBox(item) : handleOpenItemDetails(item)} className="w-full h-56 bg-black overflow-hidden relative cursor-pointer">
                          <img src={item.image || "https://via.placeholder.com/400x300"} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          {item.discount > 0 && (
                            <span className="absolute top-3 right-3 bg-[#FF4500] text-white text-xs font-black px-2.5 py-1 rounded-lg">
                              -{item.discount}%
                            </span>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-lg font-black text-white group-hover:text-[#FFB800] transition">{item.name}</h4>
                            <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{item.description}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-900">
                            <div>
                              {item.discount > 0 ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-zinc-600 line-through text-xs">{item.price} ج</span>
                                  <span className="text-[#FFB800] font-black text-2xl">{finalPrice} ج</span>
                                </div>
                              ) : (
                                <span className="text-[#FFB800] font-black text-2xl">{item.price} ج</span>
                              )}
                            </div>
                            
                            {item.type === 'box' ? (
                              <button onClick={() => handleOpenBox(item)} className="bg-[#FF4500] text-white font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-[#e03d00] transition">
                                {t.customizeBox}
                              </button>
                            ) : (
                              quantity === 0 ? (
                                <button onClick={() => handleOpenItemDetails(item)} className="bg-zinc-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-[#FF4500] transition">
                                  {t.details}
                                </button>
                              ) : (
                                <div className="flex items-center bg-black border border-zinc-800 rounded-xl px-3 py-1 gap-3">
                                  <button onClick={() => {
                                    const idx = cart.findIndex(i => i.name === item.name);
                                    if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); }
                                  }} className="text-[#FF4500] font-black text-lg">-</button>
                                  <span className="font-black text-white text-sm">{quantity}</span>
                                  <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="text-[#FF4500] font-black text-lg">+</button>
                                </div>
                              )
                            )}
                          </div>
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

  useEffect(() => { fetchZones(); }, []);

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (!zoneName.trim() || !zoneFee) return;
    try {
      const res = await fetch(`${API_BASE}/api/zones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: zoneName.trim(), fee: Number(zoneFee) })
      });
      if (res.ok) { setZoneName(''); setZoneFee(''); fetchZones(); }
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
      reader.onload = (event) => setHeroImg(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setBannerImg(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogoImg(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImage: heroImg, heroTitleAr: titleAr, heroTitleEn: titleEn, logoImage: logoImg, promoBannerImage: bannerImg })
      });
      if (res.ok) { alert("تم التحديث بنجاح!"); fetchSettings(); }
    } catch (err) {}
  };

  const [catName, setCatName] = useState('');
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!catName.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catName.trim() })
      });
      if (res.ok) { setCatName(''); fetchCategories(); }
    } catch (err) {}
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("حذف القسم؟")) return;
    try {
      const res = await fetch(`${API_BASE}/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCategories();
    } catch (err) {}
  };

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || '');
  const [type, setType] = useState('normal');
  const [maxItems, setMaxItems] = useState('');
  const [isOffer, setIsOffer] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const itemData = {
      name, price: Number(price), discount: Number(discount) || 0,
      image: image || "https://via.placeholder.com/400x300",
      description, category: category || categories[0]?.name || 'عام', type,
      maxItems: type === 'box' ? Number(maxItems) : undefined, isOffer
    };
    try {
      const res = await fetch(`${API_BASE}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });
      if (res.ok) {
        setName(''); setPrice(''); setDiscount(''); setImage(''); setDescription('');
        fetchItems(); alert("تم حفظ الصنف بنجاح!");
      }
    } catch (err) {}
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("حذف الصنف؟")) return;
    try {
      const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (err) {}
  };

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto min-h-screen bg-[#030203] text-white">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-4">
        <h2 className="text-3xl font-black text-[#FFB800]">⚙️ لوحة الإدارة الذكية</h2>
        <Link to="/menu" className="text-zinc-400 hover:text-white font-bold underline">المنيو</Link>
      </div>

      <div className="bg-[#0A0708] p-8 rounded-3xl border border-zinc-900 mb-8 shadow-xl space-y-6">
        <h3 className="text-xl font-bold text-[#FFB800]">🚚 إدارة مناطق التوصيل</h3>
        <form onSubmit={handleAddZone} className="flex gap-4">
          <input type="text" placeholder="اسم المنطقة" value={zoneName} onChange={(e) => setZoneName(e.target.value)} className="flex-1 bg-black border border-zinc-800 rounded-2xl p-3.5 text-white text-sm" />
          <input type="number" placeholder="السعر" value={zoneFee} onChange={(e) => setZoneFee(e.target.value)} className="w-32 bg-black border border-zinc-800 rounded-2xl p-3.5 text-white text-sm" />
          <button type="submit" className="bg-[#FF4500] px-6 rounded-2xl font-bold text-sm">إضافة</button>
        </form>
        <div className="space-y-2">
          {deliveryZones.map(zone => (
            <div key={zone._id} className="flex justify-between items-center bg-black p-3.5 rounded-xl border border-zinc-900 text-sm">
              <span>{zone.name} — <strong className="text-[#FFB800]">{zone.fee} ج</strong></span>
              <button onClick={() => handleDeleteZone(zone._id)} className="text-red-400 font-bold text-xs">✕ مسح</button>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-[#0A0708] p-8 rounded-3xl border border-zinc-900 mb-8 shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-[#FFB800]">🖼️ إعدادات الموقع والواجهة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">اللوجو</label>
            <input type="file" onChange={handleLogoUpload} className="w-full bg-black border border-zinc-800 rounded-xl p-2 text-xs" />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">صورة الهيدر الكبيرة</label>
            <input type="file" onChange={handleHeroImageUpload} className="w-full bg-black border border-zinc-800 rounded-xl p-2 text-xs" />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">العنوان بالعربي</label>
            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">العنوان بالإنجليزي</label>
            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white" />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#FF4500] py-3.5 rounded-2xl font-bold text-sm">حفظ التعديلات العامة</button>
      </form>

      <div className="bg-[#0A0708] p-8 rounded-3xl border border-zinc-900 mb-8 shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-[#FFB800]">📁 إدارة الأقسام</h3>
        <form onSubmit={handleSaveCategory} className="flex gap-4">
          <input type="text" placeholder="اسم القسم الجديد" value={catName} onChange={(e) => setCatName(e.target.value)} className="flex-1 bg-black border border-zinc-800 rounded-2xl p-3.5 text-white text-sm" />
          <button type="submit" className="bg-[#FF4500] px-6 rounded-2xl font-bold text-sm">إضافة قسم</button>
        </form>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <div key={cat._id} className="bg-black border border-zinc-800 px-4 py-2 rounded-xl flex items-center gap-3 text-sm">
              <span>{cat.name}</span>
              <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-400 font-bold">✕</button>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSaveItem} className="bg-[#0A0708] p-8 rounded-3xl border border-zinc-900 shadow-xl space-y-4">
        <h3 className="text-xl font-bold text-[#FFB800]">🍔 إضافة صنف جديد للمنيو</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="اسم الصنف" required value={name} onChange={(e) => setName(e.target.value)} className="bg-black border border-zinc-800 rounded-2xl p-3.5 text-sm text-white" />
          <input type="number" placeholder="السعر" required value={price} onChange={(e) => setPrice(e.target.value)} className="bg-black border border-zinc-800 rounded-2xl p-3.5 text-sm text-white" />
          <input type="number" placeholder="نسبة الخصم % (اختياري)" value={discount} onChange={(e) => setDiscount(e.target.value)} className="bg-black border border-zinc-800 rounded-2xl p-3.5 text-sm text-white" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-black border border-zinc-800 rounded-2xl p-3.5 text-sm text-white">
            {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
          </select>
          <input type="file" onChange={handleImageUpload} className="bg-black border border-zinc-800 rounded-2xl p-2 text-xs text-white" />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="offer" checked={isOffer} onChange={(e) => setIsOffer(e.target.checked)} className="w-5 h-5 accent-[#FF4500]" />
            <label htmlFor="offer" className="text-sm font-bold text-[#FFB800]">عرض رئيسي بالواجهة</label>
          </div>
        </div>
        <textarea placeholder="وصف الصنف..." rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-2xl p-3.5 text-sm text-white"></textarea>
        <button type="submit" className="w-full bg-[#FF4500] py-4 rounded-2xl font-bold">إضافة الصنف للمنيو 🚀</button>
      </form>
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
      .then(data => { setDeliveryZones(data); if (data.length > 0) setSelectedZone(data[0]); })
      .catch(err => {});
  }, []);

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.name === item.name);
    if (existing) existing.quantity += 1;
    else acc.push({ ...item, quantity: 1 });
    return acc;
  }, []);

  const deliveryFee = orderType === 'delivery' && selectedZone ? selectedZone.fee : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return alert("السلة فارغة!");
    if (!customerName.trim()) return alert("اكتب اسمك الكامل.");
    if (!customerPhone.trim() || customerPhone.length !== 11) return alert("رقم التليفون غير صحيح.");
    if (orderType === 'delivery' && !customerAddress.trim()) return alert("اكتب العنوان بالتفصيل.");

    const orderId = 'BB-' + Math.floor(1000 + Math.random() * 9000);
    let message = `🍔 أهلاً بحبح برجر، أوردر جديد!\n🆔 رقم الطلب: #${orderId}\n👤 الاسم: ${customerName}\n📞 التليفون: ${customerPhone}\n`;
    if (orderType === 'delivery') message += `📍 العنوان: ${customerAddress} (${selectedZone?.name})\n`;
    message += `\n🛒 الأصناف:\n`;
    groupedCart.forEach(i => { message += `▪️ ${i.quantity}× ${i.name} (${i.price * i.quantity} ج)\n`; });
    message += `\n💰 الإجمالي النهائي: ${grandTotal} جنيه`;

    window.open(`https://wa.me/201042281510?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]); setPlacedOrderId(orderId);
  };

  if (placedOrderId) {
    return (
      <div className="px-6 py-20 max-w-xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="bg-[#0A0708] border border-[#25D366] p-10 rounded-3xl shadow-2xl">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-black text-[#25D366] mb-2">تم إرسال طلبك بنجاح!</h2>
          <p className="text-zinc-400 mb-6">رقم طلبك: <strong className="text-[#FFB800]">{placedOrderId}</strong></p>
          <button onClick={() => setPlacedOrderId(null)} className="bg-[#FF4500] text-white px-6 py-3 rounded-xl font-bold">العودة للسلة</button>
        </div>
      </div>
    );
  }

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto min-h-screen bg-[#030203] text-white">
      <h2 className="text-3xl font-black text-[#FFB800] mb-8 border-b border-zinc-900 pb-4">{t.cart}</h2>
      {cart.length === 0 ? (
        <div className="bg-[#0A0708] border border-zinc-900 rounded-3xl p-16 text-center">
          <p className="text-zinc-500 text-lg mb-4">{t.emptyCart}</p>
          <Link to="/menu" className="text-[#FF4500] underline font-bold">{t.backToMenu}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0A0708] p-6 rounded-3xl border border-zinc-900 space-y-4">
            <h3 className="font-bold text-lg text-[#FFB800]">محتويات الطلب</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {groupedCart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <div>
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <span className="text-[#FFB800] text-xs font-bold">{item.price * item.quantity} ج</span>
                  </div>
                  <span className="bg-black border border-zinc-800 px-3 py-1 rounded-xl text-xs font-bold">{item.quantity}x</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-zinc-900 flex justify-between text-lg font-black">
              <span>{t.total}</span>
              <span className="text-[#FFB800]">{grandTotal} جنيه</span>
            </div>
          </div>

          <div className="bg-[#0A0708] p-6 rounded-3xl border border-zinc-900 space-y-4">
            <h3 className="font-bold text-lg text-[#FFB800]">بيانات التوصيل</h3>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setOrderType('delivery')} className={`py-3 rounded-xl font-bold text-xs ${orderType === 'delivery' ? 'bg-[#FF4500] text-white' : 'bg-black text-zinc-400'}`}>دليفري 🛵</button>
              <button type="button" onClick={() => setOrderType('pickup')} className={`py-3 rounded-xl font-bold text-xs ${orderType === 'pickup' ? 'bg-[#FF4500] text-white' : 'bg-black text-zinc-400'}`}>استلام من الفرع 🏪</button>
            </div>
            <input type="text" placeholder="الاسم الكامل" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white" />
            <input type="text" maxLength="11" placeholder="رقم الموبايل (11 رقم)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white" />
            {orderType === 'delivery' && (
              <>
                <select value={selectedZone?._id || ''} onChange={(e) => setSelectedZone(deliveryZones.find(z => z._id === e.target.value))} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white">
                  {deliveryZones.map(z => <option key={z._id} value={z._id}>{z.name} ({z.fee} ج)</option>)}
                </select>
                <textarea placeholder="العنوان بالتفصيل..." rows="2" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white"></textarea>
              </>
            )}
            <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-black font-black py-4 rounded-xl text-base shadow-lg">{t.whatsappOrder}</button>
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

  const handleSecretLogoClick = () => {
    setLogoClicks(prev => {
      const nc = prev + 1;
      if (nc === 3) {
        const pass = window.prompt("🔒 كلمة مرور الإدارة:");
        if (pass === "15926") { setIsAuthenticated(true); navigate('/secret-admin-dashboard'); }
        return 0;
      }
      return nc;
    });
  };

  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [activeBox, setActiveBox] = useState(null);
  const [boxSelections, setBoxSelections] = useState({});

  const handleOpenBox = (boxItem) => {
    setActiveBox(boxItem);
    const init = {};
    boxItem.boxItems?.forEach(b => { init[b.name] = 0; });
    setBoxSelections(init);
    setIsBoxModalOpen(true);
  };

  const totalSelected = Object.values(boxSelections).reduce((a, b) => a + b, 0);

  const handleAddBoxToCart = () => {
    if (totalSelected === activeBox.maxItems) {
      const details = Object.entries(boxSelections).filter(([_, c]) => c > 0).map(([n, c]) => `${n}: ${c}`).join(', ');
      setCart([...cart, { ...activeBox, name: `${activeBox.name} (${details})` }]);
      setIsBoxModalOpen(false);
    }
  };

  const handleOpenItemDetailsModal = (item) => {
    const finalPrice = getDiscountedPrice(item.price, item.discount);
    if (item.sizes?.length > 0 || item.addons?.length > 0) {
      setSelectedItemDetail(item);
      setSelectedSize(item.sizes?.[0] || null);
      setSelectedAddon(null);
    } else {
      setCart([...cart, { ...item, price: finalPrice }]);
    }
  };

  const basePrice = selectedSize ? selectedSize.price : (selectedItemDetail?.price || 0);
  const currentItemTotalPrice = getDiscountedPrice(basePrice, selectedItemDetail?.discount) + (selectedAddon?.price || 0);

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#030203] text-white font-sans flex flex-col justify-between selection:bg-[#FF4500] selection:text-white">
      {/* النافبار العصرية العائمة الجديدة تماماً */}
      <nav className="bg-[#0A0708]/90 border-b border-zinc-900 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" onClick={handleSecretLogoClick} className="flex items-center">
            {siteSettings.logoImage ? (
              <img src={siteSettings.logoImage} alt="Logo" className="h-12 w-auto object-contain" />
            ) : (
              <span className="text-2xl font-black text-[#FF4500]">Bahbah Burger</span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8 font-bold text-sm">
            <Link to="/" className="hover:text-[#FF4500] transition">الرئيسية</Link>
            <Link to="/menu" className="hover:text-[#FF4500] transition">المنيو</Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="bg-black border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-bold hover:border-[#FF4500]">
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <Link to="/cart" className="bg-[#FF4500] text-white px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg shadow-[#FF4500]/20">
              <span>🛒 السلة</span>
              <span className="bg-black text-[#FFB800] px-2 py-0.5 rounded-full text-xs">{cart.length}</span>
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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0708] border border-zinc-800 rounded-3xl max-w-md w-full p-6 relative">
            <button onClick={() => setSelectedItemDetail(null)} className="absolute top-4 left-4 text-red-400 font-bold">✕</button>
            <h3 className="text-xl font-black mb-4">{selectedItemDetail.name}</h3>
            <button onClick={() => {
              setCart([...cart, { ...selectedItemDetail, name: selectedItemDetail.name, price: currentItemTotalPrice }]);
              setSelectedItemDetail(null);
            }} className="w-full bg-[#FF4500] text-white py-3 rounded-xl font-bold mt-4">
              إضافة للسلة • {currentItemTotalPrice} ج
            </button>
          </div>
        </div>
      )}

      {isBoxModalOpen && activeBox && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0708] border border-zinc-800 rounded-3xl max-w-md w-full p-6 relative">
            <button onClick={() => setIsBoxModalOpen(false)} className="absolute top-4 left-4 text-red-400 font-bold">✕</button>
            <h3 className="text-xl font-black text-[#FFB800] mb-2">{activeBox.name}</h3>
            <p className="text-xs text-zinc-400 mb-4">اختر {activeBox.maxItems} أصناف (تم اختيار: {totalSelected})</p>
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
              {activeBox.boxItems?.map((b, i) => (
                <div key={i} className="flex justify-between items-center bg-black p-3 rounded-xl text-sm">
                  <span>{b.name}</span>
                  <div className="flex gap-3 items-center">
                    <button onClick={() => setBoxSelections({ ...boxSelections, [b.name]: Math.max(0, boxSelections[b.name] - 1) })} className="text-[#FF4500] font-bold text-lg">-</button>
                    <span>{boxSelections[b.name] || 0}</span>
                    <button onClick={() => {
                      if (totalSelected < activeBox.maxItems) setBoxSelections({ ...boxSelections, [b.name]: (boxSelections[b.name] || 0) + 1 });
                    }} className="text-[#FF4500] font-bold text-lg">+</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleAddBoxToCart} disabled={totalSelected !== activeBox.maxItems} className={`w-full py-3 rounded-xl font-bold ${totalSelected === activeBox.maxItems ? 'bg-[#FF4500] text-white' : 'bg-zinc-800 text-zinc-500'}`}>
              تأكيد وإضافة للسلة
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#0A0708] border-t border-zinc-900 py-6 text-center text-xs text-zinc-500">
        جميع الحقوق محفوظة © 2026 بحبح برجر - Bahbah Burger
      </footer>
    </div>
  );
}

export default App;