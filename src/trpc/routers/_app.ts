
import {  createTRPCRouter } from "../init";

import { agentProcedurec } from "@/module/agents/server/router";
export const appRouter = createTRPCRouter({
  agents:agentProcedurec
});
// export type definition of API
export type AppRouter = typeof appRouter;
