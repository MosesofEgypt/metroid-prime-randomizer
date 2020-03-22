import { Component, OnInit, Input } from '@angular/core';

import { SettingsSection } from '../settings-section';
import { RandomizerService } from '../../services/randomizer.service';
import { RandomizerForm } from '../../../../../common/models/randomizerForm';
import { ItemOverrides } from '../../../../../electron/models/prime/itemOverrides';

@Component({
  selector: 'app-read-only-settings-container',
  templateUrl: './read-only-settings-container.component.html',
  styleUrls: ['./read-only-settings-container.component.scss']
})
export class ReadOnlySettingsContainerComponent extends SettingsSection implements OnInit {
  @Input() private randomizerForm: RandomizerForm;

  // Constants
  readonly STATES = ItemOverrides.STATES;

  constructor(protected randomizerService: RandomizerService) {
    super(randomizerService);
  }

  ngOnInit() {
  }

  getRandomizerForm(): RandomizerForm {
    return this.randomizerForm;
  }

  getValue(name: string, section: string) {
    const value = this.randomizerForm[section][name];
    return this.getChoiceName(name, value);
  }

  getTrickName(trick: string): string {
    return this.getDetails(trick) ? this.getDetails(trick).name : trick;
  }
}
