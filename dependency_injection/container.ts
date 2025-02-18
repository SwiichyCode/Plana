import { createContainer } from '@evyweb/ioctopus';

import { createMonitoringModule } from './modules/monitoring.module';
import { createProjectModule } from './modules/project.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

export const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('ProjectModule'), createProjectModule());
ApplicationContainer.load(Symbol('MonitoringModule'), createMonitoringModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
