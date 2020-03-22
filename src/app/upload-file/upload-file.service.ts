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
    
    return this.http.post(url,formData,{
      observe: 'events',
      reportProgress: true
    });
  }

  download(url: string){
    return this.http.get(url, {
      responseType: 'blob' as 'json',
      //reportProgress //para setar o reportprogress do downlaod o servidor precisa setar no header o content-length do arquivo pois o angular nao tem bola de cristal
      
    });
  }

  handleFile(res: any, fileName: string){
    const file = new Blob([res], {
      type: res.type
    });

    //IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    //Firefox link.click(); nao funciona.... substituir por:
    // link.dispatchEvent(new MouseEvent('click',{
    //   bubbles: true,
    //   cancelable: true,
    //   view: window
    // }));
    // setTimeout(()=>{
    //   window.URL.revokeObjectURL(blob);
    //   link.remove();
    // }, 100); ///tbm precisa desse delay pra remover o link. se nao n remove... 

    //inicio Chrome
    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a'); //gambiarra do click 
    link.href = blob;
    link.download = fileName;
    //link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100); //CODIGO que funciona com Firefox e com Chrome
  }
}
