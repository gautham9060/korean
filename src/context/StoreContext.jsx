import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('kw-cart', []))
  const [wishlist, setWishlist] = useState(() => load('kw-wish', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => save('kw-cart', cart), [cart])
  useEffect(() => save('kw-wish', wishlist), [wishlist])

  const notify = useCallback((msg) => {
    setToast({ msg, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const addToCart = useCallback(
    (id, colorIdx = 0, qty = 1) => {
      const key = `${id}__${colorIdx}`
      setCart((c) => {
        const found = c.find((i) => i.key === key)
        if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        return [...c, { key, id, colorIdx, qty }]
      })
      notify(`${getProduct(id)?.name} added to your bag`)
    },
    [notify]
  )

  const updateQty = useCallback((key, qty) => {
    setCart((c) =>
      qty <= 0 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty } : i))
    )
  }, [])

  const removeFromCart = useCallback((key) => setCart((c) => c.filter((i) => i.key !== key)), [])
  const clearCart = useCallback(() => setCart([]), [])

  const toggleWish = useCallback(
    (id) => {
      setWishlist((w) => {
        const has = w.includes(id)
        notify(has ? 'Removed from wishlist' : 'Saved to wishlist')
        return has ? w.filter((x) => x !== id) : [...w, id]
      })
    },
    [notify]
  )

  const cartDetailed = useMemo(
    () =>
      cart
        .map((i) => {
          const p = getProduct(i.id)
          return p ? { ...i, product: p, color: p.colors[i.colorIdx] ?? p.colors[0] } : null
        })
        .filter(Boolean),
    [cart]
  )

  const subtotal = cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  const value = {
    cart: cartDetailed,
    count,
    subtotal,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWish,
    cartOpen,
    setCartOpen,
    toast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext)
