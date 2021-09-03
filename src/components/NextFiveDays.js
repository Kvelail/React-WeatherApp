import { useEffect, useRef, useState } from 'react';
import days from '../static';

const NextFiveDays = ({ dets }) => {

    const [fiveDaysDets, setFiveDaysDets] = useState(null);

    const isFirstRun = useRef(true);

    useEffect(() => {

        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        const { fiveDaysDets } = dets;
        const { DailyForecasts } = fiveDaysDets;

        setFiveDaysDets(DailyForecasts);
        
    }, [dets]);

    return (
        <div className="next-five-days">
            <div className="next-five-days__head">
                <h3 className="next-five-days__heading">next 5 days</h3>
                <div className="line"></div>
            </div>
            <div className="next-five-days__center">
                { fiveDaysDets && fiveDaysDets.map((day, index) => {

                    return <div className="next-five-days__box" key={ index }>
                                <h3 className="next-five-days__day">{ days[new Date(day.Date).getDay()] }</h3>
                                <img className="next-five-days__icon" src={ `icons/${day.Day.Icon}.svg`} alt="icon" />
                                <h3 className="next-five-days__max">{ day.Temperature.Maximum.Value }&deg;C</h3>
                                <h3 className="next-five-days__min">{ day.Temperature.Minimum.Value}&deg;C</h3>
                           </div>

                })}
            </div>
        </div>
    );

}
 
export default NextFiveDays;