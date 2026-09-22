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
    setCurrentIndex(prev => (prev + 1) % (offerItems.length - 2));
  };

  const prevSlide = () => {
    if (offerItems.length <= 3) return;
    setCurrentIndex(prev => (prev === 0 ? offerItems.length - 3 : prev - 1));
  };

  useEffect(() => {
    if (offerItems.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, offerItems.length - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, [offerItems.length]);

  return (
    <main className="bb-home bg-[#090202] text-white overflow-hidden">
      {/* CINEMATIC HERO */}
      <section className="bb-hero relative min-h-[calc(100vh-92px)] flex items-end overflow-hidden border-b border-[#3a0a08]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${siteSettings.heroImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#090202_0%,rgba(9,2,2,.82)_28%,rgba(9,2,2,.2)_68%,rgba(9,2,2,.55)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#090202_0%,transparent_42%,rgba(9,2,2,.15)_100%)]" />
        <div className="absolute right-[-8%] top-[8%] w-[48vw] h-[48vw] max-w-[700px] max-h-[700px] rounded-full border border-[#ff5a1f]/20" />
        <div className="absolute right-[2%] top-[18%] w-[34vw] h-[34vw] max-w-[520px] max-h-[520px] rounded-full border border-[#ff5a1f]/10" />

        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-20">
          <div className="max-w-4xl">
            <div className="bb-kicker mb-5">
              <span className="bb-fire-dot" />
              BAHBAH BURGER <span className="opacity-40">/</span> BEEF • CHICKEN • NASHVILLE
            </div>

            <h1 className="bb-display text-[clamp(4.5rem,12vw,11rem)] leading-[.76] uppercase tracking-[-.07em] max-w-5xl">
              <span className="block text-white">THE</span>
              <span className="block text-[#ff4b16]">FIRE</span>
              <span className="block text-white">{title || 'IS COMING'}</span>
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to="/menu" className="bb-primary-btn">
                {t.orderNow}
                <span className="text-xl">↗</span>
              </Link>
              <Link to="/menu" className="bb-ghost-btn">
                {t.ourMenu}
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-8 text-[10px] md:text-xs font-black tracking-[.24em] text-white/55 uppercase">
              <span>Fresh Every Day</span>
              <span className="h-px w-12 bg-[#ff4b16]/70" />
              <span>Made To Order</span>
            </div>
          </div>
        </div>

        {siteSettings.promoBannerImage && (
          <div className="hidden lg:block absolute z-20 right-[5%] bottom-[8%] w-[320px] xl:w-[390px] rotate-[-3deg] bb-poster">
            <img src={siteSettings.promoBannerImage} alt="Bahbah offer" className="w-full h-auto object-cover" />
            <span className="bb-poster-label">HOT DROP</span>
          </div>
        )}

        <div className="absolute bottom-5 left-6 md:left-12 text-[9px] tracking-[.35em] text-white/30 font-black uppercase">
          SCROLL TO EAT ↓
        </div>
      </section>

      {/* OFFERS — EDITORIAL, NOT CARD GRID */}
      <section className="relative py-20 md:py-28 px-5 md:px-10 max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="bb-section-no">01 / HOT DROPS</div>
            <h2 className="bb-section-title">{t.bestOffers}</h2>
          </div>
          <Link to="/menu" className="bb-arrow-link">{t.seeMore} <span>↗</span></Link>
        </div>

        {offerItems.length > 0 ? (
          <div className="relative">
            {offerItems.length > 3 && (
              <div className="absolute -top-20 right-0 flex gap-2 z-20">
                <button onClick={prevSlide} className="bb-square-btn">←</button>
                <button onClick={nextSlide} className="bb-square-btn">→</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {offerItems.slice(currentIndex, currentIndex + 3).map((item, idx) => {
                const finalPrice = getDiscountedPrice(item.price, item.discount);
                const quantity = cart.filter(i => i.name === item.name).length;

                return (
                  <article
                    key={item._id}
                    className={`bb-offer-card group ${idx === 1 ? 'md:translate-y-10' : ''}`}
                    onClick={() => handleOpenItemDetails(item)}
                  >
                    <div className="relative h-[420px] md:h-[500px] overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                      {item.discount > 0 && <span className="bb-discount">{item.discount}% OFF</span>}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                        <div className="text-[#ff5a1f] text-[10px] tracking-[.28em] font-black uppercase mb-2">BAHBAH SPECIAL</div>
                        <h3 className="text-2xl md:text-3xl font-black leading-tight">{item.name}</h3>
                        <div className="mt-3 flex items-end justify-between gap-4">
                          <div>
                            {item.discount > 0 && <span className="block text-sm text-white/45 line-through">{item.price} ج</span>}
                            <span className="text-3xl font-black text-[#ffb08c]">{finalPrice} <small className="text-sm">ج</small></span>
                          </div>
                          {quantity === 0 ? (
                            <button onClick={(e) => { e.stopPropagation(); handleOpenItemDetails(item); }} className="bb-card-action">ADD +</button>
                          ) : (
                            <div onClick={e => e.stopPropagation()} className="flex items-center border border-white/25 bg-black/50 backdrop-blur px-3 py-2 gap-4">
                              <button onClick={() => { const idx = cart.findIndex(i => i.name === item.name); if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); } }} className="text-[#ff5a1f] font-black">−</button>
                              <span className="font-black">{quantity}</span>
                              <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="text-[#ff5a1f] font-black">+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-24 text-center border-y border-white/10 text-white/35 font-bold">لا توجد عروض حالياً.</div>
        )}
      </section>

      {/* BRAND STRIP */}
      <section className="bb-marquee-wrap border-y border-[#ff5a1f]/20 overflow-hidden">
        <div className="bb-marquee">
          <span>BAHBAH BURGER</span><b>✦</b><span>THE FIRE IS COMING</span><b>✦</b>
          <span>BEEF • CHICKEN • NASHVILLE</span><b>✦</b><span>BAHBAH BURGER</span><b>✦</b>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-10 items-center">
          <div>
            <div className="bb-section-no">02 / THE BRAND</div>
            <h2 className="bb-display text-6xl md:text-8xl leading-[.82] mt-3">BITE.<br/><span className="text-[#ff4b16]">BURN.</span><br/>REPEAT.</h2>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 border border-[#ff5a1f]/20 translate-x-4 translate-y-4" />
            {siteSettings.promoBannerImage ? (
              <img src={siteSettings.promoBannerImage} alt="Bahbah Burger" className="relative w-full aspect-[16/8] object-cover" />
            ) : (
              <div className="relative w-full aspect-[16/8] bg-[#1a0504] flex items-center justify-center text-[#ff4b16] text-4xl font-black">BAHBAH</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

// ================= 2. صفحة المنيو =================
// ================= 2. صفحة المنيو (بتصميم جديد كلياً) =================
const MenuPage = ({ menuItems, categories, lang, handleOpenBox, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categoriesToShow = selectedCategory === 'الكل' || selectedCategory === 'All'
    ? categories
    : categories.filter(cat => cat.name === selectedCategory);

  return (
    <main className="bb-menu bg-[#090202] min-h-screen text-white">
      <section className="max-w-[1500px] mx-auto px-5 md:px-10 pt-14 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-white/10 pb-10">
          <div>
            <div className="bb-section-no">03 / FOOD MENU</div>
            <h1 className="bb-display text-7xl md:text-[9rem] leading-[.72] tracking-[-.06em] mt-4">
              {t.ourMenu}
            </h1>
          </div>
          <p className="max-w-sm text-white/45 text-sm leading-7">
            اختار اللي نفسك فيه. كل حاجة بتتحضر وقت الطلب وبستايل بحبح اللي عارفينه.
          </p>
        </div>

        <div className="sticky top-[78px] z-30 py-6 bg-[#090202]/95 backdrop-blur-xl">
          <div className="flex gap-1 overflow-x-auto bb-tabs">
            <button
              onClick={() => setSelectedCategory(lang === 'ar' ? 'الكل' : 'All')}
              className={`bb-tab ${selectedCategory === 'الكل' || selectedCategory === 'All' ? 'active' : ''}`}
            >
              {t.all}
            </button>
            {categories.map(cat => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`bb-tab ${selectedCategory === cat.name ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {categoriesToShow.length === 0 ? (
          <div className="py-28 text-center text-white/40">لا توجد أقسام مضافة بعد... ⏳</div>
        ) : (
          <div className="space-y-24 pb-20">
            {categoriesToShow.map((cat, catIndex) => {
              const catItems = menuItems
                .filter(item => item.category === cat.name)
                .sort((a, b) => (a.order || 0) - (b.order || 0));

              if (catItems.length === 0 && selectedCategory !== 'الكل' && selectedCategory !== 'All') {
                return (
                  <section key={cat._id} className="border-b border-white/10 pb-10">
                    <h2 className="bb-menu-heading">{cat.name}</h2>
                    <p className="text-white/35 mt-4">لا توجد أصناف في هذا القسم حالياً.</p>
                  </section>
                );
              }
              if (catItems.length === 0) return null;

              return (
                <section key={cat._id}>
                  <div className="flex items-end justify-between gap-4 mb-8">
                    <div>
                      <span className="text-[#ff5a1f] text-[10px] tracking-[.3em] font-black">0{catIndex + 1}</span>
                      <h2 className="bb-menu-heading">{cat.name}</h2>
                    </div>
                    <span className="text-white/25 text-xs font-black">{catItems.length} ITEMS</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
                    {catItems.map((item, idx) => {
                      const finalPrice = getDiscountedPrice(item.price, item.discount);
                      const quantity = cart.filter(i => i.name === item.name).length;

                      return (
                        <article
                          key={item._id}
                          className="bb-menu-item group bg-[#100303] min-h-[250px] flex flex-col sm:flex-row cursor-pointer"
                          onClick={() => item.type === 'box' ? handleOpenBox(item) : handleOpenItemDetails(item)}
                        >
                          <div className="relative w-full sm:w-[44%] h-[260px] sm:h-auto overflow-hidden">
                            <img
                              src={item.image || "https://via.placeholder.com/500x400/100303/ff5a1f?text=Bahbah"}
                              alt={item.name}
                              className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                            {item.discount > 0 && <span className="bb-discount small">{item.discount}% OFF</span>}
                          </div>

                          <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between gap-4 items-start">
                                <h3 className="text-2xl font-black leading-tight group-hover:text-[#ff6a32] transition">{item.name}</h3>
                                <span className="text-white/20 text-xl">↗</span>
                              </div>
                              <p className="text-sm text-white/40 leading-6 mt-3 line-clamp-3">{item.description || "..."}</p>
                            </div>

                            <div className="mt-7 flex items-end justify-between gap-4">
                              <div>
                                {item.discount > 0 && <span className="block text-xs text-white/30 line-through">{item.price} ج</span>}
                                <span className="text-3xl font-black text-[#ff9a70]">{finalPrice} <small className="text-xs">ج</small></span>
                              </div>

                              {item.type === 'box' ? (
                                <button onClick={e => { e.stopPropagation(); handleOpenBox(item); }} className="bb-card-action">CUSTOMIZE</button>
                              ) : quantity === 0 ? (
                                <button onClick={e => { e.stopPropagation(); handleOpenItemDetails(item); }} className="bb-card-action">ADD +</button>
                              ) : (
                                <div onClick={e => e.stopPropagation()} className="flex items-center gap-4 border border-white/15 px-3 py-2 bg-black/30">
                                  <button onClick={() => { const idx = cart.findIndex(i => i.name === item.name); if (idx !== -1) { const nc = [...cart]; nc.splice(idx, 1); setCart(nc); } }} className="text-[#ff5a1f] font-black">−</button>
                                  <span className="font-black">{quantity}</span>
                                  <button onClick={() => setCart([...cart, { ...item, price: finalPrice }])} className="text-[#ff5a1f] font-black">+</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>
    </main>
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
    <section className="bb-admin px-5 md:px-8 py-12 max-w-6xl mx-auto min-h-[80vh] bg-[#090202] text-white">
      <div className="flex justify-between items-center mb-8 border-b border-[#1A0B0E] pb-4">
        <h2 className="text-3xl font-black text-[#FFB800]">⚙️ لوحة الإدارة الذكية</h2>
        <Link className="text-zinc-400 hover:text-white underline font-bold" to="/menu">{t.menu}</Link>
      </div>

      <div className="bg-[#100609] p-8 rounded-[2.5rem] border border-[#FF4500]/40 mb-8 shadow-2xl">
        <h3 className="text-xl font-bold text-[#FFB800] mb-4">🚚 إدارة مناطق التوصيل وأسعارها</h3>
        <form onSubmit={handleAddZone} className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="اسم المنطقة (مثل: الشروق)" 
            value={zoneName} 
            onChange={(e) => setZoneName(e.target.value)}
            className="flex-1 bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white text-sm"
          />
          <input 
            type="number" 
            placeholder="سعر التوصيل (مثل: 30)" 
            value={zoneFee} 
            onChange={(e) => setZoneFee(e.target.value)}
            className="w-full md:w-40 bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white text-sm"
          />
          <button type="submit" className="bg-[#FF4500] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#E03D00] transition shadow cursor-pointer">
            ➕ إضافة منطقة
          </button>
        </form>

        <div className="space-y-3">
          {deliveryZones.length === 0 ? (
            <p className="text-zinc-500 text-sm">لم يتم إضافة مناطق توصيل بعد.</p>
          ) : (
            deliveryZones.map((zone) => (
              <div key={zone._id} className="bg-[#050304] border border-[#1F0A0E] px-5 py-3.5 rounded-2xl flex items-center justify-between text-sm">
                <span className="font-bold text-[#FFB800]">{zone.name} — <span className="text-white">{zone.fee} جنيه</span></span>
                <button onClick={() => handleDeleteZone(zone._id)} className="text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-xl font-bold text-xs">✕ مسح</button>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-[#100609] p-8 rounded-[2.5rem] border border-[#FF4500]/40 mb-8 shadow-2xl">
        <h3 className="text-xl font-bold text-[#FFB800] mb-4">{t.siteSettings}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm mb-2 text-zinc-300">شعار المطعم (اللوجو)</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-1 text-white text-sm cursor-pointer mb-2" />
            {logoImg && <img src={logoImg} alt="Logo Preview" className="w-20 h-20 object-contain rounded-2xl border border-[#1F0A0E] bg-[#050304]" />}
          </div>
          <div>
            <label className="block text-sm mb-2 text-zinc-300">خلفية الهيدر الثابتة فوق</label>
            <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-1 text-white text-sm cursor-pointer mb-2" />
            <img src={heroImg} alt="Hero" className="w-full h-20 object-cover rounded-2xl border border-[#1F0A0E]" />
          </div>

          <div className="md:col-span-2 bg-[#050304] p-4 rounded-2xl border border-[#FF4500]/30">
            <label className="block text-sm mb-2 text-[#FFB800] font-bold">🖼️ صورة العرض الكبيرة (البوستر تحت زرار اطلب دلوقتي)</label>
            <input type="file" accept="image/*" onChange={handleBannerImageUpload} className="w-full bg-[#100609] border border-[#1F0A0E] rounded-2xl p-1 text-white text-sm cursor-pointer mb-2" />
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
            <input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-3.5 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs mb-1 text-zinc-300">العنوان بالإنجليزي</label>
            <input type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-3.5 text-white text-sm" />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#FF4500] text-white font-bold py-4 rounded-2xl hover:bg-[#E03D00] transition shadow-lg">
          💾 حفظ تعديلات اللوجو والواجهة وصورة العرض
        </button>
      </form>

      <div className="bg-[#100609] p-8 rounded-[2.5rem] border border-[#1F0A0E] mb-8 shadow-2xl">
        <h3 className="text-xl font-bold text-[#FFB800] mb-4">{t.catManage}</h3>
        <form onSubmit={handleSaveCategory} className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Category Name..." 
            value={catName} 
            onChange={(e) => setCatName(e.target.value)}
            className="flex-1 bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white"
          />
          <button type="submit" className="bg-[#FF4500] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#E03D00] transition shadow">
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
            <div key={cat._id} className="bg-[#050304] border border-[#1F0A0E] px-5 py-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 font-bold text-sm">#{index + 1}</span>
                <span className="font-bold text-[#FFB800]">{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => handleMoveCategory(index, 'up')}
                  disabled={index === 0}
                  className={`px-3 py-1.5 rounded-xl text-sm font-bold ${index === 0 ? 'bg-[#100609] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#1F0A0E]'}`}
                >
                  ◀ تحريك للخارج
                </button>
                <button 
                  type="button" 
                  onClick={() => handleMoveCategory(index, 'down')}
                  disabled={index === categories.length - 1}
                  className={`px-3 py-1.5 rounded-xl text-sm font-bold ${index === categories.length - 1 ? 'bg-[#100609] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#1F0A0E]'}`}
                >
                  تحريك للداخل ▶
                </button>
                <button onClick={() => handleEditCategoryClick(cat)} className="text-[#FFB800] bg-[#FF4500]/20 px-3.5 py-1.5 rounded-xl text-xs font-bold">✏️</button>
                <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-xl text-xs font-bold">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    <form onSubmit={handleSaveItem} className="bg-[#100609] p-8 rounded-[2.5rem] border border-[#1F0A0E] mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-2xl">
      <h3 className="md:col-span-2 text-xl font-bold text-[#FFB800] mb-2">{t.itemManage}</h3>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Item Name *</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white" placeholder="Name" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Price *</label>
        <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white" placeholder="Price" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-[#FFB800]">نسبة الخصم % (اختياري)</label>
        <input type="number" placeholder="مثال: 20" value={discount} onChange={(e) => setDiscount(e.target.value)} className="w-full bg-[#050304] border border-[#FF4500]/50 rounded-2xl p-4 text-white" />
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Category *</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white">
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-2 text-zinc-300">Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-1 text-white text-sm cursor-pointer" />
      </div>

      <div className="md:col-span-2 bg-[#050304] p-4 rounded-2xl border border-[#FF4500]/30 flex items-center gap-3">
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
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white">
          <option value="normal">Normal (سندوتش أو وجبة عادية)</option>
          <option value="box">Box (بوكس مخصص قابل للاختيار)</option>
        </select>
      </div>

      {type === 'box' && (
        <div>
          <label className="block text-sm mb-2 text-[#FFB800]">Max Items in Box *</label>
          <input type="number" value={maxItems} onChange={(e) => setMaxItems(e.target.value)} className="w-full bg-[#050304] border border-[#FF4500]/50 rounded-2xl p-4 text-white" placeholder="3" />
        </div>
      )}

      {type === 'box' && (
        <div className="md:col-span-2 bg-[#050304] p-4 rounded-2xl border border-[#FF4500]/40">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">📦 أسماء المكونات التي تظهر داخل البوكس</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم المكون" 
              value={boxItemNameInput} 
              onChange={(e) => setBoxItemNameInput(e.target.value)}
              className="flex-1 bg-[#100609] border border-[#1F0A0E] rounded-2xl p-3 text-white text-sm"
            />
            <button type="button" onClick={handleAddBoxItemName} className="bg-[#FF4500] text-white px-5 rounded-2xl font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة
            </button>
          </div>

          {boxItemsList.length > 0 && (
            <div className="space-y-2 mt-2">
              {boxItemsList.map((bItem, index) => (
                <div key={index} className="flex justify-between items-center bg-[#050304] px-4 py-2.5 rounded-xl border border-[#1F0A0E] text-sm">
                  <span className="text-[#FFB800] font-bold">{bItem.name}</span>
                  <button type="button" onClick={() => handleRemoveBoxItemName(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="md:col-span-2 bg-[#050304] p-4 rounded-2xl border border-[#FF4500]/40">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">⚖️ أحجام الصنف وأسعارها (مثل: كيلو، نص، ربع)</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم الحجم (مثل: كبير)" 
              value={sizeNameInput} 
              onChange={(e) => setSizeNameInput(e.target.value)}
              className="flex-1 bg-[#100609] border border-[#1F0A0E] rounded-2xl p-3 text-white text-sm"
            />
            <input 
              type="number" 
              placeholder="السعر (مثل: 400)" 
              value={sizePriceInput} 
              onChange={(e) => setSizePriceInput(e.target.value)}
              className="w-32 bg-[#100609] border border-[#1F0A0E] rounded-2xl p-3 text-white text-sm"
            />
            <button type="button" onClick={handleAddSize} className="bg-[#FF4500] text-white px-5 rounded-2xl font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة حجم
            </button>
          </div>

          {sizesList.length > 0 && (
            <div className="space-y-2 mt-2">
              {sizesList.map((sz, index) => (
                <div key={index} className="flex justify-between items-center bg-[#050304] px-4 py-2.5 rounded-xl border border-[#1F0A0E] text-sm">
                  <span className="text-[#FFB800] font-bold">{sz.name} — {sz.price} ج</span>
                  <button type="button" onClick={() => handleRemoveSize(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="md:col-span-2 bg-[#050304] p-4 rounded-2xl border border-[#1F0A0E]">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">✨ الإضافات الاختيارية</label>
          <div className="flex gap-2 mb-3">
            <input 
              type="text" 
              placeholder="اسم الإضافة (مثلاً: إضافة جبنة)" 
              value={addonName} 
              onChange={(e) => setAddonName(e.target.value)}
              className="flex-1 bg-[#100609] border border-[#1F0A0E] rounded-2xl p-3 text-white text-sm"
            />
            <input 
              type="number" 
              placeholder="السعر (مثلاً: 10)" 
              value={addonPrice} 
              onChange={(e) => setAddonPrice(e.target.value)}
              className="w-32 bg-[#100609] border border-[#1F0A0E] rounded-2xl p-3 text-white text-sm"
            />
            <button type="button" onClick={handleAddAddon} className="bg-[#FF4500] text-white px-5 rounded-2xl font-bold text-sm hover:bg-[#E03D00]">
              ➕ إضافة
            </button>
          </div>

          {addonsList.length > 0 && (
            <div className="space-y-2 mt-2">
              {addonsList.map((addon, index) => (
                <div key={index} className="flex justify-between items-center bg-[#050304] px-4 py-2.5 rounded-xl border border-[#1F0A0E] text-sm">
                  <span>{addon.name} (+{addon.price} ج)</span>
                  <button type="button" onClick={() => handleRemoveAddon(index)} className="text-red-400 font-bold text-xs">✕ مسح</button>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="md:col-span-2">
          <label className="block text-sm mb-2 text-[#FFB800] font-bold">Description *</label>
          <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white" placeholder="Description..." />
      </div>

      <div className="md:col-span-2 mt-4 flex gap-4">
          <button type="submit" className="flex-1 bg-[#FF4500] text-white font-bold py-4 rounded-2xl hover:bg-[#E03D00] transition shadow-lg">
            {editId ? t.save : t.addItem}
          </button>
          {editId && (
            <button type="button" onClick={resetForm} className="bg-zinc-700 text-white px-6 rounded-2xl font-bold">
              {t.cancel}
            </button>
          )}
      </div>
    </form>

    <div className="space-y-12 mt-12">
      <h3 className="text-2xl font-bold text-[#FFB800] border-b border-[#1A0B0E] pb-3">📋 إدارة وترتيب الأصناف حسب الأقسام</h3>
        
      {categories.map(cat => {
        const catItems = menuItems.filter(item => item.category === cat.name).sort((a, b) => (a.order || 0) - (b.order || 0));
          
        return (
          <div key={cat._id} className="bg-[#100609] border border-[#1F0A0E] rounded-[2.5rem] p-8 shadow-2xl">
            <h4 className="text-xl font-black text-[#FFB800] mb-6 border-r-4 border-[#FF4500] pr-4">
              📁 قسم: {cat.name} ({catItems.length} صنف)
            </h4>

            {catItems.length === 0 ? (
              <p className="text-zinc-500 text-sm">لا توجد أصناف في هذا القسم حالياً.</p>
            ) : (
              <div className="space-y-4">
                {catItems.map((item, itemIndex) => (
                  <div key={item._id} className="bg-[#050304] border border-[#1F0A0E] p-4.5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-500 font-bold text-sm">#{itemIndex + 1}</span>
                      <img src={item.image} alt="" className="w-16 h-12 object-cover rounded-xl bg-[#100609]" />
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
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${itemIndex === 0 ? 'bg-[#100609] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#1F0A0E]'}`}
                      >
                        ▲
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleMoveItem(itemIndex, 'down', catItems)}
                        disabled={itemIndex === catItems.length - 1}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${itemIndex === catItems.length - 1 ? 'bg-[#100609] text-zinc-600 cursor-not-allowed' : 'bg-[#180A0E] text-[#FF4500] hover:bg-[#1F0A0E]'}`}
                      >
                        ▼
                      </button>
                      <button onClick={() => handleEditItemClick(item)} className="text-[#FFB800] bg-[#FF4500]/20 px-4 py-2 rounded-xl text-xs font-bold">✏️ تعديل</button>
                      <button onClick={() => handleDeleteItem(item._id)} className="text-red-400 bg-red-500/10 px-4 py-2 rounded-xl text-xs font-bold">✕ مسح</button>
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
      <section className="px-6 py-12 max-w-4xl mx-auto min-h-[60vh] bg-[#050304] text-white flex flex-col items-center justify-center">
        <div className="bg-[#100609] border border-[#25D366] rounded-[2.5rem] p-12 text-center shadow-[0_0_35px_rgba(37,211,102,0.2)] w-full">
          <div className="text-7xl mb-4">✅</div>
          <h2 className="text-3xl font-black text-[#25D366] mb-4">تم إرسال طلبك بنجاح!</h2>
          <p className="text-xl mb-6 text-zinc-300">رقم الأوردر بتاعك هو:</p>
          <div className="bg-[#050304] border-2 border-[#FFB800] text-[#FFB800] text-4xl font-black py-4 px-8 rounded-2xl inline-block mb-8 tracking-widest shadow-xl">
            {placedOrderId}
          </div>
          <p className="text-sm text-zinc-400 mb-8">تم تحويلك للواتساب لإرسال الطلب للمطعم.</p>
          <button 
            onClick={() => setPlacedOrderId(null)} 
            className="text-white bg-[#FF4500] hover:bg-[#E03D00] px-8 py-4 rounded-2xl font-bold transition shadow-lg"
          >
            رجوع للسلة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto min-h-screen bg-[#050304] text-white">
      <h2 className="text-3xl font-black text-[#FFB800] mb-8 border-b border-[#1A0B0E] pb-4">{t.cart}</h2>
      
      {cart.length === 0 ? (
        <div className="border border-[#1F0A0E] bg-[#100609] rounded-[2.5rem] p-16 text-center shadow-2xl">
          <div className="text-zinc-600 text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-zinc-400 mb-4">{t.emptyCart}</h2>
          <Link to="/menu" className="text-[#FF4500] underline hover:text-white font-bold">{t.backToMenu}</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#100609] rounded-[2.5rem] p-8 border border-[#1F0A0E] shadow-2xl">
            <h3 className="text-xl font-bold text-[#FFB800] mb-6">محتويات السلة</h3>
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {groupedCart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-[#1F0A0E] pb-4">
                  <div>
                    <h4 className="text-base font-bold text-white">{item.name}</h4>
                    <p className="text-[#FFB800] font-bold text-sm">{item.price * item.quantity} ج</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[#050304] border border-[#1F0A0E] rounded-2xl px-3 py-1 gap-3">
                      <button onClick={() => handleDecrease(item.name)} className="text-[#FF4500] font-black text-lg hover:text-white">-</button>
                      <span className="font-black text-white">{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.name)} className="text-[#FF4500] font-black text-lg hover:text-white">+</button>
                    </div>
                    
                    <button onClick={() => handleRemoveCompletely(item.name)} className="text-red-400 bg-red-500/10 px-3 py-2 rounded-xl text-xs font-bold hover:bg-red-500/20">❌</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#1F0A0E] space-y-2 text-sm text-zinc-300">
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

        <div className="bg-[#100609] rounded-[2.5rem] p-8 border border-[#1F0A0E] flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#FFB800] mb-2">بيانات التوصيل والاستلام</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button 
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-4 rounded-2xl font-bold text-sm transition ${orderType === 'delivery' ? 'bg-[#FF4500] text-white border border-[#FF4500] shadow-lg' : 'bg-[#050304] text-zinc-400 border border-[#1F0A0E]'}`}
              >
                🛵 توصيل دليفري
              </button>
              <button 
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-4 rounded-2xl font-bold text-sm transition ${orderType === 'pickup' ? 'bg-[#FF4500] text-white border border-[#FF4500] shadow-lg' : 'bg-[#050304] text-zinc-400 border border-[#1F0A0E]'}`}
              >
                🏪 استلام من الفرع
              </button>
          </div>

          <div>
            <label className="block text-xs text-zinc-300 mb-1">الاسم الكامل *</label>
            <input type="text" placeholder="اكتب اسمك..." value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white text-sm" />
          </div>
          <div>
            <label className="block text-xs text-zinc-300 mb-1">رقم التليفون (11 رقم) *</label>
            <input type="text" maxLength="11" placeholder="010xxxxxxxx" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white text-sm tracking-wider" />
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
                  className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white text-sm cursor-pointer"
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
                <textarea rows="2" placeholder="الشارع، رقم العمارة، الدور..." value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white text-sm" />
              </div>
            </>
          )}
        </div>

        <button onClick={sendOrderToWhatsApp} className="w-full bg-[#25D366] text-black font-black text-lg py-4.5 rounded-2xl hover:bg-[#20bd5a] transition mt-6 flex items-center justify-center gap-2 shadow-2xl cursor-pointer">
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


  const brandStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap');
    .bb-app,.bb-home,.bb-menu,.bb-admin{font-family:'Barlow Condensed',Arial,sans-serif}
    .bb-display{font-family:'Anton','Arial Narrow',Impact,sans-serif}
    .bb-nav{background:rgba(9,2,2,.92);border-bottom:1px solid rgba(255,255,255,.09);backdrop-filter:blur(18px)}
    .bb-logo-text{font-family:Anton,Impact,sans-serif;font-size:27px;line-height:.78;letter-spacing:-1px;color:#fff}
    .bb-logo-text span{display:block;color:#ff4b16;font-size:12px;letter-spacing:2px;margin-top:4px}
    .bb-nav-link{color:rgba(255,255,255,.6);transition:.2s}.bb-nav-link:hover{color:#ff6a32}
    .bb-lang-btn{height:38px;min-width:42px;padding:0 10px;border:1px solid rgba(255,255,255,.12);background:#120404;color:#fff;font-weight:900}
    .bb-cart-btn{height:42px;padding:0 13px 0 15px;display:flex;align-items:center;gap:8px;background:#ff4b16;color:#fff;font-size:13px;font-weight:900}
    .bb-cart-btn b{background:#090202;min-width:23px;height:23px;display:grid;place-items:center;font-size:11px}
    .bb-kicker{display:flex;align-items:center;gap:9px;font-size:10px;font-weight:900;letter-spacing:.28em;color:rgba(255,255,255,.58)}
    .bb-fire-dot{width:8px;height:8px;background:#ff4b16;display:inline-block;box-shadow:0 0 18px rgba(255,75,22,.8)}
    .bb-primary-btn{display:flex;align-items:center;gap:18px;background:#ff4b16;color:#fff;padding:15px 22px;font-size:15px;font-weight:900;text-transform:uppercase;transition:.25s}
    .bb-primary-btn:hover{background:#ff6a32;transform:translateY(-2px)}
    .bb-ghost-btn{display:flex;align-items:center;padding:14px 22px;border:1px solid rgba(255,255,255,.2);color:#fff;font-size:14px;font-weight:900;transition:.25s}
    .bb-ghost-btn:hover{border-color:#ff4b16;color:#ff6a32}
    .bb-poster{box-shadow:18px 20px 0 rgba(255,75,22,.18);border:1px solid rgba(255,255,255,.18);background:#100303;padding:5px}
    .bb-poster-label{position:absolute;left:-12px;bottom:-12px;background:#ff4b16;color:#fff;padding:7px 12px;font-size:9px;font-weight:900;letter-spacing:.2em}
    .bb-section-no{font-size:10px;font-weight:900;letter-spacing:.3em;color:#ff5a1f}
    .bb-section-title{font-family:Anton,Impact,sans-serif;font-size:clamp(3rem,6vw,6rem);line-height:.82;letter-spacing:-.04em;margin-top:10px}
    .bb-arrow-link{color:#fff;font-weight:900;font-size:12px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.3);padding-bottom:6px}
    .bb-arrow-link:hover{color:#ff6a32;border-color:#ff6a32}
    .bb-square-btn{width:42px;height:42px;background:#160504;border:1px solid rgba(255,255,255,.15);color:#fff;font-weight:900}.bb-square-btn:hover{background:#ff4b16}
    .bb-offer-card{background:#120303;border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:.35s;overflow:hidden}.bb-offer-card:hover{border-color:rgba(255,75,22,.7);transform:translateY(-6px)}
    .bb-discount{position:absolute;top:16px;left:16px;background:#ff4b16;color:#fff;padding:7px 10px;font-size:10px;font-weight:900;letter-spacing:.14em}.bb-discount.small{top:12px;left:12px}
    .bb-card-action{background:#ff4b16;color:#fff;padding:10px 14px;font-size:11px;font-weight:900;letter-spacing:.12em;transition:.2s}.bb-card-action:hover{background:#ff6a32}
    .bb-marquee-wrap{background:#ff4b16;color:#120303}
    .bb-marquee{display:flex;align-items:center;gap:32px;width:max-content;white-space:nowrap;padding:12px 0;font-family:Anton,Impact,sans-serif;font-size:22px;letter-spacing:.03em;animation:bb-marquee 24s linear infinite}
    .bb-marquee b{font-size:14px}@keyframes bb-marquee{from{transform:translateX(0)}to{transform:translateX(-25%)}}
    .bb-tabs{scrollbar-width:none}.bb-tabs::-webkit-scrollbar{display:none}
    .bb-tab{position:relative;flex:none;background:transparent;color:rgba(255,255,255,.38);border:0;padding:9px 4px;margin-right:22px;font-size:13px;font-weight:900;transition:.2s}
    .bb-tab:after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:#ff4b16;transition:.25s}.bb-tab.active{color:#fff}.bb-tab.active:after{width:100%}
    .bb-menu-heading{font-family:Anton,Impact,sans-serif;font-size:clamp(2.6rem,5vw,5rem);line-height:.8;letter-spacing:-.03em;margin-top:7px}
    .bb-menu-item{transition:.3s}.bb-menu-item:hover{background:#160404}.bb-menu-item:hover img{filter:saturate(1.12)}
    .bb-modal{background:#100303;border:1px solid rgba(255,75,22,.5);box-shadow:0 30px 100px rgba(0,0,0,.7)}
    .bb-modal-title{font-family:Anton,Impact,sans-serif;font-size:2.3rem;line-height:.9}
    .bb-footer{border-top:1px solid rgba(255,255,255,.08);background:#090202}
    .bb-admin input,.bb-admin textarea,.bb-admin select{background:#120404!important;border-color:rgba(255,255,255,.1)!important}
    @media(max-width:767px){.bb-hero{min-height:calc(100vh - 78px)}.bb-menu-item{display:flex}.bb-marquee{font-size:18px}.bb-section-title{font-size:3.5rem}}
  `;

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bb-app min-h-screen bg-[#090202] text-white font-sans flex flex-col justify-between relative selection:bg-[#ff4b16] selection:text-white">
      <style>{brandStyles}</style>
      {/* BAHBAH EDITORIAL NAV */}
      <nav className="bb-nav sticky top-0 z-50">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 h-[78px] flex items-center justify-between gap-5">
          <Link to="/" className="flex items-center shrink-0">
            {siteSettings.logoImage ? (
              <img src={siteSettings.logoImage} alt="Bahbah Burger" className="h-12 md:h-14 w-auto object-contain" />
            ) : (
              <span className="bb-logo-text">BAHBAH<span>BURGER</span></span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-9 text-xs font-black tracking-[.16em] uppercase">
            <Link to="/" className="bb-nav-link">{t.home}</Link>
            <Link to="/menu" className="bb-nav-link">{t.menu}</Link>
            <span className="w-px h-5 bg-white/15" />
            <span className="text-white/35">BEEF • CHICKEN • NASHVILLE</span>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="bb-lang-btn">
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <Link to="/cart" className="bb-cart-btn">
              <span className="hidden sm:inline">{t.cart}</span>
              <span>🛒</span>
              <b>{cart.length}</b>
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
          <div className="bb-modal w-full max-w-lg p-7 md:p-9 relative">
            <button onClick={() => setSelectedItemDetail(null)} className="absolute top-5 left-5 text-white/60 text-xl font-bold bg-white/5 w-10 h-10 flex items-center justify-center hover:bg-[#ff4b16] hover:text-white transition">✕</button>
            <h3 className="bb-modal-title mb-6">{selectedItemDetail.name}</h3>
              
            {selectedItemDetail.sizes && selectedItemDetail.sizes.length > 0 && (
              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-extrabold text-[#FFB800]">اختر الحجم:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedItemDetail.sizes.map((sz, idx) => {
                    const finalSzPrice = getDiscountedPrice(sz.price, selectedItemDetail.discount);
                    return (
                      <div key={idx} onClick={() => setSelectedSize(sz)} className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center justify-center transition ${selectedSize === sz ? 'bg-[#FF4500]/20 border-[#FF4500] text-[#FFB800] shadow-lg' : 'bg-[#050304] border-[#1F0A0E] text-zinc-300'}`}>
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
                    
                  <label className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${!selectedAddon ? 'bg-[#FF4500]/20 border-[#FF4500] text-[#FFB800]' : 'bg-[#050304] border-[#1F0A0E] text-zinc-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="addon" checked={!selectedAddon} onChange={() => setSelectedAddon(null)} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!selectedAddon ? 'border-[#FF4500]' : 'border-[#1F0A0E]'}`}>
                        {!selectedAddon && <div className="w-2.5 h-2.5 bg-[#FF4500] rounded-full"></div>}
                      </div>
                      <span className="font-bold text-sm">بدون إضافات</span>
                    </div>
                    <span className="text-sm font-black">+0 ج</span>
                  </label>

                  {selectedItemDetail.addons.map((addon, idx) => (
                    <label key={idx} className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${selectedAddon === addon ? 'bg-[#FF4500]/20 border-[#FF4500] text-[#FFB800]' : 'bg-[#050304] border-[#1F0A0E] text-zinc-300'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="addon" checked={selectedAddon === addon} onChange={() => setSelectedAddon(addon)} className="hidden" />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddon === addon ? 'border-[#FF4500]' : 'border-[#1F0A0E]'}`}>
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
            <button onClick={handleAddCustomizedItemToCart} className="w-full bg-[#ff4b16] text-white font-black py-4 hover:bg-[#ff6435] transition text-lg">
              أضف للسلة • {currentItemTotalPrice} ج
            </button>
          </div>
        </div>
      )}

      {isBoxModalOpen && activeBox && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
          <div className="bb-modal w-full max-w-lg p-7 md:p-9 relative">
            <button onClick={() => setIsBoxModalOpen(false)} className="absolute top-5 left-5 text-white/60 text-xl font-bold bg-white/5 w-10 h-10 flex items-center justify-center hover:bg-[#ff4b16] hover:text-white transition">✕</button>
              
            <h3 className="bb-modal-title text-[#ff9a70] mb-1">{activeBox.name}</h3>
            <p className="text-zinc-300 mb-6 border-b border-[#1F0A0E] pb-4 text-sm">
              اختر {activeBox.maxItems} أصناف. 
              <span className={`block mt-1 font-extrabold text-base ${totalSelected === activeBox.maxItems ? 'text-green-400' : 'text-[#FFB800]'}`}>
                تم اختيار: ({totalSelected} / {activeBox.maxItems})
              </span>
            </p>

            <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-1">
              {activeBox.boxItems && activeBox.boxItems.map((bItem, idx) => (
                <div key={idx} className="flex justify-between items-center bg-[#050304] p-4 rounded-2xl border border-[#1F0A0E]">
                  <span className="font-bold text-base text-white">{bItem.name}</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleUpdateSelection(bItem.name, 'remove')} className="w-10 h-10 bg-[#100609] rounded-xl text-[#FF4500] font-black text-lg hover:bg-[#FF4500] hover:text-white transition">-</button>
                    <span className="text-xl w-6 text-center font-black text-white">{boxSelections[bItem.name] || 0}</span>
                    <button onClick={() => handleUpdateSelection(bItem.name, 'add')} className="w-10 h-10 bg-[#100609] rounded-xl text-[#FF4500] font-black text-lg hover:bg-[#FF4500] hover:text-white transition">+</button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleAddBoxToCart} disabled={totalSelected !== activeBox.maxItems} className={`w-full py-4 rounded-2xl font-black text-lg transition ${totalSelected === activeBox.maxItems ? 'bg-[#FF4500] text-white hover:bg-[#E03D00] cursor-pointer shadow-2xl' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <footer onClick={handleSecretLogoClick} className="bb-footer mt-24 text-white/35 py-10 text-center text-[10px] tracking-[.2em] cursor-default select-none uppercase">
        جميع الحقوق محفوظة © 2026 بحبح برجر — Bahbah Burger
      </footer>
    </div>
  );
}

export default App;