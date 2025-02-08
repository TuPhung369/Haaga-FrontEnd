import { useState } from "react";
import { Input, Button, DatePicker } from "antd";
import { Trash2 } from "lucide-react";
import moment from "moment";

interface Todo {
  id: number;
  text: string;
  date: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState<string>("");

  const addTodo = () => {
    if (!task.trim() || !date) return;
    setTodos([...todos, { id: Date.now(), text: task, date }]);
    setTask("");
    setDate("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-900">ToDo List</h2>
      <div className="flex gap-2 mb-4">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a New Task"
        />
        <DatePicker
          value={date ? moment(date, "YYYY-MM-DD") : null}
          style={{ width: 250 }}
          onChange={(_, dateString) =>
            setDate(Array.isArray(dateString) ? dateString[0] : dateString)
          }
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <table className="min-w-full table-auto">
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
    </div>
  );
}

