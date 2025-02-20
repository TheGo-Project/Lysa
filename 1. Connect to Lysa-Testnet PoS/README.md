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
    --bootnodes "enode://c7489772eb8cb8346c1253f423ed12fc6140a1b24d854fc416b6644c007931c524f9cdf96193f8d3aee8e316b70c150dea233aebf6feb3c9ce813971b178c593@34.46.205.31:8400,enode://ba8f8227271f0e5236770159c6c6e396d9d69507bc91e91c2707a88725eeb0c668f531f761ad69ed1a2aac0e85777879a796eb5a30d3bec299ba335e709dd939@34.46.205.31:8401,enode://b8002ed2e6b31e5b3fc55655c2f67ef6723175be76eabf4fdecd7550512d9ee4f08fae726d86bed0c78ca09d60ff5cbc6f037bde5d684698f1ebbee97926c0c0@34.46.205.31:8402,enode://aaf4c069eaa55314fd325ac6e15770286527daf5007f8aae3620e3025debc49dc195e0f93820d3990358f6c521039981c25fc9027eeb06f47e3fe2c184494e27@34.46.205.31:30301" \
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
    --bootstrap-node="enr:-MK4QEPyMDqx01Di2oPZ11lTmxHML-zZzhBZImbE5DWmaFiXWPqQC8CpDj2k1Bf75jj8AZXcW_ys8B5LtMoTbnaJdmCGAZUk8TEsh2F0dG5ldHOIAAAAAAAAAwCEZXRoMpAc7vlaIAAAlP__________gmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQNnokiDpRTr4D4DNySwUCRP3Ii47xI3fKRiTjAZcpBGcYhzeW5jbmV0cw-DdGNwghBog3VkcIIQzA" \
    --bootstrap-node="enr:-KO4QFNtkDtXX7O5xaXGezjlSKAH9uZVNegkN7nKFFWt5CySId9TCPkt_vg_QoHjCxW3JDc0yLpqv9nLPdOqv0BnMSGGAZUk8Rzag2V0aMfGhG3vOb-AgmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQPHSJdy64y4NGwSU_Qj7RL8YUChsk2FT8QWtmRMAHkxxYRzbmFwwIN0Y3CCINCDdWRwgiDQ" \
    --bootstrap-node="enr:-KO4QG-GThvbW9jxO0M7CET1SiWd2yHJH2U9iAY3Y61Qt1vFKAX4ihQjw9je9o4qWhy4mk2Du3etnmV_gbPDk0q4qjyGAZUk8Wnjg2V0aMfGhG3vOb-AgmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQO6j4InJx8OUjZ3AVnGxuOW2daVB7yR6RwnB6iHJe6wxoRzbmFwwIN0Y3CCINGDdWRwgiDR" \
    --bootstrap-node="enr:-KO4QNHoBbdMDls41XDBWe8YGIdQ9qIY56BEG_AxBJpmWfdvMv4vGEivOOwepjzNUFbrdRLCiCfSeInKyEmRijZ8FrWGAZUk8aSng2V0aMfGhG3vOb-AgmlkgnY0gmlwhCIuzR-Jc2VjcDI1NmsxoQK4AC7S5rMeWz_FVlXC9n72cjF1vnbqv0_ezXVQUS2e5IRzbmFwwIN0Y3CCINKDdWRwgiDS" \
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
