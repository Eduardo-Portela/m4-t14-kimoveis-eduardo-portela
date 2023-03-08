import { z } from "zod";
import { createAdressSchema, returnAdressSchema } from "../schemas";

type IAdressRequest = z.infer<typeof createAdressSchema>;
type IAdressResponse = z.infer<typeof returnAdressSchema>;

export { IAdressRequest, IAdressResponse };
