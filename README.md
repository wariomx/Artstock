# Artstock

Artstock will revolutionize the art market by tokenizing physical art: a more transparent and secure way to buy and sell art. Artstock makes possible the tracking of provenance and authenticity of art pieces through curators, therefore making it easier to verify the history of artworks. Artstock also features a secondary market for art, allowing for the trading of art pieces in a secure and transparent manner. The physical items have to be held by a guardian in order to go through careful curation, before they can be traded on our market using an escrow smart contract. The token can be redeemed for physical delivery at any time.

Build by Mario: a lawyer from Mexico. And by Remco, a tax lawyer turned cryptocurrency from The Netherlands.

Tech stack: Build on the Rootstock blockchain to get the security and liquidity of Bitcoin, while having the smart contract possibilities of an EVM. This worked pretty good due to EVM-compatibility, while deploying faced outages from RPC and explorers. <br>
Login (both web2 and web3) are powered by Dynamic to make the user experience easy for non-crypto users (at least the curators and guardians) and screen for sanctioned wallets when paying.<br>
Smart contracts in Solidity. Frontend in React with Next.js.

## Overview
Target users:
- Art investor (tokenizes/buys/sells art)
- Guardian of the physical asset (holds physical art, updates NFT)
- Curator (checks art, updates NFT)

Flow:
- Art holder will mint NFT
- The guardian will confirm the deposit of the physical asset: attaches location to the NFT
- The curator will validate properties
- Art holder can offer the art on sale by setting a price, which lists on marketplace
- Buyer will deposit crypto in escrow in order to buy
- The buyer will confirm receipt of the physical asset or cancels the transaction in order to get the deposit back

## How to run
1. Clone the repository
2. Run yarn install in the artstock-front directory
3. Prepare the Dynamic integration
   1. <a href="https://app.dynamic.xyz/" target="_blank">Create a Dynamic account</a>
   2. <a href="https://app.dynamic.xyz/dashboard/developer/api" target="_blank">Create an API token and put it in the environment variable NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID
   3.  <a href="https://app.dynamic.xyz/dashboard/configurations" target="_blank">Enable Chainalysis</a>: "Block access to sanctioned wallets"
   4. Run yarn dev in the root directory
5. Open localhost:3000 in your browser
6. Login by either an e-mail address/social media or by connecting your wallet (e.g. Metamask) to the RSK testnet
7. You can now test the flow to mint an NFT, confirm the deposit of a physical asset, validate the properties of the art piece, offer the art piece for sale, deposit crypto in escrow, confirm receipt and redeem the NFT.

## Future development
- Finishing marketplace
- Implement an increment for tokenId, instead of manually filling in the tokenId
- Better UI/UX
- The tokenization of art will allow for fractional ownership of art pieces, making art more accessible to a wider audience.
- Works not only for art, but every physical goods (luxury goods, gold).
- Adding onramp to Dynamic in order to let a web2 user pay with fiat
- Add the properties of a guardian/curator in a soulbound NFT.
- Bridge BTC to RSK to pay for the art piece