"use client";
import React, { useEffect, useState } from "react";
import classes from "../page.module.scss";
import Message from "@/components/Dashboard/Messages/Message";

export interface MessageType {
  _id: string;
  status: "read" | "unread";
  page: "string:";
  data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
}

const Page = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch("/api/admin/getData/getMessages");
      const messagesData = await response.json();
      setMessages(messagesData.data);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.page}>
      <h1>House marketplace Messages</h1>
      <div className={classes.cols}>
        <div className={classes.listings}>
          {loading ? (
            <p>Loading...</p>
          ) : messages.length > 0 ? (
            messages.map((item) => {
              return <Message key={item._id} data={item} />;
            })
          ) : (
            <p>No messages found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
