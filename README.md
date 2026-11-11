# KOEWAN — Nocturne Luxury Store

A front-end-only React e-commerce site in black and neon. There's no backend: cart and wishlist are saved in `localStorage`, and checkout is simulated.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure

- `src/data/products.js`: product catalogue (edit to add or change products)
- `src/context/StoreContext.jsx`: cart, wishlist and toast state
- `src/components/ProductArt.jsx`: hand-built neon SVG product renders
- `src/pages/`: Home, Shop, ProductDetail, Checkout, Wishlist, About, 404

To use real product photos, replace `<ProductArt … />` with an `<img>` and add an `image` field to each product.
