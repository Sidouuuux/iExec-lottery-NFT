// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface INFTCollection {
    function totalSupply() external view returns (uint256);

    function mint(address winner) external payable;

    function walletOfOwner(address _owner) external view returns (uint256[] memory);

    function tokenURI(uint256 _tokenId) external view returns (string memory);

    function setCost(uint256 _cost) external;

    function setMinter(address _minter) external;

    function setUriPrefix(string memory _uriPrefix) external;

    function setUriSuffix(string memory _uriSuffix) external;

    function setPaused(bool _state) external;

    function withdraw() external;

    function _baseURI() external view returns (string memory);
}