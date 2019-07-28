import { withNavigation } from "@react-navigation/core";

//@ts-ignore
export const Redirect = withNavigation(({ to, navigation: { navigate } }) => {
  navigate(to);
  return null;
});
