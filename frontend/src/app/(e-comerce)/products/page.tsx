"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Product from "@/components/custom/product";
import { fetchProducts } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

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
  const [page, setPage] = useState(1);
  const [numberItems, setNumberItems] = useState(5);
  const { toast } = useToast();
  const router = useRouter();
  const handleAddToCart = (product: CartProduct) => {
    setCart((prevCart) => [...prevCart, product]);
    toast({
      title: "Producto agregado",
      description: "El producto ha sido agregado al carrito de compras",
    });
  };

  const handleItemQuantity = (numberItems: number) => {
    setNumberItems(numberItems);
    console.log(numberItems);
  };

  const handlePagination = (pagy: number) => {
    setPage(pagy);
    console.log(pagy);
  };

  const handleOrder = () => {
    console.log(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  useEffect(() => {
    const loadProducts = async () => {
      const { items, pagination } = await fetchProducts(page, numberItems);
      setProducts(items);
      setPagination(pagination);
      setNumberItems(pagination.items);
    };

    loadProducts();
  }, [page, numberItems]);

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

      <div className="mt-8">
        {pagination && (
          <div className="flex justify-center items-center w-full">
            <div className="flex justify-center items-center">
              <span className="ml-2 mr-2">Productos por página</span>
              <Input
                type="number"
                value={numberItems}
                min={1}
                onChange={(e) => {
                  handleItemQuantity(Number(e.target.value));
                }}
                className="w-1/3"
              ></Input>
            </div>
            <div className="flex justify-center items-center gap-4 w-full">
              <Button
                variant="outline"
                onClick={() => {
                  handlePagination(pagination.previus);
                }}
              >
                ◀ Anterior
              </Button>
              <p>
                Página <strong> {pagination.page}</strong> de {pagination.pages}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  handlePagination(pagination.next);
                }}
              >
                Siguiente ▶
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
