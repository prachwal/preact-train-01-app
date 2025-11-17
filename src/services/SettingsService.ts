import { signal, computed, effect } from '@preact/signals';

/**
 * Settings state management service using Preact signals
 * Handles all user preferences with localStorage persistence
 */

// ===== GENERAL SETTINGS =====
export const languageSignal = signal<string>('en');
export const timezoneSignal = signal<string>('auto');

// ===== APPEARANCE SETTINGS =====
// Theme is already managed by ThemeProvider
export const fontSizeSignal = signal<'small' | 'medium' | 'large'>('medium');
export const compactModeSignal = signal<boolean>(false);

// ===== NOTIFICATIONS SETTINGS =====
export const emailNotificationsSignal = signal<boolean>(true);
export const desktopNotificationsSignal = signal<boolean>(false);
export const weeklySummarySignal = signal<boolean>(true);
export const pushNotificationsSignal = signal<boolean>(false);
export const notificationSoundSignal = signal<boolean>(true);

// ===== PRIVACY SETTINGS =====
export const profileVisibilitySignal = signal<'public' | 'private'>('public');
export const activityTrackingSignal = signal<boolean>(true);
export const dataSharingSignal = signal<boolean>(false);

// ===== ADVANCED SETTINGS =====
export const developerModeSignal = signal<boolean>(false);
export const betaFeaturesSignal = signal<boolean>(false);
export const debugLoggingSignal = signal<boolean>(false);
export const experimentalUISignal = signal<boolean>(false);

// ===== COMPUTED VALUES =====
/**
 * Check if any notifications are enabled
 */
export const hasNotificationsEnabled = computed(
  () =>
    emailNotificationsSignal.value ||
    desktopNotificationsSignal.value ||
    pushNotificationsSignal.value
);

/**
 * Check if advanced features are active
 */
export const hasAdvancedFeatures = computed(
  () =>
    developerModeSignal.value ||
    betaFeaturesSignal.value ||
    debugLoggingSignal.value
);

// ===== LOCALSTORAGE KEYS =====
const STORAGE_PREFIX = 'pta_settings_';
const STORAGE_KEYS = {
  language: `${STORAGE_PREFIX}language`,
  timezone: `${STORAGE_PREFIX}timezone`,
  fontSize: `${STORAGE_PREFIX}fontSize`,
  compactMode: `${STORAGE_PREFIX}compactMode`,
  emailNotifications: `${STORAGE_PREFIX}emailNotifications`,
  desktopNotifications: `${STORAGE_PREFIX}desktopNotifications`,
  weeklySummary: `${STORAGE_PREFIX}weeklySummary`,
  pushNotifications: `${STORAGE_PREFIX}pushNotifications`,
  notificationSound: `${STORAGE_PREFIX}notificationSound`,
  profileVisibility: `${STORAGE_PREFIX}profileVisibility`,
  activityTracking: `${STORAGE_PREFIX}activityTracking`,
  dataSharing: `${STORAGE_PREFIX}dataSharing`,
  developerMode: `${STORAGE_PREFIX}developerMode`,
  betaFeatures: `${STORAGE_PREFIX}betaFeatures`,
  debugLogging: `${STORAGE_PREFIX}debugLogging`,
  experimentalUI: `${STORAGE_PREFIX}experimentalUI`,
};

// ===== PERSISTENCE EFFECTS =====
/**
 * Save settings to localStorage on change
 */
