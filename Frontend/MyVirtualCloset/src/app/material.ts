import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatSlideToggleModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatExpansionModule, MatGridListModule, MatChipsModule
} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 



@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatGridListModule,
  MatChipsModule,
  MatSlideToggleModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatAutocompleteModule,
   MatExpansionModule,
   MatGridListModule,
   MatChipsModule,
   MatSlideToggleModule
  ],
})
export class MaterialModule { }