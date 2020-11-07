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
    var url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/rewardvisitor.html?account=' + web3.eth.defaultAccount;

    jQuery('#qrcodeCanvas').qrcode({
        text: url // web3.eth.defaultAccount
    });	

	document.getElementById("MyAddress").innerHTML = url;// web3.eth.defaultAccount;
    console.log(url);
};

  function subscribeEvents() {
    $.getJSON('Collectables.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var CollectablesArtifact = data;
      App.contracts.Collectable = TruffleContract(CollectablesArtifact);

      // Set the provider for our contract
      App.contracts.Collectable.setProvider(App.web3Provider);


    App.contracts.Collectable.deployed().then(function(instance) {
    //collectableInstance = instance;

      const subscription = web3.eth.subscribe(
        'logs',
        {
          address: instance.address, // '0xE3BA9a866795c9bc416A31c0893518fDFA616A97'
          from: 0,
          // topics: [ [web3.utils.sha3('visitorRewarded(address,uint256)') ] ]      
          topics: [ web3.utils.sha3('visitorRewarded(address,uint256)') , '0x000000000000000000000000' + App.account[0].substring(2,).toLowerCase(), null  ]
        },
        (error, result) => {
          if (error) return;
          // do something with the data
          console.log(result);
        App.logresult = result;
          window.location.href = 'showcollectibles.html';    
        }
      );

    })
    });
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
            subscribeEvents();
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
