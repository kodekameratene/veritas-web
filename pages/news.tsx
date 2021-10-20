import firebase from "../firebase/clientApp";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { GenericCard } from "../components/GenericCard";
import React, { useState } from "react";
import { FancyAddButton } from "../components/FancyAddButton";
import { db } from "./_app";
import { useForm } from "@mantine/hooks";
import { removeUndefined } from "../utils/removeUndefined";
import { EditModal } from "../components/EditModal";
import { ThemeContext } from "@emotion/react";
import NavigationBar from "../components/NavigationBar";

export default function Home() {
  const [data, isLoading, error] = useCollection(
    firebase
      .firestore()
      .collection("festival/6Eh4cCNaCEEVndCZEqSX/content")
      .where("page", "array-contains", "news"),
    // .orderBy("timestamp")
    {}
  );

  //   const [user, userIsLoading, userError] = useAuthState(firebase.auth());

  //   if (!user) {
  //     return (
  //       <div>
  //         <h1>You are not logged in</h1>
  //         <Link href="/auth">
  //           <button>Login</button>
  //         </Link>
  //       </div>
  //     );
  //   }

  // const {
  //   title,
  //   content,
  //   img,
  //   group,
  //   index,
  //   page,
  //   showGroup,
  //   startTime,
  //   timestamp,
  //   track,
  //   url,
  //   person,
  // }: {
  //   title?: string;
  //   content?: string;
  //   img?: string; // Url to an image to display
  //   group?: [string]; // Add all the groups this card belongs to. (Is used for linking to other cards). Potential for recursive links... See the showGroup
  //   index?: string; // Used when we don't have a time to sort on. For example on the info-page.
  //   page?: ["info" | "news" | "program" | undefined]; // What page it is shown on (can be multiple)
  //   showGroup?: string; // Will show all cards with the specified groupname inside this one
  //   startTime?: { nanoseconds: number; seconds: number }; // UTC? Or what?
  //   timestamp?: { nanoseconds: number; seconds: number }; // UTC? Or what?
  //   track?: [string]; // Not sure if this is used for anything... 🤔
  //   url?: string; // Clickable url
  //   person?: [string];
  // } = doc.data();

  const collection = db.collection("festival/6Eh4cCNaCEEVndCZEqSX/content/");
  const [opened, setOpened] = useState(false);
  const initialValues = {
    // title: "",
    // content: "",
    // img: "",
    group: [],
    // index: 0,
    page: ["news"],
    // showGroup: "",
    // startTime: null,
    timestamp: firebase.firestore.Timestamp.now(),
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
        Ny nyhets-post
      </FancyAddButton>
      <div style={{ backgroundColor: "whitesmoke", padding: 12 }}>
        {data?.docs.map((doc) => (
          <GenericCard key={doc.id} doc={doc} />
        ))}
      </div>
      <NavigationBar />
    </div>
  );
}
