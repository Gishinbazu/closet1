import { scryptSync } from "crypto";
import { hashConfig } from "./hashConfig";

export function hashPassword(password, salt) {
  const { base64SaltSeparator, memCost, rounds } = hashConfig;

  // Convert the salt separator and combine it with the provided salt
  const saltSeparator = Buffer.from(base64SaltSeparator, "base64");
  const saltWithSeparator = Buffer.concat([
    Buffer.from(salt, "utf-8"), // Convert salt to Buffer
    saltSeparator,              // Append the separator
  ]);

  const keyLength = 32; // Firebase standard derived key length (32 bytes)

  // Use scryptSync for hashing
  return scryptSync(password, saltWithSeparator, keyLength, {
    N: Math.pow(2, memCost), // CPU and memory cost
    r: rounds,              // Block size
    p: 1,                   // Parallelization factor
  }).toString("base64"); // Convert derived key to base64 for storage
}