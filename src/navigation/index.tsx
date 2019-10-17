import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useLinking,
  NavigationNativeContainer
} from "@react-navigation/native";
import {
  NavigationContainerRef,
  getStateFromPath
} from "@react-navigation/core";
import { AsyncStorage } from "react-native";
import AuthFlow from "./AuthFlow";
type RootStackParamList = {
  Home: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const PERSISTENCE_KEY = "NAVIGATION_STATE";

export default function Root() {
  const containerRef = React.useRef<NavigationContainerRef>();

  const { getInitialState } = useLinking(containerRef, {
    prefixes: [],
    getStateFromPath: path => {
      const state = getStateFromPath(path);
      return {
        routes: [
          {
            name: "root",
            state: {
              ...state,
              routes: [{ name: "home" }, ...(state ? state.routes : [])]
            }
          }
        ]
      };
    }
  });
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<any | undefined>();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        let state = await getInitialState();
        if (state === undefined) {
          const savedState = await AsyncStorage.getItem(PERSISTENCE_KEY);
          state = savedState ? JSON.parse(savedState) : undefined;
        }

        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationNativeContainer
      ref={containerRef}
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <Stack.Navigator>
        <Stack.Screen
          key={name}
          name={name}
          component={AuthFlow}
          options={{ header: null }}
        />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
