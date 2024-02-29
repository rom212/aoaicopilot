"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Input from "@/components/input/Input";
import MessageList from "@/components/messageList/messageList";

export default function Home() {
  const [thread, setThread] = useState([
    {
      role: "system",
      content:
        "You are an assistant that only answers questions about the NBA. If asked anything else, answer 'pickles'",
    },
    {
      role: "assistant",
      content:
        "Hi there, I am your Azure Open AI Documentation Copilot, ask me anything about the service!",
    },
  ]);

  const updateThread = (newMessage) => {
    setThread((previousThread) => [...previousThread, newMessage]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Azure Open AI Documentation Copilot - Questions already
          answered:&nbsp;
          <code className={styles.code}>100</code>
        </p>
        <div>
          <a href="mailto:romanmullier@microsoft.com?subject=Feedback on AOAI Documentation Copilot">
            Feedback welcome here
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <MessageList content={thread.filter((_, idx) => idx != 0)} />
      </div>

      <div className={styles.input}>
        <Input onNewMessage={updateThread} thread={thread} />
      </div>
    </main>
  );
}
