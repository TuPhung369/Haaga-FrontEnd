import { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Input, Button, DatePicker, Select, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";
import dayjs from "dayjs";

// Register AG Grid modules
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

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

    message.success("Task added successfully!");
    setTask("");
    setDate("");
    setPriority("");
  }, [task, date, priority]);

  const removeTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    message.success("Task deleted successfully!");
  }, []);

  const editTodo = useCallback((todo: Todo) => {
    setTask(todo.description);
    setDate(todo.date);
    setPriority(todo.priority);
    setEditId(todo.id);
    setIsModalOpen(true);
  }, []);

  const saveEditedTodo = () => {
    if (!task.trim() || !date || !priority) {
      message.warning("Please enter all fields before saving.");
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editId
          ? { ...todo, description: task, date, priority }
          : todo
      )
    );

    message.success("Task updated successfully!");
    setIsModalOpen(false);
    setEditId(null);
    setTask("");
    setDate("");
    setPriority("");
  };

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
      cellStyle: (params: { value: string }) => {
        if (params.value === "High")
          return { color: "red", fontWeight: "bold" };
        if (params.value === "Medium")
          return { color: "orange", fontWeight: "bold" };
        if (params.value === "Low")
          return { color: "green", fontWeight: "bold" };
        return {};
      },
    },
    {
      headerName: "Action",
      cellRenderer: (params: { data: Todo }) => {
        const { data } = params;
        return (
          <div className="flex gap-2">
            <EditOutlined
              onClick={() => editTodo(data)}
              className="w-5 h-5 text-blue-500 cursor-pointer"
            />
            <DeleteOutlined
              onClick={() => removeTodo(data.id)}
              className="w-5 h-5 text-red-500 cursor-pointer"
            />
          </div>
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
          value={priority || undefined}
          onChange={(value) => setPriority(value)}
          style={{ width: 250, textAlign: "left" }}
          placeholder="Priority"
          allowClear
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

      {/* Modal for Editing */}
      <Modal
        title="Edit Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={saveEditedTodo}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="flex flex-col gap-3">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Task Description"
          />
          <DatePicker
            value={date ? dayjs(date, "DD.MM.YYYY") : null}
            onChange={(date, dateString) => {
              if (date) {
                setDate(Array.isArray(dateString) ? dateString[0] : dateString);
              }
            }}
            format="DD.MM.YYYY"
            disabledDate={disabledDate}
            style={{ width: "100%" }}
          />
          <Select
            value={priority || undefined}
            onChange={(value) => setPriority(value)}
            placeholder="Priority"
            style={{ width: "100%" }}
          >
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}

