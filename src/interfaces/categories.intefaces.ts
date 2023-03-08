import { type } from "os";
import { z } from "zod";
import {
  createCategorySchema,
  returnAllCategoriesSchema,
  returnCategorySchema,
} from "../schemas";

type ICreateCategory = z.infer<typeof createCategorySchema>;
type IReturnCategory = z.infer<typeof returnCategorySchema>;
type IReturnCategoryArray = z.infer<typeof returnAllCategoriesSchema>;

export { ICreateCategory, IReturnCategory, IReturnCategoryArray };
