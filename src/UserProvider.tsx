import React, {
  createContext,
  ReactNode,
  useEffect,
  useState
} from "react";
import { User } from "firebase";
import { auth } from "./firebase";

export const UserContext = createContext<User | null>(null);

type Props = {
  children: ReactNode;
}

const UserProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      setUser(userAuth);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
