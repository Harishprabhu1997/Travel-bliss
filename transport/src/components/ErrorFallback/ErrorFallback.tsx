import './ErrorFallback.scss';
import Button from '@mui/material/Button';
import { Routes, Route,useLocation,useNavigate } from 'react-router-dom';


function MyFallbackComponent({ error, resetErrorBoundary }:any) {
  const navigate = useNavigate()

  const handleError=()=>{
    navigate('/Plan_a_journey')
    window.location.reload()
  }
    return (
      <div role="alert" id='errotrFallback'>
          <Button variant="contained" color="error" className='errorButton' onClick={handleError}>
        Refresh
      </Button>
       <img src={'./Logo/wrong.png'} />
      </div>
    )
  }
  export default MyFallbackComponent;