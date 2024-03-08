# SatoshisPay

<p align="center">
  <img src="/assets/logo.png" width="256" height="256" alt="project logo" />
</p>

<p align="center">~ An app for shops to easily accept payments with Bitcoin on the Lightning network ~</p>

[![CI](https://github.com/SatoshisPay/satoshispay/actions/workflows/ci.yml/badge.svg)](https://github.com/SatoshisPay/satoshispay/actions/workflows/ci.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

## Description

SatoshisPay is an Android/iOS application meant to be used by Italian retailers to accept Bitcoin payments on the Lightning Network.

The app supports the following features:

- Deposit from BTC address to your Lightning Network wallet
- Insert a FIAT (EUR) import and generate a LN invoice to accept the payment
- View the transactions history
- Withdraw the LN balance on your BTC address

## Install

You can install it from Google Play, or directly as an APK

[![google-play-badge](./assets/google-play-badge.png)](https://play.google.com/store/apps/details?id=com.satoshispay&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)
[![apk-badge](./assets/apk-badge.png)](https://github.com/SatoshisPay/satoshispay/releases/latest/download/app-release.apk)

## Developers

To contribute as a developer, here you can find how to get started with the project.

### Requirements

In order to develop on SatoshisPay, you are required for the following software on your machine

- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable). I suggest you using [nvm](https://github.com/nvm-sh/nvm) on your machine for a better NodeJS version management.
- [Android Studio](https://reactnative.dev/docs/environment-setup?guide=native&os=linux&package-manager=yarn&platform=android)
- OpenJDK 11: JDK17 is recommended tbh, but react-native-keychain won't build apparently, so use 11 instead.

### Setup

1. Install dependencies

    ```sh
    yarn
    ```

2. Start development server

    ```sh
    yarn start
    ```

3. Launch emulator

    Now if you press `a` you should be able to run it on the Android emulator.

## Contributing

Contributions to improve the app with new features and ideas, or just bugfix are welcome!

Please read our [CONTRIBUTING](./CONTRIBUTING.md) guidelines first.

Join our insiders group on Telegram:

[![telegram-qr](./assets/telegram.png)](https://t.me/+g-0OoyIPUS0yNWM0)

Link: <https://t.me/+g-0OoyIPUS0yNWM0>

## Support Us

If you wish to support our project, please consider a donation

[![bitcoin-donate](./assets/btc-donate.png)](https://explorer.btc.com/btc/address/bc1qql247l894ahqvd5affjk69mrf49dcnxg7c0l74)

`bc1qma8r6pwr6nw7c0zeqlx4a86hmyax2l02ppmx23`

## The Lightning Node

Currently SatoshisPay is connected to the Lightning Network thanks to the node powered by [Breez](https://breez.technology/).

## Powered By

Satoshispay relies on [Breez](https://breez.technology/) to allow Lightning Network payments.

[![breez-logo](assets/breez.png)](https://breez.technology/)

SatoshisPay is powered by these awesome projects:

- [BitcoinJs](https://github.com/bitcoinjs/bitcoinjs-lib)
- [Nativewind](https://github.com/marklawlor/nativewind)
- [React-native-keychain](https://github.com/oblador/react-native-keychain)
- [React-qr-code](https://github.com/rosskhanas/react-qr-code)
- [React-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera)

## Gallery

![app-screen-home](assets/app-screen-home.webp)

![app-screen-tx](assets/app-screen-tx.webp)

![app-screen-wallet](assets/app-screen-wallet.webp)

## Prevent committing the storage password

For deployers, lock file containing secrets:

```sh
git update-index --assume-unchanged android/gradle.properties
```

Release lock:

```sh
git update-index --no-assume-unchanged android/gradle.properties
```

## License

Licensed under [Apache License, Version 2.0](/LICENSE).

Google Play and the Google Play logo are trademarks of Google LLC.
