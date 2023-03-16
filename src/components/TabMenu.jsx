import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TodoList from "./TodoList";
import { AppBar } from "@mui/material";

export default function TabMenu() {
  const [value, setValue] = React.useState('one');

  const handleChange = (_event, value) => {
    setValue(value);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab value="one" label="Home" />
          <Tab value="two" label="Todos" />
        </Tabs>
      </AppBar>
      {value === 'one' && <h1>Welcome to todolist!</h1>}
      {value === 'two' && <TodoList />}
    </div>
  );
}
