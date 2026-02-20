import { User } from "./auth";

export type Charger = {
    id: string;
    chargerId: number;
    description: string;
    status: string;
    currentRentalRecord: ChargerRentalRecord | null;
};

export type ChargerRentalRecord = {
    id: string;
    chargerId: number;
    isReturned: boolean;
    borrower: User;
    reviewer: User;
    deadline: string;
    createdAt: string;
    returnedAt: string | null;
};
