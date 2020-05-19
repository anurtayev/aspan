export const parent = (id: string) => {
  const elements = id.split("/");
  return elements.length === 2 ? "/" : elements.slice(0, -1).join("/");
};
