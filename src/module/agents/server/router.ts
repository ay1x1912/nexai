import { db } from "@/db";
import { agent } from "@/db/schema";
import { createTRPCRouter, proctedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { z } from "zod";
import { AgentSchema } from "../agentSchema";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
export const agentProcedurec = createTRPCRouter({
  getMany: proctedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const data = await db
        .select({
          ...getTableColumns(agent),
          mettings: sql<number>`5`,
        })
        .from(agent)
        .where(
          and(
            eq(agent.userId, ctx.user.id),
            search ? ilike(agent.name, `%${search}%`) : undefined,
          ),
        )
        .orderBy(desc(agent.created_at), desc(agent.id))
        .limit(pageSize)
        .offset(pageSize * (page - 1));

      const [total] = await db
        .select({ count:count()})
        .from(agent)
        .where(
          and(
            eq(agent.userId, ctx.user.id),
            search ? ilike(agent.name, `%${search}%`) : undefined,
          ),
        );
     const totalPages=Math.ceil(total.count/pageSize)
      
      if (!data) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agents not found" });
      }
      return {
        items: data,
        total: total.count,
        totalPages
      }
    }),

  getOne: proctedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
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
      return data;
    }),

  create: proctedProcedure
    .input(AgentSchema)
    .mutation(async ({ ctx, input }) => {
      const [createdAgent] = await db
        .insert(agent)
        .values({ ...input, userId: ctx.user.id })
        .returning();
      return createdAgent;
    }),
});
