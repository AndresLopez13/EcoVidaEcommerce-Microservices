"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cart?.filter((item) => item.id !== id);
    setCart(updatedCart ?? []);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h3 className="font-semibold text-lg text-center">Carrito</h3>
      {cart?.length !== 0 ? (
        <Table>
          <TableCaption>Productos en el carrito</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="text-center">Cantidad</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-center">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-right">
                  ${(product.price * product.quantity).toFixed(2)} USD
                </TableCell>
                <TableCell className="text-red-500 hover:underline cursor-pointer text-center">
                  <Button
                    className="bg-red-500"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right font-bold">
                <span className="flex">${total.toFixed(2)} USD</span>
              </TableCell>
              <TableCell>
                <Button className="">Pagar</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <p>No hay productos en el carrito</p>
      )}
    </div>
  );
}
