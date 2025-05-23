/* eslint-disable */
import * as Router from "expo-router";

export * from "expo-router";

declare module "expo-router" {
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
            pathname: `${"/(tabs)"}/formulario` | `/formulario`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}/historico` | `/historico`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}` | `/`;
            params?: Router.UnknownInputParams;
          };
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
            pathname: `${"/(tabs)"}/formulario` | `/formulario`;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: `${"/(tabs)"}/historico` | `/historico`;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: `${"/(tabs)"}` | `/`;
            params?: Router.UnknownOutputParams;
          };
      href:
        | Router.RelativePathString
        | Router.ExternalPathString
        | `/_sitemap${`?${string}` | `#${string}` | ""}`
        | `${"/(tabs)"}/formulario${`?${string}` | `#${string}` | ""}`
        | `/formulario${`?${string}` | `#${string}` | ""}`
        | `${"/(tabs)"}/historico${`?${string}` | `#${string}` | ""}`
        | `/historico${`?${string}` | `#${string}` | ""}`
        | `${"/(tabs)"}${`?${string}` | `#${string}` | ""}`
        | `/${`?${string}` | `#${string}` | ""}`
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
            pathname: `${"/(tabs)"}/formulario` | `/formulario`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}/historico` | `/historico`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}` | `/`;
            params?: Router.UnknownInputParams;
          };
      InputAndFormPage;
      hrefInputParams:
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `/../components/layout/Home/Home`;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/_sitemap`; params?: Router.UnknownInputParams }
        | {
            pathname: `${"/(tabs)"}/formulario` | `/formulario`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}/historico` | `/historico`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}` | `/`;
            params?: Router.UnknownInputParams;
          };
      hrefOutputParams:
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: `/../components/layout/Home/Home`;
            params?: Router.UnknownOutputParams;
          }
        | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams }
        | {
            pathname: `${"/(tabs)"}/formulario` | `/formulario`;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: `${"/(tabs)"}/historico` | `/historico`;
            params?: Router.UnknownOutputParams;
          }
        | {
            pathname: `${"/(tabs)"}` | `/`;
            params?: Router.UnknownOutputParams;
          };
      href:
        | Router.RelativePathString
        | Router.ExternalPathString
        | `/../components/layout/Home/Home${`?${string}` | `#${string}` | ""}`
        | `/_sitemap${`?${string}` | `#${string}` | ""}`
        | `${"/(tabs)"}/formulario${`?${string}` | `#${string}` | ""}`
        | `/formulario${`?${string}` | `#${string}` | ""}`
        | `${"/(tabs)"}/historico${`?${string}` | `#${string}` | ""}`
        | `/historico${`?${string}` | `#${string}` | ""}`
        | `${"/(tabs)"}${`?${string}` | `#${string}` | ""}`
        | `/${`?${string}` | `#${string}` | ""}`
        | {
            pathname: Router.RelativePathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: Router.ExternalPathString;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `/../components/layout/Home/Home`;
            params?: Router.UnknownInputParams;
          }
        | { pathname: `/_sitemap`; params?: Router.UnknownInputParams }
        | {
            pathname: `${"/(tabs)"}/formulario` | `/formulario`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}/historico` | `/historico`;
            params?: Router.UnknownInputParams;
          }
        | {
            pathname: `${"/(tabs)"}` | `/`;
            params?: Router.UnknownInputParams;
          };
    }
  }
}
