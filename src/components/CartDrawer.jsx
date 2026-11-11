import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'
import ProductArt from './ProductArt'
import { CloseIcon, MinusIcon, PlusIcon } from './Icons'

const FREE_SHIP = 3000

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, subtotal, updateQty, removeFromCart } = useStore()
  const pct = Math.min(1, subtotal / FREE_SHIP)

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="overlay" onClick={() => setCartOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Shopping bag"
          >
            <div className="drawer-head">
              <h3>Your Bag <span>({cart.length})</span></h3>
              <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close bag"><CloseIcon /></button>
            </div>

            <div className="ship-meter">
              <p>
                {pct >= 1 ? 'Free delivery + 3 samples unlocked ✦' : `${formatPrice(FREE_SHIP - subtotal)} away from free delivery + 3 samples`}
              </p>
              <div className="ship-bar"><motion.span animate={{ scaleX: pct }} transition={{ duration: 0.8 }} /></div>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="drawer-empty">
                  <div className="empty-orb" />
                  <p>Your bag is waiting for its first glow.</p>
                  <Link to="/shop" className="btn btn-ghost" onClick={() => setCartOpen(false)}>Explore Collection</Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.map((item, i) => (
                    <motion.div
                      key={item.key}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                      exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0, padding: 0 }}
                    >
                      <Link to={`/product/${item.id}`} className="cart-thumb" onClick={() => setCartOpen(false)} style={{ '--a': item.color.a }}>
                        <ProductArt type={item.product.type} a={item.color.a} b={item.color.b} animated={false} />
                      </Link>
                      <div className="cart-info">
                        <h4>{item.product.name}</h4>
                        <p className="muted"><i className="swatch-dot" style={{ background: item.color.a }} />{item.color.name}</p>
                        <div className="qty small">
                          <button onClick={() => updateQty(item.key, item.qty - 1)} aria-label="Decrease"><MinusIcon width={14} /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.key, item.qty + 1)} aria-label="Increase"><PlusIcon width={14} /></button>
                        </div>
                      </div>
                      <div className="cart-right">
                        <strong>{formatPrice(item.product.price * item.qty)}</strong>
                        <button className="link-btn" onClick={() => removeFromCart(item.key)}>Remove</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-foot">
                <div className="row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                <p className="muted small-text">Taxes & duties calculated at checkout.</p>
                <Link to="/checkout" className="btn btn-neon full" onClick={() => setCartOpen(false)}>
                  <span>Secure Checkout</span>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
