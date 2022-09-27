// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Oracle.sol";


contract SimpleOracleStorage {
    int256 storedValue;
    uint256 storedDate;
    event valueChanged(int256 newValue, uint256 newDate);

    function getOracleData() public returns (int){
        bytes32 oracleId = 0x7d55ae0be7ec7d8189645f834522d9d8147865a2ef022deb006e9757567e2272;
        address oracleAddress = 0x8ecEDdd1377E52d23A46E2bd3dF0aFE35B526D5F;
        
        // Oracle oracleContract = Oracle(oracleAddress);
        (int value, uint256 date) = Oracle(oracleAddress).getInt(
            oracleId
        );
        storedValue = value;
        storedDate = date;
        return value;
    }

    function get() public view returns (int256, uint256) {
        return (storedValue, storedDate);
    }
}
