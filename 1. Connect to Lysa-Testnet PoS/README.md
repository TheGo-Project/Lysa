# Connecting a Local Node to a Proof-of-Stake (PoS) Network

This guide provides step-by-step instructions to connect a local development node to an existing Proof-of-Stake (PoS) network using Geth and Prysm.

## Prerequisites

- Installed **Geth v1.14.12-stable** (Go Ethereum)
- Installed **Prysm v5.1.2** (Consensus Layer client)
- Access to a configured PoS network
- Required configuration files:
  - `genesis.json`
  - `jwt.hex`
  - `genesis.ssz`
  - `config.yml`

## Step 1: Initialize Geth Execution Client

```sh
geth init --datadir ./execution/data ./genesis.json
```

## Step 2: Start Geth Execution Client

Run the following command to start Geth with the appropriate network configurations:

```sh
geth --networkid 32382 \
    --http \
    --http.api eth,net,web3,admin \
    --http.addr 0.0.0.0 \
    --http.corsdomain="*" \
    --http.port 8000 \
    --port 8400 \
    --metrics.port 8300 \
    --ws \
    --ws.api eth,net,web3 \
    --ws.addr 0.0.0.0 \
    --ws.port 8103 \
    --authrpc.vhosts="*" \
    --authrpc.addr 0.0.0.0 \
    --authrpc.jwtsecret "./jwt.hex" \
    --authrpc.port 8200 \
    --datadir "./execution/data" \
    --bootnodes "enode://1bf7c575d0270b7b12855fcdeb89f74f4a1f6d571729ff3447020cc13fabbb0af6e66599f47456c4b299c18fe693fc6c7089971c5540e8e6543405bfb29a1f4b@34.46.205.31:30301,enode://f073086aaaa05d3d7789bc65d933b0eee2b70096b1103ad5d483244eabb8a22454472232431cdf95562ac87ae45febe924117bc6b5edfd98a1ee89ee7517dac3@34.46.205.31:8400,enode://ffa33c02d3e38892997c303527b21af75378f8abd637e82327a2469e1b5c61c0502f74510868b8878e18996fe55c6462978a8654f23207f8a84b8e18412a4934@34.46.205.31:8401,enode://1e107cb4cc6f0976926a05e4a768b081907f76720d9210be29b51b8032125c54f5cce53a2281eebaf7ca9de9a6d62d79959bb020894911a8b96188719fb1ce65@34.46.205.31:8402" \
    --verbosity 3 \
    --syncmode snap
```

## Step 3: Start the Beacon Chain (Consensus Client)

Run the following command to start the Prysm beacon chain:

```sh
./builds/beacon-chain \
    --datadir="./consensus/beacondata" \
    --min-sync-peers=1 \
    --genesis-state="./genesis.ssz" \
    --bootstrap-node="enr:-MK4QNmn3pLG0hSKvKGEYpYr0WzjdGMXyJpHMaYR6fq-SIIQRGtwBXImrlEIsOKGQmxbdYzmB4QYzwFG3GzGgrwpppaGAZUClGKxh2F0dG5ldHOIAAAAYAAAAACEZXRoMpAc7vlaIAAAlP__________gmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQK3YhshakkFr-r23tm5a1kWN9ryOfZUniO58w6vPIFwRohzeW5jbmV0cw-DdGNwghBog3VkcIIQzA" \
    --bootstrap-node="enr:-KO4QCUju2GAsUJLJTiQInwGPRAISMD-L1uO9NAQBLkECy-oYRuzfm_e5K26MLn8rNrkIIsK5-JKLaH7BzRcSB_RLXSGAZUClE4lg2V0aMfGhG6Qr5eAgmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQPwcwhqqqBdPXeJvGXZM7Du4rcAlrEQOtXUgyROq7iiJIRzbmFwwIN0Y3CCINCDdWRwgiDQ" \
    --bootstrap-node="enr:-KO4QEB6NNCfAGBDppCb0CRr9RvZCxoT2dxEsyhma6cTHc18SUgB-jU38hQlgiy_mRaMmwAxMJVjAwhL5ogYCsE8GLqGAZUClJtWg2V0aMfGhG6Qr5eAgmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQL_ozwC0-OIkpl8MDUnshr3U3j4q9Y36CMnokaeG1xhwIRzbmFwwIN0Y3CCINGDdWRwgiDR" \
    --bootstrap-node="enr:-KO4QG-B5CSnAVIAxz_zBmMnNr2K5SnGbiIYd8QSRv4mtjUBOohyUbcc8ykT7Emjy0dKud7JdDlzfT8vSQux6g_a90WGAZUClNX5g2V0aMfGhG6Qr5eAgmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQMeEHy0zG8JdpJqBeSnaLCBkH92cg2SEL4ptRuAMhJcVIRzbmFwwIN0Y3CCINKDdWRwgiDS" \
    --chain-config-file="./config.yml" \
    --contract-deployment-block=0 \
    --chain-id=32382 \
    --rpc-host=0.0.0.0 \
    --rpc-port=4000 \
    --grpc-gateway-host=0.0.0.0 \
    --grpc-gateway-port=4100 \
    --execution-endpoint="http://localhost:8200" \
    --accept-terms-of-use \
    --jwt-secret="./jwt.hex" \
    --suggested-fee-recipient="0x123463a4b065722e99115d6c222f267d9cabb524" \
    --minimum-peers-per-subnet=0 \
    --p2p-tcp-port=4200 \
    --p2p-udp-port=4300 \
    --monitoring-port=4400 \
    --verbosity="info" \
    --slasher
```

## Step 4: Start the Validator

Run the following command to start the validator:

```sh
./builds/validator \
    --beacon-rpc-provider="0.0.0.0:4000" \
    --datadir="./consensus/validatordata" \
    --accept-terms-of-use \
    --interop-num-validators=1 \
    --rpc-port=7000 \
    --grpc-gateway-port=7100 \
    --monitoring-port=7200 \
    --chain-config-file="./config.yml"
```

## Step 5: Wait for Synchronization

Wait for a while for the node to synchronize with the network. You can check the sync status by running:

```sh
geth attach http://localhost:8000
```

Then, in the Geth console, execute:

```js
eth.syncing;
```

If the command returns `false`, the node is fully synchronized and ready to participate in the network.

## Step 6: Connect Wallet (e.g., MetaMask) to the Network

To connect a wallet like MetaMask to your custom network, follow these steps:

1. Open MetaMask and go to **Settings** > **Networks**.
2. Click **Add a network**.
3. Enter the following details:
   - **Network Name**: Custom PoS Network
   - **New RPC URL**: `http://34.46.205.31:8000`
   - **Chain ID**: `32382`
   - **Currency Symbol**: Custom Token
   - **Block Explorer URL**: (leave blank or provide your explorer URL if available)
4. Click **Save**.

### Add Custom Token

1. In MetaMask, go to the **Assets** tab and click **Import Tokens**.
2. Select **Custom Token** and enter the contract address:
   - **Token Contract Address**: `0xe5B72ec00993FF0Fb6af42D864643Cf24b2C556a`
3. Click **Add Custom Token**, then **Import Tokens**.

Now your wallet is connected to the custom PoS network and can interact with the custom token.

## Conclusion

Following these steps will successfully connect a local development node to an existing PoS network, enabling execution and consensus layers to work together. Ensure to monitor logs for any issues during the sync process.
