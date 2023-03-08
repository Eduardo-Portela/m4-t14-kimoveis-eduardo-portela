import { type } from "os";
import { z } from "zod";
import { createLoginSchema } from "../schemas";

type ILoginRequest = z.infer<typeof createLoginSchema>;
type ILoginResult = string;

export { ILoginRequest, ILoginResult };
