// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Database {

    mapping (bytes4 => string[]) array;
    mapping (bytes4 => mapping(string => bool)) set; 

    error AlreadyKnown();

    event Added(bytes4 indexed hash, string text);

    function add(string calldata text) public {
        bytes4 hash = bytes4(keccak256(bytes(text)));

        if (set[hash][text])
            return;

        array[hash].push(text);
        set[hash][text] = true;

        emit Added(hash, text);
    }

    function get(bytes4 hash) public view returns (string[] memory) {
        return array[hash];
    }

}

contract Batcher {

    Database database;

    constructor(Database _database) {
        database = _database;
    }

    function add(string[] calldata texts) public {
        for (uint256 i = 0; i < texts.length; i++)
            database.add(texts[i]);
    }

}
