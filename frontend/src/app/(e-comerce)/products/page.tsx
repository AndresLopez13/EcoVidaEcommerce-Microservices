"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleOrder = () => {
    console.log(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  const products = [
    {
      id: 19,
      name: "Test 2",
      description:
        "Test 2 Pack de 4 sorbetes de acero inoxidable con cepillo de limpieza",
      price: "12.5",
      created_at: "2024-07-17T18:14:30.612Z",
      updated_at: "2024-07-17T18:14:30.652Z",
      category_id: 3,
      image_url:
        "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTMsInB1ciI6ImJsb2JfaWQifX0=--63d6b353bc764b950b0d627f93ec1960ed3ccbc9/sorbetes.jpg",
      category: {
        id: 3,
        name: "Utensilios Sostenibles",
        description: "Artículos reutilizables y ecológicos para uso diario",
        created_at: "2024-07-13T22:59:39.032Z",
        updated_at: "2024-07-13T22:59:39.032Z",
      },
    },
    {
      id: 20,
      name: "Test 3",
      description:
        "Test 3 Pack de 4 sorbetes de acero inoxidable con cepillo de limpieza",
      price: "12.5",
      created_at: "2024-07-17T18:14:36.417Z",
      updated_at: "2024-07-17T18:14:36.463Z",
      category_id: 3,
      image_url:
        "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTQsInB1ciI6ImJsb2JfaWQifX0=--6389193716d43e3fa7758acce731a45e2d07294a/sorbetes.jpg",
      category: {
        id: 3,
        name: "Utensilios Sostenibles",
        description: "Artículos reutilizables y ecológicos para uso diario",
        created_at: "2024-07-13T22:59:39.032Z",
        updated_at: "2024-07-13T22:59:39.032Z",
      },
    },
    {
      id: 15,
      name: "Shampoo orgánico de lavanda",
      description:
        "Shampoo natural con esencia de lavanda, sin sulfatos ni parabeno",
      price: "18.99",
      created_at: "2024-07-17T15:07:57.497Z",
      updated_at: "2024-07-17T15:07:57.606Z",
      category_id: 2,
      image_url:
        "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NSwicHVyIjoiYmxvYl9pZCJ9fQ==--31a9d70844109a38210da5fe28916bcb2958c413/shampoo.jpg",
      category: {
        id: 2,
        name: "Cuidado Capilar",
        description:
          "Productos para el cuidado del cabello, naturales y orgánicos",
        created_at: "2024-07-13T22:05:45.451Z",
        updated_at: "2024-07-13T22:05:45.451Z",
      },
    },
    {
      id: 21,
      name: "Test 4",
      description:
        "Test 4 Pack de 4 sorbetes de acero inoxidable con cepillo de limpieza",
      price: "12.5",
      created_at: "2024-07-17T18:14:43.846Z",
      updated_at: "2024-07-17T18:14:43.885Z",
      category_id: 3,
      image_url:
        "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTUsInB1ciI6ImJsb2JfaWQifX0=--fde05525f27c322789c91a67176770cb4a264652/sorbetes.jpg",
      category: {
        id: 3,
        name: "Utensilios Sostenibles",
        description: "Artículos reutilizables y ecológicos para uso diario",
        created_at: "2024-07-13T22:59:39.032Z",
        updated_at: "2024-07-13T22:59:39.032Z",
      },
    },
    {
      id: 16,
      name: "Pack de sorbetes reutilizables",
      description:
        "Pack de 4 sorbetes de acero inoxidable con cepillo de limpieza",
      price: "12.99",
      created_at: "2024-07-17T15:14:16.259Z",
      updated_at: "2024-07-17T15:14:33.188Z",
      category_id: 3,
      image_url:
        "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NywicHVyIjoiYmxvYl9pZCJ9fQ==--c37a269e0fcac45ce7e855a7851285f6219fb76c/sorbetes.jpg",
      category: {
        id: 3,
        name: "Utensilios Sostenibles",
        description: "Artículos reutilizables y ecológicos para uso diario",
        created_at: "2024-07-13T22:59:39.032Z",
        updated_at: "2024-07-13T22:59:39.032Z",
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-2xl">Productos</h3>
        <Button className="btn btn-primary" onClick={handleOrder}>
          Ordenar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card>
            <CardHeader>
              <CardTitle>
                <Image
                  className="bg-red-200  h-1/2"
                  src={product.image_url}
                  alt={product.name}
                  width={100}
                  height={100}
                />
              </CardTitle>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold">${product.price} USD</p>
              {product.category.name}
            </CardContent>
            <CardFooter>
              <Button
                className="btn btn-primary"
                onClick={() =>
                  handleAddToCart({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                  })
                }
              >
                Agregar al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
