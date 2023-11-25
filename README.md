# SatoshisPay

<p align="center">
  <img src="/assets/logo.png" width="256" height="256" />
</p>

<p align="center">~ An app for shops to easily accept payments with Bitcoin on the Lightning network ~</p>

[![CI](https://github.com/veeso-dev/satoshispay/actions/workflows/ci.yml/badge.svg)](https://github.com/veeso-dev/satoshispay/actions/workflows/ci.yml)
[![Frontend](https://github.com/veeso-dev/satoshispay/actions/workflows/frontend.yml/badge.svg)](https://github.com/veeso-dev/satoshispay/actions/workflows/frontend.yml)

## Description

SatoshisPay is an Android/iOS application meant to be used by Italian retailers to accept Bitcoin payments on the Lightning Network.

The app supports the following features:

- Deposit from BTC address to your Lightning Network wallet
- Insert a FIAT (EUR) import and generate a LN invoice to accept the payment
- View the transactions history
- Withdraw the LN balance on your BTC address

## Contributing

Contributions to improve the app with new features and ideas, or just bugfix are welcome!

Please read our [CONTRIBUTING](./CONTRIBUTING.md) guidelines first.

## The Lightning Node

Currently SatoshisPay is connected to the Lightning Network thanks to the node powered by [Breez](https://breez.technology/).

## Powered By

Satoshispay relies on [Breez](https://breez.technology/) to allow Lightning Network payments.

![breez-logo](assets/breez.png)

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

## License

Licensed under [Apache License, Version 2.0](/LICENSE).
