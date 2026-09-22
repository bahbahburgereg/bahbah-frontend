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

// ================= 1. الصفحة الرئيسية - Bahbah Brand =================
const HomePage = ({ lang, siteSettings, menuItems, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const title = lang === 'ar' ? siteSettings.heroTitleAr : siteSettings.heroTitleEn;
  const offerItems = menuItems.filter(item => item.isOffer);
  const featuredItems = (offerItems.length ? offerItems : menuItems).slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredItems.length <= 3) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, featuredItems.length - 2));
    }, 4500);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  const changeQty = (item, direction) => {
    const idx = cart.findIndex(i => i.name === item.name);
    if (direction === 'minus' && idx !== -1) {
      const next = [...cart];
      next.splice(idx, 1);
      setCart(next);
    }
    if (direction === 'plus') {
      setCart([...cart, { ...item, price: getDiscountedPrice(item.price, item.discount) }]);
    }
  };

  return (
    <main className="bb-site">
      <section className="bb-hero">
        <div className="bb-hero-bg" style={{ backgroundImage: `url(${siteSettings.heroImage})` }} />
        <div className="bb-hero-overlay" />
        <div className="bb-hero-grain" />

        <div className="bb-hero-content">
          <div className="bb-kicker"><span>🔥</span> BIGGER · JUICIER · HOTTER <span>🔥</span></div>
          <div className="bb-hero-grid">
            <div className="bb-hero-copy">
              <div className="bb-small-ar">مش مجرد برجر .. ده بحبح!</div>
              <h1>
                <span>THE FIRE</span>
                <strong>IS COMING</strong>
              </h1>
              <p>{title || "أقوى برجر بطابع بحبح الناري."}</p>
              <Link to="/menu" className="bb-fire-btn">{t.orderNow}<span>↗</span></Link>
            </div>

            <div className="bb-hero-food">
              <div className="bb-food-glow" />
              {siteSettings.heroImage ? (
                <img src={siteSettings.heroImage} alt="Bahbah Burger" />
              ) : (
                <div className="bb-empty-food">BAHBAH</div>
              )}
              <div className="bb-hero-stamp">REAL<br/><b>TASTE</b></div>
            </div>
          </div>

          <div className="bb-scroll">↓ <span>SCROLL DOWN</span></div>
        </div>
      </section>

      <div className="bb-marquee">
        <div className="bb-marquee-track">
          <span>BAHBAH BURGER</span><i>♛</i><span>BIGGER</span><i>•</i><span>JUICIER</span><i>•</i><span>HOTTER</span><i>♛</i>
          <span>BAHBAH BURGER</span><i>♛</i><span>BIGGER</span><i>•</i><span>JUICIER</span><i>•</i><span>HOTTER</span><i>♛</i>
        </div>
      </div>

      <section className="bb-section bb-menu-preview">
        <div className="bb-section-head">
          <div className="bb-title-block">
            <span className="bb-red-script">OUR</span>
            <h2>MENU</h2>
            <p>قائمة العظمة</p>
          </div>
          <div className="bb-section-text">
            <span>THE BAHBAH WAY</span>
            <p>برجر معمول عشان يتاكل بإيدك، ويتصور قبل ما يختفي.</p>
            <Link to="/menu" className="bb-outline-btn">{t.seeMore} <b>→</b></Link>
          </div>
        </div>

        <div className="bb-product-grid">
          {featuredItems.slice(currentIndex, currentIndex + 3).map((item, idx) => {
            const finalPrice = getDiscountedPrice(item.price, item.discount);
            const quantity = cart.filter(i => i.name === item.name).length;
            return (
              <article className={`bb-product-card ${idx === 1 ? 'bb-card-main' : ''}`} key={item._id}>
                <div className="bb-product-image" onClick={() => handleOpenItemDetails(item)}>
                  {item.discount > 0 && <span className="bb-discount">-{item.discount}%</span>}
                  <img src={item.image} alt={item.name} />
                  <div className="bb-image-number">0{idx + 1}</div>
                </div>
                <div className="bb-product-info">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description || "طعم بحبح اللي ملوش بديل."}</p>
                  </div>
                  <div className="bb-product-bottom">
                    <strong>{finalPrice} <small>EGP</small></strong>
                    {quantity === 0 ? (
                      <button onClick={() => handleOpenItemDetails(item)} className="bb-add">+</button>
                    ) : (
                      <div className="bb-qty">
                        <button onClick={() => changeQty(item, 'minus')}>−</button>
                        <b>{quantity}</b>
                        <button onClick={() => changeQty(item, 'plus')}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {siteSettings.promoBannerImage && (
        <section className="bb-promo">
          <img src={siteSettings.promoBannerImage} alt="Bahbah Offer" />
          <div className="bb-promo-copy">
            <span>BAHBAH SPECIAL</span>
            <h2>HOT.<br/>LOUD.<br/><em>BAHBAH.</em></h2>
            <Link to="/menu" className="bb-fire-btn">شوف المنيو <span>↗</span></Link>
          </div>
        </section>
      )}

      <section className="bb-brand-block">
        <div className="bb-brand-copy">
          <span className="bb-red-script">THIS IS</span>
          <h2>BAHBAH<br/><span>BURGER</span></h2>
          <p>مش مجرد برجر. دي شخصية. طعم، نار، وقرمشة معمولة بطريقتنا.</p>
        </div>
        <div className="bb-brand-mark">
          <div className="bb-flame">🔥</div>
          <b>B</b>
          <span>EST. 2026</span>
        </div>
      </section>
    </main>
  );
};

// ================= 2. صفحة المنيو - Bahbah Brand =================
const MenuPage = ({ menuItems, categories, lang, handleOpenBox, handleOpenItemDetails, cart, setCart }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categoriesToShow = selectedCategory === 'الكل' || selectedCategory === 'All'
    ? categories
    : categories.filter(cat => cat.name === selectedCategory);

  const changeQty = (item, direction) => {
    const idx = cart.findIndex(i => i.name === item.name);
    if (direction === 'minus' && idx !== -1) {
      const next = [...cart];
      next.splice(idx, 1);
      setCart(next);
    }
    if (direction === 'plus') {
      setCart([...cart, { ...item, price: getDiscountedPrice(item.price, item.discount) }]);
    }
  };

  return (
    <main className="bb-site bb-menu-page">
      <section className="bb-menu-hero">
        <div>
          <span className="bb-red-script">BAHBAH</span>
          <h1>THE<br/><em>MENU</em></h1>
          <p>اختار اللي نفسك فيه وخلي الباقي علينا.</p>
        </div>
        <div className="bb-menu-hero-mark">B<span>🔥</span></div>
      </section>

      <div className="bb-category-bar">
        <button
          onClick={() => setSelectedCategory(lang === 'ar' ? 'الكل' : 'All')}
          className={selectedCategory === 'الكل' || selectedCategory === 'All' ? 'active' : ''}
        >{t.all}</button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={selectedCategory === cat.name ? 'active' : ''}
          >{cat.name}</button>
        ))}
      </div>

      {categoriesToShow.length === 0 ? (
        <div className="bb-empty-menu">لا توجد أقسام مضافة بعد... ⏳</div>
      ) : (
        <div className="bb-menu-sections">
          {categoriesToShow.map(cat => {
            const catItems = menuItems
              .filter(item => item.category === cat.name)
              .sort((a, b) => (a.order || 0) - (b.order || 0));

            if (catItems.length === 0 && selectedCategory !== 'الكل' && selectedCategory !== 'All') {
              return <div key={cat._id} className="bb-empty-menu">لا توجد أصناف في هذا القسم حالياً.</div>;
            }
            if (catItems.length === 0) return null;

            return (
              <section key={cat._id} className="bb-menu-category">
                <div className="bb-category-heading">
                  <span>0{categories.indexOf(cat) + 1}</span>
                  <div><small>BAHBAH SELECTION</small><h2>{cat.name}</h2></div>
                  <i>♛</i>
                </div>

                <div className="bb-menu-grid">
                  {catItems.map(item => {
                    const finalPrice = getDiscountedPrice(item.price, item.discount);
                    const quantity = cart.filter(i => i.name === item.name).length;
                    return (
                      <article className="bb-product-card" key={item._id}>
                        <div
                          className="bb-product-image"
                          onClick={() => item.type === 'box' ? handleOpenBox(item) : handleOpenItemDetails(item)}
                        >
                          {item.discount > 0 && <span className="bb-discount">-{item.discount}%</span>}
                          <img src={item.image || "https://via.placeholder.com/600x450/090909/e52b18?text=Bahbah+Burger"} alt={item.name} />
                        </div>
                        <div className="bb-product-info">
                          <h3>{item.name}</h3>
                          <p>{item.description || "طعم بحبح اللي ملوش بديل."}</p>
                          <div className="bb-product-bottom">
                            <strong>{finalPrice} <small>EGP</small></strong>
                            {item.type === 'box' ? (
                              <button onClick={() => handleOpenBox(item)} className="bb-order-btn">{t.customizeBox} ↗</button>
                            ) : quantity === 0 ? (
                              <button onClick={() => handleOpenItemDetails(item)} className="bb-add">+</button>
                            ) : (
                              <div className="bb-qty">
                                <button onClick={() => changeQty(item, 'minus')}>−</button>
                                <b>{quantity}</b>
                                <button onClick={() => changeQty(item, 'plus')}>+</button>
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
    </main>
  );
};

// ================= 3. لوحة التحكم =================
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
    <section className="px-6 py-12 max-w-5xl mx-auto min-h-[80vh] bg-[#050304] text-white">
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
    fetch(`${API_BASE}/api/zones`).then(res => res.json()).then(data => {
      setDeliveryZones(data);
      if (data.length > 0) setSelectedZone(data[0]);
    }).catch(() => {});
  }, []);

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc.find(i => i.name === item.name);
    if (existing) existing.quantity += 1;
    else acc.push({ ...item, quantity: 1 });
    return acc;
  }, []);

  const deliveryFee = orderType === 'delivery' && selectedZone ? selectedZone.fee : 0;
  const grandTotal = itemsTotal + deliveryFee;

  const handleIncrease = name => {
    const item = cart.find(i => i.name === name);
    if (item) setCart([...cart, { ...item }]);
  };
  const handleDecrease = name => {
    const idx = cart.findIndex(i => i.name === name);
    if (idx !== -1) { const next = [...cart]; next.splice(idx, 1); setCart(next); }
  };
  const handleRemoveCompletely = name => setCart(cart.filter(i => i.name !== name));

  const sendOrderToWhatsApp = () => {
    if (!cart.length) return alert("السلة فارغة!");
    if (!customerName.trim()) return alert("من فضلك اكتب اسمك الكامل.");
    if (!customerPhone.trim() || customerPhone.length !== 11 || isNaN(customerPhone)) return alert("من فضلك اكتب رقم تليفون صحيح مكون من 11 رقم.");
    if (orderType === 'delivery' && !customerAddress.trim()) return alert("من فضلك اكتب عنوان الاستلام بالتفصيل.");

    const orderId = 'BB-' + Date.now().toString().slice(-4) + Math.floor(10 + Math.random() * 90);
    let message = `🍔 أهلاً (بحبح برجر)، عندي أوردر جديد!\n`;
    message += `🆔 *رقم الأوردر:* #${orderId}\n\n`;
    message += `👤 *الاسم:* ${customerName}\n📞 *التليفون:* ${customerPhone}\n`;
    message += `📦 *نوع الاستلام:* ${orderType === 'delivery' ? 'توصيل دليفري 🛵' : 'استلام من الفرع 🏪'}\n`;
    if (orderType === 'delivery') {
      message += `📍 *العنوان:* ${customerAddress}\n`;
      if (selectedZone) message += `🚚 *منطقة التوصيل:* ${selectedZone.name} (${selectedZone.fee} ج)\n`;
    }
    message += `\n🛒 *الأصناف المطلوبة:*\n`;
    groupedCart.forEach(item => message += `▪️ ${item.quantity}× ${item.name} — (${item.price * item.quantity} ج)\n`);
    message += `\n-------------------\n🏷️ *قيمة الأصناف:* ${itemsTotal} ج\n`;
    if (orderType === 'delivery') message += `🚚 *سعر التوصيل:* ${deliveryFee} ج\n`;
    message += `💰 *الإجمالي النهائي: ${grandTotal} جنيه*\n`;

    window.open(`https://wa.me/201042281510?text=${encodeURIComponent(message)}`, '_blank');
    setCart([]);
    setPlacedOrderId(orderId);
  };

  if (placedOrderId) {
    return (
      <section className="bb-cart-page">
        <div className="bb-success">
          <span>✓</span>
          <small>ORDER CONFIRMED</small>
          <h1>تم إرسال طلبك!</h1>
          <p>رقم الأوردر</p>
          <strong>{placedOrderId}</strong>
          <button onClick={() => setPlacedOrderId(null)}>رجوع للسلة</button>
        </div>
      </section>
    );
  }

  return (
    <section className="bb-cart-page">
      <div className="bb-cart-title"><span className="bb-red-script">YOUR</span><h1>CART</h1><p>طلباتك كلها في مكان واحد.</p></div>
      {cart.length === 0 ? (
        <div className="bb-empty-cart">
          <div>🛒</div><h2>{t.emptyCart}</h2>
          <Link to="/menu">← {t.backToMenu}</Link>
        </div>
      ) : (
        <div className="bb-cart-layout">
          <div className="bb-cart-items">
            <div className="bb-cart-head"><span>YOUR ORDER</span><b>{cart.length} ITEMS</b></div>
            {groupedCart.map((item, index) => (
              <div className="bb-cart-row" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="bb-cart-name"><h3>{item.name}</h3><span>{item.price} EGP</span></div>
                <div className="bb-qty">
                  <button onClick={() => handleDecrease(item.name)}>−</button><b>{item.quantity}</b><button onClick={() => handleIncrease(item.name)}>+</button>
                </div>
                <button className="bb-remove" onClick={() => handleRemoveCompletely(item.name)}>×</button>
              </div>
            ))}
            <div className="bb-total"><span>{t.total}</span><strong>{grandTotal} <small>EGP</small></strong></div>
          </div>

          <div className="bb-checkout">
            <span className="bb-red-script">READY?</span>
            <h2>LET'S<br/><em>ORDER.</em></h2>
            <div className="bb-order-types">
              <button onClick={() => setOrderType('delivery')} className={orderType === 'delivery' ? 'active' : ''}>🛵 دليفري</button>
              <button onClick={() => setOrderType('pickup')} className={orderType === 'pickup' ? 'active' : ''}>🏪 استلام</button>
            </div>
            <label>الاسم<input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="اكتب اسمك" /></label>
            <label>رقم التليفون<input maxLength="11" value={customerPhone} onChange={e => setCustomerPhone(e.target.value.replace(/\D/g, ''))} placeholder="010xxxxxxxx" /></label>
            {orderType === 'delivery' && <>
              <label>منطقة التوصيل<select value={selectedZone ? selectedZone._id : ''} onChange={e => setSelectedZone(deliveryZones.find(z => z._id === e.target.value))}>
                {deliveryZones.map(z => <option key={z._id} value={z._id}>{z.name} ({z.fee} جنيه)</option>)}
              </select></label>
              <label>العنوان<textarea rows="2" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} placeholder="الشارع، العمارة، الدور..." /></label>
            </>}
            <button className="bb-whatsapp" onClick={sendOrderToWhatsApp}>{t.whatsappOrder} ↗</button>
          </div>
        </div>
      )}
    </section>
  );
};

// ================= التطبيق الرئيسي =================
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
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bb-app">
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cairo:wght@400;600;700;800;900&family=Permanent+Marker&display=swap');
:root{--bb-red:#e52b18;--bb-orange:#ff6a00;--bb-black:#050505;--bb-line:#292929;--bb-white:#f7f3ee}
.bb-app{min-height:100vh;background:#050505;color:var(--bb-white);font-family:'Cairo',Arial,sans-serif}
.bb-app *{box-sizing:border-box}.bb-app a{text-decoration:none}
.bb-nav{height:82px;background:rgba(5,5,5,.94);border-bottom:1px solid rgba(229,43,24,.35);display:flex;align-items:center;position:sticky;top:0;z-index:80;backdrop-filter:blur(12px)}
.bb-nav-inner{width:min(1380px,92%);margin:auto;display:flex;align-items:center;justify-content:space-between;gap:25px}
.bb-logo{display:flex;align-items:center;min-width:190px}.bb-logo img{height:60px;width:auto;object-fit:contain}.bb-logo-text{font-weight:900;font-size:24px;line-height:.85;color:#fff}
.bb-nav-links{display:flex;gap:34px}.bb-nav-links a{color:#aaa;font-weight:800;font-size:14px;position:relative}.bb-nav-links a:hover{color:#fff}.bb-nav-links a:after{content:'';position:absolute;bottom:-10px;right:0;width:0;height:2px;background:var(--bb-red);transition:.25s}.bb-nav-links a:hover:after{width:100%}
.bb-nav-actions{display:flex;align-items:center;gap:12px}.bb-lang{border:0;background:transparent;color:#eee;font-weight:900;cursor:pointer}.bb-cart-link{display:flex;align-items:center;gap:8px;color:#fff;border:1px solid #333;padding:9px 14px;background:#0b0b0b}.bb-cart-count{background:var(--bb-red);min-width:22px;height:22px;display:grid;place-items:center;border-radius:50%;font-size:11px}.bb-menu-icon{display:none;background:none;border:0;color:#fff;font-size:25px}
.bb-site{background:#050505;min-height:100vh;overflow:hidden}.bb-hero{height:calc(100vh - 82px);min-height:650px;position:relative;overflow:hidden;background:#050505}.bb-hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(1.25) contrast(1.1);opacity:.48}.bb-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,#050505 0%,rgba(5,5,5,.88) 30%,rgba(5,5,5,.12) 70%,#050505 100%)}.bb-hero-grain{position:absolute;inset:0;opacity:.08;background-image:repeating-linear-gradient(115deg,transparent 0 12px,#fff 13px,#fff 14px,transparent 15px 40px);mix-blend-mode:overlay}
.bb-hero-content{position:relative;height:100%;width:min(1380px,92%);margin:auto;padding-top:55px}.bb-kicker{color:#ff5a32;font-weight:900;letter-spacing:4px;font-size:13px}.bb-hero-grid{display:grid;grid-template-columns:43% 57%;align-items:center;height:calc(100% - 50px)}.bb-hero-copy{z-index:3}.bb-small-ar{color:#bbb;font-weight:700}.bb-hero h1{font-family:'Bebas Neue',Impact,sans-serif;font-size:clamp(80px,10vw,175px);line-height:.72;letter-spacing:-3px;margin:5px 0;text-transform:uppercase}.bb-hero h1 span{display:block;color:#f6f4ef}.bb-hero h1 strong{display:block;color:var(--bb-red);font-weight:400;text-shadow:7px 7px 0 rgba(100,8,0,.5)}.bb-hero-copy>p{color:#ddd;font-size:17px;font-weight:700;max-width:450px;margin:30px 0 22px}.bb-fire-btn{display:inline-flex;align-items:center;gap:25px;background:var(--bb-red);color:#fff;padding:15px 25px;font-weight:900;box-shadow:8px 8px 0 #74140b;transition:.25s}.bb-fire-btn:hover{transform:translate(-3px,-3px);box-shadow:11px 11px 0 #74140b}.bb-hero-food{position:relative;height:100%;display:flex;align-items:center;justify-content:center}.bb-hero-food img{width:min(720px,100%);max-height:78vh;object-fit:contain;position:relative;z-index:2;filter:drop-shadow(0 30px 35px rgba(0,0,0,.85)) saturate(1.15)}.bb-food-glow{position:absolute;width:65%;height:65%;background:radial-gradient(circle,rgba(255,79,0,.32),transparent 65%);filter:blur(25px)}.bb-hero-stamp{position:absolute;right:2%;top:17%;color:var(--bb-red);font-family:'Permanent Marker',cursive;font-size:28px;line-height:.85;transform:rotate(-8deg);z-index:4;text-align:center}.bb-scroll{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);color:#999;font-size:11px;letter-spacing:2px}
.bb-marquee{height:56px;border-top:1px solid #572016;border-bottom:1px solid #572016;background:#090909;overflow:hidden;display:flex;align-items:center}.bb-marquee-track{white-space:nowrap;display:flex;align-items:center;gap:30px;color:#bfb7b0;font-family:'Bebas Neue',sans-serif;font-size:23px;letter-spacing:2px}.bb-marquee-track i{color:var(--bb-red);font-style:normal;font-size:25px}
.bb-section{width:min(1380px,92%);margin:auto;padding:100px 0}.bb-section-head{display:grid;grid-template-columns:38% 1fr;gap:60px;align-items:end;margin-bottom:45px}.bb-title-block{border-left:3px solid var(--bb-red);padding-left:25px}.bb-red-script{font-family:'Permanent Marker',cursive;color:var(--bb-red);font-size:26px;line-height:1}.bb-title-block h2,.bb-cart-title h1{font-family:'Bebas Neue',sans-serif;font-size:95px;line-height:.8;margin:8px 0}.bb-title-block p{margin:0;color:#aaa;font-weight:800}.bb-section-text{max-width:500px}.bb-section-text>span{color:#777;font-size:11px;letter-spacing:3px;font-weight:900}.bb-section-text p{color:#bdbdbd;line-height:1.8;margin:10px 0 20px}.bb-outline-btn{display:inline-flex;gap:30px;color:#fff;border:1px solid #444;padding:12px 18px;font-weight:800}
.bb-product-grid,.bb-menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.bb-product-card{background:#0b0b0b;border:1px solid #252525;position:relative;overflow:hidden;transition:.3s}.bb-product-card:hover{border-color:#6e2219;transform:translateY(-5px)}.bb-card-main{transform:translateY(-20px)}.bb-product-image{height:285px;background:#101010;position:relative;overflow:hidden;cursor:pointer}.bb-product-image:after{content:'';position:absolute;inset:auto 0 0;height:40%;background:linear-gradient(transparent,#0b0b0b)}.bb-product-image img{width:100%;height:100%;object-fit:cover;transition:.6s}.bb-product-card:hover .bb-product-image img{transform:scale(1.07)}.bb-discount{position:absolute;top:14px;right:14px;z-index:3;background:var(--bb-red);color:#fff;padding:6px 10px;font-size:12px;font-weight:900}.bb-image-number{position:absolute;bottom:10px;left:14px;color:#fff;font-family:'Bebas Neue';font-size:30px;z-index:3}.bb-product-info{padding:16px 18px 20px}.bb-product-info h3{font-size:22px;margin:0 0 4px;font-weight:900}.bb-product-info p{font-size:12px;color:#888;line-height:1.6;min-height:38px;margin:0 0 15px}.bb-product-bottom{display:flex;align-items:center;justify-content:space-between;gap:10px}.bb-product-bottom strong{font-family:'Bebas Neue';font-size:32px;color:#ff4a30}.bb-product-bottom small{font-family:'Cairo';font-size:10px;color:#aaa}.bb-add{width:42px;height:42px;background:var(--bb-red);border:0;color:#fff;font-size:27px;cursor:pointer}.bb-qty{display:flex;align-items:center;border:1px solid #3a3a3a;background:#050505}.bb-qty button{width:35px;height:35px;background:transparent;color:#fff;border:0;font-size:19px;cursor:pointer}.bb-qty b{min-width:28px;text-align:center}.bb-order-btn{border:1px solid var(--bb-red);background:transparent;color:#fff;padding:9px 12px;font-weight:800;font-size:12px;cursor:pointer}
.bb-promo{width:min(1380px,92%);height:440px;margin:0 auto 90px;position:relative;overflow:hidden;border:1px solid #35110d}.bb-promo img{width:100%;height:100%;object-fit:cover;filter:saturate(1.15) brightness(.55)}.bb-promo:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#050505 0%,rgba(5,5,5,.75) 35%,transparent 75%)}.bb-promo-copy{position:absolute;z-index:2;top:50%;left:8%;transform:translateY(-50%)}.bb-promo-copy span{font-size:11px;letter-spacing:4px;color:#aaa}.bb-promo-copy h2{font-family:'Bebas Neue';font-size:90px;line-height:.72;margin:12px 0 28px}.bb-promo-copy em{color:var(--bb-red);font-style:normal}
.bb-brand-block{min-height:500px;background:#0b0b0b;border-top:1px solid #242424;border-bottom:1px solid #242424;display:flex;align-items:center;justify-content:space-around;padding:70px 8%;position:relative;overflow:hidden}.bb-brand-copy{position:relative;z-index:2}.bb-brand-copy h2{font-family:'Bebas Neue';font-size:120px;line-height:.72;margin:15px 0}.bb-brand-copy h2 span{color:var(--bb-red)}.bb-brand-copy p{max-width:430px;color:#999}.bb-brand-mark{position:relative;z-index:2;width:260px;height:260px;border:2px solid var(--bb-red);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue';font-size:200px;color:#fff;transform:rotate(-5deg)}.bb-brand-mark .bb-flame{position:absolute;top:-50px;right:-25px;font-size:65px}.bb-brand-mark span{position:absolute;bottom:12px;font-family:'Cairo';font-size:11px;letter-spacing:3px;color:#aaa}
.bb-menu-hero{min-height:360px;width:min(1380px,92%);margin:auto;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #242424}.bb-menu-hero h1{font-family:'Bebas Neue';font-size:145px;line-height:.72;margin:12px 0}.bb-menu-hero h1 em{font-style:normal;color:var(--bb-red)}.bb-menu-hero p{color:#aaa;font-weight:700}.bb-menu-hero-mark{font-family:'Bebas Neue';font-size:280px;color:#151515;line-height:1;position:relative}.bb-menu-hero-mark span{font-size:70px;position:absolute;right:-20px;top:0}.bb-category-bar{width:min(1380px,92%);margin:30px auto 70px;display:flex;gap:8px;overflow:auto;border-bottom:1px solid #242424;padding-bottom:12px}.bb-category-bar button{background:transparent;border:0;color:#777;padding:12px 18px;font-weight:900;white-space:nowrap;cursor:pointer}.bb-category-bar button.active{background:var(--bb-red);color:#fff}.bb-menu-sections{width:min(1380px,92%);margin:auto}.bb-menu-category{padding-bottom:75px;margin-bottom:70px;border-bottom:1px solid #242424}.bb-category-heading{display:grid;grid-template-columns:70px 1fr 60px;align-items:center;margin-bottom:30px}.bb-category-heading>span{font-family:'Bebas Neue';font-size:55px;color:#333}.bb-category-heading small{font-size:9px;letter-spacing:3px;color:#777}.bb-category-heading h2{font-family:'Bebas Neue';font-size:58px;margin:0}.bb-category-heading i{font-style:normal;color:var(--bb-red);font-size:30px}
.bb-cart-page{min-height:calc(100vh - 82px);width:min(1380px,92%);margin:auto;padding:80px 0}.bb-cart-title p{color:#888}.bb-cart-layout{display:grid;grid-template-columns:1.35fr .65fr;gap:25px}.bb-cart-items,.bb-checkout{background:#0b0b0b;border:1px solid #252525;padding:28px}.bb-cart-head{display:flex;justify-content:space-between;padding-bottom:18px;border-bottom:1px solid #282828;color:#888;font-size:11px;letter-spacing:2px}.bb-cart-row{display:grid;grid-template-columns:75px 1fr auto auto;gap:15px;align-items:center;padding:18px 0;border-bottom:1px solid #222}.bb-cart-row img{width:75px;height:65px;object-fit:cover}.bb-cart-name h3{font-size:14px;margin:0 0 4px}.bb-cart-name span{color:var(--bb-red);font-size:12px;font-weight:900}.bb-remove{background:none;border:0;color:#777;font-size:22px;cursor:pointer}.bb-total{display:flex;justify-content:space-between;align-items:center;padding-top:25px}.bb-total strong{font-family:'Bebas Neue';font-size:42px;color:var(--bb-red)}.bb-total small{font-family:'Cairo';font-size:10px;color:#aaa}.bb-checkout h2{font-family:'Bebas Neue';font-size:70px;line-height:.7;margin:12px 0 25px}.bb-checkout h2 em{color:var(--bb-red);font-style:normal}.bb-order-types{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}.bb-order-types button{background:#050505;color:#777;border:1px solid #2b2b2b;padding:11px;font-weight:800;cursor:pointer}.bb-order-types button.active{background:var(--bb-red);border-color:var(--bb-red);color:#fff}.bb-checkout label{display:block;color:#aaa;font-size:11px;font-weight:800;margin-bottom:12px}.bb-checkout input,.bb-checkout select,.bb-checkout textarea{width:100%;margin-top:5px;background:#050505;color:#fff;border:1px solid #2b2b2b;padding:12px;outline:none}.bb-whatsapp{width:100%;border:0;background:#25d366;color:#041108;padding:14px;font-weight:900;cursor:pointer}.bb-empty-cart,.bb-success{background:#0b0b0b;border:1px solid #252525;padding:70px;text-align:center}.bb-success>span{display:grid;place-items:center;width:70px;height:70px;border:2px solid #25d366;color:#25d366;font-size:35px;margin:0 auto 15px}.bb-success small{color:#25d366;letter-spacing:3px}.bb-success h1{font-family:'Bebas Neue';font-size:60px}.bb-success>strong{display:block;font-family:'Bebas Neue';font-size:45px;color:var(--bb-red);margin:15px}.bb-success button{background:var(--bb-red);border:0;color:#fff;padding:12px 22px;font-weight:900}.bb-empty-menu{width:min(1380px,92%);margin:60px auto;padding:70px;text-align:center;border:1px solid #242424;color:#777}
@media(max-width:900px){.bb-nav-links{display:none}.bb-menu-icon{display:block}.bb-hero{min-height:720px;height:auto}.bb-hero-grid{grid-template-columns:1fr;height:auto}.bb-hero-copy{padding-top:55px}.bb-hero h1{font-size:88px}.bb-hero-food{height:380px}.bb-section-head{grid-template-columns:1fr;gap:25px}.bb-product-grid,.bb-menu-grid{grid-template-columns:repeat(2,1fr)}.bb-card-main{transform:none}.bb-brand-block{padding:70px 6%}.bb-brand-copy h2{font-size:85px}.bb-menu-hero h1{font-size:100px}.bb-cart-layout{grid-template-columns:1fr}}
@media(max-width:600px){.bb-logo img{height:50px}.bb-cart-link{padding:8px 10px}.bb-hero-content{width:94%}.bb-kicker{font-size:10px;letter-spacing:2px}.bb-hero h1{font-size:70px}.bb-hero-food{height:310px}.bb-section{width:94%;padding:65px 0}.bb-title-block h2,.bb-cart-title h1{font-size:72px}.bb-product-grid,.bb-menu-grid{grid-template-columns:1fr}.bb-product-image{height:270px}.bb-promo{width:94%;height:350px}.bb-promo-copy h2{font-size:65px}.bb-brand-block{display:block;text-align:center}.bb-brand-copy h2{font-size:80px}.bb-brand-mark{margin:70px auto 0;width:190px;height:190px;font-size:145px}.bb-menu-hero{min-height:280px}.bb-menu-hero h1{font-size:82px}.bb-menu-hero-mark{font-size:170px}.bb-category-heading h2{font-size:43px}.bb-cart-page{padding:55px 0}.bb-cart-items,.bb-checkout{padding:18px}.bb-cart-row{grid-template-columns:55px 1fr auto}.bb-cart-row img{width:55px;height:55px}.bb-cart-row .bb-qty{grid-column:2}.bb-remove{grid-column:3}}
`}</style>
      <nav className="bb-nav">
        <div className="bb-nav-inner">
          <Link to="/" className="bb-logo">
            {siteSettings.logoImage ? <img src={siteSettings.logoImage} alt="Bahbah Burger" /> : <span className="bb-logo-text">Bahbah<br/>Burger</span>}
          </Link>
          <div className="bb-nav-links">
            <Link to="/">{t.home}</Link>
            <Link to="/menu">{t.menu}</Link>
            <Link to="/menu">Offers</Link>
          </div>
          <div className="bb-nav-actions">
            <button className="bb-lang" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>{lang === 'ar' ? 'EN' : 'عربي'}</button>
            <Link to="/cart" className="bb-cart-link">🛒 <span>{t.cart}</span><b className="bb-cart-count">{cart.length}</b></Link>
            <button className="bb-menu-icon">☰</button>
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
          <div className="bg-[#0b0b0b] border border-[#6e2219] rounded-none w-full max-w-lg p-8 relative shadow-2xl">
            <button onClick={() => setSelectedItemDetail(null)} className="absolute top-6 left-6 text-red-400 text-xl font-bold bg-red-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20">✕</button>
            <h3 className="text-3xl font-black text-white mb-6">{selectedItemDetail.name}</h3>
              
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
            <button onClick={handleAddCustomizedItemToCart} className="w-full bg-[#FF4500] text-white font-black py-4 rounded-2xl hover:bg-[#E03D00] transition text-lg shadow-2xl">
              أضف للسلة • {currentItemTotalPrice} ج
            </button>
          </div>
        </div>
      )}

      {isBoxModalOpen && activeBox && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-xl">
          <div className="bg-[#0b0b0b] border border-[#6e2219] rounded-none w-full max-w-lg p-8 relative shadow-2xl">
            <button onClick={() => setIsBoxModalOpen(false)} className="absolute top-6 left-6 text-red-400 text-xl font-bold bg-red-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20">✕</button>
              
            <h3 className="text-3xl font-black text-[#FFB800] mb-1">{activeBox.name}</h3>
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

      <footer onClick={handleSecretLogoClick} className="bg-[#080808] border-t border-[#3b1712] mt-24 text-zinc-400 py-8 text-center text-xs cursor-default select-none">
        جميع الحقوق محفوظة © 2026 بحبح برجر — Bahbah Burger
      </footer>
    </div>
  );
}

App;
export default App;