# Contributing

- [Contributing](#contributing)
  - [1. Project mission](#1-project-mission)
  - [2. How to contribute](#2-how-to-contribute)
    - [2.1 New features](#21-new-features)
    - [2.2 Security concerns](#22-security-concerns)

## 1. Project mission

Before stating our contributing guidelines it's important to understand what SatoshisPay's mission is and which are our goals.

SatoshisPay is:

1. A mobile App meant to be used by Italian retailers and their employees to **easily accept Bitcoin payments** from their customers.
2. **Open source** and **no-profit**
3. Focused on simplicity
4. A **POS**

SatoshisPay is **NOT**:

1. A **wallet** with LN functionalities: there are tons of them, use one of them
2. An exchange
3. Meant to send LN payments. Use a wallet instead
4. **Satoshi first**

    the currency used in the app is primarily EURO. In the optic of an extended Bitcoin adoption, we believe the first step is a primarily adoption of the currency where the users still elaborate payments using FIAT. With this point of view, we can say SatoshisPay is a **transition app**, where we'll aid commercial activities to start using Bitcoin, keeping them used to FIAT currencies, until they don't feel comfortable in migrating definitely to Bitcoin.

## 2. How to contribute

### 2.1 New features

New features are welcome in SatoshisPay, but first it would be good to discuss them in a dedicated issue. When working on this project it's important to keep in mind our audience: retailers that may have no familiarity with technology and that could be stressed by consistent changes in the app.

Also, you should always consider the project mission as guidelines for a new feature, in particular three important things to keep in mind are:

1. The app *MUST* be used by a retailer who wants to accept Bitcoin payment
2. The app *MAY* be also used by the commercial activity's employees
3. The app *MUST* be FIAT first.

### 2.2 Security concerns

While contributing on SatoshisPay the following security concerns MUST always be kept in mind:

1. The retailers funds *MUST NOT* be compromised by their employees (yes, this happens more often than you think).
2. The wallet *MUST* always be restorable and the funds cannot be lost
3. A loss of the transactions history *MAY* cause tax issues to the retailer.
4. **Security is everything when we talk about people's money**.
