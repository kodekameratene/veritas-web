import { Badge } from "@mantine/core";
import React from "react";

export function getTimeString(time: {
  nanoseconds?: number;
  seconds?: number;
  toDate?: any;
}): React.ReactNode {
  if (!time) return <></>;
  return <Badge>{time.toDate().toLocaleString()}</Badge>;
}
