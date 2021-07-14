import React from "react";

// 这{list}的list是从哪里来?从父组件prop传值来的
// test
const List = ({ list, users }) =>
{
  return (
    <table>
      <thead>
        <tr>
          <th>项目</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map(project =>
            <tr>
              <td>{project.name}</td>
               {/* 这个?.的意思是防止find出来的user是undefined，这样undefined.name系统会报错.加上?. 就会让整个为undefined，不会导致系统报错 */}
              <td>{users.find(user => user.id === project.personId)?.name}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}


export default List