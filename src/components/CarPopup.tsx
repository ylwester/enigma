import {IVehicle} from '../types';
import {FC} from 'react';
import {Popup} from 'react-leaflet';

interface CarPopupProps {
   vehicle: IVehicle,
}

const CarPopup: FC<CarPopupProps> = ({vehicle}) => {
    const batteryLevelStyle = {
        width: `${vehicle.batteryLevelPct}%`,
    }

   return (
       <Popup className={'popup-wrapper'}>
           <div className={'popup'}>
            <div className={"popup__header"}>
              {vehicle.name}
          </div>

          <div className={'popup__battery-percentage'}>
              <span className={'popup__battery-percentage__label'}>Bateria</span>
              <div className={"popup__battery-percentage__container"}>
                  <div className={"popup__battery-percentage__current__progress"} style={batteryLevelStyle} />
                  <span className={"popup__battery-percentage__current__text"}>{`${vehicle.batteryLevelPct}%`}</span>
              </div>
          </div>
           <div className={'popup__status'}>
               <span>{vehicle.status === 'AVAILABLE' ? 'Dostępny' : 'Niedostępny'}</span>
           </div>
           <div className={'popup__additional'}>
               <div className={'popup__additional__range'}>
                   <div className={'text-bold'}>Zasięg</div>
                   <div>{vehicle.rangeKm}km</div>
               </div>
               <div className={'popup__additional__color'}>
                   <div className={'text-bold'}>Kolor</div>
                   <div>{vehicle.color}</div>
               </div>
           </div>
           </div>
       </Popup>
   )
}

export default CarPopup;