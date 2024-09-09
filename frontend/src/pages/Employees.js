import axios from "axios";
import { EmployeeList } from '../components/EmployeeList';
import { Header } from '../components/Header';

const client = axios.create({
    baseURL: "http://localhost:3001/api/employees"
});

let employeesData = [];

const setEmployees = (data) => {
    employeesData = data;
}

const fetchEmployees = async () => {
    try {
       let response = await client.get('');
       setEmployees(response.data);
       
    } catch (error) {
        console.log("error:", error);
    }
};

fetchEmployees();

export function Employees(){
    return (
        <div>
            <Header/>
            <EmployeeList employees={employeesData}/>
        </div>
    );
}