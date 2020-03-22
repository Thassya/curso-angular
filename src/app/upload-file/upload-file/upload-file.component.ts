import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadFileService } from './../upload-file.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files: Set<File>;
  progress: number = 0;

  constructor(private service: UploadFileService) { }
 

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames =[];
    this.files = new Set();
    for(let i=0; i< selectedFiles.length;i++){
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML =
    fileNames.join(', ');
    this.progress = 0;
  }

  onUpload(){
    if(this.files && this.files.size > 0){
      this.service.upload(this.files, '/api/upload').pipe(
        uploadProgress(progress => {
          console.log(progress)
          this.progress = progress;
        }),
        filterResponse()
      ).subscribe(response => console.log('upload conlcuido'));
      // .subscribe((event: HttpEvent<Object>) => {
        
      //   if(event.type == HttpEventType.Response){
      //     console.log('upload concluido');
      //   }
      //   else if(event.type == HttpEventType.UploadProgress){
      //     const percentDone = Math.round((event.loaded * 100)/event.total);
      //     this.progress = percentDone;
      //   }
      //   console.log('upload concluido');
      // });

    }
  }
}
