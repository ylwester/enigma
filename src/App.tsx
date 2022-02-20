import React, {useCallback, useEffect, useState} from 'react';
import CarMap from './components/CarMap';
import Menu from './components/Menu';
import axios from 'axios';
import {IVehicle} from './types';
import Loading from './components/Loading';


function App() {
    const [vehiclesData, setVehiclesData] = useState<IVehicle[]>();
    const [filteredData, setFilteredData] = useState<IVehicle[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({
        status: false,
        message: '',
    });
    const [filters, setFilters] = useState({
        onlyAvailable: false,
        batteryPercentage: 0,
    })

    const fetchVehicles = useCallback(async () => {
        const response = await axios.get('https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE')
        const modify = response.data.objects;
        modify[1].status = 'UNAVAILABLE';
            return modify;
    }, []);

    useEffect(() => {
        try {
            fetchVehicles().then(setVehiclesData).then(() => setIsLoading(false));
        } catch (e) {
            setError({status: true, message: "Nie udało się załadować danych."})
        }
    },[fetchVehicles]);

    useEffect(() => {
        const result = vehiclesData?.filter((vehicle) =>
            (!filters.onlyAvailable || vehicle.status === 'AVAILABLE') &&
            (!filters.batteryPercentage || vehicle.batteryLevelPct >= filters.batteryPercentage)
        );
        setFilteredData(result);
    }, [filters,vehiclesData])

  return (
    <div className="App">
        {error.status ?
            <div>
                {error.message}
            </div>
            :
            <div className={'page-wrapper'}>
            {isLoading ?
                    <Loading />
                    :
                    <div>
                        <Menu filters={filters} setFilters={setFilters} />
                        <CarMap vehiclesData={filteredData as IVehicle[]} />
                    </div>
            }
            </div>
        }
    </div>
  );
}

export default App;
