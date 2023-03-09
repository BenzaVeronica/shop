import CART_TYPES from './CartConstants';

const defaultState = { cartItems: [], shippingAddress: {} };

export const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CART_TYPES.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.productId === item.productId);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.productId === existItem.productId ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_TYPES.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.productId !== action.payload),
      };
    case CART_TYPES.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_TYPES.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_TYPES.CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
