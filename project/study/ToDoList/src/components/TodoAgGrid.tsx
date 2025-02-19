import { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Input, Button, DatePicker, Select, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// Register the ClientSideRowModel module before using AG Grid
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

interface Todo {
  id: number;
  description: string;
  date: string;
  priority: string;
}

export default function TodoAgGrid() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const addTodo = useCallback(() => {
    if (!task.trim() || !date || !priority) {
      message.warning(
        "Please enter a task, select a date and choose the priority."
      );
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), description: task, date, priority },
    ]);
    setTask("");
    setDate("");
    setPriority("");
  }, [task, date, priority]);

  const removeTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);
  const disabledDate = (current: dayjs.Dayjs | null) => {
    return current ? current < dayjs().subtract(10, "year") : false;
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
      field: "description" as keyof Todo,
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
      cellRenderer: (params: { data: Todo }) => {
        const { data } = params;
        return (
          <DeleteOutlined
            onClick={() => removeTodo(data.id)}
            className="w-5 h-5 text-red-500 cursor-pointer"
          />
        );
      },
    },
  ];

  return (
    <div
      style={{ width: "860px", margin: "0 auto" }}
      className="p-4 bg-white rounded-2xl shadow-lg"
    >
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

