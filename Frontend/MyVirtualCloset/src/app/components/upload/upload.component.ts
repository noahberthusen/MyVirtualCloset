import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ModalService } from 'src/app/services/modal.service';
import { ImagesService } from 'src/app/services/images.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Tag } from 'src/app/models/Tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AppComponent } from 'src/app/app.component';
import { ArticleTypeService } from 'src/app/services/article-type.service';
import { Observable } from 'rxjs';


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
export class UploadComponent implements OnInit{
  constructor(
    private fb: FormBuilder, 
    private imagesService: ImagesService, 
    private uploadService: UploadService, 
    private modalService: ModalService,
    private articleService: ArticleTypeService
  ){}
 
  encodedImage: string;
  selectedFile: ImageSnippet;
  imgURL: any;
  confirmed: boolean;

  //form related
  userInput: FormGroup;

  //chip related
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemName: string;
  articleType: string;
  tags: Tag[];


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
    this.userInput = this.fb.group({
      itemName: ['', Validators.required],
    })
    this.articleService.currentArticleType.subscribe(articleType =>this.articleType = articleType);
    console.log("inside nginit of upload bottom: " + this.articleType);
    this.tags = [
      {name: this.articleType},
    ];
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

  get f(){
    return this.userInput.controls;
  }

  public submitImage(imageInput: any){
    console.log("inside submit image");

    //form related
    if(this.userInput.invalid){
      return;
    }
    this.itemName = this.f.itemName.value
    
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile.file);
      
      this.uploadService.uploadImage(this.selectedFile.file, this.tags, this.itemName).subscribe(
        (res) => {
        
        },
        (err) => {
        
        })
    });
  }

  //closes modal
  public close() {
    //wip to avoid two modals showing up when add button chosen
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
