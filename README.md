# sn-treemap
Treemap Supernova

## Mobile
### Preamble
Mobile uses react-native.   As such all javascript should work on both the web and mobile. However react-native uses a custom JavaScript engine called Hermes.  For rendering picasso charts, mobile uses a hightly optimized rendering engine, called [Helium](https://github.com/qlik-oss/react-native-helium), that uses a GPU backend for Skia.  Skia is the same 2D graphics library used for Canvas in Chrome and Android.  So again, things must be tested to ensure compatiblity.

### Testing mobile
#### Pre-reqs
1. Install [react-native dev environment](https://reactnative.dev/docs/0.68/environment-setup). This includes Xcode and Android Studio.
2. A QCS Account with an API Key
3. An app with some treemaps


#### Running
** Please Note this can take a while to build if it's the first time **
1. `yarn prepare-mobile`
2. `yarn ios`

## Nebula dev
#### NOTE: Create an app using random data and create one treemap.
1. clone me
2. checkout master
3. yarn
4. yarn build:watch
5. yarn start



