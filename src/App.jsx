import { useState } from "react";

const CATEGORIES = ["All", "Vegetables", "Fruits", "Dairy", "Snacks", "Spices"];

const PRODUCTS = [
  { id: 1,  name: "Potato",     price: 30,  unit: "1 kg",    emoji: "🥔", category: "Vegetables", color: "#f59e0b", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80" },
  { id: 2,  name: "Tomato",     price: 40,  unit: "500 g",   emoji: "🍅", category: "Vegetables", color: "#ef4444", img: "https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=400&q=80" },
  { id: 3,  name: "Onion",      price: 25,  unit: "1 kg",    emoji: "🧅", category: "Vegetables", color: "#a855f7", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80" },
  { id: 4,  name: "Spinach",    price: 20,  unit: "1 bunch", emoji: "🥬", category: "Vegetables", color: "#22c55e", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80" },
  { id: 5,  name: "Banana",     price: 60,  unit: "12 pcs",  emoji: "🍌", category: "Fruits",     color: "#eab308", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80" },
  { id: 6,  name: "Apple",      price: 120, unit: "1 kg",    emoji: "🍎", category: "Fruits",     color: "#ef4444", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80" },
  { id: 7,  name: "Grapes",     price: 80,  unit: "500 g",   emoji: "🍇", category: "Fruits",     color: "#8b5cf6", img: "https://images.unsplash.com/photo-1601004890657-d500b8b0d082?w=400&q=80" },
  { id: 8,  name: "Mango",      price: 150, unit: "1 kg",    emoji: "🥭", category: "Fruits",     color: "#f97316", img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80" },
  { id: 9,  name: "Milk",       price: 55,  unit: "1 litre", emoji: "🥛", category: "Dairy",      color: "#3b82f6", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  { id: 10, name: "Yogurt",     price: 45,  unit: "400 g",   emoji: "🫙", category: "Dairy",      color: "#06b6d4", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
  { id: 11, name: "Paneer",     price: 90,  unit: "200 g",   emoji: "🧀", category: "Dairy",      color: "#f59e0b", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80" },
  { id: 12, name: "Namkeen",    price: 35,  unit: "200 g",   emoji: "🍿", category: "Snacks",     color: "#f97316", img: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=400&q=80" },
  { id: 13, name: "Biscuits",   price: 20,  unit: "1 pack",  emoji: "🍪", category: "Snacks",     color: "#d97706", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80" },
  { id: 14, name: "Turmeric",   price: 60,  unit: "100 g",   emoji: "🌿", category: "Spices",     color: "#eab308", img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80" },
  { id: 15, name: "Red Chilli", price: 50,  unit: "100 g",   emoji: "🌶️", category: "Spices",     color: "#ef4444", img: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&q=80" },
];

const CAT_GRADIENTS = {
  "All":        "linear-gradient(135deg,#ff6b35,#f7c948)",
  "Vegetables": "linear-gradient(135deg,#22c55e,#16a34a)",
  "Fruits":     "linear-gradient(135deg,#ef4444,#f97316)",
  "Dairy":      "linear-gradient(135deg,#3b82f6,#06b6d4)",
  "Snacks":     "linear-gradient(135deg,#f59e0b,#eab308)",
  "Spices":     "linear-gradient(135deg,#ef4444,#dc2626)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Nunito', sans-serif; background: #f4f7ff; min-height: 100vh; }

  /* HEADER */
  .hdr {
    background: linear-gradient(135deg,#ff6b35 0%,#f7c948 55%,#4ecb71 100%);
    height: 68px; display: flex; align-items: center;
    justify-content: space-between; padding: 0 28px;
    position: sticky; top: 0; z-index: 200;
    box-shadow: 0 4px 18px rgba(255,107,53,.3);
  }
  .logo { font-size: 1.8rem; font-weight: 900; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,.15); }
  .logo em { color: #1a1a1a; font-style: normal; }

  .cart-btn {
    background: #fff; border: none; border-radius: 50px;
    padding: 9px 20px; font-family: 'Nunito', sans-serif;
    font-size: .95rem; font-weight: 800; color: #ff6b35;
    display: flex; align-items: center; gap: 8px;
    cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.15);
    position: relative; transition: transform .15s;
  }
  .cart-btn:hover { transform: scale(1.05); }

  .badge {
    background: #ff6b35; color: #fff;
    width: 22px; height: 22px; border-radius: 50%;
    font-size: .7rem; font-weight: 900;
    display: flex; align-items: center; justify-content: center;
    animation: popB .3s cubic-bezier(.36,.07,.19,.97);
  }
  @keyframes popB { 0%{transform:scale(0)} 70%{transform:scale(1.45)} 100%{transform:scale(1)} }

  /* CATEGORIES */
  .cats {
    display: flex; gap: 10px; padding: 14px 28px;
    overflow-x: auto; scrollbar-width: none;
    background: #fff; border-bottom: 2px solid #f0f0f0;
  }
  .cats::-webkit-scrollbar { display: none; }
  .cat-btn {
    padding: 8px 20px; border-radius: 50px;
    border: 2px solid #e5e7eb; background: #fff;
    font-family: 'Nunito', sans-serif; font-size: .88rem;
    font-weight: 700; cursor: pointer; white-space: nowrap;
    color: #555; transition: all .18s;
  }
  .cat-btn.active {
    border-color: transparent; color: #fff;
    transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.15);
  }

  /* LAYOUT */
  .main { display: grid; grid-template-columns: 1fr 370px; min-height: calc(100vh - 120px); }
  @media(max-width:860px){ .main{grid-template-columns:1fr} .cart-panel{display:none} }

  /* PRODUCTS */
  .prod-sec { padding: 24px 28px; }
  .sec-lbl {
    font-size: .75rem; font-weight: 800; color: #aaa;
    letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 18px;
  }
  .grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(158px,1fr)); gap: 16px; }

  .card {
    background: #fff; border-radius: 20px; overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,.07);
    border: 2px solid transparent;
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }
  .card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(0,0,0,.12); }
  .card.in-cart { border-color: #22c55e; }

  /* image area */
  .img-wrap {
    width: 100%; height: 130px; overflow: hidden;
    position: relative; cursor: zoom-in;
    background: #f0f4f0;
    display: flex; align-items: center; justify-content: center;
  }
  .img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .35s ease; display: block;
  }
  .img-wrap:hover img { transform: scale(1.12); }
  .zoom-lbl {
    position: absolute; bottom: 6px; right: 6px;
    background: rgba(0,0,0,.5); color: #fff;
    font-size: .58rem; font-weight: 700; padding: 3px 8px;
    border-radius: 20px; opacity: 0; transition: opacity .2s;
    pointer-events: none; letter-spacing: .5px;
  }
  .img-wrap:hover .zoom-lbl { opacity: 1; }
  .img-emoji {
    font-size: 3.5rem; position: absolute;
    opacity: 0; pointer-events: none;
  }

  .card-body { padding: 12px 14px 14px; }
  .card-name { font-size: 1rem; font-weight: 800; color: #1a1a1a; }
  .card-sub  { font-size: .7rem; color: #bbb; font-weight: 600; margin-bottom: 10px; }
  .card-bot  { display: flex; align-items: center; justify-content: space-between; }
  .card-price{ font-size: 1.1rem; font-weight: 900; }
  .card-unit { font-size: .65rem; color: #bbb; }

  .add-btn {
    border: none; border-radius: 50px; padding: 7px 14px;
    font-family: 'Nunito', sans-serif; font-size: .82rem;
    font-weight: 800; color: #fff; cursor: pointer;
    transition: transform .15s, opacity .15s;
  }
  .add-btn:hover { transform: scale(1.08); opacity: .9; }

  .qty-row {
    display: flex; align-items: center; gap: 6px;
    background: #f3f4f6; border-radius: 50px; padding: 4px 10px;
  }
  .q-btn {
    background: none; border: none; font-size: 1.1rem;
    font-weight: 900; cursor: pointer; color: #555;
    line-height: 1; transition: color .15s;
  }
  .q-btn:hover { color: #ff6b35; }
  .q-num { font-size: .88rem; font-weight: 800; min-width: 18px; text-align: center; }

  /* CART PANEL */
  .cart-panel {
    background: #fff; border-left: 2px solid #f0f0f0;
    display: flex; flex-direction: column;
    height: calc(100vh - 120px);
    position: sticky; top: 68px;
  }
  .cp-hdr {
    padding: 18px 22px 14px; border-bottom: 2px solid #f0f0f0;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .cp-title { font-size: 1.25rem; font-weight: 900; color: #1a1a1a; }
  .clr-btn {
    font-size: .75rem; font-weight: 700; color: #ef4444;
    background: #fef2f2; border: none; padding: 5px 12px;
    border-radius: 20px; cursor: pointer; font-family: 'Nunito', sans-serif;
    transition: background .15s;
  }
  .clr-btn:hover { background: #fee2e2; }

  .cp-empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 10px;
  }
  .cp-empty .big { font-size: 3.5rem; }
  .cp-empty p { font-size: .85rem; color: #bbb; text-align: center; line-height: 1.7; }

  .cp-list { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #e5e7eb transparent; }

  .cp-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 20px; border-bottom: 1px solid #f5f5f5;
    animation: slideIn .2s ease;
  }
  @keyframes slideIn { from{opacity:0;transform:translateX(14px)} to{opacity:1;transform:translateX(0)} }

  .cp-thumb {
    width: 46px; height: 46px; border-radius: 12px;
    object-fit: cover; flex-shrink: 0; background: #f3f4f6;
  }
  .cp-info { flex: 1; min-width: 0; }
  .cp-name { font-size: .86rem; font-weight: 800; color: #1a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cp-unit { font-size: .68rem; color: #bbb; }
  .cp-total { font-size: .95rem; font-weight: 900; min-width: 48px; text-align: right; flex-shrink: 0; }
  .del-btn { background: none; border: none; color: #ddd; font-size: 1rem; cursor: pointer; padding: 2px; transition: color .15s; flex-shrink: 0; }
  .del-btn:hover { color: #ef4444; }

  /* CART FOOTER */
  .cp-foot { padding: 14px 22px 18px; border-top: 2px solid #f0f0f0; flex-shrink: 0; }
  .bill-row { display: flex; justify-content: space-between; font-size: .84rem; color: #888; margin-bottom: 6px; font-weight: 600; }
  .bill-row.tot {
    font-size: 1.15rem; font-weight: 900; color: #1a1a1a;
    margin-top: 10px; padding-top: 10px; border-top: 2px dashed #e5e7eb;
  }
  .bill-row.tot .tv { color: #ff6b35; }
  .free-msg {
    font-size: .72rem; font-weight: 700; color: #f97316;
    text-align: center; background: #fff7ed; padding: 5px 10px;
    border-radius: 8px; margin-top: 4px;
  }
  .ckout-btn {
    width: 100%; margin-top: 14px; padding: 14px;
    background: linear-gradient(135deg,#ff6b35,#f7c948);
    border: none; border-radius: 14px;
    font-family: 'Nunito', sans-serif; font-size: 1.05rem;
    font-weight: 900; color: #fff; cursor: pointer;
    letter-spacing: .5px; box-shadow: 0 6px 20px rgba(255,107,53,.35);
    transition: transform .15s, box-shadow .15s;
  }
  .ckout-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,107,53,.4); }

  /* ZOOM MODAL */
  .overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.78);
    z-index: 999; display: flex; align-items: center;
    justify-content: center; padding: 20px;
    animation: fIn .2s ease; backdrop-filter: blur(6px);
  }
  @keyframes fIn { from{opacity:0} to{opacity:1} }

  .modal {
    background: #fff; border-radius: 24px; overflow: hidden;
    max-width: 440px; width: 100%;
    animation: zIn .25s cubic-bezier(.34,1.56,.64,1);
    box-shadow: 0 30px 80px rgba(0,0,0,.45); position: relative;
  }
  @keyframes zIn { from{transform:scale(.65);opacity:0} to{transform:scale(1);opacity:1} }

  .modal-img {
    width: 100%; height: 270px; object-fit: cover;
    display: block; background: #f3f4f6;
  }
  .modal-body { padding: 20px 24px 24px; }
  .modal-name { font-size: 1.6rem; font-weight: 900; color: #1a1a1a; }
  .modal-sub  { font-size: .82rem; color: #aaa; font-weight: 600; margin-bottom: 14px; }
  .modal-row  { display: flex; align-items: flex-end; justify-content: space-between; }
  .modal-price{ font-size: 2rem; font-weight: 900; line-height: 1; }
  .modal-unit { font-size: .78rem; color: #aaa; margin-top: 4px; }
  .modal-add {
    border: none; padding: 12px 26px; border-radius: 50px;
    font-family: 'Nunito', sans-serif; font-size: .95rem;
    font-weight: 800; color: #fff; cursor: pointer;
    transition: transform .15s; box-shadow: 0 4px 14px rgba(0,0,0,.15);
  }
  .modal-add:hover { transform: scale(1.06); }
  .modal-close {
    position: absolute; top: 12px; right: 12px;
    background: rgba(255,255,255,.92); border: none;
    width: 34px; height: 34px; border-radius: 50%;
    font-size: 1rem; font-weight: 800; color: #555;
    cursor: pointer; display: flex; align-items: center;
    justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,.2);
    transition: transform .15s, color .15s;
  }
  .modal-close:hover { transform: scale(1.12); color: #ef4444; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 28px; left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a; color: #fff;
    padding: 11px 24px; border-radius: 50px;
    font-size: .92rem; font-weight: 700; z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,.3); white-space: nowrap;
    animation: tIn .3s ease, tOut .3s ease 1.7s forwards;
  }
  @keyframes tIn  { from{opacity:0;transform:translateX(-50%) translateY(20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes tOut { to{opacity:0;transform:translateX(-50%) translateY(20px)} }
`;

export default function GroceryCart() {
  const [cart, setCart]       = useState([]);
  const [activeCat, setActive] = useState("All");
  const [zoomItem, setZoom]   = useState(null);
  const [toast, setToast]     = useState(null);

  const filtered   = activeCat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery   = subtotal > 0 ? (subtotal >= 300 ? 0 : 30) : 0;
  const total      = subtotal + delivery;
  const inCart     = id => cart.find(i => i.id === id);

  const addItem = p => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex
        ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...p, qty: 1 }];
    });
    showToast(`${p.emoji} ${p.name} added to cart!`);
  };

  const updateQty = (id, d) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + d } : i).filter(i => i.qty > 0));

  const removeItem = id => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart  = () => setCart([]);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      <style>{css}</style>

      {/* HEADER */}
      <header className="hdr">
        <div className="logo">🛒 Fresh<em>Mart</em></div>
        <button className="cart-btn">
          🛍️ Cart
          {totalItems > 0 && <span className="badge" key={totalItems}>{totalItems}</span>}
        </button>
      </header>

      {/* CATEGORIES */}
      <div className="cats">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${activeCat === cat ? "active" : ""}`}
            style={activeCat === cat ? { background: CAT_GRADIENTS[cat] } : {}}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div className="main">

        {/* PRODUCTS */}
        <div className="prod-sec">
          <p className="sec-lbl">
            {activeCat === "All" ? "All Products" : activeCat} — {filtered.length} items
          </p>
          <div className="grid">
            {filtered.map(p => {
              const ci = inCart(p.id);
              return (
                <div key={p.id} className={`card ${ci ? "in-cart" : ""}`}>
                  {/* CLICKABLE IMAGE */}
                  <div className="img-wrap" onClick={() => setZoom(p)}>
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.opacity = "1";
                      }}
                    />
                    <span className="img-emoji">{p.emoji}</span>
                    <span className="zoom-lbl">🔍 Zoom</span>
                  </div>

                  <div className="card-body">
                    <div className="card-name">{p.emoji} {p.name}</div>
                    <div className="card-sub">{p.category}</div>
                    <div className="card-bot">
                      <div>
                        <div className="card-price" style={{ color: p.color }}>₹{p.price}</div>
                        <div className="card-unit">{p.unit}</div>
                      </div>
                      {ci ? (
                        <div className="qty-row">
                          <button className="q-btn" onClick={() => updateQty(p.id, -1)}>−</button>
                          <span className="q-num">{ci.qty}</span>
                          <button className="q-btn" onClick={() => updateQty(p.id, +1)}>+</button>
                        </div>
                      ) : (
                        <button
                          className="add-btn"
                          style={{ background: `linear-gradient(135deg,${p.color},${p.color}bb)` }}
                          onClick={() => addItem(p)}
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CART PANEL */}
        <div className="cart-panel">
          <div className="cp-hdr">
            <div className="cp-title">🛍️ My Cart</div>
            {cart.length > 0 && <button className="clr-btn" onClick={clearCart}>Clear All</button>}
          </div>

          {cart.length === 0 ? (
            <div className="cp-empty">
              <div className="big">🥦</div>
              <p>Your cart is empty!<br />Add some fresh items 😄</p>
            </div>
          ) : (
            <div className="cp-list">
              {cart.map(item => (
                <div key={item.id} className="cp-item">
                  <img
                    className="cp-thumb"
                    src={item.img}
                    alt={item.name}
                    onError={e => { e.target.replaceWith(Object.assign(document.createElement("span"), { textContent: item.emoji, style: "font-size:2rem" })); }}
                  />
                  <div className="cp-info">
                    <div className="cp-name">{item.emoji} {item.name}</div>
                    <div className="cp-unit">{item.unit} · ₹{item.price} each</div>
                  </div>
                  <div className="qty-row">
                    <button className="q-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="q-num">{item.qty}</span>
                    <button className="q-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                  </div>
                  <div className="cp-total" style={{ color: item.color }}>₹{item.price * item.qty}</div>
                  <button className="del-btn" onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="cp-foot">
              <div className="bill-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? "#22c55e" : "#1a1a1a" }}>
                  {delivery === 0 ? "FREE 🎉" : `₹${delivery}`}
                </span>
              </div>
              {subtotal > 0 && subtotal < 300 && (
                <div className="free-msg">🚚 Add ₹{300 - subtotal} more for FREE delivery!</div>
              )}
              <div className="bill-row tot">
                <span>Total</span>
                <span className="tv">₹{total}</span>
              </div>
              <button className="ckout-btn">🛒 Place Order</button>
            </div>
          )}
        </div>
      </div>

      {/* ZOOM MODAL */}
      {zoomItem && (
        <div className="overlay" onClick={() => setZoom(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setZoom(null)}>✕</button>
            <img
              className="modal-img"
              src={zoomItem.img}
              alt={zoomItem.name}
              onError={e => {
                e.target.style.display = "none";
              }}
            />
            <div className="modal-body">
              <div className="modal-name">{zoomItem.emoji} {zoomItem.name}</div>
              <div className="modal-sub">{zoomItem.category} · {zoomItem.unit}</div>
              <div className="modal-row">
                <div>
                  <div className="modal-price" style={{ color: zoomItem.color }}>₹{zoomItem.price}</div>
                  <div className="modal-unit">per {zoomItem.unit}</div>
                </div>
                {inCart(zoomItem.id) ? (
                  <div className="qty-row" style={{ padding: "8px 16px" }}>
                    <button className="q-btn" style={{ fontSize: "1.3rem" }} onClick={() => updateQty(zoomItem.id, -1)}>−</button>
                    <span className="q-num" style={{ fontSize: "1.1rem", minWidth: 24 }}>{inCart(zoomItem.id).qty}</span>
                    <button className="q-btn" style={{ fontSize: "1.3rem" }} onClick={() => updateQty(zoomItem.id, +1)}>+</button>
                  </div>
                ) : (
                  <button
                    className="modal-add"
                    style={{ background: `linear-gradient(135deg,${zoomItem.color},${zoomItem.color}bb)` }}
                    onClick={() => addItem(zoomItem)}
                  >
                    + Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}