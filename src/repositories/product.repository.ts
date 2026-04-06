import db from "../config/db";
import { Product } from "../types/product.types";

// ✅ GET
export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await db.query("SELECT id, name, price, category FROM products");
  return rows as Product[];
};

// ✅ CREATE
export const createProduct = async (data: Product) => {
  const { name, price, category } = data;

  await db.query(
    "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
    [name, price, category]
  );
};

// ✅ UPDATE
export const updateProduct = async (id: number, data: Product) => {
  const { name, price, category } = data;

  await db.query(
    "UPDATE products SET name=?, price=?, category=? WHERE id=?",
    [name, price, category, id]
  );
};


// ✅ DELETE
export const deleteProduct = async (id: number) => {
  await db.query("DELETE FROM products WHERE id=?", [id]);
};