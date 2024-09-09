import axios from "axios";
import { useNavigate} from "react-router-dom";
import { ContentForm } from '../components/ContentForm';

export function Register(){
    const client = axios.create({
        baseURL: "http://localhost:3001/api" 
    });
    const navigate = useNavigate();

    const goToNewPage = () => {
        navigate("/");
    }

    const formFields = [
        {label: "Name", stateValue: "name", value: "", type: "text"},
        {label: "Salary", stateValue: "salary", value: "", type: "number"},
        {label: "Username", stateValue: "username", value: "", type: "text"},
        {label: "Password", stateValue: "password", value: "", type: "password"}
    ]

    const tryRegister = async (content) => {
        try {
            const employee = await client.post('/employees', {name: content.name, salary: content.salary});
            console.log("response employee:", employee);
            const employeeId = employee.data.id;
            if(employeeId !== null){
                const user = await client.post('/users', {
                    username: content.username,
                    password: content.password,
                    role: "empleado",
                    employeeId
                });
                if(user.data !== null) goToNewPage();
            }
        } catch (error) {
            console.log("error:", error);
        }
    };
     
    return (
      <div>
        <h1>Register</h1>
        <ContentForm buttonText="Register" cancelText="I already have an acount" cancelDestination="/" fields={formFields} clientOperation={tryRegister}/>
      </div>
    );
}