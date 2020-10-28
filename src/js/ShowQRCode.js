// 1. Event listener toevoegen
//document.addEventListener('deviceready', deviceReady);

// 2. Implementatie
function deviceReady(){

// -----------------------------------------------------------------------------
// QR Code generator
// -----------------------------------------------------------------------------
// https://ourcodeworld.com/articles/read/110/how-to-create-a-qrcode-easily-with-jquery
// web3 = new Web3(window.ethereum)
//     window.ethereum.enable().catch(error => {
//         // User denied account access
//         console.log(error)
//     });




}


function showAddress() {
    jQuery('#qrcodeCanvas').qrcode({
        text: web3.eth.defaultAccount
    });	

	document.getElementById("MyAddress").innerHTML = web3.eth.defaultAccount;
};


// jQuery(function() {
//   $(window).ready(function() {
//     deviceReady();
//   }) });

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            showAddress();
            //web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        //web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});
