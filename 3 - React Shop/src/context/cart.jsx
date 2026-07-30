export const cartInitialState = JSON.parse(localStorage.getItem('cart')) || [];

import  {createContext, useReducer , useEffect} from "react"

export const CartContext = createContext()

// update locallStoarege with state for cart
export const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}


const reducer = (state, action) => {
    const {type: actionType, payload: actionPayLoad} = action;
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { id } = action.payload;
            const productInCartIndex = state.findIndex(item => item.id === id)

            if (productInCartIndex !== -1) {
                const newState = structuredClone(state);
                newState[productInCartIndex].qty += 1;
                return newState;
            }

            return [
                ...state,
                {
                    ...action.payload,
                    qty: 1
                }
            ]
        }   
        case 'REMOVE_FROM_CART': {
            const { id } = action.payload;
            return state.filter(item => item.id !== id)
        }
        case 'CLEAR_CART': {
            return [];
        }
    }

    return state
}

export function CartProvider ({children}) {
    const [state, dispatch] = useReducer(reducer, cartInitialState);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    useEffect(() => {
        updateLocalStorage(state);
    }, [state]);

    return (
        <CartContext.Provider value={{ 
            cart: state, 
            addToCart, 
            removeFromCart,
            clearCart 
        }}
        >
            {children}
        </CartContext.Provider>
    )
}
