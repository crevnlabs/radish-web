import { memo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResolutionDialogProps {
  isLoading: boolean;
  onResolve: (proof: string, resolution: boolean) => Promise<void>;
}

export const ResolutionDialog = memo(({ isLoading, onResolve }: ResolutionDialogProps) => {
  const [proof, setProof] = useState("");
  const [resolveValue, setResolveValue] = useState("Yes");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full text-white mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Resolving..." : "Resolve the market"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resolving the market</DialogTitle>
          <DialogDescription>
            Are you sure you want to resolve this market?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="proof" className="sr-only">Proof</Label>
            <Input
              id="proof"
              placeholder="Enter the proof here"
              onChange={(e) => setProof(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            <Label htmlFor="proof" className="sr-only">Favour</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Favour</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Choose Who won</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={resolveValue}
                  onValueChange={setResolveValue}
                >
                  <DropdownMenuRadioItem value="Yes">Yes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="No">No</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onResolve(proof, resolveValue === "Yes")}
              disabled={isLoading}
            >
              {isLoading ? "Resolving..." : "Resolve"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}); 