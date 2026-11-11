import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ProductArt from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import Magnetic from '../components/Magnetic'
import { Reveal } from '../components/Reveal'
import { useStore } from '../context/StoreContext'
import { formatPrice, getProduct, products } from '../data/products'
import { HeartIcon, MinusIcon, PlusIcon, StarIcon } from '../components/Icons'

const VIEWS = [
  { key: 'front', label: 'Front', rot: 0, scale: 1 },
  { key: 'profile', label: 'Profile', rot: 35, scale: 0.95 },
  { key: 'detail', label: 'Detail', rot: -15, scale: 1.35 },
]

function Viewer({ product, color }) {
  const [view, setView] = useState(VIEWS[0])
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const [lights, setLights] = useState(true)
  const stage = useRef(null)
  const drag = useRef(null)

  const rotY = useMotionValue(0)
  const rotX = useMotionValue(0)
  const sRotY = useSpring(rotY, { stiffness: 90, damping: 16 })
  const sRotX = useSpring(rotX, { stiffness: 90, damping: 16 })
  const shadowX = useTransform(sRotY, [-60, 60], [40, -40])

  const pick = (v) => {
    setView(v)
    rotY.set(v.rot)
    rotX.set(0)
  }

  const onDown = (e) => {
    if (zoom) return
    drag.current = { x: e.clientX, y: e.clientY, ry: rotY.get(), rx: rotX.get() }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e) => {
    const r = stage.current.getBoundingClientRect()
    if (zoom) {
      setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
      return
    }
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    rotY.set(Math.max(-60, Math.min(60, drag.current.ry + dx * 0.35)))
    rotX.set(Math.max(-25, Math.min(25, drag.current.rx - dy * 0.2)))
  }
  const onUp = () => (drag.current = null)

  return (
    <div className={`viewer ${lights ? 'lights-on' : 'lights-off'}`}>
      <div
        ref={stage}
        className={`viewer-stage ${zoom ? 'zoomed' : ''}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onDoubleClick={() => setZoom((z) => !z)}
        data-cursor={zoom ? 'Exit' : 'Drag'}
      >
        <div className="viewer-spot" />
        <div className="viewer-rings"><span /><span /><span /></div>
        <motion.div className="viewer-shadow" style={{ x: shadowX }} />
        <motion.div
          className="viewer-art"
          style={{ rotateY: sRotY, rotateX: sRotX, transformOrigin: origin }}
          animate={{ scale: zoom ? 2.2 : view.scale }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={color.name}
              className="viewer-art-inner"
              initial={{ opacity: 0, filter: 'blur(14px) brightness(2)' }}
              animate={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
              exit={{ opacity: 0, filter: 'blur(14px) brightness(2)' }}
              transition={{ duration: 0.5 }}
            >
              <ProductArt type={product.type} a={color.a} b={color.b} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="viewer-hint">{zoom ? 'Move to explore · double-click to exit' : 'Drag to rotate · double-tap or Zoom for detail'}</div>
      </div>

      <div className="viewer-controls">
        <div className="seg">
          {VIEWS.map((v) => (
            <button key={v.key} className={view.key === v.key && !zoom ? 'active' : ''} onClick={() => { setZoom(false); pick(v) }}>
              {v.label}
            </button>
          ))}
          <button className={zoom ? 'active' : ''} onClick={() => setZoom((z) => !z)}>Zoom</button>
        </div>
        <button className={`light-toggle ${lights ? 'on' : ''}`} onClick={() => setLights((l) => !l)} aria-label="Toggle studio lights">
          <span className="lt-knob" />
          <span className="lt-label">{lights ? 'Neon on' : 'Lights off'}</span>
        </button>
      </div>
    </div>
  )
}

function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div key={it.title} className={`acc-item ${open === i ? 'open' : ''}`}>
          <button className="acc-head" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.title}</span>
            <span className="acc-icon" />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                className="acc-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="acc-inner">{it.body}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  return product ? <ProductView key={product.id} product={product} /> : <Navigate to="/shop" replace />
}

function ProductView({ product }) {
  const { addToCart, wishlist, toggleWish, setCartOpen } = useStore()
  const [c, setC] = useState(0)
  const [qty, setQty] = useState(1)
  const [burst, setBurst] = useState(0)
  const color = product.colors[c]
  const wished = wishlist.includes(product.id)
  const related = products.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, 3)

  const add = () => {
    addToCart(product.id, c, qty)
    setBurst((b) => b + 1)
  }

  return (
    <PageTransition>
      <div className="pdp-ambient" style={{ '--a': color.a, '--b': color.b }} />
      <section className="pdp container" style={{ '--a': color.a, '--b': color.b }}>
        <div className="pdp-left">
          <Viewer product={product} color={color} />
        </div>

        <div className="pdp-right">
          <nav className="crumbs">
            <Link to="/">Home</Link> / <Link to={`/shop?c=${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
          </nav>
          {product.badge && <span className="pill eyebrow">{product.badge}</span>}
          <motion.h1 className="pdp-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            {product.name}
          </motion.h1>
          <p className="pdp-tagline serif-i">{product.tagline}</p>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} width={14} className={i < Math.round(product.rating) ? 'on' : ''} />)}
            <span>{product.rating.toFixed(1)} · {product.reviews} reviews</span>
          </div>

          <div className="pdp-price">
            <motion.span key={qty} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{formatPrice(product.price * qty)}</motion.span>
            <small>Inclusive of all taxes · or 3 interest-free payments of {formatPrice(Math.round(product.price / 3))}</small>
          </div>

          <p className="pdp-desc">{product.description}</p>

          <div className="pdp-block">
            <div className="label-row"><span className="eyebrow">{product.category === 'Makeup' ? 'Shade' : 'Edition'}</span><span className="neon-small">{color.name}</span></div>
            <div className="finishes">
              {product.colors.map((col, i) => (
                <button key={col.name} className={`finish ${i === c ? 'active' : ''}`} style={{ '--sa': col.a, '--sb': col.b }} onClick={() => setC(i)}>
                  <i />
                  <span>{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-actions">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><MinusIcon width={16} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase"><PlusIcon width={16} /></button>
            </div>
            <Magnetic className="grow" strength={0.15}>
              <button className="btn btn-neon full add-main" onClick={add}>
                <span>Add to Bag</span>
                <AnimatePresence>
                  {burst > 0 && (
                    <motion.i key={burst} className="burst" initial={{ scale: 0, opacity: 1 }} animate={{ scale: 4, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} />
                  )}
                </AnimatePresence>
              </button>
            </Magnetic>
            <button className={`icon-btn wish-big ${wished ? 'on' : ''}`} onClick={() => toggleWish(product.id)} aria-label="Wishlist">
              <HeartIcon filled={wished} />
            </button>
          </div>
          <button className="text-link buy-now" onClick={() => { add(); setCartOpen(true) }}>Buy now — express checkout →</button>

          <div className="perks">
            <div><strong>✦</strong><span>Free samples with every order</span></div>
            <div><strong>✦</strong><span>Delivered in 48h</span></div>
            <div><strong>✦</strong><span>Dermatologist tested</span></div>
          </div>

          <Accordion
            items={[
              { title: 'Details & Ingredients', body: <dl className="specs">{product.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl> },
              { title: 'How to use', body: <p>{product.howTo}</p> },
              { title: 'Delivery & Returns', body: <p>Free delivery on orders over ₹3,000, gift-wrapped with samples. Unopened products can be returned within 30 days.</p> },
            ]}
          />
        </div>
      </section>

      <section className="section container">
        <Reveal><span className="eyebrow">Layer it with</span></Reveal>
        <Reveal delay={0.1}><h2 className="h2">Complete the <em className="serif-i neon-text">ritual.</em></h2></Reveal>
        <div className="grid">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </PageTransition>
  )
}
