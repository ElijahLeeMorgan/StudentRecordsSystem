export interface IBuilding {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    createdAt: string;
}
export interface ICreateBuildingDto {
    name: string;
    address: string;
    phoneNumber: string;
}