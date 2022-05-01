import { Button, TextField } from "@mui/material";
import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios'
import EventSeatIcon from '@mui/icons-material/EventSeat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';




function BusiFly(){


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

    const [flyFrom, setFlyFrom] = useState("");
    const [flyTo, setFlyTo] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [seats, setSeats] = useState("");
    const [reservatinNr,setReservationNr] = useState("");


    //view plane useStates
    const [planeSeats,setPlaneSeats] = useState([]);
    const [takenSeats, setFreeSeats] = useState(10);
    const [flightID, setFlightID] = useState("");
    const [flightInfo,setFlightInfo] = useState({});
    const [allFlightInfo,setAllFlightInfo] = useState([])

    const handleFlyFrom = (event) => {
        setFlyFrom(event.target.value);
    };

    const handleFlyTo = (event) => {
        setFlyTo(event.target.value);
    };

    const handleDateTime = (event) => {
        setDateTime(event.target.value);
    };

    const handleSeats = (event) => {
        setSeats(event.target.value);
    };

    const handleReservationNr = (event) => {
        setReservationNr(event.target.value);
    };

    // plane seats 
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
        for(let j = 0; j < axiosResponse; j++){
            tmpSeatArray.push(j);
        }

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

    const sendCreateFlight = () => {
      
        Axios.post('http://localhost:8000/busifly/createflight', {
          flyTo: flyTo,
          flyFrom: flyFrom,
          dateTime: dateTime,
          seats: seats
      }).then(() =>{
          console.log('Create flight send to backend')
      })
    }

    const sendBookSeats = () => {
        Axios.post('http://localhost:8000/busifly/bookseats', {
          reservatinNr: reservatinNr
      }).then(() =>{
          console.log('Book seats send to backend')
      })
    }

    const getAllFlights = () => {
        setAllFlightInfo(FLIGHT_INFO_TEST_DATA)
    }

    return(
        <div className="App">
            <div className="split-screen"> 
                <div className="split-child">
                    <div className="app-body">
                        <h1> BusiFly Dashboard</h1>
                        <h2>Create flight</h2>
                    
                        <div className="fields">  
                            <TextField
                                color="primary" focused 
                                variant="outlined"
                                label="Fly from"
                                value={flyFrom}
                                onChange={handleFlyFrom}
                                sx={{ input: { color: 'white' }, width: 400 }}

                            />
                        </div>
                        <div className="fields">  
                            <TextField
                                color="primary" focused 
                                variant="outlined"
                                label="Fly To"
                                value={flyTo}
                                onChange={handleFlyTo}
                                sx={{ input: { color: 'white' }, width: 400 }}
                            />
                        </div>
                        <div className="fields">  
                            <TextField
                                color="primary" focused 
                                variant="outlined"
                                label="Date Time"
                                value={dateTime}
                                onChange={handleDateTime}
                                sx={{ input: { color: 'white' }, width: 400 }}
                            />
                        </div>
                        <div className="fields">  
                            <TextField
                                color="primary" focused 
                                variant="outlined"
                                label="Seats"
                                value={seats}
                                onChange={handleSeats}
                                sx={{ input: { color: 'white' }, width: 400 }}
                            />
                        </div>

                        <div className="fields">  
                            <Button variant="contained" endIcon={<SendIcon />} onClick={sendCreateFlight}>
                                Send flight info to Blockchain
                            </Button>
                        </div>
                    </div>
                    <div className="app-body">
                        <h2>Book Seats </h2>
                        <div className="fields">  
                                <TextField
                                    color="primary" focused 
                                    variant="outlined"
                                    label="Reservation number"
                                    value={reservatinNr}
                                    onChange={handleReservationNr}
                                    sx={{ input: { color: 'white' }, width: 400 }}

                                />
                        </div>
                        <div className="fields">  
                            <Button variant="contained" endIcon={<SendIcon />} onClick={sendBookSeats}>
                                Change reservetion state
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


export default BusiFly;