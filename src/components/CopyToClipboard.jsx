import { useState, useEffect } from "react";

export default function CopyToClipboard({ text }) {
  const [copy, setCopy] = useState("");

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopy("ok!");
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (copy) {
      const timer = setTimeout(() => {
        setCopy("");
      }, 3 * 1000);

      return () => clearTimeout(timer);
    }
  }, [copy]);

  return (
    <div>
      <button onClick={copyMessage}>Copy</button>
      {copy && <p>{copy}</p>}
    </div>
  );
}
