import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import FadeIn from 'react-fade-in';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/AppState';
import AddModal from '../addVacation/AddModal';
import imageUrl from "../../images/cloud.png"
import imageUrl2 from "../../images/cloudToLeft.png"

export default function ChartTest() {
  const [dataChart, setDataChart] = useState({});
  const isAddModalShown = useSelector((state: AppState) => state.addModalState);



  useEffect(() => {
    const fetchData = async () => {
      let followers: any = [];
      let destination: any = [];
      await axios.get("http://localhost:3001/followedVacations/").then(response => {
        for (let dataObj of response.data) {
          destination.push(dataObj.destination);
          followers.push(parseInt(dataObj.followers));
        }
      });
      setDataChart({
        labels: destination,
        datasets: [{
          label: 'Followers',
          data: followers
        }]

      });
    }

    fetchData();
  }, []);





  return (
    <div id="chartBackground">

      <div className='chartContainerAdmin'>
        <FadeIn delay={300} transitionDuration={600}>
          <h1>Followed Vacations</h1>
          <Bar options={{ backgroundColor: 'grey', barThickness: 90, borderRadius: 10, hoverBackgroundColor: "blue" }} data={dataChart} />
        </FadeIn>

      </div>
      <img src={imageUrl} className="moving-cloud-1 cloud" alt="" />
      <img src={imageUrl2} className="moving-cloud-2 cloud" alt="" />
      {(isAddModalShown && <AddModal />)}
    </div>
  )
}