import axios from "axios";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "aos/dist/aos.css"
import Aos from "aos";
import io from 'socket.io-client';
const socket = io('http://localhost:3002');

function EditVacation(props: any) {

  const dispatch = useDispatch();
  const [destination, setDestination] = useState(props.vacation.destination);
  const [description, setDescription] = useState(props.vacation.description);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateRange, setDateRange] = useState([new Date(props.vacation.startDate), new Date(props.vacation.endDate)]);
  const [startDate, endDate] = dateRange;
  const [price, setPrice] = useState(props.vacation.price)

  const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  }

  const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  }

  async function updateVacation() {
    axios.post(`http://localhost:3001/vacations/${props.vacation.id}`, { destination, description, price, startDate, endDate });
  }

  const validateInputs = (destination: any, description: any, price: any, startDate: any, endDate: any) => {
    let isValid = true;

    let tempStartDate = new Date(props.vacation.startDate);
    let tempEndDate = new Date(props.vacation.endDate);

    if (destination === props.vacation.destination && description === props.vacation.description && price === props.vacation.price && startDate.toDateString() === tempStartDate.toDateString() && endDate.toDateString() === tempEndDate.toDateString()) {
      setErrorMessage("You must change at least one input!")
      isValid = false
    }
    if (isEmptyField(price)) {
      setErrorMessage("Price cannot be empty");
      isValid = false
    }
    if (description.length < 5) {
      setErrorMessage("Your description is too short");
      isValid = false
    }
    if (isEmptyField(description)) {
      setErrorMessage("You must provide description");
      isValid = false
    }
    if (isEmptyField(destination)) {
      setErrorMessage("You must provide destination");
      isValid = false
    }
    return isValid;
  }

  function isEmptyField(field: any) {
    if (field === null || field === "") {
      return true;
    }
    return false;
  }

  async function fetchVacations() {
    let id = props.vacation.id;
    let image = props.vacation.image;
    let amountOfFollowers = props.vacation.amountOfFollowers;

    let vacation = { id, destination, description, endDate, image, startDate, price, amountOfFollowers }
    socket.emit("update-vacation-from-client", vacation);
  }

  const onApplyClicked = async () => {
    try {
      if (validateInputs(destination, description, price, startDate, endDate)) {
        await updateVacation();
        fetchVacations();
        dispatch({ type: ActionType.SendNotification, payload: { message: `You have successfully edited ${props.vacation.destination}.`, type: 'success' } });
        props.setIsShown(false);
      }
    } catch (e) {
      alert(e)
    }
  }

  const onCancelClicked = () => {
    props.setIsShown(false);
  }

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <div className="modalBackground">

      <div data-aos="fade-left" className="modalContainer animate__animated animate__backInDown">
        <div className="title">
          <h1>You are editing {props.vacation.destination}</h1>
        </div>
        <div className="body">
          <input className="editDestination" type="text" placeholder="Destination" value={destination} onChange={onDestinationChanged} />
          <input className="editDescription" type="text" placeholder="Description" value={description} onChange={onDescriptionChanged} />
          <input className="editPrice" type="number" placeholder="Price" value={price} onChange={onPriceChanged} />

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
          <div className="errorsDiv">{errorMessage}</div>
        </div>
        <div className="modalFooter">
          <button onClick={onCancelClicked} id="cancelBtn" >Cancel</button>
          <button onClick={onApplyClicked}>Apply</button>
        </div>
      </div>


    </div>

  );
}

export default EditVacation;

