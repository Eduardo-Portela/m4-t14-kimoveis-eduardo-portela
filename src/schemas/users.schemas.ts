import { z } from "zod";

const userSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120),
});

const userUpdateSchema = userSchema.partial().omit({ admin: true });

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable().default(null),
  })
  .omit({ password: true });

const returnAllUsersSchema = returnUserSchema.array();

export { userSchema, returnUserSchema, returnAllUsersSchema, userUpdateSchema };
