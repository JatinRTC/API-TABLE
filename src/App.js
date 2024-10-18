import React from "react";
import TodoList from './component/todo-list.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ADDTABLE from './Table/addTable.js';

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/add-table/:id" element={<ADDTABLE />} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;
