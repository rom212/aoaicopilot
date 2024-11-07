"use client";
import React, { useEffect, useState } from "react";
import { fetchCounter } from "@/actions/mongo";
import styles from "./page.module.css";
import Input from "@/components/input/Input";
import MessageList from "@/components/messageList/messageList";
import { META_PROMPT, GREETING } from "@/constants";

export default function Home() {
  const [thread, setThread] = useState([
    {
      role: "system",
      content: META_PROMPT,
    },
    {
      role: "assistant",
      content: GREETING,
    },
  ]);

  const [displayCounter, setDisplayCounter] = useState("");

  const updateThread = (newMessage) => {
    setThread((previousThread) => [...previousThread, newMessage]);
  };

  useEffect(() => {
    (async () => {
      const data = await fetchCounter();
      setDisplayCounter(data.counter);
    })();
  }, [thread]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          AI GBB Copilot - Trust but verify | Cutoff: 11/07/24 | Questions
          answered:&nbsp;
          <code className={styles.code}>
            {displayCounter ? parseInt(displayCounter).toLocaleString() : "0"}
          </code>{" "}
        </p>
        <div>
          <a href="mailto:romanmullier@microsoft.com?subject=Feedback on AOAI Documentation Copilot">
            Leave Feedback
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
