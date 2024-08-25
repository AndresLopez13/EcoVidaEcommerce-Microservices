"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableFooter,
} from "@/components/ui/table";
import { fetchProducts } from "@/lib/data";
import { useEffect, useState } from "react";

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

export default function AdminProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [numberItems, setNumberItems] = useState(10);

  const handleItemQuantity = (numberItems: number) => {
    setNumberItems(numberItems);
  };

  const handlePagination = (pagy: number) => {
    setPage(pagy);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { items, pagination } = await fetchProducts(page, numberItems);
        setProducts(items);
        setPagination(pagination);
        console.log("Products:", items);
        console.log("Pagination:", pagination);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [page, numberItems]);

  return (
    <>
      <h1 className="font-bold text-2xl">Admin productos</h1>
      <div>
        <Table>
          <TableCaption>Productos en el carrito</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nombre</TableHead>
              <TableHead className="text-right">Categoría</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-center">{product.name}</TableCell>
                  <TableCell className="text-right">
                    {product.category.name}
                  </TableCell>
                  <TableCell> Editar Eliminar</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay productos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
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
                  Página <strong> {pagination?.page}</strong> de{" "}
                  {pagination?.pages}
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
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
