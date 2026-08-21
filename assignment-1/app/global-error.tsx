"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="text-xl font-bold text-red-500 p-2">
        Something went wrong in the root layout!
      </h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
