import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function setCookie(
  name: string,
  value: string,
  days: number = 7,
  path: string = "/"
): void {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=${path}; SameSite=None; Secure`;
  document.cookie = cookieString;
}

export function deleteCookie(name: string, path: string = "/"): void {
  // Para eliminar una cookie, establecemos su fecha de expiración en el pasado
  const expirationDate = new Date(0);
  const cookieString = `${name}=; expires=${expirationDate.toUTCString()}; path=${path}; SameSite=None; Secure`;
  document.cookie = cookieString;
}
