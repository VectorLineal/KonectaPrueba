import axios from "axios";
import { useContext } from 'react';
import { employeeContext } from "../MyContext";
import { RequestList } from '../components/RequestList';
import { UserData } from '../components/UserData';
import { Header } from '../components/Header';

const client = axios.create({
    baseURL: "http://localhost:3001/api"
});

let employeeData = {};
let userData = {};

const setEmployee = (data) => {
    employeeData = data;
}

const setUser = (data) => {
    userData = data;
}

const fetchEmployeeUser = async (id) => {
    try {
       let employee = await client.get('/employees/' + id);
       setEmployee(employee.data);
       let user = await client.get('/userEmployee/' + id);
       setEmployee(user.data);
    } catch (error) {
        console.log("error:", error);
    }
};

export async function Requests(){
    const { curEmployee, setCurEmployee } = useContext(employeeContext);
    await fetchEmployeeUser(curEmployee);
    return (
        <div>
            <Header/>
            <UserData employee={employeeData} user={userData}/>
            <RequestList requests={employeeData.request}/>
        </div>
    );
}