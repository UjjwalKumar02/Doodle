export function generateSlug(name: string) {
  const params1 = "1a2b3c4d5e";
  const params2 = "6f7g8h9i0j";
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
