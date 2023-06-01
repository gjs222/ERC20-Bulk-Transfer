# ERC20 Token Bulk Transfer

This script allows you to send ERC20 tokens to multiple addresses using a CSV file containing the recipient addresses and corresponding token amounts. The script utilizes the ethers.js library and requires a functioning Ethereum RPC node.


## Installation

1. Clone or download the script files to your local machine.

2. Open a terminal and navigate to the project directory.

3. Run the following command to install the required dependencies:

   ```shell
   npm install
   ```

   This command will install the necessary dependencies (`fs`, `csv-parser`, and `ethers`) based on the `package.json` file included in the project.

## Configuration

1. Open the `sendtoken.js` file in a text editor.

2. Update the following variables in the file:

   - `rpcUrl`: Replace `'your RPC URL '` with your desired Ethereum RPC URL from a provider of your choice.

   - `privateKey`: Replace `'PK'` with your own private key.

   - `tokenAddress`: Replace `'0x2e4c93beaae74bb51a34b0e2af5dc03fe40404a5'` with the contract address of the ERC20 token you want to transfer.

   - `abi`: Modify the ABI array if necessary to match the ABI of your ERC20 token contract.

3. Adjust the decimal places in the `ethers.utils.parseUnits()` function to match the token's decimal places. For example, if the token has 18 decimal places, use `ethers.utils.parseUnits(record.Amount, 18)`.

## CSV File Format

The CSV file should have the following format:

```
Address,Amount
0xRecipientAddress1,100
0xRecipientAddress2,200
0xRecipientAddress3,50
```

- The first row should contain the column headers `Address` and `Amount`.

- Subsequent rows should contain the recipient address in the `Address` column and the corresponding token amount in the `Amount` column.

- Ensure that there are no extra spaces or special characters in the CSV file.

## Usage

1. Place your CSV file in the project directory.

2. Update the `csvFilePath` variable in the `sendtoken.js` file with the name of your CSV file.

3. Run the following command to execute the script:

   ```shell
   node sendtoken.js
   ```

## Result

The script will iterate through each record in the CSV file and initiate a transfer of the specified ERC20 tokens to the respective recipient addresses. It will also output the transaction details, including the transaction hash.

Please note that there will be a random delay between each transaction to avoid overwhelming the network. The delay is set between 2 to 10 seconds.

## Disclaimer

- Use this script at your own risk. Double-check the accuracy of the CSV file and ensure that you have the necessary tokens and gas fees to execute the transfers.
- Make sure to test the script on a test network or with a small number of transactions before using it with a significant amount of tokens.

## License

This project is licensed under the [MIT License](LICENSE).

---
