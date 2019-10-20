import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ModalService } from 'src/app/services/modal.service';
import { ImagesService } from 'src/app/services/images.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Tag } from 'src/app/models/Tag';

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

  //chip related
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];



  constructor( private imagesService: ImagesService, private uploadService: UploadService, private modalService: ModalService){}

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

  //closes modal
  public close() {
    this.modalService.destroy();
  }


    //chip related code
    add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
        this.tags.push({name: value.trim()
      });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tags: Tag): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  
}
