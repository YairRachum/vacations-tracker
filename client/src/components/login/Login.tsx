import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import { validateInputs } from "../validations/Validations";
import { motion } from "framer-motion"


export default function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();
    const history = useHistory();

    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onRegisterClicked = () => {
        history.push("/register")
    }

    const onLoginClicked = async () => {
        let type = "danger";

        try {
            let isValidData = await validateInputs(userName, password);
            if (isValidData) {
                const response = await axios.post("http://localhost:3001/users/login", { userName, password });
                let userData = response.data;
                axios.defaults.headers.common["authorization"] = "Bearer " + userData.token;
                localStorage.setItem("token", userData.token);
                dispatch({ type: ActionType.SetUserTypeAndName, payload: userData });
                history.push("/home");
            } else {
                dispatch({ type: ActionType.SendNotification, payload: { message: `Fill the required fields`, type } });

                return
            }

        }
        catch (e) {
            dispatch({ type: ActionType.SendNotification, payload: { message: `${e.response.data.error}`, type } });

        }
    }

    useEffect(() => {
        const checkLogIn = () => {
            const options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            };
            // check JWT token
            fetch("http://localhost:3001/users/login-check", options)
                .then(response => response.json())
                .then(res => {
                    if (res.name === 'JsonWebTokenError') {
                        dispatch({ type: ActionType.UpdateIsLogin, payload: false });
                        return;
                    }
                    history.push("/home");
                    dispatch({ type: ActionType.SetUserTypeAndName, payload: res });
                    dispatch({ type: ActionType.SendNotification, payload: { message: "Wellcome back " + res.firstName, type: "success" } });

                    dispatch({ type: ActionType.UpdateIsLogin, payload: true });
                })
                .catch(err => alert(err));
        }


        checkLogIn();
    }, [dispatch, history]);


    return (
        <div id="loginBackground">
            <motion.div initial={{ scale: 0 }}
                animate={{ rotate: -360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }} className="loginDiv">
                <h1 className="header">Login</h1>
                <div className="loginInputs">
                    <input type="text" id="userName" name="userName" placeholder="User name" onChange={onUserNameChanged} /><br />
                    <input type="password" id="password" name="password" placeholder="Password" onChange={onPasswordChanged} /><br />
                </div>
                <input className="loginBtn" type="button" value="Login" name="userName" placeholder="User name" onClick={onLoginClicked} /><br></br>
                <div>
                    <p id="errorParagraph" className="errorsParagraph"></p>
                    <span>New user?</span>
                    <input className="registerBtn" type="button" value="Register" onClick={onRegisterClicked} />
                </div>
            </motion.div>
        </div>





    )
}
