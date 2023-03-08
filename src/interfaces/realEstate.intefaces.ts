import { z } from "zod";
import {
  createRealEstateSchema,
  returnRealEstateSchema,
  returnRealEstateSchemaArray,
  returnRealEstateSchemaArrayCategories,
} from "../schemas";

type IRealEstateRequest = z.infer<typeof createRealEstateSchema>;
type IRealEstateResponse = z.infer<typeof returnRealEstateSchema>;
type IRealEstateResponseArray = z.infer<typeof returnRealEstateSchemaArray>;
type IRealEstateResponseArrayCategories = z.infer<
  typeof returnRealEstateSchemaArrayCategories
>;

export {
  IRealEstateRequest,
  IRealEstateResponse,
  IRealEstateResponseArray,
  IRealEstateResponseArrayCategories,
};
