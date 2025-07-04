// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract StockNFT is ERC721URIStorage {
    uint256 public nextTokenId;
    address public admin;

    constructor() ERC721("StockNFT", "SNFT") {
        admin = msg.sender;
    }

    function miFnt(address to, string memory uri) external {
        require(msg.sender == admin, "only admin can mint");
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, uri);
        nextTokenId++;
    }
}
