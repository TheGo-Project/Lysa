require("dotenv").config();
const fs = require("fs");
const { ethers } = require("ethers");
const contractArtifact = require("../build/contracts/SimpleContract.json");

const main = async () => {
  const userPrivateKey = process.env.METAMASK_PRIVATEKEY;
  const userWallet = new ethers.Wallet(userPrivateKey);
  const gsmcFee = ethers.utils.parseUnits("10", 18); // 10 GSMC
  const relayerAddress = process.env.GSMC_RELAYER;

  // 1️⃣ Prepare bytecode + constructor args (your Greeter contract accepts a string)
  const contractFactory = new ethers.utils.Interface(contractArtifact.abi);
  const encodedConstructorData = contractFactory.encodeDeploy(["Hello GSMC!"]);
  const fullBytecode =
    contractArtifact.bytecode + encodedConstructorData.slice(2); // slice(2) to strip "0x"

  // 2️⃣ Hash the deployment request
  const messageHash = ethers.utils.solidityKeccak256(
    ["bytes", "address", "uint256", "address"],
    [fullBytecode, userWallet.address, gsmcFee, relayerAddress]
  );

  const messageBytes = ethers.utils.arrayify(messageHash);
  const signature = await userWallet.signMessage(messageBytes);

  const payload = {
    bytecode: fullBytecode,
    user: userWallet.address,
    gsmcFee: gsmcFee.toString(),
    signature,
  };

  fs.writeFileSync("deployRequest.json", JSON.stringify(payload, null, 2));
  console.log("✅ Signed request saved to deployRequest.json");
};

main();
