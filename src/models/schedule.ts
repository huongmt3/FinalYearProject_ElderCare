import { Status } from "./enums/status.enum";

export interface Schedule {
    id: string,
    userEmail: string,
    userFullName: string,
    userAvatarUrl: string,
    profEmail: string,
    profFullName: string,
    profAvatarUrl: string,
    date: string,
    time: string,
    status: Status,
}