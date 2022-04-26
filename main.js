/* Moralis init code */
fetch('./env.json')
  .then(response => response.json())
  .then(data => {
    const serverUrl = data.env.MORALIS_SERVER_URL;
    const appId = data.env.MORALIS_APPLICATION_ID;
    Moralis.start({ serverUrl, appId });

    /* Authentication code */
    async function login() {
      let user = Moralis.User.current();
      if (!user) {
        user = await Moralis.authenticate({
          signingMessage: "Log in using Moralis",
        })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
        await Moralis.enableWeb3();
      }
    }

    async function logOut() {
      await Moralis.User.logOut();
      console.log("logged out");
    }

    async function upload() {
      const fileInput = document.getElementById("file");
      // Save file input to IPFS
      const data = fileInput.files[0];
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();

      console.log(file.ipfs(), file.hash())
    }

    async function store() {
      let options = {
        contractAddress: "0x7aAda96933305Ee57859917E8cebd6446f196b53",
        functionName: "retrieve",
        abi: [
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_favouriteNumber",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              }
            ],
            "name": "addPerson",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_favouriteNumber",
                "type": "uint256"
              }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "name": "nameToFavouriteNumber",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "people",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "favouriteNumber",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "person",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "favouriteNumber",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ],
        params: {
          // _favouriteNumber: 9
        },
        msgValue: Moralis.Units.ETH(0.0)
      }
      let result = await Moralis.executeFunction(options);
      const number = parseInt(result._hex);
      console.log(number);
      const Ticket = Moralis.Object.extend("Ticket");
      const ticket = new Ticket();

      ticket.set("number", number);
      ticket.set("ownerName", "Aashrit");
      ticket.set("active", true);

      ticket.save()
        .then((ticket) => {
          // Execute any logic that should take place after the object is saved.
          console.log(ticket.id);
          alert('New object created with objectId: ' + ticket.id);
        }, (error) => {
          // Execute any logic that should take place if the save fails.
          // error is a Moralis.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        });
    }

    document.getElementById("btn-login").onclick = login;
    document.getElementById("btn-logout").onclick = logOut;
    document.getElementById("btn-store").onclick = store;
    document.getElementById("btn-upload").onclick = upload;
  })
  .catch(error => console.log(error));