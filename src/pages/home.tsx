import { useEffect, useState } from 'react';
import {
  getAuth,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import UserHeading from '../components/UserHeading';
import Menu from '../components/navigation/menu';

const Home = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (aUser) => {
      setUser(aUser);
    });
  }, [auth]);

  return (
    <>
      <Menu></Menu>
      {(user?.displayName !== undefined) && <UserHeading user={{ name: user?.displayName!, avatarSrc: user.photoURL }} />}
    </>
  );
};

export default Home;
