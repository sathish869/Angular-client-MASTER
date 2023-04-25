import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AuxiliaryModule } from './auxiliary.module';

@NgModule({
  exports: [MaterialModule, AuxiliaryModule],
})
export class SharedModule {}
