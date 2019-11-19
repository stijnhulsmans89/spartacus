import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../../state/state.module';
import { CONFIGURATION_TEXTFIELD_FEATURE } from './configuration-textfield-state';
import { configuratorTextfieldEffects } from './effects/index';
import {
  configuratorTextfieldReducerProvider,
  configuratorTextfieldReducerToken,
} from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(
      CONFIGURATION_TEXTFIELD_FEATURE,
      configuratorTextfieldReducerToken
    ),
    EffectsModule.forFeature(configuratorTextfieldEffects),
  ],
  providers: [configuratorTextfieldReducerProvider],
})
export class ConfiguratorTextfieldStoreModule {}
