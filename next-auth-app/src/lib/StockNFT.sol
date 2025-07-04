// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StockNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    constructor() ERC721("StockNFT", "SNFT") {}

    function mint(address recipient, string memory tokenURI) external onlyOwner {
        uint256 tokenId = nextTokenId++;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
