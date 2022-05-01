
import { useNavigate } from 'react-router-dom'
import {Button, Box} from '@mui/material'

function Home(){

    let aerolinia1 = new Audio("/aerolinie1.wav")
    let aerolinia2 = new Audio("/aerolinia2.wav")
    let cestovka = new Audio("/cestovka.wav")
    let klient = new Audio("/klient.wav")

    const loginAsBusiFly = () => {
        aerolinia1.play();
        /*
        Axios.post("http://localhost:8000/busifly/login", {"airlineUserBS"}).then((response) => {
           //TODO setAllFlightInfo()
        })
        */
        console.log("logi as busi")
    }

    const loginAsEconFly = () => {
        aerolinia2.play();
        /*
        Axios.post("http://localhost:8000/econfly/login", {"airlineUserEC"}).then((response) => {
           //TODO setAllFlightInfo()
        })
        */
        console.log("logi as EconFly")
    }

    const loginAsGladlyAbroad = () => {
        cestovka.play();
        /*
        Axios.post("http://localhost:8000/gladlyabroad/login", {"travelagencyUser"}).then((response) => {
           //TODO setAllFlightInfo()
        })
        */
        console.log("logi as Gadly")
    }

    const loginAsClient = () => {
        klient.play();
        /*
        Axios.post("http://localhost:8000/gladlyabroad/login", {"generalUser"}).then((response) => {
           //TODO setAllFlightInfo()
        })
        */
        console.log("logi as Client")
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
        </div>
    )
  
}


export default Home;