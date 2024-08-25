"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, use, useState } from "react";
import { login } from "@/lib/data";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // Manejar la lógica de inicio de sesión aquí

    const res = await login({
      user_name: username, user_password: password,
      user_email: ""
    });

    if (res) {
      // Manejar la respuesta del servidor aquí
      console.log(res.user.user_role);
      if (res.user.user_role) {
        router.push("/admin/products");
      }else{
        router.push("/products");
      }
      // router.push("/products");
    }else{
      toast({
        className: 
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
        ,
        title: "Error",
        description: "Usuario o contraseña incorrectos",
        variant: "destructive"
      })
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tu usuario y contraseña</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CardFooter>
            <Button type="submit">Iniciar Sesión</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
