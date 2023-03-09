import CART_TYPES from './CartConstants';

export const addtToCartAction = (data, qty) => ({
  type: CART_TYPES.CART_ADD_ITEM,
  payload: {
    productId: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  },
});
export const removeFromCartAction = (id) => ({
  type: CART_TYPES.CART_REMOVE_ITEM,
  payload: id,
});
export const saveShippingAddressAction = (data) => ({
  type: CART_TYPES.CART_SAVE_SHIPPING_ADDRESS,
  payload: data,
});
export const savePaymentMethodAction = (data) => ({
  type: CART_TYPES.CART_SAVE_PAYMENT_METHOD,
  payload: data,
});

export const clearItemsAction = (data) => ({
  type: CART_TYPES.CART_CLEAR_ITEMS,
  payload: data,
});
