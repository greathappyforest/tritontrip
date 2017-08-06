import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { QpxService } from "../services/qpx.service";
import * as moment from 'moment';
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  providers: [QpxService]
})


export class SearchInputComponent implements OnInit {


    from1:any
    to1:any
    date1:any
    from2:any 
    to2:any 
    initDate: any 
    retDate:any 
    searchRes:any

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
    return this.retDate == '' ? date >= currdate : (date >= currdate) && (date < Number(this.retDate))
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
  getAirport(query: string) {
    const URL = 'http://www.jetradar.com/autocomplete/places';

    let headers = new Headers();
    let search = new URLSearchParams();
    search.set('q', query);

    return this.http
      .get(URL, {
        headers: headers,
        search: search
      })
      .map(res => this.airports = res.json())
  }
  constructor(
    private http: Http,
    private _qpx:QpxService
    ) {
    this.tdAirports = this.airports;
    this.airportCtrl = new FormControl({ code: '', name: '' });
    this.reactiveAirports = this.airportCtrl.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap((text: string) => this.getAirport(text))
      
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? (value.name ? (value.code + '-' + value.name) : null) : null;
  }

  filterAirports(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.airports.filter(airport => airport.name.toLowerCase().startsWith(filterValue)) ? this.airports.filter(airport => airport.code.toLowerCase().startsWith(filterValue)) : null;
    }
    return this.airports;
  }





  
    @Output('error') errorEmitter:EventEmitter<any> = new EventEmitter();

   search() {

    let myMoment:string = moment(this.date1).format('YYYY-MM-DD')
    console.log (myMoment)
  let body1 = {
    "request": {
      "slice": [
        {
          "origin": this.from1.code,
          "destination": this.to1.code,
          "date": myMoment
        }
      ],
      "passengers": {
      "adultCount": 1,
      "infantInLapCount": 0,
      "infantInSeatCount": 0,
      "childCount": 0,
      "seniorCount": 0
    },
      "refundable": true,
      "solutions": 10
    }
  }

 let body2 = {
    "request": {
      "slice": [
        {
          "origin": this.from2,
          "destination": this.to2,
          "date": this.initDate
        }
      ],
      "refundable": true,
      "solutions": 10
    }
  }
 let body3 = {
    "request": {
      "slice": [
        {
          "origin": this.to2,
          "destination": this.from2,
          "date": this.retDate
        }
      ],
      "refundable": true,
      "solutions": 10
    }
  }
      this.errorEmitter.emit(null);
      console.log('11')
      console.log(this.from1.code)
      this._qpx.getTrip(body1)
          .subscribe(
              (data) => {
                  this.searchRes=data
                  this.errorEmitter.emit(null);
                  console.log(this.searchRes)
              },
              (error) => {
                  this.errorEmitter.emit(error);
              }
          );
    }

}
