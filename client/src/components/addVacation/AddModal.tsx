import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { validateAddVacationInputs } from "../validations/Validations";
import io from 'socket.io-client';
const socket = io('http://localhost:3002');



function AddModal(props: any) {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");


  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const [price, setPrice] = useState("");

  const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  }

  const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  }

  const onImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  }


  async function fetchVacations() {
    axios.get("http://localhost:3001/vacations/")
      .then(vacationsData => {
        let vacationsArray = vacationsData.data
        socket.emit("add-vacation-from-client", vacationsArray);
      });
  }

  const scrollToBottom = () =>{ 
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth'
    }); 
  }; 

  const addHandler = async () => {
      await validateAddVacationInputs(destination, description, price, image);
      await axios.post("http://localhost:3001/vacations/", { destination, price, startDate, endDate, description, image }).then(nato =>{
        fetchVacations();
        dispatch({ type: ActionType.SendNotification, payload: { message: `You have successfully added ${destination} vacation!`, type: 'success' } });
        dispatch({ type: ActionType.SetIsAddModalShown, payload: false });

        setTimeout(() => {
          scrollToBottom();
        },1000);

      }).catch(error =>{
        console.log(error)
        dispatch({ type: ActionType.SendNotification, payload: { message: `Unable to add vacation ${error}`, type: 'danger' } });
      });
    }
  

  return (

    <div className="modalBackground">
      <div className="modalContainer animate__animated animate__backInDown">
        <div className="title">
          <h1>Add Vacation</h1>
        </div>
        <div className="body">
          <input id="destination" type="text" placeholder="Destination" onChange={onDestinationChanged} />
          <input id="description" type="text" placeholder="description" onChange={onDescriptionChanged} />
          <input id="image" type="text" placeholder="Image" onChange={onImageChanged} />

          <input id="price" type="number" placeholder="price" onChange={onPriceChanged} />

          <DatePicker
            selectsRange={true}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: any) => {
              setDateRange(update);
            }}
            dateFormat="dd/MM/yyyy"
            withPortal
          />

        </div>
        <div className="modalFooter">
          <button onClick={() => dispatch({ type: ActionType.SetIsAddModalShown, payload: false })}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={addHandler}>Add</button>
        </div>
      </div>
    </div>

  );
}

export default AddModal;

