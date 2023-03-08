import {
  userSchema,
  returnUserSchema,
  returnAllUsersSchema,
  userUpdateSchema,
} from "./users.schemas";
import { createLoginSchema } from "./login.schemas";
import {
  createCategorySchema,
  returnCategorySchema,
  returnAllCategoriesSchema,
} from "./category.schemas";
import { createAdressSchema, returnAdressSchema } from "./addresses.schemas";
import {
  realEstateSchema,
  createRealEstateSchema,
  returnRealEstateSchema,
  returnRealEstateSchemaArray,
  returnRealEstateSchemaArrayCategories,
} from "./realEstates.schemas";
import {
  createScheduleSchema,
  returnScheduleSchema,
} from "./schedules.schemas";

export {
  userSchema,
  returnUserSchema,
  returnAllUsersSchema,
  createLoginSchema,
  userUpdateSchema,
  createCategorySchema,
  returnCategorySchema,
  returnAllCategoriesSchema,
  createAdressSchema,
  returnAdressSchema,
  realEstateSchema,
  createRealEstateSchema,
  returnRealEstateSchema,
  returnRealEstateSchemaArray,
  returnRealEstateSchemaArrayCategories,
  createScheduleSchema,
  returnScheduleSchema,
};
