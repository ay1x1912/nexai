import { db } from "@/db";
import { agent } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const agentProcedurec = createTRPCRouter({
    getMany: baseProcedure.query(async() => {
        const agents = await db.select().from(agent)
        if (!agents) {
            throw new TRPCError({code:"NOT_FOUND",message:"Agents not found"})
        }
        return agents
    })
})