if (typeof window !== 'undefined') {
  // General
  effect(() => {
    localStorage.setItem(STORAGE_KEYS.language, languageSignal.value);
  });
  effect(() => {
    localStorage.setItem(STORAGE_KEYS.timezone, timezoneSignal.value);
  });

  // Appearance
  effect(() => {
    localStorage.setItem(STORAGE_KEYS.fontSize, fontSizeSignal.value);
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.compactMode,
      String(compactModeSignal.value)
    );
  });

  // Notifications
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.emailNotifications,
      String(emailNotificationsSignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.desktopNotifications,
      String(desktopNotificationsSignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.weeklySummary,
      String(weeklySummarySignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.pushNotifications,
      String(pushNotificationsSignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.notificationSound,
      String(notificationSoundSignal.value)
    );
  });

  // Privacy
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.profileVisibility,
      profileVisibilitySignal.value
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.activityTracking,
      String(activityTrackingSignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.dataSharing,
      String(dataSharingSignal.value)
    );
  });

  // Advanced
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.developerMode,
      String(developerModeSignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.betaFeatures,
      String(betaFeaturesSignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.debugLogging,
      String(debugLoggingSignal.value)
    );
  });
  effect(() => {
    localStorage.setItem(
      STORAGE_KEYS.experimentalUI,
      String(experimentalUISignal.value)
    );
  });
}

// ===== INITIALIZATION =====
/**
 * Load settings from localStorage on app start
 */
export const initializeSettings = (): void => {
  if (typeof window === 'undefined') return;

  // General
  const language = localStorage.getItem(STORAGE_KEYS.language);
  if (language) languageSignal.value = language;

  const timezone = localStorage.getItem(STORAGE_KEYS.timezone);
  if (timezone) timezoneSignal.value = timezone;

  // Appearance
  const fontSize = localStorage.getItem(STORAGE_KEYS.fontSize) as
    | 'small'
    | 'medium'
    | 'large'
    | null;
  if (fontSize) fontSizeSignal.value = fontSize;

  const compactMode = localStorage.getItem(STORAGE_KEYS.compactMode);
  if (compactMode) compactModeSignal.value = compactMode === 'true';

  // Notifications
  const emailNotifications = localStorage.getItem(
    STORAGE_KEYS.emailNotifications
  );
  if (emailNotifications !== null)
    emailNotificationsSignal.value = emailNotifications === 'true';

  const desktopNotifications = localStorage.getItem(
    STORAGE_KEYS.desktopNotifications
  );
  if (desktopNotifications !== null)
    desktopNotificationsSignal.value = desktopNotifications === 'true';

  const weeklySummary = localStorage.getItem(STORAGE_KEYS.weeklySummary);
  if (weeklySummary !== null)
    weeklySummarySignal.value = weeklySummary === 'true';

  const pushNotifications = localStorage.getItem(
    STORAGE_KEYS.pushNotifications
  );
  if (pushNotifications !== null)
    pushNotificationsSignal.value = pushNotifications === 'true';

  const notificationSound = localStorage.getItem(
    STORAGE_KEYS.notificationSound
  );
  if (notificationSound !== null)
    notificationSoundSignal.value = notificationSound === 'true';

  // Privacy
  const profileVisibility = localStorage.getItem(
    STORAGE_KEYS.profileVisibility
  ) as 'public' | 'private' | null;
  if (profileVisibility) profileVisibilitySignal.value = profileVisibility;

  const activityTracking = localStorage.getItem(STORAGE_KEYS.activityTracking);
  if (activityTracking !== null)
    activityTrackingSignal.value = activityTracking === 'true';

  const dataSharing = localStorage.getItem(STORAGE_KEYS.dataSharing);
  if (dataSharing !== null) dataSharingSignal.value = dataSharing === 'true';

  // Advanced
  const developerMode = localStorage.getItem(STORAGE_KEYS.developerMode);
  if (developerMode !== null)
    developerModeSignal.value = developerMode === 'true';

  const betaFeatures = localStorage.getItem(STORAGE_KEYS.betaFeatures);
  if (betaFeatures !== null) betaFeaturesSignal.value = betaFeatures === 'true';

  const debugLogging = localStorage.getItem(STORAGE_KEYS.debugLogging);
  if (debugLogging !== null) debugLoggingSignal.value = debugLogging === 'true';

  const experimentalUI = localStorage.getItem(STORAGE_KEYS.experimentalUI);
  if (experimentalUI !== null)
    experimentalUISignal.value = experimentalUI === 'true';
};

