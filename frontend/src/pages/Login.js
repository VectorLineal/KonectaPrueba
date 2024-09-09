import axios from "axios";
import { useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { ContentForm } from '../components/ContentForm';
import { userContext, employeeContext } from "../MyContext";

export function Login(){
    const client = axios.create({
        baseURL: "http://localhost:3001/api/login" 
    });
    const navigate = useNavigate();

    const goToNewPage = (path) => {
        navigate(path);
    }

    const { userData, setUserData } = useContext(userContext);
    const { curEmployee, setCurEmployee } = useContext(employeeContext);

    const formFields = [
        {label: "Username", stateValue: "username", value: "", type: "text"},
        {label: "Password", stateValue: "password", value: "", type: "password"}
    ]

    const tryLogin = async (content) => {
        try {
            let response = await client.post('', content);
            console.log("response notes:", response);
            if(response.data.message === "success"){
                setUserData(response.data.user);
                setCurEmployee(response.data.user.employeeId);
                let path = "/requests"
                if(userData.role == "administrador") path = "/employees"
                goToNewPage(path);
            }
        } catch (error) {
            console.log("error:", error);
        }
    };
     
    return (
      <div>
        <h1>Log In</h1>
        <ContentForm buttonText="Log In" cancelText="Register" cancelDestination="/register" fields={formFields} clientOperation={tryLogin}/>
      </div>
    );
}