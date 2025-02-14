# Deploying a Test Smart Contract on GoSmartAI PoS Network (lysa-testnet)

This guide outlines the step-by-step process to deploy a test smart contract on the **GoSmartAI PoS network (lysa-testnet)** using **Truffle**.

## **Prerequisites**

Ensure that you have the following installed and set up before proceeding:

- **Node.js** (LTS version recommended)
- **npm** (included with Node.js)
- **Truffle** (installed globally via `npm install -g truffle`)
- **GoSmartAI PoS Network (lysa-testnet) RPC URL**
- **A funded testnet account** on lysa-testnet
- **A valid `.env` file** to securely store your private key

---

## **Step 1: Install Dependencies**

Navigate to your smart contract project directory and install the required dependencies:

```sh
npm install
```

This command will install all necessary **Node.js** packages specified in `package.json`.

---

## **Step 2: Configure Deployment Credentials**

Before deploying the contract, update the **private key** and **account address**.

### **2.1 Update the Private Key in `.env`**

Edit the `.env` file in your project directory and add or update your **private key**:

```sh
PRIVATE_KEY=your_private_key_here_without_0x
```

**Note:**

- Never share or commit your private key to version control.
- Ensure the `.env` file is included in `.gitignore` for security.

### **2.2 Update the Account Address in `truffle-config.js`**

Modify `truffle-config.js` to use your **wallet address** for deployment. Locate the network configuration for `myPOSNetwork` and update the **from** field with your account address:

```js
myPOSNetwork: {
  provider: () => new HDWalletProvider(
    process.env.PRIVATE_KEY,
    "http://34.46.205.31:8000"
  ),
  from: "0xYourAccountAddressHere"  // Update this with your wallet address
  ...
}
```

---

## **Step 3: Compile the Smart Contract**

Once the credentials are set, compile the smart contract using:

```sh
truffle compile
```

This will check for syntax errors and generate the necessary build artifacts inside the `build/contracts` directory.

---

## **Step 4: Deploy the Smart Contract**

To deploy your smart contract on the **GoSmartAI PoS network (lysa-testnet)**, run the following migration command:

```sh
truffle migrate --network myPOSNetwork --reset
```

### **Explanation of Flags:**

- `--network myPOSNetwork`: Specifies the target network as defined in `truffle-config.js`.
- `--reset`: Ensures that all migrations run from the beginning, redeploying the contracts.

Once the process is complete, **Truffle** will display the deployed contract addresses.

---

## **Step 5: Verify Deployment**

After deployment, confirm that the contract is live by checking the transaction hash on the **GoSmartAI PoS lysa-testnet block explorer**.

---

## **Conclusion**

You have successfully deployed your test smart contract on **GoSmartAI PoS network (lysa-testnet)**. You can now interact with your contract using **Truffle Console** or a web interface.

---
