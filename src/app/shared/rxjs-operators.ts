import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap, filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';


export function filterResponse<T>(){
    return pipe(
        filter((event: HttpEvent<T>) => event.type == HttpEventType.Response),
        map((res: HttpResponse<T>)=> res.body)
    );
}

export function uploadProgress<T>(cb: (progress: number) => void){
    return tap((event: HttpEvent<T>) => {
        if(event.type == HttpEventType.UploadProgress){
            cb(Math.round((event.loaded * 100)/event.total));
        }
    });
}