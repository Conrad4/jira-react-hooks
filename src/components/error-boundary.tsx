import React from "react";

// 原来报错显示空白页面，现在这种写法可以在页面 显示 未知错误请刷新页面的信息，React.ReactElement表示jsx类型
// 比如在return 里面写 css代码，也是一个React.ReactElement

//虽然比原来不比多少，但这种是统一的写法，使用了PropsWithChildren，看上去高大上一些
// 点击去 React.Component源码，一个props属性，一个state属性，所以这两个这么长的相对应，state对应{ error: Error | null }
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// <React.PropsWithChildren<{ fallbackRender: FallbackRender }> ，可以点代码看源码是什么，这个React.PropsWithChildren相当于之前ts的type utilities，（pick，Omit这种），然后这个意思传入的泛型除了children:ReactNode之外剩下的属性
class ErrorBoundary extends React.Component<
    React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
    { error: Error | null }
> {

    // 在类组件声明state
    state = { error: null };

    // 当子组件抛出异常，这里会接收到并且调用
    static getDerivedStateFromError(error: Error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI，返回的值赋给上面两行的state，然后state里面就有error而不是默认的null了
        return { error };
    }

    render() {
        // 返回的值赋给上面两行的state，然后state里面就有error而不是默认的null了
        const { error } = this.state;
        // 对应上面<React.PropsWithChildren<{ fallbackRender: FallbackRender }>，
        //props表示 fallbackRender, children
        const { fallbackRender, children } = this.props;
        if (this.state.error) {
            return fallbackRender({ error });
        } else {
            return children;
        }
    }
}

export default ErrorBoundary;