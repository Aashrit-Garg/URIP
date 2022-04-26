// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract SimpleStorage {

    // Common Solidity Data Types

    // bool favouriteBool = false;
    // string favouriteString = "String";
    // int256 favouriteInt = -5;
    // address favouriteAddress = 0x286f31ACDD51A1d3857626E82eFA147Db08405Fb;
    // bytes32 favouriteBytes = "Byte";

    // Initialising a variable
    uint256 favouriteNumber;

    // Initialising a struct
    struct Person {
        uint256 favouriteNumber;
        string name;
    }

    // Initialising a person from a predefined struct
    Person public person = Person({favouriteNumber: 3, name: "Aashrit"});

    // Initialising an array of person (struct)
    Person[] public people;

    // Initialising a public map
    mapping(string => uint256) public nameToFavouriteNumber;

    // A public function with one input with no output
    function store(uint256 _favouriteNumber) public {
        favouriteNumber = _favouriteNumber;
    }

    // A public function of type view that has no input and one output
    function retrieve() public view returns(uint256) {
        return favouriteNumber;
    }


    // A public function that takes two inputs and no outputs
    function addPerson(uint256 _favouriteNumber, string memory _name) public {
        // Adding person to People Array
        people.push(Person(_favouriteNumber, _name));

        // Adding a new entry to the map
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}