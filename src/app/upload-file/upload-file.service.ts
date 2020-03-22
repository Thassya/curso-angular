import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }


  upload(files: Set<File>, url: string) {//ao inves do Set<File> pode ser tbm atraves do Form.value

    const formData = new FormData(); //queremos enviar um arquivo e n json mais
    files.forEach(file => { formData.append('file', file, file.name) });

    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);
    
    return this.http.post(url,formData);

  }
}
