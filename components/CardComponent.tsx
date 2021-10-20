import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  useMantineTheme,
  Button,
  Modal,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { db } from "../pages/_app";
import { EditPersonModal } from "./EditPersonModal";
import * as Icon from "react-feather";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Are you sure you want to remove this person?"
      >
        <div style={{ display: "flex" }}>
          <Button
            variant="filled"
            color="gray"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <div style={{ width: 8 }}></div>
          <Button
            variant="light"
            color="red"
            onClick={() => {
              collection
                .doc(props.documentId)
                .delete()
                .then(() => setShowDeleteModal(false));
            }}
          >
            Remove
          </Button>
        </div>
      </Modal>
      <EditPersonModal
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
        form={form}
      />
      <div style={{ marginBottom: 12 }}>
        <div>
          <Tooltip label="Delete">
            <ActionIcon
              color="red"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
            >
              <Icon.Trash2 />
            </ActionIcon>
          </Tooltip>
        </div>
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
