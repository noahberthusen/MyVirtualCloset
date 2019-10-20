import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ModalService } from 'src/app/services/modal.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  encodedImage: string;
  selectedFile: ImageSnippet;
  imgURL: any;
  confirmed: boolean;

  constructor( private uploadService: UploadService, private modalService: ModalService){}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  ngOnInit() {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    
    //preview image
    reader.readAsDataURL(file);

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile.file);
    });

    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

  }

  public submitImage(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    console.log("submit image");
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile.file);

      this.uploadService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        
        },
        (err) => {
        
        })
    });
  }


  public close() {
    this.modalService.destroy();
  }
  
}
