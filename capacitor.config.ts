import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ageCalculater',
  webDir: 'www',
    plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // splash screen duration in ms
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerColor: '#999999'
    }
  }
};

export default config;
