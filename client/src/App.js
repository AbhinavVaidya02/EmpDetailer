import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleEmployeeAdded = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Employee Dashboard</h1>
      {/* pass the callback here */}
      <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      <hr />
      <EmployeeList refresh={refresh} />
    </div>
  );
}

export default App;
