import { CButton } from '@coreui/react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { userContext } from "../MyContext";
import { RoleEdit } from "./RoleEdit";

export function UserData({ employee, user }) {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);

  const goToNewPage = () => {
    navigate("/employees");
  }

  return (
    <div>
      <div>
        <h1>{employee.name}</h1>
        <h2>{"Username: " + user.username}</h2>
        <p>{"Salary: " + employee.salary}</p>
        <p>{"Started Working since " + employee.joinDate}</p>
        {userData.role == "administrador"
            ? <RoleEdit userId={user.id} curRole={user.role} />
            : <p>{user.role}</p>     
        }
      </div>
      <CButton color="success" size='lg' onClick={goToNewPage}>View All Employees</CButton>
    </div>
  );
}