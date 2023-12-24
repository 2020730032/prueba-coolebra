import React from 'react';
import ProductList from './components/productList';

const datosEjemplo = [
  {
    "Ean": "123",
    "nombre_producto": "Producto A",
    "datos_query": [
      {"ean": "123", "name": "Producto A", "sku": "M1", "normal_price": 20, "discount_price": 5},
      {"ean": "123", "name": "Producto A", "sku": "M2", "normal_price": 25, "discount_price": 6},
      {"ean": "123", "name": "Producto A", "sku": "M2", "normal_price": 24, "discount_price": 6}
    ],
    "cantidad_markets": 2,
    "rango_precios": {"max": 19, "min": 15}
  },
  {
    "Ean": "456",
    "nombre_producto": "Producto B",
    "datos_query": [
      {"ean": "456", "name": "Producto B", "sku": "M1", "normal_price": 30, "discount_price": 7}
    ],
    "cantidad_markets": 1,
    "rango_precios": {"max": 23, "min": 23}
  },
  {
    "Ean": "789",
    "nombre_producto": "Producto C",
    "datos_query": [
      {"ean": "789", "name": "Producto C", "sku": "M3", "normal_price": 15, "discount_price": 3},
      {"ean": "789", "name": "Producto C", "sku": "M4", "normal_price": 16, "discount_price": 3},
      {"ean": "789", "name": "Producto C", "sku": "M5", "normal_price": 17, "discount_price": 3},
      {"ean": "789", "name": "Producto C", "sku": "M5", "normal_price": 18, "discount_price": 3},
      {"ean": "789", "name": "Producto C", "sku": "M6", "normal_price": 19, "discount_price": 3}
    ],
    "cantidad_markets": 4,
    "rango_precios": {"max": 16, "min": 12}
  },
  {
    "Ean": "777",
    "nombre_producto": "Producto D",
    "datos_query": [
      {"ean": "777", "name": "Producto D", "sku": "M7", "normal_price": 10, "discount_price": 2},
      {"ean": "777", "name": "Producto D", "sku": "M1", "normal_price": 11, "discount_price": 2},
      {"ean": "777", "name": "Producto D", "sku": "M1", "normal_price": 12, "discount_price": 2}
    ],
    "cantidad_markets": 2,
    "rango_precios": {"max": 10, "min": 8}
  }
]
;

const App = () => {
  return <ProductList data={datosEjemplo} />;
};

export default App;
