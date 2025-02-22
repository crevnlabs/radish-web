import { request, gql } from "graphql-request";
import { SUBGRAPH_URL } from "@/config/contracts";

export const getPosition = async (
  user: string,
  chainId: number,
  marketId: string
) => {
  try {
    const query = gql`
      query MyQuery {
        userMarkets(
          where: {
            user_: { id: "0x4b4b30e2E7c6463b03CdFFD6c42329D357205334" }
            market_: { id: "0" }
          }
        ) {
          market {
            totalNo
            totalYes
          }
          noInMarket
          yesInMarket
        }
      }
    `;
    const data: any = await request(SUBGRAPH_URL[chainId], query);
    console.log(data.userMarkets);
    return data.userMarkets;
  } catch (error) {
    console.log(error);
  }
};
