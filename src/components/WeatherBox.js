import CitySearch from "./CitySearch"
import CurrentDay from "./CurrentDay"
import { useState } from 'react';

const WeatherBox = () => {
    
    const [dets, setDets] = useState(null);
    const [wrongInput, setWrongInput] = useState({
        message : null,
        fadeIn : null
    });

    return (
        <div className="weather-box">
            <CitySearch setDets={ setDets} setWrongInput={ setWrongInput }/>
            { wrongInput && <div className={ 'wrong-input ' + wrongInput.fadeIn}>{ wrongInput.message }</div>}
            <CurrentDay dets={ dets } />
        </div>
    );
    
}
 
export default WeatherBox;