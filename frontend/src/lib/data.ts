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
