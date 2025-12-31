export function generateSlug(name: string) {
  const params1 = "1234567890";
  const params2 = "abcdefghij";
  let slug = name + "-";

  for (let i = 0; i < params1.length; i++) {
    let random = (Math.random() * 10).toFixed(0);
    slug += params1[parseInt(random)];
  }

  for (let i = 0; i < params2.length; i++) {
    let random = (Math.random() * 10).toFixed(0);
    slug += params2[parseInt(random)];
  }

  return slug;
}
