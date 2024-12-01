import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home.js";
import Users from "./screens/Users/Users.js";
import Signup from "./screens/Users/Signup.js";
import AddEmployee from "./screens/Employees/AddEmployee.js";
import Header from "./components/Header.js";
import EmployeeList from './screens/Employees/EmployeeList.js'
import UpdateEmployee from "./screens/Employees/UpdateEmployee.js";
import './styles.css'

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/updateEmployee/:empId" element={<UpdateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
