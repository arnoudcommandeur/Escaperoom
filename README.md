# Escape Room Collectables

An Ethereum based reward program for Escape Room lovers. 

Finish the Escape Room within the specified time and earn your own ERC1155 collectable.

## Prerequisites

Please make sure you have all the Ethereum based development tools installed on your computer: 

- Ganacha-cli

written in JavaScript and distributed as a Node.js package via npm. Make sure you have Node.js (>= v8) installed.
```
npm install -g ganache-cli
```

- Truffle

A world class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier.
```
npm install -g truffle
```

- Windows developer tools

You might need the Windows developer tools, You'll need Python 2.7 installed, and on Windows, you'll likely need to install windows-build-tools from an Administrator PowerShell Prompt via 
```
npm install --global windows-build-tools.
```

- Use a web3 ready webbrowser

For this repo, I recommend to install the MetaMask extension. You can download MetaMask via: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn


## Getting started

Please follow the steps below to install the Escape Room application:

- Clone repo

You first have to clone this repo to have all the sources locally available.

- Start test blockchain

Start your own local Ganache-cli. Mak sure ganache is listening on port 8545!
```
ganache-cli
```

- Deploy smart contract

Deploy the ERC1155 based smart contract via:
```
truffle migrate --reset
```

Mak sure that the src directory contains the right Collectables.json file after deploying. You can copy the file via:

```
copy .\build\contracts\Collectables.json .\src\Collectables.json /Y
```

- Test 

to make sure everything is working as expected, please run the following command to run the Truffle tests.
```
truffle test
```
- Start development server

you can now start your local webserver (lite-server) via:
```
npm run dev
```

You should now be able to browse the Escape Room website within a web3 compatible browser via http://localhost:3000/

