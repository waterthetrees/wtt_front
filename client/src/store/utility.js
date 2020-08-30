export const updateObject = (oldObject, updateObject) => ({
  ...oldObject,
  ...updateObject,
});

export const seo = (data = {}) => {
  data.title = data.title || "TREEME";
  data.metaDescription = data.metaDescription || "TREEME";
  document.title = data.title;
};
