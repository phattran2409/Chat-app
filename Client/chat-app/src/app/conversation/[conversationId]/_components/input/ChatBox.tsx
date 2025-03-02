"use client"
import { useMutationState } from '@/app/hook/useMutation';
import { Card } from '@/components/ui/card';
import React, { useCallback, useRef } from 'react';
import { set, z } from 'zod';
import { api } from '../../../../../../convex/_generated/api';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useConversation from '@/app/hook/useConversation';
import { toast } from 'react-toastify';
import { ConvexError } from 'convex/values';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import TextareaAutosize from "react-textarea-autosize";
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import debounce from "lodash/debounce";

interface ComponentNameProps {
  // Define props here
}
const chatMessageSchema = z.object({ 
    content : z.string().min(1 , { 
        message : "This Field can't be empty"
    })
})

const ChatBox: React.FC<ComponentNameProps> = (props) => {
    const textarea = useRef<HTMLTextAreaElement | null>(null)
    const {conversationId} = useConversation();
    const { mutate :createMessage, pending  :setPending} = useMutationState(api.message.create)

    const form = useForm<z.infer<typeof chatMessageSchema>>({
        resolver : zodResolver(chatMessageSchema),
        defaultValues : {
            content : ""
        }
    }
    )
    const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
      createMessage({
        conversationId,
        type : "Text", 
        content : [values.content]
      }).then(() => { 
         form.reset();
      }).catch((err) => { 
        toast.error(err instanceof ConvexError ? err.data : "Unexpected error occured")
      });
    };
   
    const debounceSetValue = useCallback(
        debounce((val : string) => {
           form.setValue("content" , val)
        } , 300), 
        [form]
    )
    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
       debounceSetValue(event.target.value)
    };
    
    const handleKeyDown = async (
      e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        await form.handleSubmit(handleSubmit)(); // Call handleSubmit manually
      }
    };

  return (
     <Card className='w-full p-2  rounded-lg relative'>
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
             className='flex gap-2 items-end w-full '>
                <FormField control={form.control} name='content' 
                 render={({field}) => {
                    return (
                      
                        <FormItem  className='h=full w-full'>
                            <FormControl>
                                <TextareaAutosize rows={1} 
                                maxRows={3} 
                                {...field} 
                                onChange={(e) => {
                                  console.log(e);
                                  field.onChange(e)  
                                  handleInputChange(e)
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder='Type  a message'
                                className='min-h-full w-full resize-none border-0 outline-0
                                bg-card  text-card-foreground placeholder:text-muted-foreground p-1.5'
                            />
                            </FormControl>
                        </FormItem>
                    )
                 }}/>
                
                <Button disabled={setPending} size="icon" type='submit'>
                    <SendHorizonal/>
              </Button>
             
              
            </form>
        </FormProvider>
            
     </Card>
  )
};

export default ChatBox;