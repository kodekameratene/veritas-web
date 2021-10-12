// auth.tsx
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";

function SignInScreen() {
  if (typeof window !== "undefined") {
    return (
      <div>
        <h1>Veritas admin login</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={{
            signInSuccessUrl: "/",
            signInOptions: [
              firebase.auth.GithubAuthProvider.PROVIDER_ID,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
          }}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  } else {
    return <p>No window.</p>;
  }
}

export default SignInScreen;
