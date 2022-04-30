
import { useNavigate } from 'react-router-dom'
import {Button} from '@mui/material'

function Home(){

    const navigate = useNavigate();
    return(
        <div className="App">
             <h1>Select login user</h1>


             <Button variant="outlined" sx={{m:1}} onClick={() => navigate("/busifly")}>
                 BusiFly 
             </Button>

             <Button variant="outlined" sx={{m:1}}  onClick={() => navigate("/econfly")}>
                 EconFly 
             </Button>

             <Button variant="outlined" sx={{m:1}} onClick={() => navigate("/gladlyabroad")}>
                 GladlyAbroad 
             </Button>

             <Button variant="outlined" sx={{m:1}} onClick={() => navigate("/client")}>
                 Client 
             </Button>
        </div>
    )
  
}


export default Home;