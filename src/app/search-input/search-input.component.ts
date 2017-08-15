import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { QpxService } from "../services/qpx.service";
import { ShareDataService } from "../services/share-data.service";
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
     this.shareData.getSearchRes().subscribe(res => this.searchRes = res)
    
  }

  myFilter1 = (d: Date): boolean => {
    const date = d.getTime()
    const currdate = Date.now();
    return date >= currdate
  }

  myFilter2 = (d: Date): boolean => {
     const date = d.getTime()
    const currdate = Date.now();
    return this.retDate == undefined ? date >= currdate : (date >= currdate) && (date < Number(this.retDate))
  }

  myFilter3 = (d: Date): boolean => {
    const date = d.getTime()
    const currdate = Date.now();
    return this.retDate == undefined ?  date >= currdate : date > Number(this.initDate)
  }


selectedStop1: string = '0'
selectedStop2: string = '0'


  stops = [
    {value: '0', viewValue: '0'},
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'}
  ];


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
    private _qpx:QpxService,
    private shareData: ShareDataService
    ) {
    this.tdAirports = this.airports;
    this.airportCtrl = new FormControl({ code: '', name: '' });
    this.reactiveAirports = this.airportCtrl.valueChanges
      .debounceTime(150)
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

   search1() {

    let myMoment:string = moment(this.date1).format('YYYY-MM-DD')
    console.log (myMoment)
  let body1 = {
    "request": {
      "slice": [
        {
          "origin": this.from1.code,
          "destination": this.to1.code,
          "date": myMoment,
          "maxStops": this.selectedStop1
        }
      ],
      "passengers": {
      "adultCount": 1
    },
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
                  this.shareData.postSearchRes( data )
              },
              (error) => {
                  this.errorEmitter.emit(error);
              }
          );
    }




   search2() {
let date1:string = moment(this.initDate).format('YYYY-MM-DD')
let date2:string = moment(this.retDate).format('YYYY-MM-DD')
    console.log ("date1:"+ date1)
    console.log ("date2:"+ date2)
 let body2 = {
    "request": {
      "slice": [
        {
          "origin": this.from2.code,
          "destination": this.to2.code,
          "date": date1,
          "maxStops": this.selectedStop2
        },
        {
          "origin": this.to2.code,
          "destination": this.from2.code,
          "date": date2,
          "maxStops": this.selectedStop2
        }
      ],
      "passengers": {
      "adultCount": 1
    },
      "refundable": true,
      "solutions": 10
    }
  }
  
 
      this.errorEmitter.emit(null);
      console.log('22')
      console.log(this.from2.code)
      this._qpx.getTrip(body2)
          .subscribe(
              (data) => {
                  this.searchRes=data
                  this.errorEmitter.emit(null);
                  this.shareData.postSearchRes( data )
              },
              (error) => {
                  this.errorEmitter.emit(error);
              }
          );
    }

    //post searchres into sharedata service.

}
