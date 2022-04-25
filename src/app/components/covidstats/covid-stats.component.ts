import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { GeneralStats, ICovidStats } from 'shared/interfaces/interfaces';
@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.css']
})
export class CovidStatsComponent implements OnInit {

  @Input() countries: string[]= [];
  @Input() stats: Array<{name: string, count: string}> | undefined;
  @Input() generalStats: GeneralStats = {
    labels: [],
    confirmedArray: [],
    criticalArray: [],
    deathsArray: [],
  };
  @Output() selectedCountry = new EventEmitter<string>();
  
  title: string= "Covid Stats";
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  
  /**
   * Set the current selected country
   * @param event the autocomplete event
   */
  getSelectedCountry(event: MatAutocompleteSelectedEvent) {
    const country= event.option.value;
    this.selectedCountry.emit(country);
  }

  /**
   * Filter the autocomplete list based on the typed text
   * @param value  typed text
   * @returns a filtered list
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if(filterValue === ""){
      this.selectedCountry.emit(filterValue);
    }
    return this.countries.filter(country => country.toLowerCase().includes(filterValue));
  }
}