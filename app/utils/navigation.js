/**
 * 无navigation 跳转方式封装
 */
import { NavigationActions, StackActions, SwitchActions } from 'react-navigation'

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function reset(routeName, params) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })]
  });
  _navigator.dispatch(resetAction)
}

function jumpTo(routeName) {
  _navigator.dispatch(SwitchActions.jumpTo({ routeName }))
}

export default {
  jumpTo,
  reset,
  navigate,
  setTopLevelNavigator
};