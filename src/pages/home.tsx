import { Url } from 'url';

import { useEffect, useState } from 'react';

import {
  getAuth,
  signInWithPopup,
  OAuthCredential,
  User,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import Router from 'next/router';
import Geocode from 'react-geocode';

import db from '../firebase.config';
import RecycledTypesList from '../RecycledTypes';
import USStatesList from '../USStates';

Geocode.setApiKey(process.env.NEXT_PUBLIC_GEOCODE_API_KEY!);

let phone: string | undefined;
let address: string | undefined;
let timeAvailability: string | undefined;
let website: Url | undefined;
let recycledType: string | undefined;

const UserHome = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const collection = 'business';

  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfoUpdate, setUserInfoUpdate] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  const userDetails = {
    phone: '',
    street: '',
    city: '',
    county: '',
    state: '',
    zipcode: '',
    lat: 0,
    lng: 0,
    address: '',
    timeAvailability: '',
    website: '',
    recycledType: '',
  };

  const handleSignInRequest = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setShowDetails(true);
        setUserInfoUpdate(false);
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          setUser(result.user);
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
        setUser(null);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleTriggerDetails = () => {
    setShowDetails(false);
    console.log(phone);
    console.log(address);
    console.log(timeAvailability);
  };

  const handleTriggerUpdate = () => {
    setUserInfoUpdate(true);
  };

  const handleLatLng = () => {
    Geocode.fromAddress('Eiffel Tower').then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleSubmit = async () => {
    userDetails.address = `${userDetails.street}, ${userDetails.city}, ${userDetails.state}, ${userDetails.zipcode}`;
    console.log(userDetails.address);
    handleLatLng();
    /*
        await setDoc(doc(db, collection, user!.uid), userDetails)
            .then(() => {
                Router.reload();
            }).catch(error => {
                alert(error);
            });
            */
  };

  const loadData = async (user: User) => {
    const docRef = doc(db, 'business', user.uid.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      phone = data.phone;
      address = data.address;
      timeAvailability = data.timeAvailability;
      website = data.website;
      recycledType = data.recycledType;
      console.log(data);
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (aUser) => {
      console.log(`Auth state changes: ${aUser}`);
      setUser(aUser);
      if (aUser) {
        setLoggedIn(true);
        loadData(aUser).then(() => {
          console.log('Finished');
        });
      } else {
        setLoggedIn(false);
      }
    });
  }, [auth]);

  return (
    <>
      <ion-header class="ion-no-border">
        <ion-toolbar>
          <ion-title onClick={() => Router.push('/home')}>Home</ion-title>
          <ion-button
            shape="round"
            strong={true}
            slot="end"
            disabled={loggedIn}
            onClick={handleSignInRequest}
          >
            LOG IN
          </ion-button>
          <ion-button
            shape="round"
            strong={true}
            slot="end"
            disabled={!loggedIn}
            onClick={handleSignOutRequest}
          >
            LOG OUT
          </ion-button>
        </ion-toolbar>
      </ion-header>
      {user ? (
        <>
          <ion-item>
            <ion-thumbnail slot="start">
              {user.photoURL ? (
                <img src={user.photoURL} alt="user"></img>
              ) : (
                <img
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=="
                  alt="no image"
                ></img>
              )}
            </ion-thumbnail>
            <ion-label>
              <h2>User: {user.displayName}</h2>
              <p>UID: {user.uid}</p>
              <p>Email: {user.email}</p>
              {!showDetails && phone !== undefined && <p>Phone: {phone}</p>}
              {!showDetails && address !== undefined && (
                <p>Address: {address}</p>
              )}
              {!showDetails && timeAvailability !== undefined && (
                <p>Time Availability: {timeAvailability}</p>
              )}
              {!showDetails && website !== undefined && (
                <p>
                  Website:{' '}
                  <Link href={website!} passHref={true}>
                    {website}
                  </Link>
                </p>
              )}
              {!showDetails && recycledType !== undefined && (
                <p>Recycled Type(s): {recycledType}</p>
              )}
            </ion-label>
            {showDetails && (
              <ion-button
                fill="outline"
                slot="end"
                onClick={handleTriggerDetails}
              >
                Details
              </ion-button>
            )}
            {!showDetails && (
              <ion-button
                fill="outline"
                slot="end"
                onClick={handleTriggerUpdate}
              >
                Update
              </ion-button>
            )}
          </ion-item>
          {userInfoUpdate && (
            <ion-card>
              <ion-card-header>
                <ion-card-title>Update Your Account Information</ion-card-title>
              </ion-card-header>
              <ion-item>
                <ion-icon name="pin" slot="start"></ion-icon>
                <ion-label id="attention">
                  ATTENTION: Your update will only be shown on this website
                  without affecting your account on other sites.
                </ion-label>
                <ion-button fill="outline" slot="end" onClick={handleSubmit}>
                  Submit
                </ion-button>
              </ion-item>
              <ion-card-content>
                <ion-item>
                  <ion-label class="ion-text-wrap" color="primary">
                    Phone:{' '}
                  </ion-label>
                  <ion-input
                    type="tel"
                    required={true}
                    onBlur={(e) =>
                      (userDetails.phone = (e.target as HTMLInputElement).value)
                    }
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label class="ion-text-wrap" color="primary">
                    Street:{' '}
                  </ion-label>
                  <ion-input
                    type="text"
                    required={true}
                    onBlur={(e) =>
                      (userDetails.street = (
                        e.target as HTMLInputElement
                      ).value)
                    }
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label class="ion-text-wrap" color="primary">
                    City:{' '}
                  </ion-label>
                  <ion-input
                    type="text"
                    required={true}
                    onBlur={(e) =>
                      (userDetails.city = (e.target as HTMLInputElement).value)
                    }
                  ></ion-input>
                  <ion-label class="ion-text-wrap" color="primary">
                    County:{' '}
                  </ion-label>
                  <ion-input
                    type="text"
                    required={true}
                    onBlur={(e) =>
                      (userDetails.county = (
                        e.target as HTMLInputElement
                      ).value)
                    }
                  ></ion-input>
                  <ion-label color="primary">State:</ion-label>
                  <ion-select
                    multiple={false}
                    cancelText="Cancel"
                    okText="Okay"
                    onBlur={(e) =>
                      (userDetails.state = (
                        e.target as HTMLInputElement
                      ).value?.toString())
                    }
                  >
                    {USStatesList.map(({ abbr }, i) => (
                      <ion-select-option key={i}>{abbr}</ion-select-option>
                    ))}
                    ;
                  </ion-select>
                  <ion-label class="ion-text-wrap" color="primary">
                    Zip Code:{' '}
                  </ion-label>
                  <ion-input
                    type="text"
                    required={true}
                    onBlur={(e) =>
                      (userDetails.zipcode = (
                        e.target as HTMLInputElement
                      ).value)
                    }
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label class="ion-text-wrap" color="primary">
                    Time Availability:{' '}
                  </ion-label>
                  <ion-input
                    type="text"
                    required={true}
                    onBlur={(e) =>
                      (userDetails.timeAvailability = (
                        e.target as HTMLInputElement
                      ).value)
                    }
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label class="ion-text-wrap" color="primary">
                    Website:{' '}
                  </ion-label>
                  <ion-input
                    type="url"
                    required={true}
                    onBlur={(e) =>
                      (userDetails.website = (
                        e.target as HTMLInputElement
                      ).value)
                    }
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label color="primary">Recycled Type(s)</ion-label>
                  <ion-select
                    multiple={true}
                    cancelText="Cancel"
                    okText="Okay"
                    onBlur={(e) => {
                      userDetails.recycledType = (
                        e.target as HTMLInputElement
                      ).value?.toString();
                      console.log(recycledType);
                    }}
                  >
                    {RecycledTypesList.map(({ val }, i) => (
                      <ion-select-option key={i}>{val}</ion-select-option>
                    ))}
                    ;
                  </ion-select>
                </ion-item>
              </ion-card-content>
            </ion-card>
          )}
        </>
      ) : (
        <>
          <ion-progress-bar type="indeterminate"></ion-progress-bar>
          <ion-chip color="secondary">
            <ion-label color="dark">Please Sign In</ion-label>
          </ion-chip>
          <ion-progress-bar
            type="indeterminate"
            reversed={true}
          ></ion-progress-bar>
        </>
      )}
    </>
  );
};

export default UserHome;
