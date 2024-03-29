# Changelog

- [Changelog](#changelog)
  - [0.2.11](#0211)
  - [0.2.10](#0210)
  - [0.2.9](#029)
  - [0.2.7](#027)
  - [0.2.6](#026)
  - [0.2.5](#025)
  - [0.2.4](#024)
  - [0.2.3](#023)
  - [0.2.2](#022)
  - [0.2.1](#021)
  - [0.2.0](#020)
  - [0.1.2](#012)
  - [0.1.1](#011)

## 0.2.11

Released on 08/03/2024

- Updated Breez SDK to 0.3.2

## 0.2.10

Released on 04/03/2024

- Updated Breez SDK to 0.3.1

## 0.2.9

Released on 02/02/2024

- Fixed issue that startup layout is blocked by failing redeem funds

## 0.2.7

Released on 01/02/2024

- Fixed an issue that funds pending by the channel closing were not redeemed to the app

## 0.2.6

Released on 17/01/2024

- Bump breez sdk to 0.2.15

## 0.2.5

Released on 17/01/2024

- Added possibility to retrieve application logs

## 0.2.4

Released on 15/01/2024

- Fixed parser for invoice without amount

## 0.2.3

Released on 09/01/2024

- Bump breez SDK to 0.2.12 which fixes some issues <https://github.com/breez/breez-sdk/releases/tag/0.2.12>

## 0.2.2

Released on 13/12/2023

- Fixed bitcoin QR scan not parsing addresses not starting with `bitcoin:`
- Qr code scanner support for LN invoice

## 0.2.1

Released on 13/12/2023

- [Issue 25](https://github.com/SatoshisPay/satoshispay/issues/25): Deposits are now logged in the deposit form.
  - Added amount for deposits (BIP21).
- [Issue 28](https://github.com/SatoshisPay/satoshispay/issues/28): Check for minimum amount to withdraw before sending withdraw
- [Issue 32](https://github.com/SatoshisPay/satoshispay/issues/32): the transactions CSV couldn't be located.
- [Issue 35](https://github.com/SatoshisPay/satoshispay/issues/35): BIP21 QR code support
- [Issue 41](https://github.com/SatoshisPay/satoshispay/issues/41): It is now possible to buy Bitcoin in-app through the Breez providers (Moonpay atm)

## 0.2.0

Released on 02/12/2023

- [Issue 1](https://github.com/SatoshisPay/satoshispay/issues/1): Implement transactions export as CSV
  - Filter transactions by date
- [Issue 2](https://github.com/SatoshisPay/satoshispay/issues/2): Lightning Network withdrawals
- [Issue 8](https://github.com/SatoshisPay/satoshispay/issues/8): Commecial activity map where to spend BTC
- [Issue 10](https://github.com/SatoshisPay/satoshispay/issues/10): Added copy button on Invoice BOLT11
- [Issue 11](https://github.com/SatoshisPay/satoshispay/issues/11): Protect recovery confirm with a modal
- [Issue 12](https://github.com/SatoshisPay/satoshispay/issues/12): Allow to backup seed in app settings (protected with pin).
- [Issue 13](https://github.com/SatoshisPay/satoshispay/issues/13): Don't allow the user to create invoices lower than the minimum fee, if they dont't have enough liquidity.
- Minor changes:
  - Changed settings "Gear" icon to "More"
  - Changed withdrawal form from "Prelievo" to "Invia"

## 0.1.2

Released on 29/11/2023

- [Issue 5](https://github.com/SatoshisPay/satoshispay/issues/5): If camera was already authorized by system, it didn't launch, but only if authorization was given on open.
- [Issue 6](https://github.com/SatoshisPay/satoshispay/issues/6): If back was pressed on camera, the camera won't close

## 0.1.1

Released on 29/11/2023

- [Issue 3](https://github.com/SatoshisPay/satoshispay/issues/3): Force theme light
