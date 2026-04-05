import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await productService.getProducts();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};