import { DefaultManager, IDefaultManagerSettings } from './default-manager';

interface IIconLibraryManagerSettings extends IDefaultManagerSettings {
  folder: string;
  activeIcon: string;
}
export class IconLibraryManager extends DefaultManager {
  settings: IIconLibraryManagerSettings;

  applySettings(settings: Dictionary<any>) {
    if (settings.activeIcon !== this.settings.activeIcon) {
      this.obsSource.update({
        file: settings.activeIcon,
      });
    }

    super.applySettings({ ...this.settings, ...settings });
  }
}
