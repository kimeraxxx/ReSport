import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    MenuComponent
  ],
  exports:[
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule

  ]
})
export class ComponentsModule { }
