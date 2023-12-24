import React from 'react';

const Product = ({ product }) => {
  return (
    <li key={product.Ean}>
      <h3>{product.nombre_producto}</h3>
      <p>Rango de precios: {product.rango_precios.min} - {product.rango_precios.max}</p>
      {product.cantidad_markets===1 ? <p>Mercado: {product.cantidad_markets}</p> : <p>Mercados: {product.cantidad_markets}</p>}
    </li>
  );
};

export default Product;
