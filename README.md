# Artstock

Artstock will revolutionize 

Raw sketch
Roles:
- User (tokenizes/buys/sells art)
- Guardian (holds physical art, updates NFT)
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

If time: Properties of guardian in soulbound NFT.

Functions needed:
- Mint NFT (user; becomes holder)
- Confirm deposit of physical asset to guardian (guardian): attaches location
- Validate properties (curator)
- Offer on sale (user as holder): setting price, which lists on marketplace
- Deposit crypto in escrow (user as buyer) to purchase offer, automatic refund after X days
- Confirm receipt (buyer) -> redeem NFT after delivery of physical asset by guardian

V1: Buyer needs to trust curator or arrange own curator off-chain

V2: Second curator can be requested on platform and will attest to the NFT

Need to think about escrow time / paying for prolongment.

Works not only for art, but every physical goods (luxury goods, gold).
