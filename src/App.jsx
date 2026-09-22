import React, { useState, useEffect, useRef } from 'react';
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

// ================= 1. صفحة الرئيسية =================
const HomePage = ({ lang, siteSettings, menuItems, categories, handleOpenItemDetails, menuRef }) => {
  const t = translations[lang];
  const [selectedHomeCat, setSelectedHomeCat] = useState('الكل');

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // فلترة الأصناف في الصفحة الرئيسية بناءً على القسم المختار
  const filteredHomeItems = selectedHomeCat === 'الكل'
    ? menuItems.filter(item => item.isOffer).length > 0 ? menuItems.filter(item => item.isOffer).slice(0, 6) : menuItems.slice(0, 6)
    : menuItems.filter(item => item.category === selectedHomeCat).slice(0, 6);

  return (
    <div className="bg-[#050505] text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[580px] md:min-h-[calc(100vh-78px)] flex items-center overflow-hidden border-b border-[#8d1710] py-8 md:py-0" dir="ltr">
        <div className="absolute inset-0 bg-[#050505]" />
        {/* تم إصلاح الخلفية لتسحب من إعدادات الداشبورد كأولوية */}
        <div
          className="absolute inset-y-0 right-0 w-full md:w-[67%] bg-cover bg-center opacity-30 md:opacity-100"
          style={{ backgroundImage: `url(${siteSettings.heroImage || menuItems[0]?.image || ''})` }}
        />
        <div className="absolute inset-y-0 right-0 w-full md:w-[72%] bg-gradient-to-r from-[#050505] via-[#050505]/95 md:to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(255,65,10,.28),transparent_34%)]" />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#e62c16]" />
        <div className="absolute left-0 top-0 w-64 h-64 bg-[#e62c16]/20 blur-3xl" />

        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 flex items-center">
          <div className="w-full md:w-[60%] py-4 md:py-20">
            <div className="font-black italic uppercase tracking-[0.22em] text-[#ff4a22] text-xs md:text-base mb-2">
              BIGGER · JUICIER · HOTTER
            </div>

            <div className="leading-[0.82] uppercase italic font-black tracking-[-0.05em] my-4 transform -rotate-6 origin-left">
              <div className="text-[48px] sm:text-[72px] md:text-[98px] lg:text-[115px] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                THE FIRE
              </div>
              <div className="text-[48px] sm:text-[72px] md:text-[98px] lg:text-[115px] text-[#ef321b] mt-1 drop-shadow-[0_10px_20px_rgba(239,50,27,0.5)]">
                IS COMING
              </div>
            </div>

            <div className="mt-6 text-[#ef321b] italic font-black text-lg sm:text-2xl md:text-3xl tracking-wide drop-shadow-md" style={{fontFamily:'cursive'}}>
              Smash Burgers & Nashville Chicken
            </div>

            <p className="mt-3 md:mt-5 text-white/90 text-sm sm:text-base md:text-xl font-bold max-w-md leading-relaxed" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              {lang === 'ar' ? 'مش مجرد برجر.. ده بحبح! 🔥' : "Not just a burger... This is Bahbah! 🔥"}
            </p>

            <button
              onClick={scrollToMenu}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="inline-flex items-center justify-center gap-5 mt-4 md:mt-7 bg-[#ed321c] hover:bg-[#ff4528] text-white px-8 md:px-10 py-3.5 md:py-4 font-black text-base md:text-lg transition-all duration-300 shadow-[0_12px_40px_rgba(237,50,28,.28)] cursor-pointer"
              style={{ clipPath: 'polygon(3% 0, 97% 0, 100% 18%, 98% 84%, 94% 100%, 4% 100%, 0 78%, 2% 14%)' }}
            >
              {t.orderNow}
              <span className="text-xl leading-none">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <div className="relative border-y border-[#8c2118] bg-[#0a0909] h-16 overflow-hidden flex items-center">
        <div className="whitespace-nowrap flex items-center gap-12 md:gap-20 text-[#ef321b] italic font-black text-xl md:text-2xl animate-[bahbah-marquee_22s_linear_infinite]">
          {Array.from({length: 4}).map((_, i) => (
            <React.Fragment key={i}>
              <span>BAHBAH</span><span>♛</span><span>BIGGER</span><span>•</span><span>JUICIER</span><span>•</span><span>HOTTER</span><span>♛</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MENU PREVIEW */}
      <div ref={menuRef} className="scroll-mt-[78px]"></div>
      <section className="relative max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="absolute left-0 top-10 w-40 h-80 bg-[#ef321b]/10 blur-3xl pointer-events-none" />

        {/* تم تعديل الـ Layout عشان البوستر يظهر فوق على الموبايل */}
        <div className="flex flex-col lg:grid lg:grid-cols-[250px_1fr_240px] gap-8 lg:gap-10 items-start">
          
          {/* النص (رقم 1 على الموبايل والديسك توب) */}
          <div className="pt-3 order-1 lg:order-none w-full">
            <div className="text-[#ef321b] italic font-black text-3xl md:text-4xl">OUR</div>
            <div className="text-white uppercase italic font-black leading-[.82] text-6xl md:text-7xl">MENU</div>
            <div className="mt-5 text-xl font-black">قائمة العظمة</div>
            <p className="mt-4 text-white/55 text-sm leading-7">
              من البرجر الكلاسيك لحد التركيبات الخاصة.. كل لقمة في بحبح ليها حكاية.
            </p>
          </div>

          {/* بوستر الخصم (رقم 2 على الموبايل، رقم 3 على الديسك توب) */}
          <div className="relative min-h-[300px] lg:min-h-[360px] bg-[#120807] border border-[#ef321b]/35 overflow-hidden flex items-end order-2 lg:order-3 w-full rounded-2xl lg:rounded-none">
            {siteSettings.promoBannerImage ? (
              <img src={siteSettings.promoBannerImage} alt="Bahbah Offer" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            )}
            {!siteSettings.promoBannerImage && (
              <div className="relative z-10 p-7">
                <div className="text-[#ef321b] text-5xl font-black italic leading-[.8]">BAHBAH</div>
                <div className="text-white text-4xl font-black italic leading-none">BURGER</div>
              </div>
            )}
          </div>

          {/* الأصناف والأقسام (رقم 3 على الموبايل، رقم 2 على الديسك توب) */}
          <div className="order-3 lg:order-2 w-full">
            {/* تم تحويل الأقسام لزراير قابلة للضغط */}
            <div className="flex gap-2 overflow-x-auto pb-5 mb-2 scrollbar-none">
              <button 
                onClick={() => setSelectedHomeCat('الكل')}
                className={`shrink-0 px-8 py-3 font-black transition-all ${selectedHomeCat === 'الكل' ? 'bg-[#ef321b] text-white' : 'bg-[#111] text-white/60 border border-white/5'}`}
                style={selectedHomeCat === 'الكل' ? {clipPath:'polygon(4% 0,96% 0,100% 22%,97% 90%,91% 100%,5% 97%,0 80%,2% 12%)'} : {}}
              >
                {t.all}
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat._id} 
                  onClick={() => setSelectedHomeCat(cat.name)}
                  className={`shrink-0 px-7 py-3 font-bold border transition-all ${selectedHomeCat === cat.name ? 'bg-[#ef321b] text-white border-[#ef321b]' : 'bg-[#111] text-white/60 border-white/5 hover:border-white/20'}`}
                  style={selectedHomeCat === cat.name ? {clipPath:'polygon(4% 0,96% 0,100% 22%,97% 90%,91% 100%,5% 97%,0 80%,2% 12%)'} : {}}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredHomeItems.length > 0 ? filteredHomeItems.map((item) => {
                const price = getDiscountedPrice(item.price, item.discount);
                return (
                  <article key={item._id} className="bg-[#0d0d0d] border border-white/10 hover:border-[#ef321b]/80 transition group overflow-hidden">
                    <button onClick={() => handleOpenItemDetails(item)} className="w-full text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                      <div className="relative h-52 overflow-hidden bg-black">
                        {item.discount > 0 && (
                          <span className="absolute top-3 left-3 z-10 bg-[#ef321b] px-3 py-1 text-xs font-black">خصم {item.discount}%</span>
                        )}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-2xl font-black italic uppercase truncate">{item.name}</h3>
                        <p className="text-white/45 text-sm mt-2 line-clamp-2 min-h-10">{item.description || 'طعم بحبح.. من أول لقمة.'}</p>
                        <div className="flex items-end justify-between mt-6">
                          <div className="text-[#ef321b] text-2xl font-black">EGP {price}</div>
                          <span className="w-9 h-9 border border-white/15 flex items-center justify-center text-xl group-hover:bg-[#ef321b] group-hover:border-[#ef321b] transition">+</span>
                        </div>
                      </div>
                    </button>
                  </article>
                );
              }) : (
                <div className="col-span-full py-10 text-center text-white/40 font-bold border border-white/5 bg-[#111]">
                  لا توجد أصناف في هذا القسم حالياً.
                </div>
              )}
            </div>
            
            <div className="mt-8 text-center lg:text-left">
               <Link to="/menu" className="inline-block border border-[#ef321b] text-white px-8 py-3 font-black hover:bg-[#ef321b] transition">
                 {t.seeMore}
               </Link>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes bahbah-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
};


// ================= 2. صفحة المنيو =================
const MenuPage = ({ menuItems, categories, lang, handleOpenBox, handleOpenItemDetails }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const categoriesToShow = selectedCategory === 'الكل' || selectedCategory === 'All'
    ? categories
    : categories.filter(cat => cat.name === selectedCategory);

  return (
    <section className="bg-[#050505] text-white min-h-screen overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 pt-14 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-white/10 pb-8">
          <div>
            <div className="text-[#ef321b] italic font-black text-3xl">OUR</div>
            <h1 className="text-6xl md:text-8xl uppercase italic font-black leading-[.8]">MENU</h1>
            <p className="mt-5 text-white/50">قائمة العظمة — اختار مزاجك وخلي الباقي على بحبح.</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto py-7 scrollbar-none border-b border-white/5">
          <button
            onClick={() => setSelectedCategory(lang === 'ar' ? 'الكل' : 'All')}
            className={`shrink-0 px-8 py-3 font-black ${selectedCategory === 'الكل' || selectedCategory === 'All' ? 'bg-[#ef321b] text-white' : 'bg-[#111] text-white/55 border border-white/10'}`}
            style={{clipPath:'polygon(4% 0,96% 0,100% 22%,97% 90%,91% 100%,5% 97%,0 80%,2% 12%)'}}
          >{t.all}</button>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`shrink-0 px-8 py-3 font-black ${selectedCategory === cat.name ? 'bg-[#ef321b] text-white' : 'bg-[#111] text-white/55 border border-white/10'}`}
            >{cat.name}</button>
          ))}
        </div>

        {categoriesToShow.length === 0 ? (
          <div className="py-28 text-center text-white/40">لا توجد أقسام مضافة بعد.</div>
        ) : (
          <div className="space-y-20 pt-10">
            {categoriesToShow.map(cat => {
              const catItems = menuItems.filter(item => item.category === cat.name).sort((a,b)=>(a.order||0)-(b.order||0));
              if (!catItems.length) return null;
              return (
                <div key={cat._id}>
                  <div className="flex items-center gap-5 mb-7">
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase">{cat.name}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#ef321b]/60 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {catItems.map(item => {
                      const price = getDiscountedPrice(item.price, item.discount);
                      const open = () => item.type === 'box' ? handleOpenBox(item) : handleOpenItemDetails(item);
                      return (
                        <article key={item._id} className="bg-[#0d0d0d] border border-white/10 hover:border-[#ef321b] transition overflow-hidden group">
                          <button onClick={open} className="w-full text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                            <div className="relative h-56 bg-black overflow-hidden">
                              {item.discount > 0 && <span className="absolute top-3 left-3 z-10 bg-[#ef321b] px-3 py-1 text-xs font-black">خصم {item.discount}%</span>}
                              <img src={item.image || "https://via.placeholder.com/400x300/0D0D0D/EF321B?text=Bahbah"} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-5">
                              <h3 className="text-2xl font-black italic uppercase truncate">{item.name}</h3>
                              <p className="text-sm text-white/45 mt-2 line-clamp-2 min-h-10">{item.description || 'طعم بحبح.. من أول لقمة.'}</p>
                              <div className="flex items-center justify-between mt-6">
                                <span className="text-[#ef321b] text-2xl font-black" dir="ltr">EGP {price}</span>
                                <span className="w-9 h-9 border border-white/15 flex items-center justify-center text-xl group-hover:bg-[#ef321b] group-hover:border-[#ef321b] transition">+</span>
                              </div>
                            </div>
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
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

  // استخراج الأصناف اللي مالهاش قسم أو قسمها اتمسح
  const orphanItems = menuItems.filter(item => !categories.some(c => c.name === item.category));

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
        setZoneName(''); setZoneFee(''); fetchZones();
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

  const compressImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width; let height = img.height;
        if (width > height) { if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; } }
        else { if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; } }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleHeroImageUpload = (e) => { if(e.target.files[0]) compressImage(e.target.files[0], 1200, 800, setHeroImg); };
  const handleBannerImageUpload = (e) => { if(e.target.files[0]) compressImage(e.target.files[0], 1000, 600, setBannerImg); };
  const handleLogoUpload = (e) => { if(e.target.files[0]) compressImage(e.target.files[0], 300, 300, setLogoImg); };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImage: heroImg, heroTitleAr: titleAr, heroTitleEn: titleEn, logoImage: logoImg, promoBannerImage: bannerImg })
      });
      if (res.ok) {
        alert("تم تحديث الواجهة واللوجو وصورة العرض بنجاح! 🚀🔥");
        fetchSettings();
      }
    } catch (err) { alert("خطأ أثناء الحفظ"); }
  };

  // State للفورم
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState(''); 
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // سيبدأ بقيمة فارغة ويتم تحديثه
  const [type, setType] = useState('normal');
  const [maxItems, setMaxItems] = useState('');
  const [isOffer, setIsOffer] = useState(false);
  const [addonsList, setAddonsList] = useState([]);
  const [boxItemsList, setBoxItemsList] = useState([]);
  const [sizesList, setSizesList] = useState([]);

  // تحديث القسم الافتراضي لما الأقسام تحمل
  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0].name);
    }
  }, [categories, category]);

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const itemData = {
      name, price: Number(price), discount: Number(discount) || 0,
      image: image || "https://via.placeholder.com/400x300/0D0507/FF4500?text=Bahbah+Burger",
      description,
      category: category || (categories.length > 0 ? categories[0].name : 'General'),
      type, maxItems: type === 'box' ? Number(maxItems) : undefined,
      isOffer, addons: addonsList, boxItems: type === 'box' ? boxItemsList : [], sizes: sizesList
    };

    try {
      let res;
      if (editId) res = await fetch(`${API_BASE}/api/items/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(itemData) });
      else res = await fetch(`${API_BASE}/api/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(itemData) });

      if (res.ok) {
        resetForm(); fetchItems(); alert("تم حفظ الصنف بنجاح! 🚀");
      }
    } catch (err) {}
  };

  const handleEditItemClick = (item) => {
    setEditId(item._id); setName(item.name); setPrice(item.price); setDiscount(item.discount || '');
    setImage(item.image); setDescription(item.description || ''); setCategory(item.category);
    setType(item.type || 'normal'); setMaxItems(item.maxItems || ''); setIsOffer(item.isOffer || false);
    setAddonsList(item.addons || []); setBoxItemsList(item.boxItems || []); setSizesList(item.sizes || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditId(null); setName(''); setPrice(''); setDiscount(''); setImage(''); setDescription(''); setMaxItems(''); setType('normal'); setIsOffer(false); setAddonsList([]); setBoxItemsList([]); setSizesList([]);
    if(categories.length > 0) setCategory(categories[0].name);
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete item?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (err) {}
  };

  const renderItemCard = (item, itemIndex, list) => (
    <div key={item._id} className="bg-[#050304] border border-[#1F0A0E] p-4.5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
          {/* إظهار القسم الحالي للصنف لو كان في قسم غير معروف */}
          {orphanItems.includes(item) && (
            <span className="text-red-400 text-xs block mt-1">القسم المسجل: {item.category} (غير موجود)</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => handleEditItemClick(item)} className="text-[#FFB800] bg-[#FF4500]/20 px-4 py-2 rounded-xl text-xs font-bold">✏️ تعديل</button>
        <button onClick={() => handleDeleteItem(item._id)} className="text-red-400 bg-red-500/10 px-4 py-2 rounded-xl text-xs font-bold">✕ مسح</button>
      </div>
    </div>
  );

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto min-h-[80vh] bg-[#050304] text-white">
      <div className="flex justify-between items-center mb-8 border-b border-[#1A0B0E] pb-4">
        <h2 className="text-3xl font-black text-[#FFB800]">⚙️ لوحة الإدارة الذكية</h2>
        <Link className="text-zinc-400 hover:text-white underline font-bold" to="/menu">{t.menu}</Link>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-[#100609] p-8 rounded-[2.5rem] border border-[#FF4500]/40 mb-8 shadow-2xl">
        <h3 className="text-xl font-bold text-[#FFB800] mb-4">🖼️ تخصيص الواجهة والبوستر</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
            <label className="block text-sm mb-2 text-zinc-300">خلفية الهيدر الثابتة فوق</label>
            <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-1 text-white text-sm cursor-pointer mb-2" />
            <img src={heroImg} alt="Hero" className="w-full h-20 object-cover rounded-2xl border border-[#1F0A0E]" />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#FF4500] text-white font-bold py-4 rounded-2xl hover:bg-[#E03D00] transition shadow-lg">
          💾 حفظ تعديلات اللوجو والواجهة وصورة العرض
        </button>
      </form>

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
          <label className="block text-sm mb-2 text-zinc-300">Category *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-4 text-white">
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-2 text-zinc-300">Image</label>
          <input type="file" accept="image/*" onChange={(e) => { if(e.target.files[0]) compressImage(e.target.files[0], 800, 800, setImage); }} className="w-full bg-[#050304] border border-[#1F0A0E] rounded-2xl p-1 text-white text-sm cursor-pointer" />
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
        
        {/* قسم للأصناف اللي ملهاش قسم واضح (عشان متضيعش منك) */}
        {orphanItems.length > 0 && (
          <div className="bg-[#1a0505] border border-red-500/40 rounded-[2.5rem] p-8 shadow-2xl">
            <h4 className="text-xl font-black text-red-500 mb-6 border-r-4 border-red-500 pr-4">
              ⚠️ أصناف بدون قسم أو قسمها محذوف ({orphanItems.length} صنف)
              <span className="block text-sm font-normal text-zinc-400 mt-2">اعمل تعديل للصنف واختار له قسم موجود عشان يظهر في المنيو.</span>
            </h4>
            <div className="space-y-4">
              {orphanItems.map((item, itemIndex) => renderItemCard(item, itemIndex, orphanItems))}
            </div>
          </div>
        )}

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
                  {catItems.map((item, itemIndex) => renderItemCard(item, itemIndex, catItems))}
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
// (باقي كود السلة كما هو بدون تغيير لتوفير المساحة، يمكنك تركه كما كان في الكود السابق تماماً)
const CartPage = ({ cart, setCart, lang }) => {
  return <div className="text-center py-20 text-white">كود السلة كما كان في النسخة السابقة. (احتفظ به كما هو)</div>;
};

// ================= التطبيق الرئيسي =================
function App() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteSettings, setSiteSettings] = useState({ heroImage: '', heroTitleAr: '', heroTitleEn: '', logoImage: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lang, setLang] = useState('ar');

  const [selectedItemDetail, setSelectedItemDetail] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddon, setSelectedAddon] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/items`);
      let data = await res.json();
      setMenuItems(data.map(item => ({ ...item, discount: Number(item.discount) || 0 })));
    } catch (err) {}
  };
  const fetchCategories = async () => { try { const res = await fetch(`${API_BASE}/api/categories`); setCategories(await res.json()); } catch (err) {} };
  const fetchSettings = async () => { try { const res = await fetch(`${API_BASE}/api/settings`); setSiteSettings(await res.json()); } catch (err) {} };

  useEffect(() => { fetchItems(); fetchCategories(); fetchSettings(); }, []);

  const handleOpenItemDetailsModal = (item) => {
    const hasSizes = item.sizes && item.sizes.length > 0;
    const hasAddons = item.addons && item.addons.length > 0;
    if (hasSizes || hasAddons) {
      setSelectedItemDetail(item); setSelectedSize(hasSizes ? item.sizes[0] : null); setSelectedAddon(null);
    } else {
      setCart([...cart, { ...item, price: getDiscountedPrice(item.price, item.discount) }]);
    }
  };

  const handleAddCustomizedItemToCart = () => {
    if (!selectedItemDetail) return;
    let itemName = selectedItemDetail.name;
    if (selectedSize) itemName += ` (${selectedSize.name})`;
    if (selectedAddon) itemName += ` - ${selectedAddon.name}`;
    const basePrice = selectedSize ? selectedSize.price : selectedItemDetail.price;
    const finalPrice = getDiscountedPrice(basePrice, selectedItemDetail.discount) + (selectedAddon ? selectedAddon.price : 0);
    setCart([...cart, { ...selectedItemDetail, name: itemName, price: finalPrice }]);
    setSelectedItemDetail(null); setSelectedSize(null); setSelectedAddon(null);
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#050304] text-white font-sans flex flex-col justify-between relative selection:bg-[#FF4500] selection:text-white">
      <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1500px] mx-auto h-[78px] px-5 md:px-10 flex items-center justify-between">
          <Link to="/" className="shrink-0 flex items-center">
            {siteSettings.logoImage ? <img src={siteSettings.logoImage} alt="Bahbah Burger" className="h-14 md:h-16 w-auto object-contain" /> : <span className="text-3xl font-black italic text-white">Bahbah</span>}
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative flex items-center gap-2 hover:text-[#ef321b] transition">
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-2 -right-3 bg-[#ef321b] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">{cart.length}</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} siteSettings={siteSettings} menuItems={menuItems} categories={categories} handleOpenItemDetails={handleOpenItemDetailsModal} menuRef={menuRef} />} />
          <Route path="/menu" element={<MenuPage menuItems={menuItems} categories={categories} lang={lang} handleOpenItemDetails={handleOpenItemDetailsModal} />} />
          <Route path="/secret-admin-dashboard" element={<AdminDashboard menuItems={menuItems} categories={categories} siteSettings={siteSettings} lang={lang} fetchItems={fetchItems} fetchCategories={fetchCategories} fetchSettings={fetchSettings} isAuthenticated={true} />} />
        </Routes>
      </div>

      {selectedItemDetail && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-xl">
          <div className="bg-[#100609] border border-[#FF4500]/50 rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl">
            <button onClick={() => setSelectedItemDetail(null)} className="absolute top-6 left-6 text-red-400 text-xl font-bold bg-red-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20">✕</button>
            <h3 className="text-3xl font-black text-white mb-6">{selectedItemDetail.name}</h3>
            <button onClick={handleAddCustomizedItemToCart} className="w-full bg-[#FF4500] text-white font-black py-4 rounded-2xl hover:bg-[#E03D00] transition text-lg shadow-2xl">
              أضف للسلة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;