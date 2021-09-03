import { FaSearchengin } from 'react-icons/fa';
import { useState } from 'react';
import getInfo from '../forecast';

const CitySearch = ({ setDets, setWrongInput }) => {

    const [city, setCity] = useState('');
    
    const handleSubmit = e => {

        e.preventDefault();

        const fetchData = async () => {
            try {
                const data = await getInfo(city);

                if(data) {
                    setWrongInput({
                        message : null,
                        fadeIn : null
                    });

                    setDets(data);

                    setCity('');
                } else {
                    setWrongInput({
                        message : 'Wrong input, please try again.',
                        fadeIn : 'fade-in'
                    });

                    setCity('');

                    setTimeout(() => {
                        setWrongInput({
                            message : null,
                            fadeIn : null
                        });
                    }, 2000);
                    
                    return;
                }
            } catch (err) {
                console.err(err);
            }
        };
       
        fetchData();

    };


    return (
        <div className="city-search">
            <form className="city-search__form" onSubmit={ handleSubmit }>
                <input
                    className="city-search__input" 
                    type="text" 
                    placeholder="City"
                    value={ city }
                    onChange={ (e) => setCity(e.target.value) }
                />
                <button className="city-search__button" type="submit">
                    <FaSearchengin size="3rem" style={{
                        color : '#111',
                        animation : 'bounce 4s ease-in-out infinite'
                    }}/>
                </button>
            </form>
        </div>
    );

}
 
export default CitySearch;
