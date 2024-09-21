# Artstock

Artstock will revolutionize the art market by tokenizing physical art: a more transparent and secure way to buy and sell art. Artstock makes possible the tracking of provenance and authenticity of art pieces through curators, therefore making it easier to verify the history of artworks. Artstock also features a secondary market for art, allowing for the trading of art pieces in a secure and transparent manner. The physical items have to be held by a guardian in order to go through careful curation, before they can be traded on our market using an escrow smart contract. The token can be redeemed for physical delivery at any time.

Tech stack: Build on the Rootstock blockchain to get the security and liquidity of Bitcoin, while having the smart contrtact possibilities of an EVM. Login (both web2 and web3) are powered by Dynamic to make the user experience easy and screen for sanctioned wallets. Smart contracts in Solidity. Frontend in React with Next.js. 

## Raw sketch
Target users:
- Art holder (tokenizes/buys/sells art)
- Guardian of the physical asset (holds physical art, updates NFT)
- Curator (checks art, updates NFT)

Properties of art NFT:
- Title: string
- Description: string 
- Location (blank till guardian confirm): empty or string
- Image IPFS link: string
- Author: string
- Guardian: empty or wallet address
- Guardian Company name: empty or string
- Guardian Company LEIR: empty or string
- Guardian Website to verify: empty or string
- CuratedBy: empty or wallet address of curator

Functions needed:
- Mint NFT (user; becomes holder)
- Confirm deposit of physical asset to guardian (guardian): attaches location
- Validate properties (curator)
- Offer on sale (user as holder): setting price, which lists on marketplace
- Deposit crypto in escrow (user as buyer) to purchase offer, automatic refund after X days
- Confirm receipt (buyer) -> redeem NFT after delivery of physical asset by guardian

## How to run
1. Clone the repository
2. Run `npm install` in the root directory
3. Prepare the Dynamic integration
   1. <a href="https://app.dynamic.xyz/" target="_blank">Create a Dynamic account</a>
   2. <a href="https://app.dynamic.xyz/dashboard/developer/api" target="_blank">Create an API token and put it in the environment variable `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` 
   3. <span style="color:red">Various</span> https://app.dynamic.xyz/dashboard/log-in-user-profile settings
   4.  <a href="https://app.dynamic.xyz/dashboard/configurations" target="_blank">Enable Chainalysis</a>: "Block access to sanctioned wallets"
   5. <a href="https://app.dynamic.xyz/dashboard/security" target="_blank">Security settings</a>: Under "Domains" enable "CORS Origin" (for localhost add http(s) and port as well) 
   6. <a href="https://app.dynamic.xyz/dashboard/security" target="_blank">Security settings</a>: <span style="color:red">Enable Account MFA</span>
4. Run `npm run start` in the root directory 
5. Open `localhost:3000` in your browser
6. Login by either an e-mail address/social media or by connecting your wallet (e.g. Metamask) to the RSK testnet
7. <span style="color:red">You can now mint an NFT, confirm the deposit of a physical asset, validate the properties of the art piece, offer the art piece for sale, deposit crypto in escrow, confirm receipt and redeem the NFT</span>

## Future development
- V1: Buyer needs to trust curator or arrange own curator off-chain<br>
- V2: Second curator can be requested on platform and will attest to the NFT

- Need to think about escrow time / paying for prolongment.

- The tokenization of art will allow for fractional ownership of art pieces, making art more accessible to a wider audience.

- Works not only for art, but every physical goods (luxury goods, gold). 

- Adding onramp to Dynamic in order to let a web2 user pay with fiat

- Add the properties of a guardian/curator in a soulbound NFT.

## Todo before submission
- Fill frontend with images
- Add forms for all smart contract interactions and connect to the blockchain calls
  - Mint NFT (mintArt)
  - depositPayment
  - Test all smart contract interactions
- Add listing page for all NFTs with price
- Fill frontend with text 
- Rename NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID to DYNAMIC_ENVIRONMENT_ID (in code, env and above in readme)
- Pinata IPFS
- Check bounty requirements
- Finish readme
- Open up Github repo
- Prepare submission form
- Pitch desk Rootstock & Dynamic
