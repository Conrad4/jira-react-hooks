import { useState } from "react";

interface State<D> {
  data: D | null;
  // 这个Error类型？
  error: Error | null;
  //status状态缩写，idle空闲的，还没发生
  stat: "idle" | "loading" | "error" | "success";
}

// 我们写的默认的状态，stat为idle空闲状态
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

//initialState?: State<D> 这个是用户传入的state，用户的优先级更高，传入的参数的泛型写在前面
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // run 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  // 最后这个hook返回什么，给四个状态给他们标记，为了方便我们使用
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    //传出很多state
    ...state,
  };
};
