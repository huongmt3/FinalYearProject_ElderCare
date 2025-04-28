import { Status } from "./enums/status.enum";

export interface Schedule {
    id: string,
    userEmail: string,
    userFullName: string,
    profEmail: string,
    profFullName: string,
    date: string,
    time: string,
    status: Status,
}