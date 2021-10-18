import { Badge } from "@mantine/core";
import React from "react";

export function getTimeString(time: {
  nanoseconds: number;
  seconds: number;
}): React.ReactNode {
  if (!time) return <></>;
  return <Badge>{new Date(time?.seconds * 1000).toLocaleString()}</Badge>;
}
