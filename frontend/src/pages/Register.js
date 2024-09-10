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

    /*
{
"name":"Nicolas",
"salary":"4000",
"username":"superuser",
"password":"superuser",
"role":"administrador"

}



*/

    const tryRegister = async (content) => {
        try {
            const user = await client.post('/users', {
                name: content.name,
                salary: content.salary,
                username: content.username,
                password: content.password,
                role: "empleado"
            });
            if(user.data !== null) goToNewPage();
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