import { createContext, ReactNode, useContext, useReducer } from 'react';
import { Item } from './type';

type ShoppingCartContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  clearCart: () => void; // 추가
};

const noop = () => {};

export const ShoppingCartContext = createContext<ShoppingCartContextType>({
  items: [],
  addItem: noop,
  removeItem: noop,
  clearCart: noop,
});

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    items: [],
    totalPrice: 0,
  });

  const addItem = (item: Item) => {
    dispatch({ type: ADD_ITEM, payload: item });
  };

  const removeItem = (item: Item) => {
    dispatch({ type: REMOVE_ITEM, payload: item });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART, payload: {} as Item }); // payload는 안 써도 됨
  };

  return (
    <ShoppingCartContext.Provider
      value={{ items: state.items, addItem, removeItem, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider',
    );
  }
  return context;
};

const initState = {
  items: [],
  totalPrice: 0,
};

type ShoppingCartState = {
  items: Item[];
  totalPrice: number;
};

type ActionType = {
  type: string;
  payload: Item;
};

const shoppingCartReducer = (
  state: ShoppingCartState = initState,
  action: ActionType,
) => {
  switch (action.type) {
    case ADD_ITEM: {
      const item = {
        ...action.payload,
        uniqKey: `${action.payload.id}-${Date.now()}`,
      };
      console.log(item);
      return { ...state, items: [...state.items, item] };
    }

    case REMOVE_ITEM:
      // eslint-disable-next-line no-case-declarations
      const newItems = state.items.filter(
        (item) => item.uniqKey !== action.payload.uniqKey,
      );
      return { ...state, items: newItems };

    case CLEAR_CART:
      return { ...state, items: [] }; // 전체 삭제

    default:
      return state;
  }
};

// ... existing ShoppingCartProvider
export const useTotalPrice = () => {
  const context = useContext<ShoppingCartContextType>(ShoppingCartContext);

  const { items } = context;

  return items.reduce((acc, item) => acc + item.price, 0);
};

// 총 쿠폰 할인 금액
export const useTotalCouponPrice = () => {
  const context = useContext<ShoppingCartContextType>(ShoppingCartContext);
  const { items } = context;

  return items.reduce((acc, item) => acc + (item.couponPrice ?? 0), 0);
};

// 총 배송비
export const useTotalShippingPrice = () => {
  const context = useContext<ShoppingCartContextType>(ShoppingCartContext);
  const { items } = context;

  return items.reduce((acc, item) => acc + (item.shippingPrice ?? 0), 0);
};
