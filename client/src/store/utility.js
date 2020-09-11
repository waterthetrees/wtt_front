export const updateObject = (oldObject, updateObject) => ({
  ...oldObject,
  ...updateObject,
});

export const seo = (data = {}) => {
  data.title = data.title || "Water the Trees";
  data.metaDescription = data.metaDescription || "Water the Trees";
  document.title = data.title;
};
