"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AgentSchema } from "../agentSchema";
import GeneratedAvatar from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../agentTypes";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void,
  onCancel?: () => void
  initialValues?:AgentGetOne
  
}

export default function AgentForm({onCancel,onSuccess ,initialValues}: AgentFormProps) {
  const form = useForm<z.infer<typeof AgentSchema>>({
    resolver: zodResolver(AgentSchema),
    defaultValues: {
      name: initialValues?.name || "",
      instruction:initialValues?.instruction ||""
    }
  });
  const trpc = useTRPC()
  const queryClient=useQueryClient()
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message)
      }
     })
  )
  
  
  const isPending = createAgent.isPending
  const isEdit = !!initialValues?.id 
  function onSubmit(values: z.infer<typeof AgentSchema>) {
    if (isEdit) {
      // Todo implement update todo
    }
    else (
      createAgent.mutate(values)
    )
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="py-4 space-y-4"
      >
        <GeneratedAvatar
          className="size-24"
          variant="bottsNeutral"
          seed={form.watch("name")}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input  placeholder="Math tutor" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful math assistant that can asnwer question and help with assignment"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button disabled={isPending} onClick={onCancel} variant={"ghost"} type="button">Cancel</Button>

          <Button disabled={isPending} type="submit">{ isEdit?"update":"create"}</Button>
        </div>
      </form>
    </Form>
  );
}
