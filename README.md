# sn-treemap
Treemap Supernova

## Mobile
### Preamble
Mobile uses react-native.   As such all javascript should work on both the web and mobile. However react-native uses a custom JavaScript engine called Hermes.  For rendering picasso charts, mobile uses a hightly optimized rendering engine, called [Helium](https://github.com/qlik-oss/react-native-helium), that uses a GPU backend for Skia.

RVM is recomended.

### Testing mobile
#### Pre-reqs
1. For now a Mac System, until we have automated tests in the cloud
2. Install [react-native dev environment](https://reactnative.dev/docs/0.68/environment-setup). This includes Xcode and Android Studio.
3. [A QCS Account with an API Key](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Admin/mc-generate-api-keys.htm)
4. An app with some treemaps


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



