import { Status } from "./enums/status.enum";

export interface Schedule {
    id: string,
    userEmail: string,
    userFullName: string,
    userAvatarUrl: string,
    profEmail: string,
    profFullName: string,
    profAvatarUrl: string,
    dateTime: string,
    date: string,
    time: string,
    status: Status,
}