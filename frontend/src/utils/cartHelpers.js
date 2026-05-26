export const getProductId = (item) =>
  item.product?._id || item.product;

export const getItemPrice = (item) =>
  item.price ?? item.product?.price ?? 0;

export const getItemName = (item) =>
  item.name || item.product?.name || "Product";

export const getItemImage = (item) =>
  item.images ||
  item.product?.images?.[0] ||
  (Array.isArray(item.product?.image)
    ? item.product.image[0]
    : item.product?.image) ||
  "";

export const getLineTotal = (item) =>
  getItemPrice(item) * (item.quantity || 1);

export const getCartSubtotal = (cart) =>
  cart.reduce((sum, item) => sum + getLineTotal(item), 0);

export const buildOrderItems = (cart) =>
  cart.map((item) => ({
    productId: getProductId(item),
    quantity: item.quantity,
    size: item.size,
    image: getItemImage(item),
    name: getItemName(item),
    price: getItemPrice(item),
  }));
