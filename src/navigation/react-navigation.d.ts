declare module "@react-navigation/web" {
  export const Link: any;
  export const createBrowserApp: any;
}

declare module "@react-navigation/core" {
  export const createSwitchNavigator: any;
  export const NavigationActions: any;
  export const createAppContainer: any;
  export const withNavigation: any;
}

declare module "react-navigation-stack" {
  export const createStackNavigator: any;
}
declare module "react-navigation-tabs" {
  export const createBottomTabNavigator: any;
}

declare module "react-navigation" {
  export const createAppContainer: any;
  export const createStackNavigator: any;
  export const NavigationActions: any;
  export const createDrawerNavigator: any;
  export const DrawerActions: any;
}
