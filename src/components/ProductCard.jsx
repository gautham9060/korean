import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductArt from './ProductArt'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'
import { HeartIcon, PlusIcon } from './Icons'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, wishlist, toggleWish } = useStore()
  const [c, setC] = useState(0)
  const ref = useRef(null)
  const color = product.colors[c]
  const wished = wishlist.includes(product.id)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    ref.current.style.setProperty('--mx', `${x * 100}%`)
    ref.current.style.setProperty('--my', `${y * 100}%`)
    ref.current.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
    ref.current.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
  }
  const onLeave = () => {
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <motion.article
      layout
      className="card"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ '--a': color.a, '--b': color.b }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-border" />
      <Link to={`/product/${product.id}`} className="card-media" data-cursor="View">
        {product.badge && <span className="card-badge">{product.badge}</span>}
        <div className="card-art">
          <ProductArt type={product.type} a={color.a} b={color.b} />
        </div>
      </Link>
      <button className={`card-wish ${wished ? 'on' : ''}`} onClick={() => toggleWish(product.id)} aria-label="Toggle wishlist">
        <HeartIcon filled={wished} width={18} />
      </button>
      <div className="card-body">
        <div className="card-top">
          <span className="eyebrow">{product.category}</span>
          <div className="swatches">
            {product.colors.map((col, i) => (
              <button
                key={col.name}
                className={`swatch ${i === c ? 'active' : ''}`}
                style={{ '--sa': col.a, '--sb': col.b }}
                onClick={() => setC(i)}
                aria-label={col.name}
                title={col.name}
              />
            ))}
          </div>
        </div>
        <Link to={`/product/${product.id}`}><h3 className="card-title">{product.name}</h3></Link>
        <p className="card-tag">{product.tagline}</p>
        <div className="card-foot">
          <span className="price">{formatPrice(product.price)}</span>
          <button className="add-btn" onClick={() => addToCart(product.id, c)} aria-label={`Add ${product.name} to bag`}>
            <PlusIcon width={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
