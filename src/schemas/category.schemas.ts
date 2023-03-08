import { string, z } from "zod";

const createCategorySchema = z.object({
  name: z.string().max(45),
});

const returnCategorySchema = createCategorySchema.extend({
  id: z.number(),
});

const returnAllCategoriesSchema = returnCategorySchema.array();

export {
  createCategorySchema,
  returnCategorySchema,
  returnAllCategoriesSchema,
};
