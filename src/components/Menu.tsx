import React, {FC} from 'react';
import {IFilters} from '../types';

interface MenuProps {
    filters: IFilters,
    setFilters: React.Dispatch<React.SetStateAction<{onlyAvailable: boolean, batteryPercentage: number}>>
}

const minMaxValue = (current: number, min: number, max:number) => {
    if(current > max) return max;
    if(current < min) return min;
    return current;
}

const Menu: FC<MenuProps> = ({filters,  setFilters}) => {

    const toggleAvailability = () => setFilters({...filters, onlyAvailable: !filters.onlyAvailable});
    const handleBatteryPercentage = (percent: number) => {

        if(isNaN(percent)) {
            setFilters({...filters, batteryPercentage: 0});
        } else {
            setFilters({...filters, batteryPercentage: percent })
        }
    }

    return (
        <div className="menu">
                <div className="menu__availability">
                    <label className="menu__availability__label">
                        <input
                            type="checkbox"
                            checked={filters.onlyAvailable}
                            onChange={toggleAvailability}
                        />
                        <span>Pokaż tylko dostępne</span>
                    </label>
                </div>
            <div className={'menu__battery'}>
                <span className={'menu__battery__label'}>Bateria powyzej %</span>
                <input value={filters.batteryPercentage} onChange={(e) => handleBatteryPercentage(minMaxValue(parseInt(e.target.value), 0, 100))}
                       className={'menu__battery__input'}
                />
            </div>
        </div>
    )
}

export default Menu;