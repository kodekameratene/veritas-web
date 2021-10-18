import {
  ActionIcon,
  Button,
  Checkbox,
  Modal,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { DatePicker, TimeInput } from "@mantine/dates";
import * as Icon from "react-feather";

export function EditModal(props: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (values: any) => void;
  form: any;
}) {
  const { opened, setOpened, handleSubmit, form } = props;
  const {
    title,
    content,
    img,
    group,
    index,
    page,
    showGroup,
    startTime,
    timestamp,
    track,
    url,
  } = form.values;
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Rediger innhold"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          value={title}
          onChange={(event) =>
            form.setFieldValue("title", event.currentTarget.value)
          }
          label="Title"
        />
        <Textarea
          value={content}
          onChange={(event) =>
            form.setFieldValue("content", event.currentTarget.value)
          }
          placeholder="Kari er som de fleste nordmenn født med ski på bena. Foruten å stå på ski liker hun å snakke om..."
          label="Content"
        />
        <TextInput
          value={img}
          onChange={(event) =>
            form.setFieldValue("img", event.currentTarget.value)
          }
          placeholder="https://some-image.mydomain.com"
          label="Image"
        />
        <TextInput
          value={url}
          onChange={(event) =>
            form.setFieldValue("url", event.currentTarget.value)
          }
          placeholder="https://en-ekstern-lenke.no"
          label="Lenke (url)"
        />
        <ActionSection />

        <hr />
        <h2 style={{ color: "white" }}>Ekstra</h2>
        <TextInput
          value={showGroup}
          onChange={(event) =>
            form.setFieldValue("showGroup", event.currentTarget.value)
          }
          label="Show a group "
        />
        <TextInput
          value={index}
          onChange={(event) =>
            form.setFieldValue("index", event.currentTarget.value)
          }
          placeholder="0"
          label="index - For sortering"
        />
        <hr />
        <p style={{ color: "white" }}>Ting som ikke fungerer enda...</p>
        <div>
          {/* group?: [string]; // Add all the groups this card belongs to. (Is used for linking to other cards). Potential for recursive links... See the showGroup */}
          <h3 style={{ color: "white" }}>TODO: Grupper</h3>
          {renderStringArray(group)}
        </div>
        <div>
          {/* group?: [string]; // Add all the groups this card belongs to. (Is used for linking to other cards). Potential for recursive links... See the showGroup */}
          <h3 style={{ color: "white" }}>TODO: pages</h3>
          {/* {renderStringArray(page)} */}
          <Checkbox checked={page.includes("news")} label="Nyhets-post" />
          <Checkbox checked={page.includes("program")} label="Program-post" />
          <Checkbox checked={page.includes("info")} label="Info-post" />
        </div>

        {/* 
// url?: string; // Clickable url */}
        <div>
          {/* // startTime?: { nanoseconds: number; seconds: number }; // UTC? Or what? */}
          <h3 style={{ color: "white" }}>TODO: Start-time</h3>
          <DatePicker
            placeholder="Velg en dag"
            label="Dag"
            dropdownType="modal"
          />
          <TimeInput label="Klokkeslett" />
        </div>
        <div>
          {/* // timestamp?: { nanoseconds: number; seconds: number }; // UTC? Or what? */}
          <h3 style={{ color: "white" }}>TODO: timeStamp</h3>
          <DatePicker
            placeholder="Velg en dag"
            label="Dag"
            dropdownType="modal"
          />
          <TimeInput label="What time is it now?" />
        </div>
        <div>
          <p style={{ color: "white" }}>
            Tracks - Not sure if this is used for anything... {"🤔"}
          </p>
          {renderStringArray(track)}
        </div>

        <ActionSection />
      </form>
    </Modal>
  );

  function ActionSection() {
    return (
      <div style={{ display: "flex", paddingTop: 18 }}>
        <Button variant="filled" color="gray" onClick={() => setOpened(false)}>
          Avbryt
        </Button>
        <div style={{ width: 8 }}></div>
        <Button type="submit">Submit</Button>
      </div>
    );
  }
}
function renderStringArray(track: any) {
  if (track?.length > 0) {
    return (
      <div>
        {track?.map((t: string) => {
          return (
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>{t}</p>
              <Tooltip label={`Remove "${t}"`}>
                <ActionIcon color="red">
                  <Icon.Trash2 />
                </ActionIcon>
              </Tooltip>
            </div>
          );
        })}
      </div>
    );
  }

  return <p style={{ color: "white" }}>Ingen elementer</p>;
}
