import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IVacation } from "../../interfaces/IVacation";
import { ActionType } from "../../redux/ActionType";
import { AppState } from "../../redux/AppState";
import { FaTimes, FaPlaneArrival, FaPlaneDeparture, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Aos from "aos"
import "aos/dist/aos.css"
import imageUrl from "../../images/cloud.png"
import imageUrl2 from "../../images/cloudToLeft.png"
import ScrollToTop from 'react-scroll-up';

import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";
import EditVacation from "../editVacation/EditVacation";
import { useHistory } from "react-router-dom";
import io from 'socket.io-client';
import AddModal from "../addVacation/AddModal";
const socket = io('http://localhost:3002');


export default function Vacations() {

    const dispatch = useDispatch();
    const history = useHistory();

    const vacationsArray = useSelector((state: AppState) => state.vacations);
    const userType = useSelector((state: AppState) => state.userType);

    const [tempArrayToEdit, setTempArraytoEdit] = useState<IVacation[]>([]);
    const [tempArrayToDelete, setTempArrayToDelete] = useState<IVacation[]>([]);

    const [tempStartDate, setTempStartDate] = useState();
    const [tempEndDate, setTempEndDate] = useState();


    const [isShown, setIsShown] = useState(false);
    const [isDeleteModalShown, setDeleteModalShown] = useState(false);
    const isAddModalShown = useSelector((state: AppState) => state.addModalState);



    socket.on("add-vacation-from-server", vacationsArray => {
        dispatch({ type: ActionType.AddAllVacations, payload: vacationsArray });
        if (userType === "USER") {
            dispatch({ type: ActionType.SendNotification, payload: { message: `An admin has added vacation check it out!`, type: 'success' } });
        }
    });

    socket.on("update-vacation-from-server", vacation => {
        dispatch({ type: ActionType.UpdateVacation, payload: vacation });
        if (userType === "USER") {
            dispatch({ type: ActionType.SendNotification, payload: { message: `An admin has updated ${vacation.destination} details!`, type: 'success' } });
        }
    });

    socket.on("delete-vacation-from-server", vacationId => {
        dispatch({ type: ActionType.DeleteVacation, payload: vacationId });
        if (userType === "USER") {
            dispatch({ type: ActionType.SendNotification, payload: { message: `An admin has deleted vacation!`, type: 'danger' } });
        }
    });
  

useEffect(() => {
    Aos.init({ duration: 2000 })
}, [])

    useEffect(() => {

        const fetchVacations = () => {
            const options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            };

            fetch("http://localhost:3001/vacations/", options)
                .then(response => response.json())
                .then(data => {
                    if (data.name === 'JsonWebTokenError') {
                        dispatch({ type: ActionType.UpdateIsLogin, payload: false });
                        history.push('/login');

                        return;
                    }

                    dispatch({ type: ActionType.UpdateIsLogin, payload: true });
                    axios.defaults.headers.common["authorization"] = "Bearer " + localStorage.getItem('token');
                    dispatch({ type: ActionType.AddAllVacations, payload: data });
                })
        }

        fetchVacations();
    }, [dispatch, history]);

    const onFollowClicked = async (vacation: IVacation, e: any) => {
        let vacationId = vacation.id;

        if (e.target.innerText === "Follow") {
            dispatch({ type: ActionType.FollowVacation, payload: vacation });
            await axios.post(`http://localhost:3001/followedVacations/`, { vacationId });
        } else {
            dispatch({ type: ActionType.UnFollowVacation, payload: vacation });
            await axios.delete(`http://localhost:3001/followedVacations/`, { data: { vacationId } });
        }
    }

    const editHandler = (vacation: any) => {
        setTempStartDate(vacation.startDate);
        setTempEndDate(vacation.endDate);
        setIsShown(true);
        setTempArraytoEdit(vacation);
    }

    const deleteHandler = (vacation: any) => {
        setTempArrayToDelete(vacation)
        setDeleteModalShown(true);
    }

    let dataDelay:number = 100;

    return (
        <div className="vacationsContainer">
            <div id="nato">
                {vacationsArray.map((vacation: any, key: number) => (
                    <div key={vacation.id} id={vacation.id} data-aos="fade-right" data-aos-delay={dataDelay} className="vacation" >
                        <img width="320px" src={vacation.image} alt="" /><br></br>
                        <div className="vacationDetails">

                            <div className="vacationSpecs">
                                <h1><FaMapMarkerAlt /> {vacation.destination}</h1>
                                <div className="vacationNato">
                                    <div className="descriptionAndPrice">
                                        <span>Description: </span>

                                        <textarea disabled value={vacation.description}></textarea>
                                    </div>
                                    <div className="fromToDiv">
                                        <span><FaPlaneDeparture /> {new Date(vacation.startDate).toDateString()}</span>
                                        <span><FaPlaneArrival /> {new Date(vacation.endDate).toDateString()}</span>
                                        <span>Price: {vacation.price}$ </span>
                                    </div>
                                </div>
                                <span>Followers: {vacation.amountOfFollowers}</span>
                            </div>
                            {userType === "USER" && <div className="follow">
                                <button id="followBtn" className="followBtn" onClick={(e) => onFollowClicked(vacation, e)}> {vacation.isFollowed === "TRUE" ? "Unfollow" : "Follow"}</button>
                            </div>}
                            {userType === "ADMIN" &&
                                <div className="deleteAndEditDiv">
                                    <button id="deleteBtn" onClick={() => deleteHandler(vacation)}><FaTimes className="highlight" /></button>
                                    <button id="editBtn" onClick={() => editHandler(vacation)}><FiEdit /></button>
                                </div>}
                        </div>
                    </div>
                ))}
            </div>
             <ScrollToTop style={{right: "100px", bottom: "100px"}} showUnder={50}>
                 <div id="upButton">
                    <span><FaArrowUp color="black" size="50px"/></span>

                 </div>
             </ScrollToTop>
            <img src={imageUrl} className="moving-cloud-1 cloud" alt="" />
            <img src={imageUrl2} className="moving-cloud-2 cloud" alt="" />

            {(isAddModalShown && <AddModal />)}
            {(isDeleteModalShown && <DeleteConfirmation setDeleteModalShown={setDeleteModalShown} vacation={tempArrayToDelete} />)}
            {(isShown && <EditVacation setIsShown={setIsShown} isShown={isShown} startDate={tempStartDate} endDate={tempEndDate} vacation={tempArrayToEdit} />)}
        </div>

    )
}
