export const command = "GET";
export const description = "GET /x";

export async function handler(argv) {
  console.log("GET /x", argv);
}
