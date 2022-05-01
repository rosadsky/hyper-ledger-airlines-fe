
import { Button, TextField } from "@mui/material";
import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios'
import EventSeatIcon from '@mui/icons-material/EventSeat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';



function Client(){

    const FLIGHT_INFO_TEST_DATA = [{
        flightNr: "123456",
        flyFrom: "VIENNA",
        flyTo: "KOSICE",
        dateTime: "10:00",
        availablePlaces: 23,
        allPlaces: 96,
        flyghtString: "BX-SDSAD"
    },
    {
        flightNr: "32423",
        flyFrom: "KOSICE",
        flyTo: "VIENNA",
        dateTime: "16:00",
        availablePlaces: 60,
        allPlaces: 21,
        flyghtString: "BX-SDSAD"
    }]

    const [flightNr, setFlightNr] = useState("");
    const [number, setNumber] = useState("");
    const [reservationNr, setReservationNr] = useState("");
    const [passportsIDs, setPassportsIDs] = useState("");

    //view plane useStates
    const [planeSeats,setPlaneSeats] = useState([]);
    const [takenSeats, setFreeSeats] = useState(10);
    const [flightID, setFlightID] = useState("");
    const [flightInfo,setFlightInfo] = useState({});
    const [allFlightInfo,setAllFlightInfo] = useState([])

    const handleFlightNr = (event) => {
        setFlightNr(event.target.value);
    };

    const handleNumber = (event) => {
        setNumber(event.target.value);
    };

    const handleReservationNr = (event) => {
        setReservationNr(event.target.value);
    };

    const handlePassportsIDs = (event) => {
        setPassportsIDs(event.target.value);
    };

     // plane seats  handlers 
     const handlePlaneSeats = (event) => {
        setPlaneSeats([])
    }

    const handleFlightID = (event) => {
        setFlightID(event.target.value)
    }

    const getFlight = () => {
        //TMP
        let axiosResponse = 90;
        let seatsArray = [];
        let tmpSeatArray = [];

        // generate array with numbers to n 
        for(let j = 0; j < axiosResponse; j++){
            tmpSeatArray.push(j);
        }

        //generate 2D array for fancy render :) 
        for(let i = 0; i < axiosResponse; i+=6){
            seatsArray.push(tmpSeatArray.slice(i,i+6))
        }

        setPlaneSeats(seatsArray);
        /*
        Axios.get("http://localhost:8000/busifly/getflight", {}).then((response) => {
           //TODO setFlightInfo()
        })
        */
    }

    const getAllFlights = () => {

        /*
        Axios.get("http://localhost:8000/busifly/getallflights").then((response) => {
           //TODO setAllFlightInfo()
        })
        */

        setAllFlightInfo(FLIGHT_INFO_TEST_DATA)
    }


    const sendReserveSeats = () => {
        Axios.post('http://localhost:8000/client/reserveseats', {
          flightNr: flightNr,
          number: number
      }).then(() =>{
          console.log('Reserve seats send to backend')
      })
    }

    const sendCheckIn = () => {
        let passportsArray = passportsIDs.split(',');
        Axios.post('http://localhost:8000/client/reserveseats', {
          reservationNr: reservationNr,
          passportsIDs: passportsArray
      }).then(() =>{
          console.log('Reserve seats send to backend')
      })
    }

    return(
       <div className="App">
           <div className="split-screen">
                <div className="split-child">
                    <div className="app-body">
                        <h1>Client Dashboard</h1>
                        <h2>ReserveSeats </h2>
                        <div className="fields">  
                                <TextField
                                    color="primary" focused 
                                    variant="outlined"
                                    label="Flight Number"
                                    value={flightNr}
                                    onChange={handleFlightNr}
                                    sx={{ input: { color: 'white' }, width: 400 }}

                                />
                        </div>
                        <div className="fields">  
                                <TextField
                                    color="primary" focused 
                                    variant="outlined"
                                    label="Number of seats"
                                    value={number}
                                    onChange={handleNumber}
                                    sx={{ input: { color: 'white' }, width: 400 }}

                                />
                        </div>
                        <div className="fields">  
                            <Button variant="contained" endIcon={<SendIcon />} onClick={sendReserveSeats}>
                                Reserve seats
                            </Button>
                        </div>
                    </div>
                    <div className="app-body">
                        <h2>Make Check In </h2>
                        <div className="fields">  
                                <TextField
                                    color="primary" focused 
                                    variant="outlined"
                                    label="Flight Number"
                                    value={reservationNr}
                                    onChange={handleReservationNr}
                                    sx={{ input: { color: 'white' }, width: 400 }}

                                />
                        </div>
                        <div className="fields">  
                                <TextField
                                    color="primary" focused 
                                    variant="outlined"
                                    label="Insert passports PP001,PP002,PP003..."
                                    value={passportsIDs}
                                    onChange={handlePassportsIDs}
                                    sx={{ input: { color: 'white' }, width: 400 }}
                                />
                        </div>
                        <div className="fields">  
                            <Button variant="contained" endIcon={<SendIcon />} onClick={sendCheckIn}>
                                Check In
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="split-child">
                    <div className="app-body">
                    <h1>All Flights view</h1>
                        <div className="fields"> 
                            <Button variant="contained" endIcon={<ListAltOutlinedIcon />} onClick={getAllFlights} >
                                    Show All flights
                            </Button>
                         </div>   
                        {allFlightInfo.map((val,index)=>{
                            return(
                                <div className="flight-info-container">
                                    <p> Flight number: {val.flightNr}</p>
                                    <p> From: {val.flyFrom}</p>
                                    <p> To: {val.flyTo}</p>
                                    <p> Time: {val.dateTime}</p>
                                    <p> Available places: {val.availablePlaces}</p>
                                </div>

                            )
                        })}

                        <h1>Flight view</h1>
                        <div className="fields"> 
                            <TextField
                                    color="primary" focused 
                                    variant="outlined"
                                    label="Insert flyght ID "
                                    value={flightID}
                                    onChange={handleFlightID}
                                    sx={{ input: { color: 'white' }, width: 400 }}

                                />
                        </div>
                        <div className="fields"> 
                            <Button variant="contained" endIcon={<VisibilityOutlinedIcon />} onClick={getFlight} >
                                    Show plane seats
                            </Button>
                         </div>

                        {planeSeats.slice(0,planeSeats.length).map((val,index)=>{
                            return(
                                <div key={index} className="row">
                                    <div key={index-111111} className="row-left">

                                        {val[0] <  takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "red" }}/>  {val[0]}  </div> }
                                        {val[0] >= takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "green" }}/>  {val[0]}  </div>}
                                        {val[1] <  takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "red" }}/>  {val[1]}  </div> }
                                        {val[1] >= takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "green" }}/>  {val[1]}  </div>}
                                        {val[2] <  takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "red" }}/>  {val[2]}  </div> }
                                        {val[2] >= takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "green" }}/>  {val[2]}  </div>}
                                    </div>
                                   <div key={index*100} className="row-right">
                                        {val[3] <  takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "red" }}/>  {val[3]}  </div> }
                                        {val[3] >= takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "green" }}/>  {val[3]}  </div>}
                                        {val[4] <  takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "red" }}/>  {val[4]}  </div> }
                                        {val[4] >= takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "green" }}/>  {val[4]}  </div>}
                                        {val[5] <  takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "red" }}/>  {val[5]}  </div> }
                                        {val[5] >= takenSeats && <div className="row-child"  key={val+3214}> <EventSeatIcon style={{ color: "green" }}/>  {val[5]}  </div>}
                                    </div>  
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
       </div>
        
        
        
        
    )
}


export default Client;