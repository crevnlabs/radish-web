import { Trade } from "@/types/market";

export const mockTrades: Trade[] = [
  {
    type: "buy",
    outcome: "yes",
    amount: 1000,
    price: 0.65,
    timestamp: "2023-12-24 10:30",
    trader: "0x1234...5678",
  },
  {
    type: "sell",
    outcome: "no",
    amount: 500,
    price: 0.35,
    timestamp: "2023-12-24 09:15",
    trader: "0x8765...4321",
  },
  {
    type: "buy",
    outcome: "yes",
    amount: 2000,
    price: 0.64,
    timestamp: "2023-12-23 22:45",
    trader: "0x9876...1234",
  },
]; 