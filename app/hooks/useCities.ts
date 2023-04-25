import { Country, State, City }  from 'country-state-city';



const allState = City.getCitiesOfCountry("HU")
const formattedStates = allState?.map((city) =>({
    value: city.name,
    label: city.name,
    lat: city.latitude,
    long: city.longitude
}));

const useCities = () =>{
    const getAll = () => formattedStates;

    const getByValue = (value: string) =>{
        return formattedStates?.find((item) => item.value == value);
    }

    return {
        getAll,
        getByValue
    }
}

export default useCities