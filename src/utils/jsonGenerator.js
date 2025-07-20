export const generateJson = (fields) => {
  const obj = {};
  fields.forEach((field) => {
    if (field.type === "String") obj[field.key] = "string";
    else if (field.type === "Number") obj[field.key] = 0;
    else if (field.type === "Nested") obj[field.key] = generateJson(field.children);
  });
  return obj;
};
