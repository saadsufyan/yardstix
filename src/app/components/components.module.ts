import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs/graphs.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [GraphsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GraphsComponent
  ],
})
export class ComponentsModule { }
