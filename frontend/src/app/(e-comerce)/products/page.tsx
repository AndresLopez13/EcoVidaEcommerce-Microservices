"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Product from "@/components/custom/product";
import { fetchProducts } from "@/lib/data";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category: {
    name: string;
  };
}

interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const { toast } = useToast();

  const handleAddToCart = (product: CartProduct) => {
    setCart((prevCart) => [...prevCart, product]);
    toast({
      title: "Producto agregado",
      description: "El producto ha sido agregado al carrito de compras",
    });
  };

  const handleOrder = () => {
    console.log(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    const loadProducts = async () => {
      const { items, pagination } = await fetchProducts();
      setProducts(items);
      setPagination(pagination);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-2">
        <h3 className="font-semibold text-2xl">Productos</h3>
        <Button className="btn btn-primary" onClick={handleOrder}>
          Ordenar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Product
            key={product.id} // Asegúrate de proporcionar una clave única
            product={product} // Asegúrate de pasar todas las propiedades necesarias
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <div>
        {pagination && pagination.pages}
      </div>
    </div>
  );
}
