import { z } from "zod";

const createScheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int(),
});

const returnScheduleSchema = createScheduleSchema.extend({
  id: z.number(),
  userId: z.number().int(),
});

export { createScheduleSchema, returnScheduleSchema };
