import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs/graphs.component';



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
