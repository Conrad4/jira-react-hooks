## 第四章、 JWT、用户认证与异步请求

## 1、json-server使用中间件

### 1-1、为何使用中间件？

因为json-server仅支持Rsetful形式的API，对于/login这种形式的api必须通过中间件才能达到目标

### 1-2、如何使用中间件？

可以在github或gitee看star的项目，里面有统计network，点击小黑点就可以看到提交的历史版本提交的代码，也可以进行新旧双栏对比代码

- 使用node.js编写,在__json_server_mock__/middleware.js这里面写的文件

```jsx
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};
```

- 在package.json中加入cli命令

```json
"scripts": {
    "json-server": "json-server __json-server-mock__/db.json --watch --port 3001  --middlewares ./__json-server-mock__/middleware.js"
}
```

在登陆页面中使用

- 下面这个event: FormEvent<HTMLFormElement>关于event事件的类型，记不得类型的时候，直接把鼠标crtl键，或者把鼠标放在onSubmit{}，onclick{}事件上面，就会出现提示这个类型FormEvent<HTMLFormElement>

```
event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
 
```

### 1-3、使用React表单方式和ts方式，完成登录注册表单

```tsx
import { baseUrl } from "consts"
import { FormEvent } from "react"

const LoginPage: React.FC = () => {

  const login = (params: {username: string; password: string}) => {
    fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)
    }).then(async res => {
      if (res && res.ok) {
        console.log('登录成功')
      }
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //   阻止默认行为
    event.preventDefault();
    // 为什么加as HTMLInputElement？作为这种类型，要不然前面event.currentTarget.elements[0]没有value的值
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({username, password})
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">用户名</label>
      <input type="text" id={"username"} />
    </div>
    <div>
      <label htmlFor="password">密码</label>
      <input type="password" id={"password"} />
    </div>
    <button type={"submit"}>登录</button>
  </form>
}

export default LoginPage
```

## 2、使用jira-dev-tool

### 2-1、安装

-  看这个符号自己的电脑安装命令

 ```
 
 yarn add jira-dev-tool 不要加上版本号，就是谷歌搜索mooc回答多加了版本号一直报错
 
 yarn msw init ./public
 ```

  

自己的电脑npx不行啊，全换成yarn，像yarn如果安装不了 直接找到package.json，yarn add jira-dev-tool安装

- 那个没显示出来，重启项目，等一下打开项目，解决问题了

```bash
npx imooc-jira-tool 不行，手动写了yarn imooc-jira-tool 行
npx msw init public
显示... '"node"' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

### 2-2、使用方法

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { loadDevTools } from "jira-dev-tool";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
);
```

然后可以通过控制台来对请求做处理

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17c650e3-4e9d-42c9-bee2-61414195dbf1/.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/17c650e3-4e9d-42c9-bee2-61414195dbf1/.png)

### 2-3、配置需要每次导入的路径，tsconfig.json '添加./src'

- 加个"baseUrl": "./src"，不需要每次都引入绝对路径，直接使用相对路径默认添加上./src

## 3、登陆与注册功能的实现

### 3-1、登陆与注册api的实现

- src/api/auth-provider.ts
- 看下面的代码s自己写的注释 //出现的问题，这个知识量很多的话，那就慢点，比如半个小时看的代码那么你就花一个小时去学习该内容，慢慢来，保持良好的心态

#### 为什么用函数而不是直接用上面变量去接收他？

用函数，当你调用的时候 才去获取值，函数应该接受key参数，可以作为一个API来调用
export const getToken = () => window.localStorage.getItem(localStorageKey);

- m代码by m

```tsx
// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "./screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { usename: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);

```

- gitee博客代码，下面写了一些注释笔记

```tsx
import { baseUrl } from "consts";
import { User } from "pages/projectList/components/SearchPannel";

export interface IAuthParam {
  username: string;
  password: string;
}
// 这个_token_下划线在哪里定义的？是就是一个普通文本吧，用来模拟一下？
const localStoreageKey = "__auth-provider-token__";

//const getToken = localStorage.getItem(localStoreageKey);
//为什么用函数而不是直接用上面变量去接受？用函数，当你调用的时候 才去获取值，函数应该接受key参数，可以作为一个API来调用
export const getToken = () => window.localStorage.getItem(localStorageKey);

//为什么这个{user}:{user:User}
const handleUserResponse = ({ user }: { user: User }) => {
  localStorage.setItem(localStoreageKey, user.token);
  return user;
};

// 登录api实现，为什么要写成这种函数式 return？
export const login = (data: IAuthParam) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res && res.ok) {
      // alert('登陆成功')
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

* // 注册api实现
export const register = (data: IAuthParam) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res && res.ok) {
      // alert('注册成功')
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};
//登出 移除token
export const logout = async () => {
  localStorage.removeItem(localStoreageKey);
};
```

