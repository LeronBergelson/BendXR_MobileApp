/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams:
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/_sitemap`; params?: Router.UnknownInputParams }
        | {
            pathname: `${'/(tabs)'}/HomeStackNavigator` | `/HomeStackNavigator`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname:
              | `${'/(tabs)'}/UserAnalyticsScreen`
              | `/UserAnalyticsScreen`;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams }
        | {
            pathname: `/navigation/StackNavigator`;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/navigation/types`; params?: Router.UnknownInputParams }
        | {
            pathname: `/screens/ExerciseListScreen`;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/+not-found`; params: Router.UnknownInputParams & {} };
      hrefOutputParams:
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownOutputParams;
          }
        | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams }
        | {
            pathname: `${'/(tabs)'}/HomeStackNavigator` | `/HomeStackNavigator`;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname:
              | `${'/(tabs)'}/UserAnalyticsScreen`
              | `/UserAnalyticsScreen`;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: `${'/(tabs)'}` | `/`;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: `/navigation/StackNavigator`;
            params?: Router.UnknownOutputParams;
          }
        | { pathname: `/navigation/types`; params?: Router.UnknownOutputParams }
        | {
            pathname: `/screens/ExerciseListScreen`;
            params?: Router.UnknownOutputParams;
          }
        | { pathname: `/+not-found`; params: Router.UnknownOutputParams & {} };
      href:
        | Router.RelativePathString
        | Router.ExternalPathString
        | `/_sitemap${`?${string}` | `#${string}` | ''}`
        | `${'/(tabs)'}/HomeStackNavigator${`?${string}` | `#${string}` | ''}`
        | `/HomeStackNavigator${`?${string}` | `#${string}` | ''}`
        | `${'/(tabs)'}/UserAnalyticsScreen${`?${string}` | `#${string}` | ''}`
        | `/UserAnalyticsScreen${`?${string}` | `#${string}` | ''}`
        | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}`
        | `/${`?${string}` | `#${string}` | ''}`
        | `/navigation/StackNavigator${`?${string}` | `#${string}` | ''}`
        | `/navigation/types${`?${string}` | `#${string}` | ''}`
        | `/screens/ExerciseListScreen${`?${string}` | `#${string}` | ''}`
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/_sitemap`; params?: Router.UnknownInputParams }
        | {
            pathname: `${'/(tabs)'}/HomeStackNavigator` | `/HomeStackNavigator`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname:
              | `${'/(tabs)'}/UserAnalyticsScreen`
              | `/UserAnalyticsScreen`;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams }
        | {
            pathname: `/navigation/StackNavigator`;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/navigation/types`; params?: Router.UnknownInputParams }
        | {
            pathname: `/screens/ExerciseListScreen`;
            params?: Router.UnknownInputParams;
          }
        | `/+not-found`
        | { pathname: `/+not-found`; params: Router.UnknownInputParams & {} };
    }
  }
}
