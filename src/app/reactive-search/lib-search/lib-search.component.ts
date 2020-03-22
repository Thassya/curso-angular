import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, filter, map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {

  queryFiled = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = '?fields=name,filename,version'; 
  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   this.results$ =  this.queryFiled.valueChanges.pipe(
     map(value => value.trim()),
     filter(value => value.length > 3),
     debounceTime(200),
     distinctUntilChanged(),     
     switchMap(value => this.http.get(this.SEARCH_URL,{
       params: {
         search: value,
         fields: this.FIELDS
       }
     })),
     tap((res:any) => this.total = res.total),
     map((res:any)=> res.results)
   );
  }

  onSerach() {
    let value = this.queryFiled.value;
    if (value && (value = value.trim()) !== '') {

     
      const params_ = {
        search: value,
        fields: this.FIELDS
      }
      //para dinamico
      let params = new HttpParams(); //parecido com URLSearchParams
      params = params.set('search', value);
      params = params.set('fileds', this.FIELDS);

      this.results$ = this.http.get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }
  }
}
