"use client";

import * as React from "react";
import { Provider as RollbarErrorProvider } from "@rollbar/react";
import { clientConfig } from "@/lib/rollbar";

export function RollbarProvider({ children }: { children: React.ReactNode }) {
  return <RollbarErrorProvider config={clientConfig}>{children}</RollbarErrorProvider>;
}
