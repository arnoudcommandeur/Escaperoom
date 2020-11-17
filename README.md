# Escape Room Collectables

This website is part of the ConsenSys Bootcamp 2020.

An Ethereum based reward program for Escape Room lovers: Finish the Escape Room within the specified time and earn your own ERC1155 collectable.

The goal of this website is to have escape visitors collect ERC1155 compatible tokens. The token are given away by the Escape Room admin after a visitor syccesfully completes the Escape Room.

After finishing the Escape Room, the visitor must show a QRCode which is used by the Escape Room admin to start a token transfer. After the token transfer a event is sent to the client and the new token is visible within the UI.

## How to use this website?

Step 1: Make sure you have installed  all the tools described in the section [Prerequisites](#Prerequisites)

Step 2: Follow instructions described [Getting started](#Getting-started)

Step 3: Start the website on your computer. A detailed how-to-use movie can be found on Youtube (watch the video right here)

## Directory structure

The project contains the following directories:

- .vs-code - This folder contains Visual Studio task definitions
- build/contracts - This folder contains the output of compiled contracts (default Truffle folder)
contracts - This folder contains the Collectable.sol contract and the defailt Migrations.sol contract which is used by Truffle migration script
- helpers - Command line utilities (for development only)
- migrations - Default truffle folder which handle deployment of contracts, inclusing post deployment actions
- node_modules - Folder which contains the OpenZeppeling default contracts
- src - Folder that contains the UI
- test - Default Truffle folder which contains the smart contract tests


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

- Test 

to make sure everything is working as expected, please run the following command to run the Truffle tests.
```
truffle test
```
- Start development webserver

you can now start your local webserver (lite-server) via:
```
npm run dev
```


Optional: Make sure that the src directory contains the right Collectables.json file after deploying (only wehen deploying to Firebase). You can copy the file via:

```
copy .\build\contracts\Collectables.json .\src\Collectables.json /Y
```

You should now be able to browse the Escape Room website within a web3 compatible browser via http://localhost:3000/. Make sure your MetaMask extension is poiting to your local Ganache-cli and you grant the website access to use web3 provider.

