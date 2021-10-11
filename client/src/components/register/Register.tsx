import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { validateRegisterInputs } from '../validations/Validations';
import { motion } from "framer-motion"
import { ActionType } from '../../redux/ActionType';
import { useDispatch } from 'react-redux';

export default function Register() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [isErrorShown, setIsErrorShown] = useState(false);



    const onRegisterClicked = async () => {
        try {
            let isValidData = await validateRegisterInputs(firstName, userName, password, lastName);
            if (isValidData) {
                await axios.post("http://localhost:3001/users/", { firstName, lastName, password, userName });
                history.push("/login");
                setIsErrorShown(false);
            } else {
                dispatch({ type: ActionType.SendNotification, payload: { message: `Fill the required fields`, type: "danger" } });
            }
        }
        catch (e) {
            setIsErrorShown(true);
        }
    }

    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onFirstNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const onLastNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }


    const onAlreadyAMemberClicked = async () => {
        history.push("/login")
    }
    return (
        <div id="registerBackground">

            <motion.div initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }} className="registerDiv">
                <h1 className="header">Register</h1>
                <div className="registerInputs">
                    <div className="firstAndLastName">
                        <input type="text" id="firstName" name="first Name" placeholder="First name" onChange={onFirstNameChanged} /><br />
                        <input type="text" id="lastName" placeholder="Last name" onChange={onLastNameChanged} /><br />
                    </div>

                    <div className="userNameAndPassword">
                        <input type="text" id="userNameRegister" name="user Name" placeholder="User name" onChange={onUserNameChanged} /><br />
                        <input type="password" id="passwordRegister" name="password" placeholder="Password" onChange={onPasswordChanged} /><br />
                    </div>
                    {isErrorShown && <p className="errorsDiv" id="errorsParagraph">User name already exists</p>}


                </div>
                <input className="registerBtnRegister" type="button" value="Register" onClick={onRegisterClicked} />
                <div>
                    <span>Already have an account?</span>
                    <input className="loginBtnRegister" type="button" value="Login" onClick={onAlreadyAMemberClicked} />
                </div>
            </motion.div>

        </div>
    )
}
