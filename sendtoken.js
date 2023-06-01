const fs = require('fs');
const csv = require('csv-parser');
const ethers = require('ethers');

// Provider and signer setup
const rpcUrl = 'your RPC URL '; // Replace with URL Node / RPC service providers, such as Quicknode, Alchemy etc
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const privateKey = 'PK'; // Replace with your own private key
const wallet = new ethers.Wallet(privateKey, provider);

// ERC20 contract setup
const tokenAddress = '0x2e4c93beaae74bb51a34b0e2af5dc03fe40404a5'; // Token Address
const abi = ['function transfer(address to, uint256 amount)']; // 
const contract = new ethers.Contract(tokenAddress, abi, wallet);

// Read CSV file
const csvFilePath = 'file.csv'; // Replace with the name of your CSV file

async function readCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// Sending ERC20 tokens to multiple addresses with delay
async function sendTokens() {
  try {
    const csvData = await readCsvFile(csvFilePath);
    const nonce = await provider.getTransactionCount(wallet.address, 'pending');

    for (let i = 0; i < csvData.length; i++) {
      const record = csvData[i];
      const receiverAddress = record.Address;
      const tokenAmount = ethers.utils.parseUnits(record.Amount, 6); // Assuming the amount is in the base unit ( Token Decimal)
      
      const tx = await contract.transfer(receiverAddress, tokenAmount, { nonce: nonce + i });
      const receipt = await tx.wait();
      const txHash = receipt.transactionHash;

      console.log(`Transaction successful! Transaction Hash: ${txHash}`);
      console.log(`Transaction Details: https://etherscan.io/tx/${txHash}`);
      
      // Generate random delay between 2 to 10 seconds
      const delayMs = Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    
    console.log('All transactions completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

sendTokens().catch(console.error);
