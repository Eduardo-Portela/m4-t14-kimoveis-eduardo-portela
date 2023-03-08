import { number, z } from "zod";

const createRealEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: number().int().positive(),
  address: z.object({
    street: z.string(),
    zipCode: z.string().max(8),
    number: z.string().nullish().optional(),
    city: z.string(),
    state: z.string().max(2),
  }),
  categoryId: z.number().int().nullish(),
});

const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  value: z.number().or(z.string()),
  size: number().int().positive(),
});

const returnRealEstateSchema = createRealEstateSchema.extend({
  id: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: z.object({
    id: z.number(),
    street: z.string(),
    zipCode: z.string().max(8),
    number: z.string().nullish().optional(),
    city: z.string(),
    state: z.string().max(2),
  }),
  category: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullish(),
});

const returnRealEstateSchemaArray = returnRealEstateSchema.array();

const returnRealEstateSchemaArrayCategories = z.object({
  id: z.number(),
  name: z.string(),
  realEstate: z.array(realEstateSchema),
});

export {
  createRealEstateSchema,
  returnRealEstateSchema,
  returnRealEstateSchemaArray,
  returnRealEstateSchemaArrayCategories,
  realEstateSchema,
};
