import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  //   这是useUrlQueryParam返回的参数， 我想返回几个就返回几个，第一个参数对应searchParams对象，第二个对应方法用来改变url参数的值
  return [
    keys.reduce((pre, key) => {
      //这里写[key] 而不是key，因为key实质是一个变量，直接写是一个字符串属性，在name和key中只能读到一个，加上[]，是一个变量，才能读取到两个
      //   这是useUrlQueryParam返回的参数， 我想返回几个就返回几个，第一个参数对应searchParams对象，第二个对应方法用来改变url参数的值
      return { ...pre, [key]: searchParams.get(key) || "" };
    }, {} as { [key in K]: string }),
    setSearchParams,
  ] as const;
};
