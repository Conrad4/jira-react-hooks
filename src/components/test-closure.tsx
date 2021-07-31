import React, { useEffect, useState } from "react";


const testClosure = () => {
    let num = 0;

    // effect函数能读取到外部变量num，形成闭包
    const effect = () => {
        num += 1;
        const message = `num value in message：${num}`;

        return function unmount() {
            console.log(message);
        };
    };

    return effect;
};

// S:执行testClosure，返回effect函数，每次调用effect时执行的环境是不同的,
// M现在add就是上面return effect赋值的变量effect,因为test函数最下面有个return effect;
const add = testClosure();

// S执行test()里面的effect函数，返回引用了message1的return function unmount()函数
//  M这里add执行哪个，返回上面test()return了effect，就相当于add 等于effect()
const unmount = add();
// 再一次执行effect函数，返回引用了message2的unmount函数
add();
// message3
add();
// message4
add();
// message5
add();
unmount(); // 在这里会打印什么呢？按照直觉似乎应该打印3,实际上打印了1
unmount(); // 结果仍然是1

// react hook 与 闭包，hook 与 闭包经典的坑
export const Test = () => {
    const [num, setNum] = useState(0);

    const add = () => setNum(num + 1);

    useEffect(() => {
        const id = setInterval(() => {
            console.log("num in setInterval:", num);
        }, 1000);
        return () => clearInterval(id);
    }, [num]);

    useEffect(() => {
        return () => {
            console.log("卸载值：", num);
        };
    }, [num]);

    return (
        <div>
            <button onClick={add}>add</button>
            <p>number: {num}</p>
        </div>
    );
};
