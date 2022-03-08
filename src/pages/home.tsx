import { useEffect, useState } from 'react';
import {
  getAuth,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import UserHeading from '../components/UserHeading';
import Menu from '../components/navigation/menu';
import { Grid, useTheme } from '@geist-ui/react';
import PictureCard from '../components/PictureCard';
import { getBusinessImages } from './api/backend';

var currPictures:[];

const Home = () => {
  const theme = useTheme();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [gallery, setGallery] = useState<boolean>(false);

  const handleGetAllPictures = async () => {
    await getBusinessImages(user?.uid).then((images) => {
      if (images.success !== undefined && images.success.length !== 0) {
        currPictures = images.success;
        setGallery(true);
      }
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (aUser) => {
      setUser(aUser);
      setGallery(false);
      handleGetAllPictures();
    });
  }, [auth]);

  return (
    <>
    <Menu></Menu>
    {user ? (
      <>
        {(user?.displayName !== undefined) && <UserHeading user={{ name: user?.displayName!, avatarSrc: user.photoURL }} />}
        <div className="page__wrapper">
          <div className="page__content">
            <Grid.Container gap={2} marginTop={1} justify="flex-start">
              {gallery && (currPictures.map((pictureURL, i) => (
                <Grid key={i} xs={24} sm={12} md={8}>
                  <PictureCard
                    pictureURL={pictureURL}
                    pictureName={""}
                  />
                </Grid>
              )))}
            </Grid.Container>
          </div>
        </div>
      </>) : (
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
    <style jsx>{`
      .page__wrapper {
        background-color: ${theme.palette.accents_1};
        min-height: calc(100vh - 172px);
      }
      .page__content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: ${theme.layout.pageWidthWithMargin};
        max-width: 100%;
        margin: 0 auto;
        padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
        box-sizing: border-box;
      }
      `}</style>
    </>
  );
};

export default Home;