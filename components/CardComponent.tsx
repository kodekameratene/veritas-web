import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { db } from "../pages/_app";
import { EditPersonModal } from "./EditPersonModal";

export default function CardComponent(props: {
  image: string;
  title: string;
  description: string;
  documentId: string;
}) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const collection = db.collection("conference/WwHJ20v2yZ3WG0fPvEKU/persons/");
  const [opened, setOpened] = useState(false);
  const initialValues = {
    Name: props.title,
    About: props.description,
    Image: props.image,
  };
  const form = useForm({ initialValues });
  return (
    <>
      <EditPersonModal
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
        form={form}
      />
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setOpened(true)} style={{ textAlign: "left" }}>
          <Card shadow="sm" padding="lg">
            {props.image && (
              <Card.Section>
                <Image src={props.image} height={160} />
              </Card.Section>
            )}

            <Group
              position="apart"
              style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
            >
              <Text weight={500}>{props.title}</Text>
              {/* <Badge color="pink" variant="light">
            On Sale
          </Badge> */}
            </Group>

            <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {props.description}
            </Text>

            {/* <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Book classic tour now
        </Button> */}
          </Card>
        </button>
      </div>
    </>
  );

  function handleSubmit(): React.FormEventHandler<HTMLFormElement> | undefined {
    return form.onSubmit((values) => {
      collection.doc(props.documentId).update(values);
      setOpened(false);
    });
  }
}
