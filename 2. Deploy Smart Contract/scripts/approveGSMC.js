require("dotenv").config();
const { ethers } = require("ethers");
const gsmcAbi = require("../build/contracts/GSMCToken.json").abi; // or use minimal IERC20 ABI
const relayerAddress = process.env.GSMC_RELAYER;

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const userWallet = new ethers.Wallet(
    process.env.METAMASK_PRIVATEKEY,
    provider
  );
  const gsmcToken = new ethers.Contract(
    process.env.GSMC_TOKEN,
    gsmcAbi,
    userWallet
  );

  const amount = ethers.utils.parseUnits("1000", 18); // match gsmcFee

  const tx = await gsmcToken.approve(relayerAddress, amount);
  await tx.wait();

  console.log(`✅ Approved ${amount.toString()} GSMC for ${relayerAddress}`);
};

main();
