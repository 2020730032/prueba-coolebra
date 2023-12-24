import React, { useState, useEffect } from 'react';
import Product from './product';

const ProductList = ({ data }) => {
  const [filter, setFilter] = useState('');
  const [visibleProducts, setVisibleProducts] = useState(data);

  useEffect(() => {
    let timer;

    if (filter.trim() !== '') {
      const filteredProducts = data.filter((product) => product.nombre_producto.toLowerCase().includes(filter.toLowerCase()));
      setVisibleProducts(filteredProducts);

      // Ocultar productos que no coinciden después de 1 segundo
      timer = setTimeout(() => {
        setVisibleProducts((prevProducts) => {
          const newProducts = prevProducts.filter((product) => product.nombre_producto.toLowerCase().includes(filter.toLowerCase()));
          return newProducts;
        });
      }, 1000);
    } else {
      // Si el filtro está vacío, mostramos todos los productos nuevamente
      setVisibleProducts(data);
    }

    return () => clearTimeout(timer);
  }, [data, filter]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre y presiona Enter"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {visibleProducts.map((product) => (
          <Product key={product.Ean} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
