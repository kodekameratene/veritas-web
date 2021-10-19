import React from "react";
import firebase from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import { Switch } from "@mantine/core";
import { PeopleSection } from "../components/PeopleSection";
import useLocalStorage from "../hooks/useLocalStorage";
import { EditPeopleSection } from "../components/EditPeopleSection";
import { NewPersonButton } from "../components/NewPersonButton";

export default function Home() {
  const [mode, setMode] = useLocalStorage("mode", "view");

  const [data, _isLoading, _error] = useCollection(
    firebase.firestore().collection("conference/WwHJ20v2yZ3WG0fPvEKU/persons"),
    {}
  );

  return (
    <div style={{ backgroundColor: "whitesmoke", padding: 12 }}>
      <div
        style={{
          paddingLeft: 24,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <NewPersonButton />
        <Switch
          label="Table Edit Mode"
          checked={mode == "tableEdit"}
          onChange={() =>
            setMode((current) =>
              current == "tableEdit" ? "view" : "tableEdit"
            )
          }
          style={{ padding: 24 }}
        />
      </div>

      {mode == "tableEdit" ? (
        <EditPeopleSection data={data} />
      ) : (
        <PeopleSection data={data} />
      )}
    </div>
  );
}
