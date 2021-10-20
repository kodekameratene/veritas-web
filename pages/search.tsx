import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import firebase from "firebase";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { EditModal } from "../components/EditModal";
import { FancyAddButton } from "../components/FancyAddButton";
import { GenericCard } from "../components/GenericCard";
import NavigationBar from "../components/NavigationBar";
import { removeUndefined } from "../utils/removeUndefined";
import { db } from "./_app";

export default function SearchPage() {
  const router = useRouter();
  const { group } = router?.query;
  const [data, isLoading, error] = useCollection(
    firebase
      .firestore()
      .collection("festival/6Eh4cCNaCEEVndCZEqSX/content")
      .where("group", "array-contains", `${group}`),
    // .orderBy("index"),
    {}
  );
  const handleSearch = (searchQuery: string) => {
    router.query.group = searchQuery;
    router.replace(router);
  };

  const collection = db.collection("festival/6Eh4cCNaCEEVndCZEqSX/content/");
  const [opened, setOpened] = useState(false);
  const initialValues = {
    // title: "",
    // content: "",
    // img: "",
    group: [group],
    // index: 0,
    page: [],
    // showGroup: "",
    // startTime: null,
    // timestamp: firebase.firestore.Timestamp.now(),
    track: ["Veritas"],
    // url: null,
    person: [],
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
        form.reset();
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
        Legg til ny post i {group}
      </FancyAddButton>
      <div style={{ backgroundColor: "whitesmoke", padding: 12 }}>
        <TextInput
          placeholder="group"
          label="Group"
          value={router.query.group}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {data?.docs.map((doc) => (
              <GenericCard key={doc.id} doc={doc} />
            ))}
          </>
        )}
      </div>
      <NavigationBar />
    </div>
  );
}
