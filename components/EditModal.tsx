import { Button, Checkbox, Modal, Textarea, TextInput } from "@mantine/core";
import React from "react";
import firebase from "firebase";
import DateTime from "react-datetime";
import moment from "moment";
import { InteractiveStringArray } from "./renderStringArray";

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
    person,
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
          autosize
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
        {page?.includes("program") && (
          <div>
            <h3>Start-tid</h3>
            <DateTime
              value={startTime?.toDate()}
              onChange={(date) => {
                // firestore.Timestamp.fromDate(new Date());
                const newDate = firebase.firestore.Timestamp.fromDate(
                  moment(date).toDate()
                );
                return form.setFieldValue("startTime", newDate);
              }}
            />
          </div>
        )}
        {/* // timestamp?: { nanoseconds: number; seconds: number }; // UTC? Or what? */}
        {page?.includes("news") && (
          <div>
            <h3>TimeStamp</h3>
            <DateTime
              value={timestamp?.toDate()}
              onChange={(date) => {
                const newDate = firebase.firestore.Timestamp.fromDate(
                  moment(date).toDate()
                );
                return form.setFieldValue("timestamp", newDate);
              }}
            />
          </div>
        )}

        <ActionSection />

        <hr />
        <h2>Ekstra</h2>
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
        <div>
          <h3>Grupper</h3>
          <InteractiveStringArray
            value={group}
            onChange={(updatedValue: string[]): void => {
              form.setFieldValue("group", updatedValue);
            }}
          />
        </div>
        <div>
          <h3>Personer</h3>
          <InteractiveStringArray
            value={person}
            onChange={(updatedValue: string[]): void => {
              form.setFieldValue("person", updatedValue);
            }}
          />
        </div>
        <hr />
        <div>
          <p>Spor - Må ha "Veritas" for å vises i programmet.</p>
          <p>...og må ha minst ett spor! (bug i appen)</p>
          <InteractiveStringArray
            value={track}
            onChange={(updatedValue: string[]): void => {
              form.setFieldValue("track", updatedValue);
            }}
          />
        </div>
        <hr />
        <h2>Ting som ikke fungerer enda...</h2>
        <div>
          {/* group?: [string]; // Add all the groups this card belongs to. (Is used for linking to other cards). Potential for recursive links... See the showGroup */}
          <h3>TODO: pages</h3>
          <Checkbox checked={page?.includes("news")} label="Nyhets-post" />
          <Checkbox checked={page?.includes("program")} label="Program-post" />
          <Checkbox checked={page?.includes("info")} label="Info-post" />
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
