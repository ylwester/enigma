import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L, {LatLngTuple} from 'leaflet';
import { BaseIconOptions, MarkerCluster } from 'leaflet';
import vehicleIconActive from '../resources/CarIconActive.svg';
import vehicleIconDisabled from '../resources/CarIconDisabled.svg';
import {IVehicle} from '../types';
import {FC} from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import CarPopup from './CarPopup';

const carIconActive: BaseIconOptions = {
    iconUrl: vehicleIconActive,
    iconRetinaUrl: vehicleIconActive,
    iconAnchor: [20, 20],
    popupAnchor: [-3, -24],
    iconSize: [36, 24],
}

const carIconDisabled: BaseIconOptions = {
    iconUrl: vehicleIconDisabled,
    iconRetinaUrl: vehicleIconDisabled,
    iconAnchor: [20, 20],
    popupAnchor: [-3, -24],
    iconSize: [36, 24],
}

interface CarMapProps {
    vehiclesData: IVehicle[],
}

const CarMap: FC<CarMapProps> = ({vehiclesData}) => {
    const position: LatLngTuple = [52.237049, 21.017532];

    const createClusterIcon = (className :string) => (cluster: MarkerCluster) => L.divIcon({
        html: `<div class="cluster-group-icon"><div>${cluster.getChildCount()}</div></div>`,
        className: `cluster-icon ${className}`,
        iconAnchor: [20, 20],
        iconSize: [35, 27],
    });

    return (
        <div className={'map-wrapper'}>
            <MapContainer center={position} zoom={12}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                    showCoverageOnHover={false}
                    iconCreateFunction={createClusterIcon('active-icon')}
                    spiderfyDistanceMultiplier={2}>
                {
                    vehiclesData.map((vehicle) => (
                        <Marker key={vehicle.id} icon={vehicle.status === 'AVAILABLE' ? new L.Icon(carIconActive) : new L.Icon(carIconDisabled)}
                                position={[vehicle.location.latitude, vehicle.location.longitude]}>
                            <CarPopup vehicle={vehicle} />
                        </Marker>
                    ))
                }
            </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}

export default CarMap;