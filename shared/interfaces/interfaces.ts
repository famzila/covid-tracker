export interface ICovidStats {
    country: string;
    cases: IStats;
    deaths: IStats;
    total: number;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}

export interface IStats {
    new?: string;
    active?: number;
    critical?: number;
    recovered?: number;
    total?: number;
}