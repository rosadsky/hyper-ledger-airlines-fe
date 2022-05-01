import { Button, TextField, Box } from "@mui/material";
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';





function BusiFly(){

    const FLIGHT_INFO_TEST_DATA = [
        {
        allPlaces: "12",
        availablePlaces: "12",
        dateTime: "03/07/2022",
        flightNr: "BS000",
        flyFrom: "KUL",
        flyTo: "DPS"
    },
    {
        allPlaces: "120",
        availablePlaces: "120",
        dateTime: "30/06/2022",
        flightNr: "BS001",
        flyFrom: "VIE",
        flyTo: "AUH"
    }]

    const HEHE_LINK = "https://cdn.7tv.app/emote/60fffa47878a49e54f1f3816/4x"
    const NOT_HEHE_LINK = "https://cdn.discordapp.com/attachments/692831684906975233/970130630950129714/779.png"

    const [flyFrom, setFlyFrom] = useState("");
    const [flyTo, setFlyTo] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [seats, setSeats] = useState("");
    const [reservatinNr,setReservationNr] = useState("");


    //view plane useStates
    const [planeSeats,setPlaneSeats] = useState([]);
    const [takenSeats, setTakeSeats] = useState();
    const [flightID, setFlightID] = useState("");
    const [flightInfo,setFlightInfo] = useState([]);
    const [allFlightInfo,setAllFlightInfo] = useState([])


    // handlers 
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

    // plane seats  handlers 
    const handlePlaneSeats = (event) => {
        setPlaneSeats([])
    }

    const handleFlightID = (event) => {
        setFlightID(event.target.value)
    }

    // axios functions

    const getFlight = () => {
        //TMP
        let flight_info = [{
            allPlaces: "12",
            availablePlaces: "3",
            dateTime: "03/07/2022",
            flightNr: "BS000",
            flyFrom: "KUL",
            flyTo: "DPS"
        }]

        let all_places = parseInt(flight_info[0].allPlaces);
        let available_places = parseInt(flight_info[0].availablePlaces);
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
        setFlightInfo(flight_info)
        setPlaneSeats(seatsArray);
        /*
        Axios.get("http://localhost:8000/busifly/getflight", { params: { id: flightID }})
        .then((response) => {
           //TODO setFlightInfo()
        })
        */
    }

    const getAllFlights = () => {
        Axios.get("http://localhost:8000/busifly/getallflights").then((response) => {
           //TODO setAllFlightInfo()
        })
        

        setAllFlightInfo(FLIGHT_INFO_TEST_DATA)
    }


    // AIRLINE FUNCTIONS 

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
          console.log('Book seats send to backend');
      })
    }

    // END AIRLINE FUNCTIONS 

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
                        <h1> BusiFly Dashboard</h1>
                        <div className="fields">
                            <Button variant="outlined" sx={{m:1, width: 400}} onClick={routeToHome}>
                                Log out 
                            </Button>
                        </div>
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


export default BusiFly;