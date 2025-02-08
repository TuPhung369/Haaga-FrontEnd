import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Input, Button, DatePicker, Select } from "antd";
import { Trash2 } from "lucide-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import moment from "moment";

// Register the ClientSideRowModel module before using AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

interface Todo {
  id: number;
  text: string;
  date: string;
  priority: string;
}

export default function TodoAgGrid() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const addTodo = () => {
    if (!task.trim() || !date || !priority) return;
    const newTodo = {
      id: Date.now(),
      text: task,
      date, // Store raw date from DatePicker
      priority,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTask("");
    setDate("");
    setPriority("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const columns = [
    {
      headerName: "Date",
      field: "date" as keyof Todo,
      filter: "agDateColumnFilter",
      floatingFilter: true,
      sortable: true,
    },
    {
      headerName: "Description",
      field: "text" as keyof Todo,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true,
    },
    {
      headerName: "Priority",
      field: "priority" as keyof Todo,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      sortable: true,
    },
    {
      headerName: "Action",
      cellRenderer: (params: { data: Todo }) => (
        <Button
          size="small"
          className="bg-transparent border-none"
          onClick={() => removeTodo(params.data.id)}
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-900">
        ToDo AgGrid React
      </h2>

      <div className="flex gap-2 mb-4">
        <Input
          value={task}
          style={{ width: 500 }}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a New Task"
        />
        <DatePicker
          style={{ width: 250 }}
          value={date ? moment(date) : null} // Keep as is
          onChange={(_, dateString) => setDate(dateString)} // Store raw string
        />
        <Select
          value={priority}
          onChange={(value) => setPriority(value)}
          style={{ width: 250 }}
          placeholder="Priority"
        >
          <Select.Option value="High">High</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="Low">Low</Select.Option>
        </Select>
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={todos}
          columnDefs={columns}
          animateRows={true}
          pagination={true}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}

