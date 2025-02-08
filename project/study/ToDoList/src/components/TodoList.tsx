import { useState } from "react";
import { Input, Button, DatePicker } from "antd";
import { Trash2 } from "lucide-react";

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
          placeholder="Add a new task"
        />
        <DatePicker
          onChange={(_, dateString) =>
            setDate(Array.isArray(dateString) ? dateString[0] : dateString)
          }
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2 gap-4"
          >
            <span className="flex-grow text-blue-600">
              {todo.text} - {todo.date}
            </span>
            <Button
              variant="filled"
              size="small"
              onClick={() => removeTodo(todo.id)}
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

