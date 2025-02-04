import { useState } from "react";
import { Input, Button } from "antd";

import { Trash2 } from "lucide-react";

interface Todo {
  id: number;
  text: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task }]);
    setTask("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <Input
          value={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTask(e.target.value)
          }
          placeholder="Add a new task"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2"
          >
            <span className="mr-2">{todo.text}</span>
            <Button
              variant="filled"
              size="small"
              className="mr-5"
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

