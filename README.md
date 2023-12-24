# Respuestas a prueba práctica Coolebra

## Pregunta 1
Supuestos
- En la tabla Product Ean es el identificador del producto Primary Key 
- En la tabla Product SKU es Foreign Key que lo relaciona con la tabla Market
- En la tabla Market SKU es el identificador del mercado Primary Key
- En la tabla Price Ean con create_date son las Primary Key
- En la tabla Price Ean es Foreing Key

```sql
WITH MenorPrecio AS (
    SELECT
        pr.ean AS ean_producto,
        pr.normal_price - pr.discount_price AS precio_calculado,
        pr.active,
        pr.create_date,
        p.sku AS sku_producto,
        ROW_NUMBER() OVER (PARTITION BY pr.ean ORDER BY (pr.normal_price - pr.discount_price) ASC, pr.create_date DESC) AS NumeroFila
    FROM
        Price pr JOIN Product p ON pr.ean = p.ean
    WHERE
        pr.active = 1
)
SELECT
    mp.ean_producto,
    mp.precio_calculado AS menor_precio_activo,
    mp.active,
    mp.create_date,
    mp.sku_producto,
    m.name AS nombre_mercado
FROM
    MenorPrecio mp JOIN Market m ON mp.sku_producto = m.sku
WHERE
    mp.NumeroFila = 1;
```

## Pregunta 2
### Proceso: Actualización de precios. 
Cada cierto tiempo los precios deben ser actualizados, ya que en cualquier momento el precio de un producto en el mercado puede cambiar, y tener a tiempo los cambios recientes de precios en el mercado es de suma importancia para la empresa, ya que influye en la adaptabilidad, competitividad y eficiencia operativa de la empresa. La capacidad de responder rapidamente a los cambios en las condiciones del mercado se trauce en una ventaja estrategica para la empresa.
### Descripcion: 
- Recepción de nuevos precios: recibir informacion sobre los nuevos precios en el mercado (de proveedores, sistemas de informacion de seguimiento de precios, etc).
- Validación de datos: realizar una validación de los datos, para asegurarse de que los precios sean precisos.
- Desactivación de precios actuales: actualizar la columna active en la tabla price para que quede en 0.
- Inserción de nuevos precios: insertar nuevos datos a la tabla price con la columna active en 1.
- Registro de Cambios: mantener un historial de cambios en los precios incluyendo el precio que se inserto y el que se desactivo.
- Verificación y control de calidad: verificar que la actualización del precio se llevo a cabo correctamente.

## Pregunta 3
Supuestos
- Los datos entregados a la funcion estan como una lista de diccionarios
```python
from collections import defaultdict
def agrupar_productos(datos):
    # Creamos un diccionario para almacenar la información agrupada por EAN
    productos_agrupados = defaultdict(lambda: {
        "nombre_producto": None,
        "datos_query": [],
        "cantidad_markets": 0,
        "rango_precios": None
    })

    # Recorremos los datos y actualizamos el diccionario
    for producto in datos:
        ean = producto["ean"]
        nombre_producto = producto["name"]
        datos_query = producto  # Asumimos que los datos de la query son todos los datos del producto
        precio = producto["normal_price"] - producto["discount_price"]

        # Actualizamos la información del producto en el diccionario
        if productos_agrupados[ean]["nombre_producto"] is None:
            productos_agrupados[ean]["nombre_producto"] = nombre_producto

        productos_agrupados[ean]["datos_query"].append(datos_query)
        productos_agrupados[ean]["cantidad_markets"] = len(set(d["sku"] for d in productos_agrupados[ean]["datos_query"]))
        
        if productos_agrupados[ean]["rango_precios"] is None:
            productos_agrupados[ean]["rango_precios"] = {"max": precio, "min": precio}
        else:
            productos_agrupados[ean]["rango_precios"]["max"] = max(productos_agrupados[ean]["rango_precios"]["max"], precio)
            productos_agrupados[ean]["rango_precios"]["min"] = min(productos_agrupados[ean]["rango_precios"]["min"], precio)

    # Convertimos el diccionario en una lista de diccionarios
    resultado_final = [{"Ean": ean, **info} for ean, info in productos_agrupados.items()]

    return resultado_final
```


