import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import FadeIn from 'react-fade-in';
import io from 'socket.io-client';
const socket = io('http://localhost:3002');

function DeleteConfirmation(props: any) {
  const dispatch = useDispatch();
  const yesHandler = async () => {
    let type = 'danger';
    try {
      props.setDeleteModalShown(false);
      socket.emit("delete-vacation-from-client", props.vacation.id);
      dispatch({ type: ActionType.SendNotification, payload: { message: `You have successfully deleted ${props.vacation.destination} vacation`, type } });
      await axios.delete(`http://localhost:3001/vacations/${props.vacation.id}`)
    }
    catch (e) {
      console.error(e)
    }
  }

  const onCancelClicked = () => {
    props.setDeleteModalShown(false);
  }

  return (
    <div className="modalBackground">
      <FadeIn transitionDuration={700} delay={200} >
        <div id="deleteModal" className="deleteModalContainer animate__animated animate__zoomInDown">
          <div className="body">
            <p>Are you sure you want to delete this vacation?</p>
          </div>
          <div className="modalFooter">
            <button onClick={onCancelClicked} id="cancelBtn">No</button>
            <button onClick={yesHandler}>Yes</button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default DeleteConfirmation;

