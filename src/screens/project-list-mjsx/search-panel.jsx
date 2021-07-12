import React, { useState } from "react";

export const SearchPanel = () => {
  // 项目搜索和 负责人下拉框这两个状态合二为一
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  return (
    <form onSubmit>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value,
            })
          }
        />
        {/* 如果fetch请求项目请求成功了，这样怎么保存呢，要想到又要引入一个新state来保存 */}
        <select value={param.personId}></select>
      </div>
    </form>
  );
};
