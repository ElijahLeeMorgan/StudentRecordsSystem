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
export interface IGrade {
    id: string;
    year: string;
    buildingId: string;
    buildingName: string;
    createdAt: string;
}
export interface ICreateGradeDto {
    year: string;
    buildingId: string;
}
export interface IStudent {
    id: string;
    firstName: string;
    lastName: string;
    detentions: string;
    absences: string;
    emergencyContact: string;
    gpa: string;
    email: string;
    gradeID: string;
    gradeYear: string;
    createdAt: string;
}
export interface ICreateStudentDto {
    firstName: string;
    lastName: string;
    emergencyContact: string;
    email: string;
    gradeID: string;
}