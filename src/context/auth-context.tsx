import * as auth from "auth-provider";
import { FullPageLoading } from "components/lib";
import React, { ReactNode } from "react";
import { User } from "screens/project-list/search-panel";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from 'utils/use-async';

interface AuthForm {
    username: string,
    password: string
}

// 获取localStorage里面的数据，bootStrap初始化user数据
const bootstrapUser = async () => {
    //user默认是null，在setState定义的地方
    let user = null;
    //getToken是auth-provider封装的的函数，getToken从localStorage获取 里面的token数据
    const token = auth.getToken();
    if (token) {
        //这里不使用useHttp，用http可以自己指定token值
        const data = await http("me", { token });
        user = data.user;
    }
    return user;
};

const AuthContext = React.createContext<
    {
        user: User | null,
        login: (form: AuthForm) => Promise<void>,
        register: (form: AuthForm) => Promise<void>,
        logout: () => Promise<void>,
    } | undefined>(undefined);
AuthContext.displayName = "AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const [user, setUser] = useState<User | null>(null);
    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        run,
        // 这样取别名下面then 调用的setUser不用改名字了
        setData: setUser,
    } = useAsync<User | null>();

    // 看MDN解释，当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号，可以缩写，与下文对比
    /*     const login = (form: AuthForm) => {
            auth.login(form).then((user) => {
                setUser(user)
            })
        } */
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    useMount(() => {
        run(bootstrapUser());
    });

    if(isIdle || isLoading){
        return <FullPageLoading/>
    }
    if (isError) {
        return <FullPageErrorFallback error={error} />;
      }

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