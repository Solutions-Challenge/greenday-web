/* eslint-disable @next/next/no-img-element */
import { getAuth, signInWithPopup, OAuthCredential, User, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import Router from "next/router";
import { useEffect, useState } from "react";

const UserHome = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const handleSignInRequest = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Got popup result");
                const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    setUser(result.user);
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + ": " + errorMessage);
            })
    }

    const handleSignOutRequest = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
            }).catch((error) => {
                alert(error);
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (aUser) => {
            console.log("Auth state changes: " + aUser);
            setUser(aUser);
            if (aUser) {
                setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
        });
    }, [auth])

    return (
        <>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-title onClick={() => Router.push('/home')}>Home</ion-title>
                <ion-button shape="round" strong={true} slot="end" disabled={loggedIn} onClick={handleSignInRequest}>LOG IN</ion-button>
                <ion-button shape="round" strong={true} slot="end" disabled={!loggedIn} onClick={handleSignOutRequest}>LOG OUT</ion-button>
            </ion-toolbar>
        </ion-header>
        {user ? (
            <>
                <ion-item>
                    <ion-thumbnail slot="start">
                        {user.photoURL ? <img src={user.photoURL} alt="user"></img> : <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==" alt="no image"></img>}
                    </ion-thumbnail>
                    <ion-label>
                        <h2>UserName: {user.displayName}</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phoneNumber}</p>
                        <p>UID: {user.uid}</p>
                    </ion-label>
                    <ion-button fill="outline" slot="end">Update</ion-button>
                </ion-item>
            </>
        ) : (
            <>
            <ion-progress-bar type="indeterminate"></ion-progress-bar>
            <ion-chip color="secondary">
                <ion-label color="dark">Please Sign In</ion-label>
            </ion-chip>
            <ion-progress-bar type="indeterminate" reversed={true}></ion-progress-bar>
            </>
        )}
        </>
    );
}

export default UserHome;