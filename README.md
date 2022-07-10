# CityDAO Token Query Tools

## Setup

### Node

1.  Install `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm))
2.  `cd` to the project directory and execute the following:
    ```
    nvm install
    nvm use
    npm install
    ```

### Moralis

Set up a free node on [Moralis](https://moralis.io/).

NOTE: Free nodes will suspend after 3 days and terminate 24 days after that.

1. Click _Start for Free_ on the Moralis website
2. Click _Sign up_ if you don't have an account
3. Click _Create New Dapp_
4. Select Environment: _Mainnet_
5. Select Network: Eth
6. Click _Proceed_
7. Select Region: New York (or close to you)
8. Click _Proceed_
9. Name your Dapp something like 'CityDAO Token Query'
10. Click _Create Your Dapp_
11. When the Dapp is created, click _Settings_
12. You will need the _Dapp URL_ and _Application ID_ for the following step

### Environment Setup

Copy `example.env` to `.env` and fill in the values

### IDE Setup

This project uses [EditorConfig](https://editorconfig.org/) for IDE configuration.

See `.editorconfig` for settings.

Many popular IDEs and editors support this out of the box or with a plugin.

## Development

### Prettier

This project uses [Prettier](https://prettier.io/), so please run it before checking in:

```
npm run pretty
```

See `.prettierrc` for settings.

Some IDEs and editors have plugins for running Prettier.

### Linting

This project uses [ESLint](https://eslint.org/). Check linting before checking in:

```
npm run lint
```

See `tslint.json` for settings.

Many IDEs and editors support TSLint.

## Testing

This project uses [Jest](https://jestjs.io/) for testing. Run tests before checking in.

```
npm test
```

## Building

```
npm run build
```

## Using the CLI

1. Compile the code with `npm run build`
2. Execute the CLI with `bin/token-query-tools.sh ...`
3. Get help with `bin/token-query-tools.sh --help` or 
   `bin/token-query-tools.sh <command> --help`
