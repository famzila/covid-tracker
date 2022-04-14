import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { map, Observable, startWith } from 'rxjs';
import { ICovidStats } from 'shared/interfaces/interfaces';
import { DataService } from 'shared/services/data.service';

@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.css']
})
export class CovidStatsComponent implements OnInit {
  // @ViewChild('selectedOption') selectedOption: ElementRef;

  title: string= "Covid Stats";
  countries: string[]= [];
  stats: any;
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.getCountries();
    // this.getCovidStats();
  }

  getCountries() {
    this.dataService.getCountries()
        .subscribe((countries: any) => {
          this.countries = countries.response;
        },
        (err: any) => console.error(err),
        () => console.log("Done fetching countries"));
  }

  getCovidStats() {
    this.dataService.getCovidStats()
        .subscribe((response: ICovidStats[]) => {
          this.stats = response;
        },
        (err: any) => console.error(err),
        () => console.log('getCovidStats() retrieved stats'))
  }
  
  getSelectedCountry(country: MatAutocompleteSelectedEvent) {
    console.log(country.option.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // console.log(this.selectedOption.nativeElement.value);
    return this.countries.filter(country => country.toLowerCase().includes(filterValue));
  }
}