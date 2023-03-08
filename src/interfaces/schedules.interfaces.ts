import { z } from "zod";
import { createScheduleSchema, returnScheduleSchema } from "../schemas";

type IScheduleRequest = z.infer<typeof createScheduleSchema>;
type IScheduleResponse = z.infer<typeof returnScheduleSchema>;

export { IScheduleRequest, IScheduleResponse };
