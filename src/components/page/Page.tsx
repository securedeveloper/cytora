import { ReactNode } from "react";
import { ErrorMessage } from "../error/Error";
import { Loader } from "../loader/Loader";

export function Page({ loading, error, children }: { loading?: boolean, error?: any, children: ReactNode }) {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  return <>{children}</>;
}