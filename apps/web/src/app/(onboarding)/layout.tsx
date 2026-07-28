import * as React from "react";
import { MinimalLayout } from "../../layouts/MinimalLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MinimalLayout>{children}</MinimalLayout>;
}
