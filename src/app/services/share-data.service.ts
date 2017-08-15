import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class ShareDataService {
  private searchResult = new Subject<any>();

  postSearchRes(data: any) {
      this.searchResult.next(data);
      console.log(this.searchResult)
  }

  getSearchRes(): Observable<any> {
        return this.searchResult.asObservable();
  }




}