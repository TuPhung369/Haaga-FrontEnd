import { useState } from "react";
import { Input, Button, DatePicker } from "antd";
import TodoTable from "./TodoTable"; // Import the TodoTable component
import moment from "moment";

interface Todo {
  id: number;
  text: string;
  date: string;
}

export default function TodoApp() {
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
          onChange={(_, dateString) =>
            setDate(Array.isArray(dateString) ? dateString[0] : dateString)
          }
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      {/* Pass todos and removeTodo function as props to TodoTable */}
      <TodoTable todos={todos} removeTodo={removeTodo} />
    </div>
  );
}

