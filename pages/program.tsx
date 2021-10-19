import firebase from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import { GenericCard } from "../components/GenericCard";

export default function Home() {
  const [data, isLoading, error] = useCollection(
    firebase
      .firestore()
      .collection("festival/6Eh4cCNaCEEVndCZEqSX/content")
      .where("page", "array-contains", "program")
      .orderBy("startTime", "asc"),
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
  return (
    <div style={{ backgroundColor: "whitesmoke", padding: 12 }}>
      {data?.docs.map((doc) => (
        <GenericCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
