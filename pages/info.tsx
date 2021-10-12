import firebase from "../firebase/clientApp";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const db = firebase.firestore();
export default function Home() {
  const [data, isLoading, error] = useCollection(
    firebase
      .firestore()
      .collection("festival/6Eh4cCNaCEEVndCZEqSX/content")
      .where("page", "array-contains", "info")
      .orderBy("index"),
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
    <div>
      {data?.docs.map((doc) => (
        <div onClick={() => console.log(doc.data())}>
          <h1>{doc.data().title}</h1>
        </div>
      ))}
    </div>
  );
}
