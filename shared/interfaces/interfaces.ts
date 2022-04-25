
export interface IStats {
    new?: string;
    active?: number;
    critical?: number;
    recovered?: number;
    total?: number;
}

export interface ICovidStats {
    country: string;
    cases: IStats;
    deaths: IStats;
    tests: IStats;
}

export interface GeneralStats {
    labels: string[],
    confirmedArray: number[],
    criticalArray: number[],
    deathsArray: number[],
}