import * as crypto from "crypto";

export const hashPassword = (password, hashConfig) => {
  const {
    base64SignerKey,
    base64SaltSeparator,
    rounds,
    memCost,
  } = hashConfig;

  const saltSeparator = Buffer.from(base64SaltSeparator, "base64");
  const signerKey = Buffer.from(base64SignerKey, "base64");
  const salt = crypto.randomBytes(16); // Generate a random salt for additional entropy

  // Combine password and saltSeparator
  const passwordSalt = Buffer.concat([Buffer.from(password), saltSeparator, salt]);

  // Derive the hash using the SCRYPT algorithm
  const derivedKey = crypto.scryptSync(passwordSalt, signerKey, 64, {
    N: 2 ** memCost, // CPU/memory cost parameter
    r: 8,            // Block size
    p: 1,            // Parallelization parameter
  });

  // Return the derived key (hash) in base64 format
  return {
    hash: derivedKey.toString("base64"),
    salt: salt.toString("base64"), // Store salt to verify the password later
  };
};

export const hashConfig = {
  algorithm: "SCRYPT", // This is informational, not used in the code
  base64SignerKey:
    "YUIRFnT3FUQhR0P8GXt7TCj7GXbaERDfZiPoANFxYxVMrjHOLdep4hK68A0sRz+DhUxAUebSKRV4r5ehfrBozA==",
  base64SaltSeparator: "Bw==",
  rounds: 64, // Length of derived key
  memCost: 14, // Memory cost (2^memCost)
};
