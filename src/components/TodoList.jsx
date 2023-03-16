import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import fi from "date-fns/locale/fi";

export default function TodoList() {
  const [todo, setTodo] = React.useState({
    description: "",
    date: "",
    priority: "",
  });
  const [todos, setTodos] = React.useState([]);
  const gridRef = React.useRef();

  const columns = [
    {
      field: "description",
      sortable: true,
      filter: true,
    },
    {
      field: "date",
      sortable: true,
      filter: true,
    },
    {
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
    },
  ];

  const inputChanged = (event) => {
    setTodo({
      ...todo,
      [event.target.name]: event.target.value,
    });
  };

  const addTodo = () => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (_item, itemIndex) =>
            itemIndex !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    }
    else {
      alert("No row selected!");
    }
  };

  const transformDate = (dateText) => {
    // console.log(dateText);
    let dateObj = new Date(dateText);
    const transformedDate = dateObj.toLocaleString("fi-FI", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
    // console.log(transformedDate);
    setTodo({...todo, date: transformedDate})
  }

  return (
    <div className="todo-list">
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          name="description"
          label="Description"
          variant="standard"
          onChange={inputChanged}
          value={todo.description}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DateTimePicker
            label="Date"
            variant="standard"
            onChange={value => transformDate(value)}
          />
        </LocalizationProvider>
        <TextField
          name="priority"
          label="Priority"
          variant="standard"
          onChange={inputChanged}
          value={todo.priority}
        />
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
        <Button onClick={deleteTodo} variant="contained" sx={
          {
            bgcolor: "red",
            ":hover": {
              bgcolor: "red"
            }
          }
        }>
          Delete
          <DeleteIcon />
        </Button>
      </Stack>

      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "50%", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          animateRows={true}
          defaultColDef={{
            floatingFilter: true,
            flex: 1,
          }}
        ></AgGridReact>
      </div>
    </div>
  );
}
