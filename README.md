![Escape Room](https://github.com/arnoudcommandeur/Escaperoom/blob/main/src/images/logo.jpg?raw=true)

# Escape Room Collectables

**Welcome to my Escape Room Collectables GitHub repo!**

This project is part of the ConsenSys Academy - The Blockchain Developer Online Bootcamp 2020. The Bootcamp edition of our full-featured Developer Program provides learning through multi-modal content, interactive exercises, assignments and hands on projects, live access to mentors and course creators, community based peer support, and networking opportunities.

## Final Project description
This repo contains an Ethereum based reward program for Escape Room lovers: Finish the Escape Room within the specified time and you will earn your own ERC1155 collectable. The project is a real DApp.

The goal of this repo is to let escape room visitors collect ERC1155 compatible tokens. The tokens are given away by the Escape Room admin after a visitor succesfully completes the Escape Room. The token is a proff for succesfully finishing the room and can be showed to others.

The DApp is quite easy to use: after finishing the Escape Room, the visitor must show his QRCode which contains his Ethereum address to the Escape Room admin to start a token transfer. After the token transfer has happened an event is sent to the visitor which is used to update the UI.

Although this DApp is specific for Escape Rooms, the general idea of rewarding and collecting tokens can be reused to build a wide range of other solutions.

This site should be used on a mobile device, but for testing purposes I will explain only the desktop version (although this version is working on my mobile phone too with help of Firebase (webhosting) and MetaMask mobile).

## How to use this repo?

Step 1: Make sure you have installed all the tools described in the section [Prerequisites](#Prerequisites)

Step 2: Follow the instructions described in [Getting started](#Getting-started)

Step 3: Start the DApp on your computer. A detailed how-to-use video can be found on YouTube (watch the video here: https://youtu.be/h_uKj-JBTQc)

## Directory structure

The project contains the following directories:

- .vs-code - This folder contains Visual Studio task definitions (not used)
- build/contracts - This folder contains the output of the compiled solidity contracts (default Truffle folder)
- contracts - This folder contains the Collectable.sol contract and the default Migrations.sol contract which is used by Truffle migration script
- helpers - Command line utilities (for development only)
- migrations - Default Truffle folder which handles the deployment of contracts, including post deployment actions
- node_modules - Folder which contains the OpenZeppeling default contracts and other dependencies
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

Please follow the steps below to install the Escape Room DApp:

- Clone repo

You first have to clone this repo to have all the sources locally available.

- Install packages

Install all the dependencies using the following command:
```
npm install
```

- Start test blockchain

Now start your own local Ganache-cli blockchain. Make sure Ganache is listening on port 8545 and it uses the same mnemonic as your MetaMask is using. You can start genache-cli with the -m option and add your mnemonic between "". Make sure to start genache-cli in a seperate terminal and execute all other commands in a new terminal so ganache-cli keeps running. You can find your mnemonic within MetaMask under Settings -> Security & Privacy
```
ganache-cli -m "YOUR METAMASK MNEMONIC"
```

- Deploy smart contract

Deploy the ERC1155 based smart contract via (remember to open a new terminal first before continuing):
```
truffle migrate --reset
```
Part of the deployment is the creation of 5 escape rooms. The accounts 5 till 9 are the admins of each own Escape Room. Make sure to use this accounts when testing tokentransfers within the DApp.
```
instance.createNewEscaperoom(accounts[5], "Escape Room 1", 0);
instance.createNewEscaperoom(accounts[6], "Escape Room 2", 0);
instance.createNewEscaperoom(accounts[7], "Escape Room 3", 0);
instance.createNewEscaperoom(accounts[8], "Escape Room 4", 0);
instance.createNewEscaperoom(accounts[9], "Escape Room 5", 0);
```

- Test 

to make sure everything is working as expected, please run the following command to run the Truffle tests. No errors should be thrown.
```
truffle test
```
- Start development webserver

you can now start your local webserver (lite-server) via:
```
npm run dev
```

You should now be able to browse the Escape Room DApp within a web3 compatible webbrowser via http://localhost:3000/. Make sure your MetaMask extension is poiting to your local Ganache-cli and you grant the DApp access to use web3 provider. For debugging purposes, you could press F12 and watch the output in the Console. No errors should be thrown.

## Other information

- See [here](./design_pattern_decisions.md) for more information about design patterns.
- See [here](./avoiding_common_attacks.md) for more information about avoiding common attacks.
- See [here](./deployed_address.txt) for more information about the testnet (Rinkeby) address of the validated smart contract. Here you find also the ENS name of the deployed contract.

## To Do's

Unfortunately the UI and smart contract are not ready yet, at least the following tasks still have to be completed:

### UI
1. The project is not always working well inside MetaMask Mobile (see my Github issue on: https://github.com/MetaMask/metamask-mobile/issues/1975). Any help in this issue is appreciated :)
2. Finish the UI styling
3. Create a good looking image for each Escape Room token
4. Let the visitor send the address by email in case visitor could not show the QRCode at that moment
5. Additional Admin functionality (withdraw Ether and create a new Escape Room for example)

### Smart Contract
1. Increase the number of Escape Rooms an admin can handle (at the moment only 1 room can be handled per address)
2. Add more tests.
3. Refactor the s_Escaperoom struct. Most info should be stored off-chain to save Ether.
4. Make the Price per token Escape Room dependent.

# Final words
I really liked this course! The course content is great and it pushed me sometimes to the limits to really understand the concepts.

I think the final project is the best part of the course. It forced me to develop the way Ethereum and Solidity should be used (with Truffle). But also I learned a lot about Github and Visual Studio Code and all its extensions. 

There's still a lot to learn, but for now I think I have a good starting point to deepen my knowledge. Especially IPFS and SSI are on the shortlist :)

For now, I'm a happy blockchain developer :)

Please contact me if you have any questions.

Thanks for all your help!

Cheers, 

Arnoud Commandeur

The Netherlands