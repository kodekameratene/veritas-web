import React from "react";
import Masonry from "react-masonry-css";
import firebase from "../firebase/clientApp";
import CardComponent from "./CardComponent";
import { NewPersonButton } from "./NewPersonButton";
import styles from "./PeopleSection.module.css";

export function PeopleSection(props: {
  data:
    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    | undefined;
}) {
  const { data } = props;
  return (
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
  );
}
