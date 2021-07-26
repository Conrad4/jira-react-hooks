import styled from "@emotion/styled";
import React from "react";
import { Button, Spin, Typography } from "antd";

export const Row = styled.div<{
    gap?: number | boolean;
    // 下面控制justify-content
    between?: boolean;
    marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  /* 这个想一下，因为是包裹在整个Row组件里面，可能存在可能不存在，所以写一个判断有between属性 */
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};

  /* >是子元素，*是全部的意思 */
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    /* 这个marginRight 有时候让它为2rem，有时候3，有时候还可以让他不存在， 具有灵活机动性，通过传props自定义的组件化思想，第一个问号gap类型是否为number，不是则流程来到gap的第二个？代表判断gap存不存在，存在是2rem，gap */
    margin-right: ${(props) =>
        typeof props.gap === "number"
            ? props.gap + "rem"
            : props.gap
                ? "2rem"
                : undefined};
  }
`;
