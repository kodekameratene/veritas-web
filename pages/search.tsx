import { TextInput } from "@mantine/core";
import firebase from "firebase";
import { error } from "firebase-functions/logger";
import { useRouter } from "next/router";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { GenericCard } from "../components/GenericCard";

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

  return (
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
  );
}
