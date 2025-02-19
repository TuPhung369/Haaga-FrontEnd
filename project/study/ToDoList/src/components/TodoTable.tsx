import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

interface Todo {
  id: number;
  description: string;
  date: string;
}

interface TodoTableProps {
  todos: Todo[];
  removeTodo: (id: number) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, removeTodo }) => {
  return (
    <table className="min-w-full table-auto mt-4">
      <thead>
        <tr>
          <th className="font-bold text-black">Date</th>
          <th className="font-bold text-black">Description</th>
          <th className="font-bold text-black">Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          return (
            <tr key={todo.id} className="border-b">
              <td className="py-2 px-4 text-blue-600">{todo.date}</td>
              <td className="py-2 px-4 text-blue-600">{todo.description}</td>
              <td className="py-2 px-4 text-blue-600">
                <DeleteOutlined
                  onClick={() => removeTodo(todo.id)}
                  className="w-5 h-5 text-red-500 cursor-pointer"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoTable;

