import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {

  queryFiled = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  //'y?fields=name,filename,version';
  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSerach() {
    let value = this.queryFiled.value;
    if (value && (value = value.trim()) !== '') {

      const fields = '?fields=name,filename,version'; 
      const params_ = {
        search: value,
        fields: fields
      }
      //para dinamico
      let params = new HttpParams(); //parecido com URLSearchParams
      params = params.set('search', value);
      params = params.set('fileds', fields);

      this.results$ = this.http.get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }
  }
}
