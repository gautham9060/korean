import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { getProduct } from '../data/products'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = wishlist.map(getProduct).filter(Boolean)
  return (
    <PageTransition>
      <section className="page-hero container">
        <span className="eyebrow">Saved · {items.length}</span>
        <h1 className="h1">Your <em className="serif-i neon-text">wishlist.</em></h1>
      </section>
      <section className="container">
        {items.length ? (
          <div className="grid">{items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
        ) : (
          <div className="empty-state">
            <div className="empty-orb" />
            <p>Tap the heart on any piece to keep it here.</p>
            <Link to="/shop" className="btn btn-ghost">Explore Collection</Link>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
