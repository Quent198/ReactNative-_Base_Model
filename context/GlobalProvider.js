import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {getCurrentUser} from "../lib/appwrite"

import { createContext } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        getCurrentUser()
        .then((res)=> {
            if (res) {
                setUser(res)
            }else {
                setUser(null)
            }
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <GlobalContext.Provider value = {{
               user,
               setUser,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;