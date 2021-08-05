import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { User } from "screens/project-list/search-panel";
import { Link } from "react-router-dom";

// TODO 把所有ID都改成number类型 
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

//ListProps有两部分组成，Table源码中上面所有属性的集合，TableProps和users
interface ListProps extends TableProps<Project> {
  users: User[];
}

// 不管里面ListProps有传入什么类型，第一件事先把users类型取出来，剩下的类型是...props，type PropsType = Omit<ListProps,'users'>
export const List = ({  users,...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          // 排序名字中文字符
          sorter: (a, b) => a.name.localeCompare(b.name),
          render:(value,project) =>{
            return <Link to={String(project.id)}>{value}</Link>
          }
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
           render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {/* 因为created默认是秒 数字类型，转换成时间类型*/}
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },

      ]}
      // dataSource={list},把这种写法换成下面，用...props解构出里面的props，对应上面传入的类型 ，这是在Table源码中的TableProps具有的props
      {...props}
    />
  );
};