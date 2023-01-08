import Cookies from 'js-cookie'
import { createContext, useReducer } from "react"

export const Store = createContext();

const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [], shippingAddress: {} }
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            // Gettting new Data from the Action
            const newItem = action.payload;
            // Checking if the item already exists in our cart
            const existItem = state.cart.cartItems.find((item) => item.slug == newItem.slug);

            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item.name === existItem.name ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_CLEAR_ITEM': {
            return { ...state, cart: { ...state.cart, cartItems: [] } };
        }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => { item.slug !== action.payload.slug });
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_RESET':
            return {
                ...state,
                cart: {
                    cartItems: [],
                    shippingAddress: { location: {} },
                    paymentMethod: '',
                },
            };

        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: {
                        ...state.cart.shippingAddress,
                        ...action.payload,
                    }
                }
            };

        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload,
                }
            };

        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload,
                },
            };
        default:
            return state;
    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    // Store.Provider is comming from the useContext hook 
    return <Store.Provider value={value}>{children}</Store.Provider>;
}



