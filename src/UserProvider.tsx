import React, { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "firebase";
import { auth } from "./firebase";

type Props = {
  children: ReactNode;
};

type ContextProps = {
  user: User | null;
  loadingAuth: boolean;
};

export const UserContext = createContext<Partial<ContextProps>>({});

const UserProvider = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log("logou:", userAuth);
      setUser(userAuth);
      setLoadingAuth(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
        loadingAuth: loadingAuth,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
