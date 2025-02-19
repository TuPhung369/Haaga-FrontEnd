import { useState, useCallback} from "react";
import dayjs from "dayjs";
import { Input, Button, DatePicker, message } from "antd";
import TodoTable from "./TodoTable"; // Import the TodoTable component

interface Todo {
  id: number;
  description: string;
  date: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState<string>("");

  const addTodo = useCallback(() => {
    if (!task.trim() || !date) {
      message.warning("Please enter a task and select a date.");
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), description: task, date },
    ]);
    setTask("");
    setDate("");
  }, [task, date]);

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const disabledDate = (current: dayjs.Dayjs | null) => {
    return current ? current < dayjs().subtract(10, "year") : false;
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
          value={date ? dayjs(date, "DD.MM.YYYY") : null}
          style={{ width: 255 }}
          onChange={(date, dateString) => {
            if (date) {
              setDate(Array.isArray(dateString) ? dateString[0] : dateString);
            }
          }}
          format="DD.MM.YYYY"
          disabledDate={disabledDate}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      {/* Pass todos and removeTodo function as props to TodoTable */}
      <TodoTable todos={todos} removeTodo={removeTodo} />
    </div>
  );
}

