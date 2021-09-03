import dayImg from '../img/day.svg'
import nightImg from '../img/night.svg'
import { useEffect, useRef, useState } from 'react';
import NextFiveDays from "./NextFiveDays";

const CurrentDay = ({ dets }) => {

    const [fadeIn, setFadeIn] = useState(null);
    const [display, setDisplay] = useState('none');

    const [info, setInfo] = useState({
        image : null,
        town : null,
        country : null,
        message : null,
        icon : null,
        condition : null,
        temp : null,
        max : null,
        min : null
    });

    const updateUI = dets => {
        
        const { cityDets, weatherDets, fiveDaysDets } = dets;

        setInfo({
            image : weatherDets.IsDayTime ? dayImg : nightImg,
            town : cityDets.EnglishName,
            country : cityDets.Country.EnglishName,
            message : fiveDaysDets.Headline.Text,
            icon : weatherDets.WeatherIcon,
            condition : weatherDets.WeatherText,
            temp : weatherDets.Temperature.Metric.Value,
            max : fiveDaysDets.DailyForecasts[0].Temperature.Maximum.Value,
            min : fiveDaysDets.DailyForecasts[0].Temperature.Minimum.Value
        });

        setDisplay('block');
        setFadeIn('fade-in');

        setTimeout(() => {
            setFadeIn(null);
        }, 500);

    };

    const isFirstRun = useRef(true);

    useEffect(() => {

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        updateUI(dets);

    }, [dets]);
    
    return (
        <div className={ "current-day " + fadeIn } style={{ display }}>
            <div className="current-day__image" style={{ backgroundImage: `url(${ info.image })` }}>
                <h2 className="current-day__city">{ info.town }</h2>
                <h3 className="current-day__state">{ info.country }</h3>
            </div>
            <h3 className="current-day__message">{ info.message }</h3>
            <div className="current-day__current-weather">
                <img className="current-day__icon" src={`icons/${ info.icon }.svg`} alt="icon" />
                <h2 className="current-day__condition">{ info.condition }</h2>
            </div>
            <div className="current-day__current-temp">
                <div className="current-day__current-temp-head">
                    <div className="line"></div>
                    <h3 className="current-day__heading">current temperature</h3>
                </div>
                <div className="current-day__current-temp-body">
                    <h2 className="current-day__temp">{ info.temp }&deg;</h2>
                    <div className="current-day__max-min">
                        <h3 className="current-day__max">Max { info.max } &deg;C</h3>
                        <div className="current-day__underline"></div>
                        <h3 className="current-day__min">Min { info.min } &deg;C</h3>
                    </div>
                </div>
            </div>
            <NextFiveDays dets={ dets } />
        </div>
    );

}
 
export default CurrentDay;