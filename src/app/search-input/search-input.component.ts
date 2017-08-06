import { Component, OnInit } from '@angular/core';
import {FormControl,NgModel,ReactiveFormsModule } from '@angular/forms';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})


export class SearchInputComponent implements OnInit {
    initDate: string = ''
    retDate:string = ''
    
  ngOnInit() {
  }
    myFilter1 = (d: Date): boolean => {
    const date = d.getTime()
    const currdate = Date.now();
    // Prevent Saturday and Sunday from being selected.
    return date >= currdate
  }

   myFilter2 = (d: Date): boolean => {
    const date = d.getTime()
    const currdate = Date.now();
    // Prevent Saturday and Sunday from being selected.
    return this.retDate==''? date >= currdate : (date >= currdate) && (date < Number(this.retDate))
  }

    myFilter3 = (d: Date): boolean => {
    const date = d.getTime()
    const currdate = Date.now();
    // Prevent Saturday and Sunday from being selected.
    return date > Number(this.initDate)
  }

  airportCtrl: FormControl;
  currentAirport = '';

  reactiveAirports: any;
  tdAirports: any[];


  airports = []
    getAirport(query:string) {
        const URL = 'http://www.jetradar.com/autocomplete/places';

        let headers = new Headers();
        let search = new URLSearchParams();
        search.set('q', query);

        return this.http
            .get(URL, {
                headers: headers,
                search: search
            })
            .map( res => this.airports = res.json())    
    }
  constructor(private http:Http) {
    
    this.tdAirports = this.airports;
    this.airportCtrl = new FormControl({code: '', name: ''});
    this.reactiveAirports = this.airportCtrl.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .flatMap((text:string) => this.getAirport(text))     
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? (value.name?(value.code + '-'+ value.name):null ): null;
  }

  filterAirports(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
       return this.airports.filter(airport => airport.name.toLowerCase().startsWith(filterValue))?this.airports.filter(airport => airport.code.toLowerCase().startsWith(filterValue)):null;
    }

    return this.airports;
  }

}
