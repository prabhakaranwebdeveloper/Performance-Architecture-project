import redisClient from "../config/redis";
import * as productRepo from "../repositories/product.repository";
import { Product } from "../types/product.types";

export const getProducts = async () => {
  const cacheKey = "products";

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log("🔥 Cache HIT");
    return JSON.parse(cached);
  }

  console.log("🐢 Cache MISS");

  const products = await productRepo.getAllProducts();

  await redisClient.set(cacheKey, JSON.stringify(products), {
    EX: 60,
  });

  return products;
};


export const createProduct = async (data: any) => {
  await productRepo.createProduct(data);

  // 🔥 Clear cache
  await redisClient.del("products");

  return { message: "Product created" };
};


export const updateProduct = async (id: number, data: any) => {
  await productRepo.updateProduct(id, data);

  // 🔥 Clear cache
  await redisClient.del("products");

  return { message: "Product updated" };
};

export const deleteProduct = async (id: number) => {
  await productRepo.deleteProduct(id);

  // 🔥 Invalidate cache
  await redisClient.del("products");

  return { message: "Product deleted" };
};