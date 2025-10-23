import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Theme } from './services';
import { MainContainer } from '@app/shared/components/main-container';

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
  imports: [MatSlideToggleModule, MainContainer],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Settings {
  private themeService = inject(Theme);

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
