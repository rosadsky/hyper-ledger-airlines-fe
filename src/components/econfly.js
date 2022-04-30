import { Button, TextField } from "@mui/material";
import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios'


function EconFly(){
  
    const [flyFrom, setFlyFrom] = useState("");
    const [flyTo, setFlyTo] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [seats, setSeats] = useState("");
    const [reservatinNr,setReservationNr] = useState("");
    
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

    const sendCreateFlight = () => {
      
        Axios.post('http://localhost:8000/econfly/createflight', {
          flyTo: flyTo,
          flyFrom: flyFrom,
          dateTime: dateTime,
          seats: seats
      }).then(() =>{
          console.log('Create flight send to backend')
      })
    }

    const sendBookSeats = () => {
        Axios.post('http://localhost:8000/econfly/bookseats', {
          reservatinNr: reservatinNr
      }).then(() =>{
          console.log('Book seats send to backend')
      })
    }

    return(
        <div className="App">
            <div className="app-body">
                <h1> EconFly Dashboard</h1>
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
        

    )
}


export default EconFly;