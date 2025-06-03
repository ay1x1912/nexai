import {z} from "zod"
export const AgentSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    instruction:z.string().min(1,{message:"Instruciton is required"})
})

export const AgentUpdateSchema = AgentSchema.extend({
  id: z.string().min(1, { message: "Id is required" }),
});