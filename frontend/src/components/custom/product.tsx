import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface Product {
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

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity?: number;
    category: {
      name: string;
    };
  };
  handleAddToCart: (product: { id: number; name: string; price: number; quantity: number }) => void;
}

export default function Product({ product, handleAddToCart }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };
  return (
    <Card key={product.id}>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-bold">${product.price} USD</p>
        {product.category.name}
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center w-1/2 gap-4">
          <span>Cantidad: </span>
          <Input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-1/2"
          />
        </div>
        <Button
          className="w-1/2"
          onClick={() => {
            handleAddToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
            });
          }}
        >
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