### 3-2、useAuth的实现

- src/context/auth-context.tsx

context就是为了在组件中共享值呗，比如登录注册的token值，选择地区，切换ui主题

- useContext知识点补充介绍：useContext 方法接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<AuthContext.Provider>` 的 `value` prop 决定。

  当组件上层最近的 `<AuthContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `AuthContext` provider 的 context `value` 值。`useContext(AuthContext)` 相当于 class 组件中的 `static contextType = AuthContext` 或者 `<AuthContext.Consumer>`。

  `useContext(AuthContext)` 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<AuthContext.Provider>` 来为下层组件提供 context。

```tsx
import { User } from "pages/projectList/components/SearchPannel";
import React, { ReactNode, useState } from "react";
//这个意思是auth-provider(因为这里的login与本文件里面的login冲突)，就是(文件?)别名为auth，然后下面可以auth.login
import * as auth from "api/auth-provider";

//创建context对象上下文，给他上上类型，这里看不懂的话，是要去看看hooks usecontext的相关博客，
//在index.tsx创建provider
//login是一个函数，void函数返回undefined。 Promise<void>解析为undefined。为什么加上promise再<void>？因为这个login有发送请求啊
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: auth.IAuthParam) => Promise<void>;
      register: (form: auth.IAuthParam) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

//用在devtools控制台里面显示，项目实际作用没什么作用
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   //useState hooks本质就是个数组，数组也可以有类型？ts的语法
  const [user, setUser] = useState<User | null>(null);
    
   //auth.login(form)这里，调用上次写auth-provider.tsx的login方法，所以知道为什么很多地方最好写成函数去接收变量吧，可以在别的地方被调用
  // then(setUser)缩写了很多,因为函数型编程ponit free，也可以看MDN解释，当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号，可以缩写
  //      then((user) => {
  //          setUser(user)
  //      })
  // from 其他人的注释：point free 如果回调函数的参数和里面函数的参数是一样的就可以省略参数？
  // user => setUser(user) ====》 setUser
  const login = (form: auth.IAuthParam) => auth.login(form).then(setUser);
  const register = (form: auth.IAuthParam) => auth.register(form).then(setUser);
   //setUser，上面定义了useState hooks，setUser null重置一下user
  const logout = () => auth.logout().then(() => setUser(null));

    //通过 Provider 组件的 value 将 state 提供出去
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
   //为什么没有consumer？明显这个useContext是个hooks
  const context = React.useContext(AuthContext);
    //如果context不存在
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
```

在写代码的时候，因为类型定义username，写成了usename，如果你没用ts，这个地方报错你可能要找很久才能找出来，所以ts类型定义非常的妙并且有必要；

在<AuthContext.Provider  children={children}  value={{ user, login, register, logout }}/>
这里也是，user如果没有定义好类型，就会直接在编写代码的时候vs code编辑器报错，如果不用ts编译一遍需要很长时间，才会显示报错，并且需要long time；

- src/context/index.tsx

```tsx
import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
```

### 总结：因为使用了useContext和自定义hook，useAuth

调用hook--useAuth，无论在哪里可以随意的都可以这三个方法，读取user里面的数据，useAuth自定义hook，useAuth里面又使用Usecontext实践操作

![jira第五章5-5视频](https://i.loli.net/2021/07/17/dcNb6WvQPT9hCZ4.png)

### 3-3、认证入口

- src/pages/authPage/index.tsx（认证通过）

```tsx
import { useAuth } from "context/auth-context";
import ProjectList from "pages/projectList";

const AuthPage = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </div>
  );
};

export default AuthPage;
```

- src/pages/unAuthPage/LoginPage.tsx（登陆页面）

```tsx
// import { baseUrl } from "consts"
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

const RegisterPage: React.FC = () => {
  const { login, user, register, logout } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div></div>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>注册</button>
      {/* <button type={"submit"}>登录</button> */}
    </form>
  );
};

