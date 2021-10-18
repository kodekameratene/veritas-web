import {
  Badge,
  Button,
  Card,
  Group,
  useMantineTheme,
  Text,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useState } from "react";
import firebase from "../firebase/clientApp";
import { db } from "../pages/_app";
import { getTimeString } from "../utils/getTimeString";
import { EditModal } from "./EditModal";
import { removeUndefined } from "../utils/removeUndefined";

// content: "Velkommen til Veritaskonferansen! Vi har gledet oss lenge."
// index: "0"
// page: Array [ "news" ]
// timestamp: Object { seconds: 1570960800, nanoseconds: 0 }
// title: "Velkommen!"
// track: Array [ "Veritas" ]
// url: "https://veritaskonferansen.no"
export function GenericCard(props: {
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
}): JSX.Element {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const { doc } = props;
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
  }: {
    title?: string;
    content?: string;
    img?: string; // Url to an image to display
    group?: [string]; // Add all the groups this card belongs to. (Is used for linking to other cards). Potential for recursive links... See the showGroup
    index?: string; // Used when we don't have a time to sort on. For example on the info-page.
    page?: ["info" | "news" | "program"]; // What page it is shown on (can be multiple)
    showGroup?: string; // Will show all cards with the specified groupname inside this one
    startTime?: { nanoseconds: number; seconds: number }; // UTC? Or what?
    timestamp?: { nanoseconds: number; seconds: number }; // UTC? Or what?
    track?: [string]; // Not sure if this is used for anything... 🤔
    url?: string; // Clickable url
  } = doc.data();

  const collection = db.collection("festival/6Eh4cCNaCEEVndCZEqSX/content/");
  const [opened, setOpened] = useState(false);
  const initialValues = {
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
  };
  const form = useForm({ initialValues });
  const handleSubmit = async (values: { [x: string]: any }) => {
    // collection.doc(props.documentId).update(values);
    // debugger;
    // collection.doc(doc.id).update({ ...values });
    let v: { [x: string]: any } = removeUndefined(values);
    await collection
      .doc(doc.id)
      .update(v)
      .catch((error) => console.error(error))
      .finally(() => setOpened(false));
  };
  // console.log(doc.data());
  return (
    <>
      <EditModal
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
        form={form}
      />
      <div style={{ margin: 8 }} onClick={() => setOpened(true)}>
        <Card shadow="sm" padding="lg">
          {img && (
            <Card.Section>
              <Image src={img} height={160} />
            </Card.Section>
          )}

          <Group
            position="apart"
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            <Text weight={500}>{title}</Text>
            <Badge>
              {track}
              {group}
            </Badge>
          </Group>
          <Group>
            {startTime && getTimeString(startTime)}
            {timestamp && getTimeString(timestamp)}
          </Group>

          <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {content}
          </Text>

          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                {url}
              </Button>
            </a>
          )}
        </Card>
      </div>
    </>
  );
}
