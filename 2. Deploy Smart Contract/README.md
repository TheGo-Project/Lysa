# 🚀 Deploying Smart Contracts Using Truffle with GSMC (Gasless)

## **Prerequisites**

Before deploying the smart contracts, ensure that you have the following set up:

- **Node.js & npm** installed on your system.
- **Truffle** installed globally using:
  ```sh
  npm install -g truffle
  ```
- A configured **Truffle project** with the necessary contracts and migration scripts.
- A properly configured **truffle-config.js** file.
- Your private Ethereum network (`myPOSNetwork`) set up and accessible.

> ⚠️ **Developer Note:**  
> You will require a **one-time transfer of 0.01 ETH** to sign the **GSMC approval transaction**. This approval enables the use of **GSMC as gas** for smart contract deployments.  
> Once approved, you can deploy contracts using GSMC according to the approved amount—**no need to use ETH for every deployment**.  
> On the private PoS network, this ETH is **faucet-based** and free. On mainnet, however, the Relayer will handle ETH payments on behalf of users.

---

## **Project Directory Structure**

Your project should look similar to this:

```
TRUFFLE-CONTRACT
│── builds/
│   │── GSMCToken.json
│── build/contracts/
│   │── SimpleContract.json
│── contracts/
│   │── SimpleContract.sol
│── node_modules/
│── test/
│── .env
│── package-lock.json
│── package.json
│── truffle-config.js
```

---

## **Deployment Steps**

### ✅ Step 1: Approve GSMC Usage

Before deploying contracts using GSMC, you must **approve** the relayer to spend GSMC on your behalf. This step uses **ETH** to sign the approval and is required **only once**.

> 💡 **Tip:**  
> The approval amount is set to **1000 GSMC**, allowing you to deploy multiple contracts without needing to re-approve.

### 🔧 Run the approval script:

```bash
node scripts/approveGSMC.js
```

If successful, your address will be approved to use GSMC for deployment fees.

---

### ✍️ Step 2: Sign the Deployment Request

After approving GSMC, sign the smart contract deployment request.

- An **example request** is available in the project.
- Ensure the request includes:

  ```js
  const gsmcFee = ethers.utils.parseUnits("10", 18);
  ```

  This sets the deployment cost to **10 GSMC (minimum GSMC Gas Fee)**.

- **Replace** `contractArtifact` with your **compiled contract JSON** (e.g., `SimpleContract.json`).

> 🛠️ You can compile the contract using:
>
> ```bash
> truffle compile
> ```

### 🔧 Run the signing script:

```bash
node scripts/signDeployRequest.js
```

Upon success, a file named `deployRequest.json` will be generated.

---

### 📡 Step 3: Deploy the Smart Contract via Relayer

Use the following `curl` command to send the signed deployment request to the network relayer:

```bash
curl -X POST http://34.46.205.31:6060/deploy \
  -H "Content-Type: application/json" \
  --data-binary @deployRequest.json
```

---

### ✅ Step 4: Confirm Deployment

After a successful deployment, the API response will include a transaction hash (`tx`). You can use this hash to track the contract deployment status on your private network.

---

Happy Building with GSMC! 🛠️✨
