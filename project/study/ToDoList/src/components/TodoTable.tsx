import React from "react";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import moment from "moment";

interface Todo {
  id: number;
  text: string;
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
          const formattedDate = moment(todo.date).format("DD.MM.YYYY");
          return (
            <tr key={todo.id} className="border-b">
              <td className="py-2 px-4 text-blue-600">{formattedDate}</td>
              <td className="py-2 px-4 text-blue-600">{todo.text}</td>
              <td className="py-2 px-4 text-blue-600">
                <Button
                  variant="outlined"
                  size="small"
                  className="bg-transparent border-none"
                  onClick={() => removeTodo(todo.id)}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoTable;

