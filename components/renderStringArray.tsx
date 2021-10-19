import { ActionIcon, Button, TextInput, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import * as Icon from "react-feather";

export function InteractiveStringArray(props: {
  value: Array<string>;
  onChange: (updatedValue: Array<string>) => void;
}): JSX.Element {
  const [newItem, setNewItem] = useState("");
  const { value, onChange } = props;

  return (
    <div>
      {!!value?.map &&
        value?.map((t: string) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>{t}</p>
              <Tooltip label={`Remove "${t}"`}>
                <ActionIcon
                  color="red"
                  onClick={() => onChange(value.filter((e) => e !== t))}
                >
                  <Icon.Trash2 />
                </ActionIcon>
              </Tooltip>
            </div>
          );
        })}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextInput
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <Button
          onClick={() => {
            onChange([...value, newItem]);
            setNewItem("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
