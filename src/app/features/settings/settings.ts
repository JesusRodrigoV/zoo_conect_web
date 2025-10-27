import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Theme } from './services';
import { MainContainer } from '@app/shared/components/main-container';
import { Enable2faDialog, Disable2faDialog } from './components';

interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  telegramEnabled: boolean;
  whatsappEnabled: boolean;
}

interface NotificationPreferences {
  newEvents: boolean;
  animalUpdates: boolean;
  quizSurveys: boolean;
  zooNews: boolean;
}

@Component({
  selector: 'zoo-settings',
  imports: [
    ToggleSwitchModule,
    FormsModule,
    MainContainer,
    Enable2faDialog,
    Disable2faDialog,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Settings {
  private themeService = inject(Theme);

  protected readonly is2FAEnabled = signal(false);
  protected readonly showEnable2FA = signal(false);
  protected readonly showDisable2FA = signal(false);

  protected readonly notificationSettings = signal<NotificationSettings>({
    pushEnabled: true,
    emailEnabled: false,
    telegramEnabled: false,
    whatsappEnabled: false,
  });

  protected readonly notificationPreferences = signal<NotificationPreferences>({
    newEvents: true,
    animalUpdates: true,
    quizSurveys: true,
    zooNews: true,
  });

  get darkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  onThemeChange(isDark: boolean): void {
    this.themeService.setTheme(isDark ? 'dark' : 'light');
  }

  protected on2FAToggle(enabled: boolean): void {
    if (enabled) {
      this.showEnable2FA.set(true);
    } else {
      this.showDisable2FA.set(true);
    }
  }

  protected on2FAEnabled(): void {
    this.is2FAEnabled.set(true);
    this.showEnable2FA.set(false);
  }

  protected on2FADisabled(): void {
    this.is2FAEnabled.set(false);
    this.showDisable2FA.set(false);
  }

  protected onEnable2FACancelled(): void {
    this.showEnable2FA.set(false);
  }

  protected onDisable2FACancelled(): void {
    this.showDisable2FA.set(false);
  }

  protected updateNotificationSetting(key: keyof NotificationSettings, value: boolean): void {
    this.notificationSettings.update(settings => ({
      ...settings,
      [key]: value
    }));
    // Aquí puedes guardar en localStorage o enviar al backend
    console.log('Notification settings updated:', this.notificationSettings());
  }

  protected updateNotificationPreference(key: keyof NotificationPreferences, value: boolean): void {
    this.notificationPreferences.update(preferences => ({
      ...preferences,
      [key]: value
    }));
    // Aquí puedes guardar en localStorage o enviar al backend
    console.log('Notification preferences updated:', this.notificationPreferences());
  }
}
