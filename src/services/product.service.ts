import redisClient from "../config/redis";
import * as productRepo from "../repositories/product.repository";
import { Product } from "../types/product.types";

export const getProducts = async (): Promise<Product[]> => {
  const cacheKey = "products";

  // Check cache
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log("Cache HIT");
    return JSON.parse(cached);
  }

  // DB call
  const products = await productRepo.getAllProducts();

  // Save cache
  await redisClient.set(cacheKey, JSON.stringify(products), {
    EX: 60,
  });

  console.log("Cache MISS");

  return products;
};