export default RegisterPage;
```

- src/pages/unAuthPage/RegisterPage.tsx（注册页面）

```tsx
// import { baseUrl } from "consts"
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

const RegisterPage: React.FC = () => {
  const { login, user, register, logout } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div></div>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>注册</button>
      {/* <button type={"submit"}>登录</button> */}
    </form>
  );
};

export default RegisterPage;
```

- src/pages/unAuthPage/index.tsx

```tsx
import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const UnAutnPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button
        onClick={() => {
          setIsRegister(!isRegister);
        }}
      >
        前往{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};

export default UnAutnPage;
```

### 3-4、主入口

- src/App.tsx

```tsx
import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import AuthPage from "pages/authPage";
import UnAutnPage from "pages/unAuthPage";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <AuthPage /> : <UnAutnPage />}</div>;
}

export default App;
```

- src/index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

reportWebVitals();
```

## 4、封装fetch、登陆数据持久化

### 4-1、封装fetch，发起请求，可考虑使用axios，更简便

把他封装到utils的http下

- src/utils/http.ts

```tsx
import qs from "qs";
import * as auth from "api/auth-provider";
import { useAuth } from "context/auth-context";
import { baseUrl } from "consts";

// ?可选属性
interface Config extends RequestInit {
  data?: object;
  token?: string;
}

//当写window.fetch的时候，右键点击fetch看他底层的api，然后看可以调用函数要写哪些参数，像那个 headers是里面自带的，
//data, token是自己定义的接口interface
export const http = async (
  url: string,
   //这是什么意思？={空}，因为在这里是{}可选的，但是{}?这样写法不被允许，所以加上{空} 就相当于加上参数一个默认的值就相当于是可选的
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
        // Bearer是一个标准的格式名字，没有token就是空字符串
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
      //这个什么意思？剩下的配置，留给后面万一有补充，上面也定义了
    ...customConfig,
  };
	
    //qs用来，将data对象属性给转换成字符串
  if (config.method.toUpperCase() === "GET") {
    url = `${url}?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

    //第一步是先写这里，再去写const config={}里面有什么 method，
    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window.fetch(`${baseUrl}/${url}`, config).then(async (res) => {
      //可能是未登录的情况下，可能是token失效下，标准的restful风格
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const dataRes = await res.json();
    if (res.ok) {
      return dataRes;
    } else {
      return Promise.reject(dataRes);
    }
  });
};
//师：要使用自定义useAuth这个hook的话，这里useHttp函数本身就要是个hook，感觉有点不对，只要这个useHttp是函数组件就可以了
export const useHttp = () => {
  const { user } = useAuth();
    //http()上面定义的函数，Parameters，因为上面有相同的方法用了相同的参数，现在用这种操作符直接简化与上面相同http传入的参数
  return (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token });
};
```

### 4-2、登陆数据持久化

- src/context/auth-context.tsx

```tsx
import { User } from "pages/projectList/components/SearchPannel";
import React, { ReactNode, useState } from "react";
import * as auth from "api/auth-provider";
import { useMount } from "utils";
import { http } from "utils/http";

// 获取localStorage里面的数据，bootStrap初始化user数据，找token，拿着token去获取user的信息，找到了再调用bootStrap.then方法
const bootStrapUser = async () => {
   //user默认是null，在setState定义的地方
  let user = null;
   //getToken是auth-provider封装的的函数，getToken从localStorage获取 里面的数据
  const token = auth.getToken();
  if (token) {
     //这里不使用useHttp，用http可以自己指定token值
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: auth.IAuthParam) => Promise<void>;
      register: (form: auth.IAuthParam) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
    
  // from 其他人的注释：point free 如果回调函数的参数和里面函数的参数是一样的就可以省略参数？
  // user => setUser(user) ====》 setUser
  const login = (form: auth.IAuthParam) => auth.login(form).then(setUser);
  const register = (form: auth.IAuthParam) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
	
   //成功调用就再setUser
  useMount(() => {
    bootStrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
```

- 在页面加载的时候，走到useMount，调用bootStrapUser，bootStrapUser第一步会调用auth.getToken,尝试在从**localStorage获取 里面的数据**，能读到，走到http方法带上token，带上me这个api，然后返回user

- bootStrap初始化user数据，找token，拿着token去获取user的信息，找到了再调用useMount里面的bootStrap.then方法，然后赋给setUser

