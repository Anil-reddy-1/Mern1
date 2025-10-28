import { createContext, useContext, useState } from "react"


interface User {
    name:string,
    token:string
}

interface AuthContextType {
    user:User|null,
    setUser:React.Dispatch<React.SetStateAction<User | null>>,
    login :(name:string,email:string,password:string)=>Promise<void>,
    logout:()=> void,
    isAuthenticated:boolean|false,
    setAuthenticated:React.Dispatch<React.SetStateAction<boolean|false>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [user,setUser]=useState<User|null>(null);
    
    async function login(){
    
    }

    function logout(){
        setUser(null);
        localStorage.clear();
        setAuthenticated(false);
    }

    const [isAuthenticated,setAuthenticated]=useState<boolean|false>(!!user);

    return (
        <AuthContext.Provider value={{ user,setUser, login, logout, isAuthenticated,setAuthenticated }}>
             {children}
        </AuthContext.Provider>
    )
}


export const useAuth =()=>{
    const context = useContext(AuthContext);
    if(context) return context;
    return null;
}


