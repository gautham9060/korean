import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ProductArt from '../components/ProductArt'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'

const STEPS = ['Details', 'Delivery', 'Payment']

export default function Checkout() {
  const { cart, subtotal, clearCart } = useStore()
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState(null)
  const [shipping, setShipping] = useState('white')
  const shipCost = shipping === 'express' ? 199 : 0
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + shipCost + gst

  const next = (e) => {
    e.preventDefault()
    if (step < STEPS.length - 1) return setStep(step + 1)
    // Front-end only: simulate order placement.
    setPlaced({ no: 'KW-' + Math.random().toString(36).slice(2, 8).toUpperCase(), total })
    clearCart()
  }

  if (placed) {
    return (
      <PageTransition>
        <section className="container success">
          <motion.div className="success-orb" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
            <svg viewBox="0 0 52 52" width="64" height="64">
              <motion.path d="M14 27l8 8 16-18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.8 }} />
            </svg>
          </motion.div>
          <motion.h1 className="h1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Thank you. <em className="serif-i neon-text">It’s yours.</em>
          </motion.h1>
          <motion.p className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Order <strong className="neon-small">{placed.no}</strong> · {formatPrice(placed.total)} — your glow is on its way.
          </motion.p>
          <Link to="/shop" className="btn btn-ghost">Continue exploring</Link>
        </section>
      </PageTransition>
    )
  }

  if (cart.length === 0) {
    return (
      <PageTransition>
        <section className="container success">
          <div className="empty-orb" />
          <h1 className="h1">Your bag is <em className="serif-i neon-text">empty.</em></h1>
          <Link to="/shop" className="btn btn-neon"><span>Explore Collection</span></Link>
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <section className="container checkout">
        <div className="checkout-main">
          <h1 className="h2">Checkout</h1>
          <div className="steps">
            {STEPS.map((s, i) => (
              <button key={s} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} onClick={() => i < step && setStep(i)}>
                <span>{i < step ? '✓' : i + 1}</span>{s}
              </button>
            ))}
          </div>

          <form onSubmit={next}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="form-grid"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
              >
                {step === 0 && (
                  <>
                    <Field label="First name" required />
                    <Field label="Last name" required />
                    <Field label="Email" type="email" required wide />
                    <Field label="Phone" type="tel" required wide />
                  </>
                )}
                {step === 1 && (
                  <>
                    <Field label="Address" required wide />
                    <Field label="City" required />
                    <Field label="PIN code" required />
                    <div className="ship-options wide">
                      {[
                        { k: 'white', t: 'Standard delivery', d: '2–4 days · gift-wrapped with samples', p: 'Free' },
                        { k: 'express', t: 'Express delivery', d: 'Next day in metro cities', p: formatPrice(199) },
                      ].map((o) => (
                        <label key={o.k} className={`ship-opt ${shipping === o.k ? 'active' : ''}`}>
                          <input type="radio" name="ship" checked={shipping === o.k} onChange={() => setShipping(o.k)} />
                          <div><strong>{o.t}</strong><span>{o.d}</span></div>
                          <em>{o.p}</em>
                        </label>
                      ))}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="card-preview wide">
                      <div className="cp-chip" />
                      <span className="cp-num">•••• •••• •••• 2026</span>
                      <span className="cp-name">KOEWAN BLACK</span>
                    </div>
                    <Field label="Card number" required wide inputMode="numeric" />
                    <Field label="Expiry (MM/YY)" required />
                    <Field label="CVV" required inputMode="numeric" />
                    <p className="muted small-text wide">Demo store — no payment is processed and nothing is sent to a server.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="checkout-nav">
              {step > 0 && <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
              <button type="submit" className="btn btn-neon"><span>{step === STEPS.length - 1 ? `Place order · ${formatPrice(total)}` : 'Continue'}</span></button>
            </div>
          </form>
        </div>

        <aside className="summary glass">
          <h3>Order summary</h3>
          {cart.map((it) => (
            <div key={it.key} className="sum-item">
              <div className="sum-thumb" style={{ '--a': it.color.a }}>
                <ProductArt type={it.product.type} a={it.color.a} b={it.color.b} animated={false} />
                <span className="sum-qty">{it.qty}</span>
              </div>
              <div><strong>{it.product.name}</strong><span className="muted">{it.color.name}</span></div>
              <span>{formatPrice(it.product.price * it.qty)}</span>
            </div>
          ))}
          <div className="sum-rows">
            <div className="row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="row"><span>Delivery</span><span>{shipCost ? formatPrice(shipCost) : 'Free'}</span></div>
            <div className="row"><span>GST (18%)</span><span>{formatPrice(gst)}</span></div>
            <div className="row total"><span>Total</span><strong className="neon-text">{formatPrice(total)}</strong></div>
          </div>
        </aside>
      </section>
    </PageTransition>
  )
}

function Field({ label, wide, ...rest }) {
  return (
    <label className={`field ${wide ? 'wide' : ''}`}>
      <input placeholder=" " {...rest} />
      <span>{label}</span>
    </label>
  )
}
