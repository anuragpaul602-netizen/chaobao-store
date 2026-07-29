"use client";

import * as React from "react";
import Rollbar from "rollbar";
import { clientConfig } from "@/lib/rollbar";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    const rollbar = new Rollbar(clientConfig);
    rollbar.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <p>Please refresh the page.</p>
        </div>
      </body>
    </html>
  );
}
