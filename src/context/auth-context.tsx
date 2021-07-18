import * as auth from "auth-provider";
import React, { ReactNode, useState } from "react";
import { User } from "types/user";

interface AuthForm {
    username: string,
    password: string
}

const AuthContext = React.createContext<
    {   
        user: User | null,
        login: (form: AuthForm) => Promise<void>,
        register: (form: AuthForm) => Promise<void>,
        logout: () => Promise<void>,
    } | undefined>(undefined);
AuthContext.displayName = "AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // 看MDN解释，当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号，可以缩写，与下文对比
    /*     const login = (form: AuthForm) => {
            auth.login(form).then((user) => {
                setUser(user)
            })
        } */
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    return <AuthContext.Provider value={{ user, login, register, logout }} />

};

//自定义hooks,useAuth,使用之前ontext创建的对象
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    //如果context不存在
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};