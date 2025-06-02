import { db } from "@/db";
import {agent } from "@/db/schema";
import { createTRPCRouter, proctedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import {z} from "zod"
import { AgentSchema } from "../agentSchema";
export const agentProcedurec = createTRPCRouter({
  getMany: proctedProcedure.query(async ({ ctx }) => {
    const agents = await db
      .select({
        ...getTableColumns(agent),
        mettings: sql<number>`5`,
      })
      .from(agent)
      .where(eq(agent.userId, ctx.user.id));
    if (!agents) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Agents not found" });
    }
    return agents;
  }),

    getOne: proctedProcedure.input(z.object({id:z.string()})).query(async ({ ctx ,input}) => {
      const [data] = await db
        .select({
          ...getTableColumns(agent),
          mettings: sql<number>`5`,
        })
        .from(agent)
        .where(and(eq(agent.id, input.id), eq(agent.userId, ctx.user.id)));
        if (!data) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Agents not found",
          });
        }
        return data
  }),


  create: proctedProcedure
    .input(AgentSchema)
    .mutation(async ({ ctx, input }) => {
      const [createdAgent] = await db
        .insert(agent)
        .values({ ...input, userId: ctx.user.id })
          .returning();
        return createdAgent
    }),
});  
