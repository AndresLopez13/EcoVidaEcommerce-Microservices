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
  const [cart, setCart] = useState<Product[] | null>(null);

  useEffect(() => {
    // Solo accede a localStorage en el lado del cliente
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cart?.filter((item) => item.id !== id);
    setCart(updatedCart ?? null);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  const total = cart?.reduce((acc, item) => acc + item.price, 0) || 0;

  return (
    <div>
      <h3 className="font-semibold text-lg">Carrito</h3>
      <Table>
        <TableCaption>Productos en el carrito</TableCaption>
        <TableHeader>
          <TableHead>Producto</TableHead>
          <TableHead className="text-center">Cantidad</TableHead>
          <TableHead className="text-right">Precio</TableHead>
          <TableHead></TableHead>
        </TableHeader>
        <TableBody>
          {cart?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-right">${product.price} USD</TableCell>
              <TableCell className="text-red-500 hover:underline cursor-pointer text-center">
                <Button className="bg-red-500" onClick={()=>handleRemoveFromCart(product.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              ${total.toFixed(2)} USD
            </TableCell>
            <TableCell>
              <Button className="">Pagar</Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
