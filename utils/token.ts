"use client";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
const COOKIE_NAME = "token";

const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const saveToken = (token: string): void => {
  if (globalThis.window !== undefined) {
    localStorage.setItem(TOKEN_KEY, token);
    setCookie(COOKIE_NAME, token);
  }
};

export const getToken = (): string | null => {
  if (globalThis.window !== undefined) {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeToken = (): void => {
  if (globalThis.window !== undefined) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    deleteCookie(COOKIE_NAME);
  }
};

export const saveUser = (user: { id: number; name: string }): void => {
  if (globalThis.window !== undefined) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): { id: number; name: string } | null => {
  if (globalThis.window !== undefined) {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};
