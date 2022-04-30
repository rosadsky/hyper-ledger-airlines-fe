import { Button, TextField } from "@mui/material";
import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios'
import EventSeatIcon from '@mui/icons-material/EventSeat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';




function BusiFly(){

    const TEST_SEATS_ARRAY = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24],[25,26,27,28,29,30],[31,32,33,34,35,36],[37,38,39,40,41,42]]

    const [flyFrom, setFlyFrom] = useState("");
    const [flyTo, setFlyTo] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [seats, setSeats] = useState("");
    const [reservatinNr,setReservationNr] = useState("");

    //sem treba naparsovať takýto 2D array shit
    const [planeSeats,setPlaneSeats] = useState([]);
    const [takenSeats, setFreeSeats] = useState(10)

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

    const handlePlaneSeats = (event) => {
        setPlaneSeats(TEST_SEATS_ARRAY)

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
                        <h1>Plane view</h1>
                        <div className="fields"> 
                            <TextField
                                    color="primary" focused 
                                    variant="outlined"
                                    label="Insert flyght ID "
                                    value={flyFrom}
                                    onChange={handleFlyFrom}
                                    sx={{ input: { color: 'white' }, width: 400 }}

                                />
                        </div>
                        <div className="fields"> 
                            <Button variant="contained" endIcon={<VisibilityOutlinedIcon />} onClick={handlePlaneSeats} >
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