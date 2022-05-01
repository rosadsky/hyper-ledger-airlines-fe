
import { useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'

function Home(){

    const loginAsBusiFly = () => {
        /*
        Axios.post("http://localhost:8000/busifly/login", {"airlineUserBS"}).then((response) => {
           //TODO setAllFlightInfo()
        })
        */
        console.log("logi as busi")
    }

    const loginAsEconFly = () => {
        /*
        Axios.post("http://localhost:8000/econfly/login", {"airlineUserEC"}).then((response) => {
           //TODO setAllFlightInfo()
        })
        */
        console.log("logi as EconFly")
    }

    const loginAsGladlyAbroad = () => {
        /*
        Axios.post("http://localhost:8000/gladlyabroad/login", {"travelagencyUser"}).then((response) => {
           //TODO setAllFlightInfo()
        })
        */
        console.log("logi as Gadly")
    }

    const loginAsClient = () => {
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
             <h1>Select login user</h1>


             <Button variant="outlined" sx={{m:1}} onClick={routeToBusiFlyAndLogin}>
                 BusiFly 
             </Button>

             <Button variant="outlined" sx={{m:1}}  onClick={routeToEconFlyAndLogin}>
                 EconFly 
             </Button>

             <Button variant="outlined" sx={{m:1}} onClick={routeToGladlyAbroadAndLogin}>
                 GladlyAbroad 
             </Button>

             <Button variant="outlined" sx={{m:1}} onClick={routeToClientAndLogin}>
                 Client 
             </Button>
        </div>
    )
  
}


export default Home;