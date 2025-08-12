import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatchValueDirective } from '../directives/match-value.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ThemeSwitch } from './theme-switch/theme-switch';
import { AlertContainer } from './alert-container/alert-container';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';
import { InputDialog } from './input-dialog/input-dialog';
import { PreloaderComp } from './preloader-comp/preloader-comp';
import { LocalePicker } from './locale-picker/locale-picker';
import { LocaleSwitch } from './locale-switch/locale-switch';


@NgModule({
  declarations: [
    ThemeSwitch,
    AlertContainer,
    ConfirmDialog,
    InputDialog,
    PreloaderComp,
    LocalePicker,
    LocaleSwitch,
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    TranslateDirective,
    CommonModule,
    MatSlideToggleModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    TranslateDirective,
    TranslatePipe,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatDialogModule,
    MatchValueDirective,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    MatButtonToggleModule,
    MatSelectModule,
  ],
  exports: [
    TranslatePipe,
    TranslateDirective,
    MatIconModule,
    TranslateDirective,
    MatSlideToggleModule,
    TranslatePipe,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatProgressSpinnerModule,
    MatchValueDirective,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    ThemeSwitch,
    AlertContainer,
    ConfirmDialog,
    InputDialog,
    PreloaderComp,
    LocalePicker,
    LocaleSwitch,
  ]
})
export class SharedModule { }
