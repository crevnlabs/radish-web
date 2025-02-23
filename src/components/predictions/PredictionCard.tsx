import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Prediction } from "@/types/market";

interface PredictionCardProps {
  prediction: Prediction;
  onClaim: (prediction: Prediction) => Promise<void>;
  isClaiming: boolean;
}

export function PredictionCard({ prediction, onClaim, isClaiming }: PredictionCardProps) {
  return (
    <motion.div
      whileHover={{
        y: 10,
        x: 10,
        filter: "invert(1) hue-rotate(20deg)",
      }}
      className="p-shadow p-6 w-full mb-6 flex flex-col items-center rounded bg-black text-white"
    >
      <h2 className="text-xl font-semibold mb-4">{prediction.marketTitle}</h2>

      <div className="grid grid-cols-2 gap-4 mb-4 mt-auto w-full">
        <div className="bg-green-500/20 p-3">
          <div className="text-sm font-medium">Your Prediction</div>
          <div className="text-lg font-bold text-green-700">
            {(prediction.prediction * 100).toFixed(1)}%
          </div>
        </div>
        <div className="bg-blue-500/20 p-3">
          <div className="text-sm font-medium">Current Market</div>
          <div className="text-lg font-bold text-blue-700">
            {(prediction.currentProbability * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4 w-full">
        <div>
          <span className="font-medium">Predicted On:</span> {prediction.timestamp}
        </div>
        <div>
          <span className="font-medium">Resolves On:</span> {prediction.endDate}
        </div>
      </div>

      <div className="flex w-full justify-between text-sm border-t pt-4 border-zinc-700">
        <div>
          <span className="font-medium">P/L:</span> +$1,234
        </div>
        <div>
          <span className="font-medium">Position:</span> {prediction.position}
        </div>
      </div>

      <div className="flex w-full justify-between text-sm border-t pt-4 border-zinc-700">
        {prediction.resolved && (
          <Button
            className="text-black"
            onClick={() => onClaim(prediction)}
            disabled={isClaiming}
          >
            Claim Winnings
          </Button>
        )}
        <Link href={`/markets/${prediction.marketId}`}>
          <Button className="text-black">View Market</Button>
        </Link>
      </div>
    </motion.div>
  );
} 