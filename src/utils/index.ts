import { useEffect, useRef, useState } from "react";

// 感叹号!是求反
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 当他为无意义的时候，在下面cleanObject里面使用使用
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

/* let a: object
a = {name: 'jack'}
a = () => {
}
a = new RegExp('')

let b: { [key: string]: unknown }
b = {name: 'Jack'}
b = () => {}
在一个函数里，改变传入的对象本身是不好的
要的是key键（key）值（unknown）对，（即键值对），把object类型换成 object?: { [key: string]: unknown }
 */
export const cleanObject = (object?: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // 用来禁止控制栏报警告，按他eslint检查出来的警告提示写反而有循环的问题
  }, [callback]);
};

// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay);
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
//   ...5s
// 执行！

// debounce 原理讲解：
// 0s ---------> 1s ---------> 2s --------> ...
//     一定要理解：这三个函数都是同步操作，所以它们都是在 0~1s 这个时间段内瞬间完成的；
//     log()#1 // timeout#1
//     log()#2 // 发现 timeout#1！取消之，然后设置timeout#2
//     log()#3 // 发现 timeout#2! 取消之，然后设置timeout#3
//              所以，log()#3 结束后，就只剩timeout#3在独自等待了

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// 实现useArray

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  // 这里返回setValue?
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      // 把value copy一遍，解构一遍，再把结构的值为了生成新的数组，相当于浅拷贝，不这样你改数组的值不会触发更新？
      // 如果删除数组的值不会导致更新，生成一个新的数组才会触发更新？,或者改成setVal(pre=> pre.splice(index,1))
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 先把 当前的标题 保存下来
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // 第二个useEffect来判断keepOnUnmount为false的情况
  useEffect(() => {
    return () => {
      // 当值为false的时候，把默认的值赋给标题
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
