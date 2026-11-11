import { Link } from 'react-router-dom'
import Marquee from './Marquee'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <Marquee items={['Made in Seoul', 'Glass skin', 'Lit in neon']} outline />
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo big">KOE<span>W</span>AN</Link>
          <p className="muted">Luxury Korean skincare and makeup for those who glow after dark. Formulated in Seoul and Jeju.</p>
        </div>
        <div>
          <h5>Shop</h5>
          <Link to="/shop?c=Serums">Serums</Link>
          <Link to="/shop?c=Masks">Masks</Link>
          <Link to="/shop?c=Sun Care">Sun Care</Link>
          <Link to="/shop?c=Makeup">Makeup</Link>
        </div>
        <div>
          <h5>Client Care</h5>
          <a href="#">Skin Consultation</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Ingredient Glossary</a>
          <a href="#">Contact Concierge</a>
        </div>
        <div>
          <h5>Maison</h5>
          <Link to="/about">Our Story</Link>
          <a href="#">Sustainability</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {YEAR} Koewan Maison. All rights reserved.</span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  )
}
