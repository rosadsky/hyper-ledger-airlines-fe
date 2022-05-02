
import { Button, TextField ,Box} from "@mui/material";
import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios'
import EventSeatIcon from '@mui/icons-material/EventSeat';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { useNavigate } from 'react-router-dom'


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
    const [takenSeats, setTakeSeats] = useState();
    const [flightID, setFlightID] = useState("");
    const [flightInfo,setFlightInfo] = useState([]);
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

        const response = Axios.get(`http://localhost:8000/getFlight?id=${flightID}`)
        setFlightInfo([response.data]);
        
        //TMP
        /*
        let flight_info = [{
            allPlaces: "12",
            availablePlaces: "3",
            dateTime: "03/07/2022",
            flightNr: "BS000",
            flyFrom: "KUL",
            flyTo: "DPS"
        }]
        */

        let all_places = parseInt(flightInfo[0].allPlaces);
        let available_places = parseInt(flightInfo[0].availablePlaces);
        setTakeSeats(all_places-available_places);
        let seatsArray = [];
        let tmpSeatArray = [];

        // generate array with numbers to n 
        for(let j = 1; j <= all_places; j++){
            tmpSeatArray.push(j);
        }

        //generate 2D array for fancy render :) 
        for(let i = 0; i <= all_places; i+=6){
            seatsArray.push(tmpSeatArray.slice(i,i+6))
        }
        // setnuť aj ten jeden object ako array plz
        setPlaneSeats(seatsArray);

        
    }

    const getAllFlights = () => {
        Axios.get("http://localhost:8000/getAllFlights").then((response) => {
            setAllFlightInfo(response.data);
        })
        

        
    }
    
    // AGENCY/CLIENT FUNCTIONS 

    const sendCheckIn = () => {
        let passportsArray = passportsIDs.split(',');
        Axios.post('http://localhost:8080/client/reserveSeats', {
          reservationNr: reservationNr,
          passportsIDs: passportsArray
      }).then(() =>{
          console.log('Reserve seats send to backend')
      })
    }

    // END  AGENCY/CLIENT FUNCTIONS 

    const navigate = useNavigate();
    const routeToHome = () =>{ 
        let path = `/`; 
        navigate(path);
    }

    return(
       <div className="App">
           <div className="split-screen">
                <div className="split-child">
                    <div className="app-body">
                        <h1>Client Dashboard</h1>
                        <div className="fields">
                            <Button variant="outlined" sx={{m:1, width: 400}} onClick={routeToHome}>
                                Log out 
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
                                <div key={index+9191} className="flight-info-container">
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

                         {flightInfo.map((val,index)=>{
                            return(
                                <div key={index+9191} className="flight-info-container">
                                    <p> Flight number: {val.flightNr}</p>
                                    <p> From: {val.flyFrom}</p>
                                    <p> To: {val.flyTo}</p>
                                    <p> Time: {val.dateTime}</p>
                                    <p> Available places: {val.availablePlaces}</p>
                                </div>
                            )
                        })}

                        {planeSeats.slice(0,planeSeats.length).map((val,index)=>{
                            return(
                                <div key={index} className="row">
                                    <div key={index+4145552151} className="row-left">
                                        {val[0] <=  takenSeats && <div className="row-child"  key={val[0]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.7tv.app/emote/60fffa47878a49e54f1f3816/4x"/>{val[0]}</div> }
                                        {val[0] > takenSeats && <div className="row-child"  key={val[0]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.discordapp.com/attachments/692831684906975233/970130630950129714/779.png" />  {val[0]} </div>}
                                        {val[1] <=  takenSeats && <div className="row-child"  key={val[1]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.7tv.app/emote/60fffa47878a49e54f1f3816/4x"/> {val[1]}  </div> }
                                        {val[1] > takenSeats && <div className="row-child"  key={val[1]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.discordapp.com/attachments/692831684906975233/970130630950129714/779.png" />  {val[1]}  </div>}
                                        {val[2] <=  takenSeats && <div className="row-child"  key={val[2]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.7tv.app/emote/60fffa47878a49e54f1f3816/4x"/>  {val[2]}  </div> }
                                        {val[2] > takenSeats && <div className="row-child"  key={val[2]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.discordapp.com/attachments/692831684906975233/970130630950129714/779.png" /> {val[2]}  </div>}
                                    </div>
                                   <div key={index*100} className="row-right">
                                        {val[3] <=  takenSeats && <div className="row-child"  key={val[3]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.7tv.app/emote/60fffa47878a49e54f1f3816/4x"/>  {val[3]}  </div> }
                                        {val[3] > takenSeats && <div className="row-child"  key={val[3]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.discordapp.com/attachments/692831684906975233/970130630950129714/779.png" />  {val[3]}  </div>}
                                        {val[4] <=  takenSeats && <div className="row-child"  key={val[4]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.7tv.app/emote/60fffa47878a49e54f1f3816/4x"/>  {val[4]}  </div> }
                                        {val[4] > takenSeats && <div className="row-child"  key={val[4]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.discordapp.com/attachments/692831684906975233/970130630950129714/779.png" />  {val[4]}  </div>}
                                        {val[5] <=  takenSeats && <div className="row-child"  key={val[5]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.7tv.app/emote/60fffa47878a49e54f1f3816/4x"/>  {val[5]}  </div> }
                                        {val[5] > takenSeats && <div className="row-child"  key={val[5]}> <Box component="img" sx={{ height: 45,width: 45, }}src="https://cdn.discordapp.com/attachments/692831684906975233/970130630950129714/779.png" />  {val[5]}  </div>}
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