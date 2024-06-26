"use client";
import React, { useEffect, useState } from "react";
import MessageFormInput from "./MessageFormInput";
import MessageBox from "./MessageBox";
import MessageContainerHeader from "./MessageContainerHeader";
import { useDispatch } from "react-redux";
import { setChatId } from "@/redux/features/chatFriendSlice";

const MessageContainer = ({ chatId }: { chatId: string }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setChatId(chatId));
  }, [chatId, dispatch]);
  return (
    <div className="border-x-2 h-full lg:col-span-2 flex flex-col overflow-y-auto">
      <MessageContainerHeader />
      <MessageBox />
      <MessageFormInput />
    </div>
  );
};

export default MessageContainer;
