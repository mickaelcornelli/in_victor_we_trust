import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const extractPlayerIdFromImageUrl = (imageUrl) =>{
  // Trouver l'index du dernier "/"
  const lastSlashIndex = imageUrl.lastIndexOf("/");

  // Extraire la sous-chaîne après le dernier "/"
  const playerIdWithExtension = imageUrl.substring(lastSlashIndex + 1);

  // Trouver l'index du dernier "."
  const lastDotIndex = playerIdWithExtension.lastIndexOf(".");

  // Extraire la sous-chaîne avant le dernier "."
  const playerId = playerIdWithExtension.substring(0, lastDotIndex);

  return playerId;
}
