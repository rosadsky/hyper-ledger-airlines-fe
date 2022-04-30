
import { Button, TextField } from "@mui/material";
import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios'



function Client(){

    const [flightNr, setFlightNr] = useState("");
    const [number, setNumber] = useState("");
    const [reservationNr, setReservationNr] = useState("");
    const [passportsIDs, setPassportsIDs] = useState("");

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
        
        
        
        
    )
}


export default Client;