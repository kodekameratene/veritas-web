import { Button } from "@mantine/core";
import React from "react";

export function FancyAddButton(props: {
  onClick: () => void;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}): JSX.Element {
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        bottom: 90,
        padding: 24,
        zIndex: 100,
      }}
    >
      <Button
        onClick={props.onClick}
        variant="gradient"
        gradient={{ from: "teal", to: "blue", deg: 60 }}
      >
        {props.children}
      </Button>
    </div>
  );
}
