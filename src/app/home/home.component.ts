import { Component, OnInit } from '@angular/core';
import { DataService } from 'shared/services/data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  selectedCountry: string = "";
  countries: string[]= [];
  stats: Array<{name: string, count: string}> | undefined;
  generalStats: any = {
    labels: [],
    confirmedArray: [],
    criticalArray: [],
    deathsArray: [],
  }


  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.getCountries();
    this.getCovidStatsAll();
  }


  /** Get countries list for the autocomplete input */
  getCountries() {
    this.dataService.getCountries()
        .subscribe((countries: any) => {
          this.countries = countries.response;
        },
        (err: any) => console.error(err),
        () => console.log("Done fetching countries"));
  }

  /**
   * Get covid stats by country
   * @param country the selected country
   */
  getCovidStatsByCountry(country: string) {
    if(this.selectedCountry !== country){
        this.selectedCountry = country;
        if(country !== ""){
              this.dataService.getCovidStatsByCountry(country)
                  .subscribe((data: any) => {
                    const response = data?.response[0];
                    const stats = {
                      country: country,
                      cases: response?.cases,
                      deaths: response?.deaths,
                      tests: response?.tests,
                    }
                    this.stats = [
                      {name: "Confirmed cases", count: stats?.cases?.new},
                      {name: "Recovered cases", count: `${stats?.cases?.recovered}`},
                      {name: "Deaths cases", count: `${stats?.deaths?.total}`},
                      {name: "Active cases", count: `${stats?.cases?.active}`},
                    ];

                    this.generalStats= {
                      labels: [country],
                      confirmedArray: [Number(stats?.cases?.new?.replace("+",""))],
                      criticalArray: [stats?.cases?.critical],
                      deathsArray: [stats?.deaths?.total],
                    }
                  },
                  (err: any) => console.error(err),
                  () => console.log('getCovidStats() retrieved stats'))
        }else{
          this.stats = undefined;
          this.getCovidStatsAll();
        }
    }
  }

  /**
   * Get covid stats for all countries
   */
  getCovidStatsAll() {
    this.dataService.getCovidStats()
        .subscribe((data: any) => {
          const stats = data?.response;
          const labels= [];
          const confirmed= [];
          const critical= [];
          const deaths= [];
          for (const key in stats) {
            if (Object.prototype.hasOwnProperty.call(stats, key)) {
              const element = stats[key];
              if(element?.cases?.new && element?.cases?.critical && element?.deaths?.total && element.country !== "All"){

                labels.push(element.country);
                confirmed.push(Number(element?.cases?.new?.replace("+","")))
                critical.push(element?.cases?.critical)
                deaths.push(element?.deaths?.total)
              }
            }
          }

          this.generalStats= {
            labels: labels,
            confirmedArray: confirmed,
            criticalArray: critical,
            deathsArray: deaths,
          }
          console.log(this.generalStats);
        },
        (err: any) => console.error(err),
        () => console.log('getCovidStatsAll() retrieved stats'))
  }

}
