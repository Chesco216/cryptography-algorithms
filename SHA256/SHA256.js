const btn_encrypt = document.querySelector(".encrypt");
const encripted_message = document.querySelector(".encripted-message");
const message_input = document.querySelector(".input");
const long_mess = document.querySelector(".encr-long");


function SHA256(message) {
  function rightRotate(n, x) {
    return (x >>> n) | (x << (32 - n));
  }

  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  function preprocessMessage(message) {
    const bitLength = message.length * 8;

    // Append padding
    message += String.fromCharCode(0x80);
    while (message.length % 64 !== 56) {
      message += String.fromCharCode(0x00);
    }

    // Append bit length
    message += String.fromCharCode((bitLength >>> 56) & 0xff);
    message += String.fromCharCode((bitLength >>> 48) & 0xff);
    message += String.fromCharCode((bitLength >>> 40) & 0xff);
    message += String.fromCharCode((bitLength >>> 32) & 0xff);
    message += String.fromCharCode((bitLength >>> 24) & 0xff);
    message += String.fromCharCode((bitLength >>> 16) & 0xff);
    message += String.fromCharCode((bitLength >>> 8) & 0xff);
    message += String.fromCharCode(bitLength & 0xff);

    return message;
  }

  const blocks = [];
  const paddedMessage = preprocessMessage(message);
  for (let i = 0; i < paddedMessage.length; i += 64) {
    blocks.push(paddedMessage.slice(i, i + 64));
  }

  let [a, b, c, d, e, f, g, h] = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
    0x1f83d9ab, 0x5be0cd19,
  ];

  for (const block of blocks) {
    const words = [];
    for (let i = 0; i < 64; i += 4) {
      words.push(
        (block.charCodeAt(i) << 24) |
          (block.charCodeAt(i + 1) << 16) |
          (block.charCodeAt(i + 2) << 8) |
          block.charCodeAt(i + 3)
      );
    }

    for (let i = 16; i < 64; i++) {
      const s0 =
        rightRotate(7, words[i - 15]) ^
        rightRotate(18, words[i - 15]) ^
        (words[i - 15] >>> 3);
      const s1 =
        rightRotate(17, words[i - 2]) ^
        rightRotate(19, words[i - 2]) ^
        (words[i - 2] >>> 10);
      words[i] = (words[i - 16] + s0 + words[i - 7] + s1) & 0xffffffff;
    }

    let [A, B, C, D, E, F, G, H] = [a, b, c, d, e, f, g, h];
    for (let i = 0; i < 64; i++) {
      const S1 = rightRotate(6, E) ^ rightRotate(11, E) ^ rightRotate(25, E);
      const ch = (E & F) ^ (~E & G);
      const temp1 = (H + S1 + ch + K[i] + words[i]) & 0xffffffff;
      const S0 = rightRotate(2, A) ^ rightRotate(13, A) ^ rightRotate(22, A);
      const maj = (A & B) ^ (A & C) ^ (B & C);
      const temp2 = (S0 + maj) & 0xffffffff;

      H = G;
      G = F;
      F = E;
      E = (D + temp1) & 0xffffffff;
      D = C;
      C = B;
      B = A;
      A = (temp1 + temp2) & 0xffffffff;
    }

    a = (a + A) & 0xffffffff;
    b = (b + B) & 0xffffffff;
    c = (c + C) & 0xffffffff;
    d = (d + D) & 0xffffffff;
    e = (e + E) & 0xffffffff;
    f = (f + F) & 0xffffffff;
    g = (g + G) & 0xffffffff;
    h = (h + H) & 0xffffffff;
  }

  const hash = [a, b, c, d, e, f, g, h]
    .map((n) => ("00000000" + n.toString(16)).slice(-8))
    .join("");

  return hash;
}

// Example usage:

// Events

btn_encrypt.addEventListener("click", () => {
    const message = message_input.value;
    const hashedMessage = SHA256(message);
    encripted_message.innerHTML = hashedMessage;
    long_mess.innerHTML = hashedMessage.length;
  });
  
