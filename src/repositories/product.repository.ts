import db from "../config/db";
import { Product } from "../types/product.types";

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await db.query("SELECT id, name, price, category FROM products");
  return rows as Product[];
};