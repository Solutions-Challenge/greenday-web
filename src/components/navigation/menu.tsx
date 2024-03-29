import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, GeistProvider, useTheme } from '@geist-ui/react';
import Submenu from './submenu';
import {
  getAuth,
  signInWithPopup,
  OAuthCredential,
  User,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import router from 'next/router';

var userVar:(User | null) = null;

const Menu: React.FC = () => {
  const theme = useTheme();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [themeType, ] = useState('light')

  const handleSignInRequest = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential: OAuthCredential | null =
            GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            userVar = result.user;
            setLoggedIn(true);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`${errorCode}: ${errorMessage}`);
        });
  };

  const handleSignOutRequest = () => {
      signOut(auth)
        .then(() => {
          userVar = null;
          setLoggedIn(false);
        })
        .catch((error) => {
          alert(error);
        });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (aUser) => {
      userVar = aUser;
      if (aUser) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
    });
  }, [auth]);

  return (
    <>
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <nav className="theme-nav">
        <img src='/assets/images/logo.png' alt='logo' id='logo' onClick={() => router.push("/")}></img>
        <div>
          <Button
            id="login-button"
            auto
            type="success"
            disabled={loggedIn}
            onClick={handleSignInRequest}
          >LOG IN</Button>
          <Button
            id="logout-button"
            auto
            type="success"
            disabled={!loggedIn}
            onClick={handleSignOutRequest}
          >LOG OUT</Button>
        </div>
      </nav>
      <Submenu />
      <style jsx>{`
        .theme-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          font-size: 16px;
          height: 54px;
          box-sizing: border-box;
        }
        .theme-title {
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
          letter-spacing: 0;
          color: #00ad43;
        }
        .theme-nav > div {
          display: flex;
          align-items: center;
        }
        .theme-nav :global(.theme-button) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          padding: 0;
          margin: 0 ${theme.layout.gapHalf};
        }
        #logo {
          text-align: left;
          height: 56px;
        }
      `}</style>
    </GeistProvider>
    </>
  );
};

export default Menu;

export const currentUser = (): User => {
  return userVar as User;
};