import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MultiSelectModule } from 'primeng/multiselect';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeedHistoryComponent } from './seed-history/seed-history.component';
import { RomGenerationComponent } from './rom-generation/rom-generation.component';
import { RandomizerComponent } from './randomizer/randomizer.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { RulesComponent } from './rules/rules.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GenerateGameComponent } from './generate-game/generate-game.component';
import { ImportSettingsModalComponent } from './import-settings-modal/import-settings-modal.component';
import { CustomizeSettingsModalComponent } from './customize-settings-modal/customize-settings-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SeedHistoryComponent,
    RomGenerationComponent,
    RandomizerComponent,
    GeneralSettingsComponent,
    RulesComponent,
    WelcomeComponent,
    GenerateGameComponent,
    ImportSettingsModalComponent,
    CustomizeSettingsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
