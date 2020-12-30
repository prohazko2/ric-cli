export default function <T>(items: T | T[]) {
  items = Array.isArray(items) ? items : [items];

  console.log(JSON.stringify(items, null, 2));
}
