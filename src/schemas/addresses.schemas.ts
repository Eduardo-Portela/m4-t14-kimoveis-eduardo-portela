import { number, z } from "zod";

const createAdressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(6).nullish().optional(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const returnAdressSchema = createAdressSchema.extend({
  id: number(),
});

export { createAdressSchema, returnAdressSchema };
