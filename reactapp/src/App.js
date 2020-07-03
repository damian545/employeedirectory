import React, { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import EmployeeContext from "./components/EmployeeContext";

function App() {
  const [employees, setEmployees] = useState([]);
  const [displayedEmployees, setDisplayedEmployees] = useState([]);

  return (
    <div className="App">
      <EmployeeContext.Provider
        value={{
          employees,
          setEmployees,
          displayedEmployees,
          setDisplayedEmployees,
        }}
      >
        <Navbar />
        <Table />
      </EmployeeContext.Provider>
    </div>
  );
}

export default App;
