
import { useNavigate } from 'react-router-dom'
import {Button, Box} from '@mui/material'
import React, {useState} from 'react';
import Axios from 'axios';
function Home(){

    let aerolinia1 = new Audio("/aerolinie1.wav");
    let aerolinia2 = new Audio("/aerolinia2.wav");
    let cestovka = new Audio("/cestovka.wav");
    let klient = new Audio("/klient.wav");

    const [soundOn, setSoundOn] = useState(false);

    const handleSound = () => {
        setSoundOn(true)
    };

    const loginAsBusiFly = () => {

        if(soundOn){
            aerolinia1.play();
        }
        
        Axios.post("http://localhost:8080/busfly/login", {
            "nickname":"airlineUserBS"
        }).then((response) => {
            console.log(response);
        })
        
        console.log("login as busi")
    }

    const loginAsEconFly = () => {
        if(soundOn){
            aerolinia2.play();
        }
        
        Axios.post("http://localhost:8080/econfly/login", {
           "nickname":"airlineUserEC"
        }).then((response) => {
            console.log(response);
        })
        console.log("login as EconFly")
    }

    const loginAsGladlyAbroad = () => {
        if(soundOn){
            cestovka.play();
        }
        
        Axios.post("http://localhost:8080/gloadlyabroad/login", {
            "nickname":"travelagencyUser"
        }).then((response) => {
           console.log(response);
        })
        console.log("login as Gadly")
    }

    const loginAsClient = () => {
        if(soundOn){
            klient.play();
        }
        
        Axios.post("http://localhost:8080/client/login", {
            "nickname": "generalUser"}).then((response) => {
           console.log(response);
        })
        console.log("login as Client")
    }

    //routes 
    const routeToBusiFlyAndLogin = () =>{ 
        let path = `/busifly`; 
        loginAsBusiFly();
        navigate(path);
    }

    const routeToEconFlyAndLogin = () =>{ 
        let path = `/econfly`; 
        loginAsEconFly();
        navigate(path);
    }

    const routeToGladlyAbroadAndLogin = () =>{ 
        let path = `/gladlyabroad`; 
        loginAsGladlyAbroad();
        navigate(path);
    }

    const routeToClientAndLogin = () =>{ 
        let path = `/client`; 
        loginAsClient();
        navigate(path);
    }

    const navigate = useNavigate();
    return(
        <div className="App">
             <h1>Please select user</h1>
            <div className='home-grid'> 
                <div className="home-box">
                <Box component="img" sx={{ height: 250,width: 250 }}src="https://cdn.discordapp.com/attachments/955541292115431484/970345370121044069/18-184179_cute-cats-memes-cdsat-crying-meme-png-transparent.png.png"/>
                    <Button variant="contained" sx={{m:1}} onClick={routeToBusiFlyAndLogin}>
                        BusiFly 
                    </Button>
                </div>
                <div className="home-box">
                    <Box component="img" sx={{ height: 250,width: 250 }}src="https://cdn.discordapp.com/attachments/955541292115431484/970345370427207790/219-2199811_meme-cats-freetoedit-cat-meme-sticker-png-transparent.png"/>
                    <Button variant="contained" sx={{m:1}}  onClick={routeToEconFlyAndLogin}>
                        EconFly 
                    </Button>
                </div>
                <div className="home-box">
                    <Box component="img" sx={{ height: 250,width: 250 }}src="https://cdn.discordapp.com/attachments/955541292115431484/970345370708242532/280-2807229_meme-cat-hd-png-download.png"/>
                    <Button variant="contained" sx={{m:1}} onClick={routeToGladlyAbroadAndLogin}>
                        GladlyAbroad 
                    </Button>
                </div>
                <div className="home-box">
                    <Box component="img" sx={{ height: 250,width: 250 }}src="https://cdn.discordapp.com/attachments/955541292115431484/970345370959876106/png-transparent-redbubble-sdpolite-cat-meme-funny-cat-meme-thumbnail.png"/>
                    <Button variant="contained" sx={{m:1}} onClick={routeToClientAndLogin}>
                        Client 
                    </Button>
                </div>
             </div>

             <Button variant="outlined" sx={{m:1}} onClick={handleSound}>
                        sounds 
                    </Button>
        </div>
    )
  
}


export default Home;