// ===== UTILITY FUNCTIONS =====
/**
 * Reset all settings to defaults
 */
export const resetSettings = (): void => {
  // General
  languageSignal.value = 'en';
  timezoneSignal.value = 'auto';

  // Appearance
  fontSizeSignal.value = 'medium';
  compactModeSignal.value = false;

  // Notifications
  emailNotificationsSignal.value = true;
  desktopNotificationsSignal.value = false;
  weeklySummarySignal.value = true;
  pushNotificationsSignal.value = false;
  notificationSoundSignal.value = true;

  // Privacy
  profileVisibilitySignal.value = 'public';
  activityTrackingSignal.value = true;
  dataSharingSignal.value = false;

  // Advanced
  developerModeSignal.value = false;
  betaFeaturesSignal.value = false;
  debugLoggingSignal.value = false;
  experimentalUISignal.value = false;
};

/**
 * Export all settings as JSON
 */
export const exportSettings = (): string => {
  return JSON.stringify(
    {
      general: {
        language: languageSignal.value,
        timezone: timezoneSignal.value,
      },
      appearance: {
        fontSize: fontSizeSignal.value,
        compactMode: compactModeSignal.value,
      },
      notifications: {
        email: emailNotificationsSignal.value,
        desktop: desktopNotificationsSignal.value,
        weeklySummary: weeklySummarySignal.value,
        push: pushNotificationsSignal.value,
        sound: notificationSoundSignal.value,
      },
      privacy: {
        profileVisibility: profileVisibilitySignal.value,
        activityTracking: activityTrackingSignal.value,
        dataSharing: dataSharingSignal.value,
      },
      advanced: {
        developerMode: developerModeSignal.value,
        betaFeatures: betaFeaturesSignal.value,
        debugLogging: debugLoggingSignal.value,
        experimentalUI: experimentalUISignal.value,
      },
    },
    null,
    2
  );
};

/**
 * Import settings from JSON
 */
export const importSettings = (json: string): void => {
  try {
    const data = JSON.parse(json);

    // General
    if (data.general?.language) languageSignal.value = data.general.language;
    if (data.general?.timezone) timezoneSignal.value = data.general.timezone;

    // Appearance
    if (data.appearance?.fontSize)
      fontSizeSignal.value = data.appearance.fontSize;
    if (data.appearance?.compactMode !== undefined)
      compactModeSignal.value = data.appearance.compactMode;

    // Notifications
    if (data.notifications?.email !== undefined)
      emailNotificationsSignal.value = data.notifications.email;
    if (data.notifications?.desktop !== undefined)
      desktopNotificationsSignal.value = data.notifications.desktop;
    if (data.notifications?.weeklySummary !== undefined)
      weeklySummarySignal.value = data.notifications.weeklySummary;
    if (data.notifications?.push !== undefined)
      pushNotificationsSignal.value = data.notifications.push;
    if (data.notifications?.sound !== undefined)
      notificationSoundSignal.value = data.notifications.sound;

    // Privacy
    if (data.privacy?.profileVisibility)
      profileVisibilitySignal.value = data.privacy.profileVisibility;
    if (data.privacy?.activityTracking !== undefined)
      activityTrackingSignal.value = data.privacy.activityTracking;
    if (data.privacy?.dataSharing !== undefined)
      dataSharingSignal.value = data.privacy.dataSharing;

    // Advanced
    if (data.advanced?.developerMode !== undefined)
      developerModeSignal.value = data.advanced.developerMode;
    if (data.advanced?.betaFeatures !== undefined)
      betaFeaturesSignal.value = data.advanced.betaFeatures;
    if (data.advanced?.debugLogging !== undefined)
      debugLoggingSignal.value = data.advanced.debugLogging;
    if (data.advanced?.experimentalUI !== undefined)
      experimentalUISignal.value = data.advanced.experimentalUI;
  } catch (error) {
    console.error('Failed to import settings:', error);
  }
};
