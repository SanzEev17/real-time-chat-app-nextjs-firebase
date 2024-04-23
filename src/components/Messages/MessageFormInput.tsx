"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizontal, Image as ImageIcon } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { useForm } from "react-hook-form";
import chatService from "@/firebase/chatService";
import { messageSchema } from "@/types/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const MessageFormInput = () => {
  const chatId = useAppSelector((state) => state.chatFriendReducer.chatId);
  const currentUserId = useAppSelector(
    (state) => state.authReducer.userData?.uid
  );
  const allFriends = useAppSelector(
    (state) => state.friendsReducer.allFriendsList
  );
  const friendData = useAppSelector(
    (state) => state.chatFriendReducer.friendData
  );

  const isFriend = !!allFriends.find(
    (data) => friendData && data.uid === friendData.uid
  );

  const messageForm = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof messageSchema>) => {
    const { message } = values;
    //* Clears the text in message input after submit
    messageForm.resetField("message");
    return (
      currentUserId &&
      (await chatService.sendMessage({
        chatId,
        senderId: currentUserId,
        message,
      }))
    );
  };

  return isFriend ? (
    <Form {...messageForm}>
      <form
        onSubmit={messageForm.handleSubmit(onSubmit)}
        className="px-3 py-2 flex items-center gap-3"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary"
        >
          <ImageIcon />
        </Button>
        <div className="relative w-full">
          <FormField
            control={messageForm.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Aa"
                    className="rounded-full bg-input"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-3 rounded-full hover:text-primary"
            type="submit"
          >
            <SendHorizontal />
          </Button>
        </div>
      </form>
    </Form>
  ) : (
    <div className="py-2 text-center border-t-2 font-semibold text-muted-foreground">
      This person is not your friend. You have to be friends to chat.
    </div>
  );
};

export default MessageFormInput;
