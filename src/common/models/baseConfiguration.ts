import DamageStrictness from "./damageStrictness";
import TrickLevelConfiguration from './trickLevelConfiguration';

/**
 * Constructor params for BaseConfiguration class.
 */
export interface BaseConfigurationParams {
  trickLevel: TrickLevelConfiguration;
  damageStrictness: DamageStrictness;
}

/**
 * Base configuration class containing common/shared randomization settings.
 */
export default class BaseConfiguration {
  readonly trickLevel: TrickLevelConfiguration;
  readonly damageStrictness: DamageStrictness;

  constructor(params: BaseConfigurationParams) {
    Object.assign(params);
  }
}
