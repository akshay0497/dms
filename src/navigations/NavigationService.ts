import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const NavigationService = {
  navigate: (name: string, params?: any) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name as never, params as never);
    }
  },
  goBack: () => {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  },
}; 