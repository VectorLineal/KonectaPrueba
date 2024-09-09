import axios from "axios";
import { CButton, CButtonGroup, CButtonToolbar } from '@coreui/react';
import { useState, useContext } from "react";
import { userContext } from "../MyContext";
import { Roles } from "./Roles";

export function RoleEdit(userId, curRole){
    const { userData, setUserData } = useContext(userContext);
    const [valueUnused, setValueUnused] = useState(curRole);

    const client = axios.create({
        withCredentials: true,
        baseURL: "http://localhost:3001/api/users"
    });

    const handleUnusedChange = (event) => {
        setValueUnused(event.target.value);
    };
    const changeRole = async () => {
        try {
            let response = await client.put('/' + userId, {
                role: valueUnused,
                headers: {
                    Authorization: userData.token
                }
            });
            console.log("response add tags:", response);
        } catch (error) {
            console.log("error:", error);
        }
    };
    const onPress = async () =>{
        await changeRole();
    }
    return(
        <div>
            <CButtonToolbar className="justify-content-evenly" role="group" aria-label="RoleBar">
                <CButtonGroup role="group" aria-label="Change Role">
                    <Roles label="Choose Role" value={valueUnused} handleChange={handleUnusedChange}/>
                    <CButton color="success" onClick={onPress}>Change Role</CButton>
                </CButtonGroup>
            </CButtonToolbar>
        </div>
    );
}