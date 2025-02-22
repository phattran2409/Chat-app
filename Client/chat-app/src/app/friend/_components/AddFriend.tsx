"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMutationState } from "@/app/hook/useMutation";
import { api } from "../../../../convex/_generated/api";
import 'react-toastify/dist/ReactToastify.css';
import  { toast } from "react-toastify";
import { ConvexError } from "convex/values";

type Props = {};

const AddFriendFromSchema = z.object({
  email: z
    .string()
    .min(1, { message: "this field can't be empty" })
    .email("Please enter a valid email"),
});

export const AddfriendDialog = () => {
  const { mutate : createRequest, pending } = useMutationState(api.request.create);

  const form = useForm<z.infer<typeof AddFriendFromSchema>>({
    resolver: zodResolver(AddFriendFromSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (value : z.infer<typeof AddFriendFromSchema>) => { 
    await createRequest({email : value.email}).then(() => { 
      form.reset();
      toast.success("Friend request sent ! ")
    }).catch((error)=> {
      toast.error(ConvexError ? error.data : "unexpected error")
    })
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <UserPlus />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent></TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogTitle>Add Friend</DialogTitle>
        <DialogDescription>
          Send a request to connect with your friends !
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={pending}>Send</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
