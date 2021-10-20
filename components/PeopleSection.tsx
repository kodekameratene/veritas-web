import { Modal, Button } from "@mantine/core";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import firebase from "../firebase/clientApp";
import { db } from "../pages/_app";
import CardComponent from "./CardComponent";
import styles from "./PeopleSection.module.css";

export function PeopleSection(props: {
  data:
    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    | undefined;
}) {
  const { data } = props;
  const [opened, setOpened] = useState(false);
  const collection = db.collection("conference/WwHJ20v2yZ3WG0fPvEKU/persons/");

  return (
    <div>
      <div style={{ padding: 12 }}>
        <Masonry
          breakpointCols={{
            default: 4,
            1304: 3,
            1000: 2,
            654: 1,
          }}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {data?.docs.map((doc) => {
            const { Name, About, Image } = doc.data();
            return (
              <CardComponent
                key={doc.id}
                documentId={doc.id}
                image={Image}
                title={Name}
                description={About}
              />
            );
          })}
        </Masonry>
      </div>
    </div>
  );
}
