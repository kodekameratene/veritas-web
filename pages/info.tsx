import firebase from "../firebase/clientApp";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState } from "react";
import { GenericCard } from "../components/GenericCard";
import { FancyAddButton } from "../components/FancyAddButton";
import { useForm } from "@mantine/hooks";
import { EditModal } from "../components/EditModal";
import { removeUndefined } from "../utils/removeUndefined";
import { db } from "./_app";

export default function Home() {
  const [data, isLoading, error] = useCollection(
    firebase
      .firestore()
      .collection("festival/6Eh4cCNaCEEVndCZEqSX/content")
      .where("page", "array-contains", "info")
      .orderBy("index"),
    {}
  );

  const collection = db.collection("festival/6Eh4cCNaCEEVndCZEqSX/content/");
  const [opened, setOpened] = useState(false);
  const initialValues = {
    // title: "",
    // content: "",
    // img: "",
    // group: "",
    // index: 0,
    page: ["info"],
    // showGroup: "",
    // startTime: null,
    // timestamp: firebase.firestore.Timestamp.now(),
    track: ["Veritas"],
    // url: null,
    // person: null,
  };
  const form = useForm({ initialValues });
  const handleSubmit = async (values: { [x: string]: any }) => {
    // collection.doc(props.documentId).update(values);
    // debugger;
    // collection.doc(doc.id).update({ ...values });
    let v: { [x: string]: any } = removeUndefined(values);
    await collection
      .add(v)
      .catch((error) => console.error(error))
      .then((onFulFilled) => {
        console.log("success", onFulFilled);
      })
      .finally(() => {
        setOpened(false);
      });
  };
  return (
    <div>
      <EditModal
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
        form={form}
      />
      <FancyAddButton onClick={() => setOpened(true)}>
        Ny info-post
      </FancyAddButton>
      <div style={{ backgroundColor: "whitesmoke", padding: 12 }}>
        {data?.docs.map((doc) => (
          <GenericCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
