import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";
import 'react-clock/dist/Clock.css';
import Aos from "aos";
import "aos/dist/aos.css"
import logoUrl from "../../images/logotest.png"



export default function NavBar() {

    const [value, setValue] = useState(new Date());
    const dispatch = useDispatch();
    const firstName = useSelector((state: AppState) => state.firstName);
    const userType = useSelector((state: AppState) => state.userType);

    const history = useHistory();

    const onLogoutClicked = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    useEffect(() => {
        const interval = setInterval(
            () => setValue(new Date()),
            1000
        );
        return () => {
            clearInterval(interval);
        }
    }, []);

    const onHomeClicked = () => {
        history.push("/home")
    }

    const onAddVacationClicked = () => {
        dispatch({ type: ActionType.SetIsAddModalShown, payload: true });
    }

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const onGraphClicked = () => {
        history.push("/chart");
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
                        history.push("/login");
                        return;
                    }
                    dispatch({ type: ActionType.SetUserTypeAndName, payload: res });
                    dispatch({ type: ActionType.UpdateIsLogin, payload: true });
                    dispatch({ type: ActionType.SendNotification, payload: { message: `Wellcome back ${res.firstName}!`, type: 'success' } });
                })
                .catch(err => alert(err));
        }
        checkLogIn();
    }, [dispatch, history]);



    return (
        
        <div data-aos="fade-down" className="navBar">

            <div className="navBar">
                <img src={logoUrl} alt="" onClick={onHomeClicked} />
                <p>Hello {firstName}</p>
                <button onClick={onHomeClicked}>Home</button>


                {userType === "ADMIN" &&

                    <button onClick={onAddVacationClicked}>Add Vacation</button>
                }

                {userType === "ADMIN" &&

                    <button onClick={onGraphClicked}>Graph</button>
                }
                <button onClick={onLogoutClicked}>Logout</button>


                {<h1>{value.toLocaleDateString()}</h1>}

            </div>

        </div>

    )
}

