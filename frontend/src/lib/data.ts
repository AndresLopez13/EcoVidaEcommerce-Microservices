import { set } from "react-hook-form";
import { getCookie, setCookie } from "./utils";

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

interface User {
  user_name: string;
  user_password: string;
  user_email: string;
}

export async function fetchProducts(page = 1, items = 2) {
  try {
    const response = await fetch(
      `http://localhost:3000/products?items=${items}&page=${page}`
    );

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return {
      items: data.data, // Asegúrate de que esto coincide con la estructura de tu respuesta
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Devuelve valores por defecto o maneja el error como sea necesario
    return {
      items: [],
      pagination: null,
    };
  }
}

export async function login(user: User) {
  try {
    const formData = new FormData();
    formData.append("username", user.user_name);
    formData.append("password", user.user_password);
    console.log(formData);
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setCookie("token", data.access_token, 1);
    return data;
  } catch (error) {}
}

export async function fetchUser() {
  try {
    const response = await fetch("http://localhost:8000/api/user/me", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
