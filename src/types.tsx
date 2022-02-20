export interface IVehicle {
    address: string | null,
    batteryLevelPct: number,
    color: string,
    description: string | null,
    discriminator: string,
    id: string,
    location: {
        latitude: number,
        longitude: number,
    },
    locationDescription: string | null,
    mapColor: {
        alpha: number,
        rgb: string,
    },
    metadata: string | null,
    name: string,
    picture: {
        contentType: string | null,
        extension: string | null,
        id: string,
        name: string,
    },
    platesNumber: string,
    promotion: string | boolean | null,
    rangeKm: number,
    reservation: boolean | null,
    reservationEnd: string | null,
    sideNumber: string,
    status: string,
    type: string,
}

export interface IFilters {
    onlyAvailable: boolean,
    batteryPercentage: number,
}