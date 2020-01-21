import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { filterProperties } from '../utilities';
import { SavePresetModalComponent } from '../save-preset-modal/save-preset-modal.component';
import { RemovePresetModalComponent } from '../remove-preset-modal/remove-preset-modal.component';
import { RandomizerService } from '../services/randomizer.service';
import { PresetsService } from '../services/presets.service';
import { PresetObject } from '../../../../common/models/presetObject';
import { RandomizerForm } from '../../../../common/models/randomizerForm';
import { GeneratorService } from '../services/generator.service';

@Component({
  selector: 'app-generate-game',
  templateUrl: './generate-game.component.html',
  styleUrls: ['./generate-game.component.scss']
})
export class GenerateGameComponent implements OnInit {
  @ViewChild(SavePresetModalComponent, { static: false }) private savePresetModal: SavePresetModalComponent;
  @ViewChild(RemovePresetModalComponent, { static: false }) private removePresetModal: RemovePresetModalComponent;
  private presets: PresetObject = {};
  private userPresets: PresetObject;
  private form: FormGroup;

  // Constants
  private readonly CUSTOM_PRESET = 'Custom';

  constructor(private generatorService: GeneratorService, private randomizerService: RandomizerService, private presetsService: PresetsService) { }

  ngOnInit() {
    this.form = this.randomizerService.createForm();
    this.presetsService.getAllPresets();
    this.onValueChanges();

    // Only subscribe when both presets propagate new values
    combineLatest(this.presetsService.defaultPresets$, this.presetsService.userPresets$)
      .subscribe(([defaultPresets, userPresets]) => {
        if (defaultPresets && userPresets) {
          this.userPresets = userPresets;
          this.buildPresets([defaultPresets, userPresets]);
        }
      });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getPresets() {
    return this.presets;
  }

  getUserPresets() {
    return this.userPresets;
  }

  getPresetValue() {
    return this.form.get('preset').value;
  }

  getPresetsDropdown(): string[] {
    return ['Custom', ...Object.keys(this.presets)];
  }

  setCustomPreset(): void {
    this.form.patchValue({ preset: this.CUSTOM_PRESET });
  }

  isCustomPreset(): boolean {
    return this.getPresetValue() === this.CUSTOM_PRESET;
  }

  isProtectedPreset(): boolean {
    const preset = this.presets[this.getPresetValue()];

    if (!preset) {
      return false;
    }

    return !this.isCustomPreset() && preset.hasOwnProperty('protected');
  }

  isUserPreset(): boolean {
    return !(this.isProtectedPreset() || this.isCustomPreset());
  }

  // Watch for changes on specific controls
  onValueChanges(): void {
    this.form.get('preset').valueChanges.subscribe(value => {
      if (!this.isCustomPreset()) {
        this.applyPresetToForm(this.presets[value]);
      }
    })
  }

  applyPresetToForm(preset: RandomizerForm): void {
    const fb = new FormBuilder();
    const formValue = this.form.value;

    // Apply general settings
    this.form.patchValue({
      romSettings: preset.romSettings,
      rules: preset.rules
    });

    // Apply array controls
    for (let control of Object.keys(preset)) {
      if (Array.isArray(formValue[control])) {
        this.form.setControl(control, fb.array(preset[control] || []));
      }
    }
  }

  openSavePresetModal(presets: PresetObject): void {
    this.savePresetModal.setPresetsObjectAndOpen(presets);
  }

  openRemovePresetModal(preset: string): void {
    this.removePresetModal.setPresetAndOpen(preset);
  }

  addOrUpdatePreset(name: string): void {
    const preset = filterProperties(this.form.value, ['preset', 'generationCount']);
    this.presetsService.addOrUpdatePreset(name, preset as RandomizerForm);
  }

  removePreset(name: string): void {
    this.presetsService.removePreset(name);
    this.form.patchValue({ preset: this.randomizerService.DEFAULT_PRESET });
  }

  generateSeed(spoiler: boolean) {
    this.generatorService.generateGame(this.form.value, spoiler);
  }

  private buildPresets(presets: PresetObject[]): void {
    this.presets = {};

    // Iterate through the presets array
    for (let preset of presets) {
      // Add the keys from each preset to the final preset object
      for (let key of Object.keys(preset)) {
        this.presets[key] = preset[key];
      }
    }
  }
}
