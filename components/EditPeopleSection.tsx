import React, { useState } from "react";
import firebase from "../firebase/clientApp";
import {
  Table,
  TextInput,
  Textarea,
  Button,
  ActionIcon,
  Tooltip,
  Modal,
} from "@mantine/core";
import { db } from "../pages/_app";
import * as Icon from "react-feather";
import { NewPersonButton } from "./NewPersonButton";

const collection = db.collection("conference/WwHJ20v2yZ3WG0fPvEKU/persons/");
export const updateName = async (documentId: string | undefined, Name: any) => {
  await collection.doc(documentId).update({ Name });
};
export const updateAbout = async (
  documentId: string | undefined,
  About: any
) => {
  await collection.doc(documentId).update({ About });
};

export const updateImage = async (
  documentId: string | undefined,
  Image: any
) => {
  await collection.doc(documentId).update({ Image });
};
export function EditPeopleSection(props: {
  data:
    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    | undefined;
}) {
  const { data } = props;
  const rows = data?.docs.map((doc) => {
    return <PersonTableRow doc={doc} />;
  });
  return (
    <div style={{ padding: 12 }}>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>About</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

function PersonTableRow(props: {
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
}) {
  const { doc } = props;
  const { Name, About, Image } = doc.data();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <tr key={doc.id}>
        <td>
          <TextInput
            defaultValue={Name}
            onChange={(e) => updateName(doc.id, e.target.value)}
          />
        </td>
        <td>
          <Textarea
            defaultValue={About}
            autosize
            onChange={(e) => updateAbout(doc.id, e.target.value)}
          />
        </td>
        <td>
          <div style={{ display: "flex" }}>
            <TextInput
              placeholder={"https://some-image.mydomain.com"}
              defaultValue={Image}
              style={{ flex: 1 }}
              onChange={(e) => updateImage(doc.id, e.target.value)}
            />
            <img style={{ objectFit: "cover", width: 100 }} src={Image} />
          </div>
        </td>
        <td>
          <Tooltip label="Delete">
            <ActionIcon
              color="red"
              onClick={() => setOpened(true)}
              variant="outline"
            >
              <Icon.Trash2 />
            </ActionIcon>
          </Tooltip>
        </td>
      </tr>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Are you sure you want to remove this person?"
      >
        <div style={{ display: "flex" }}>
          <Button
            variant="filled"
            color="gray"
            onClick={() => setOpened(false)}
          >
            Cancel
          </Button>
          <div style={{ width: 8 }}></div>
          <Button
            variant="light"
            color="red"
            onClick={() => {
              collection
                .doc(doc.id)
                .delete()
                .then(() => setOpened(false));
            }}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </>
  );
}
