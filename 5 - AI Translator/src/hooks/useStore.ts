import { AUTO_LANGUAGE } from '../constants';
import { type Action, type FromLanguage, type State ,type Language } from '../types'
import { useReducer } from 'react'

// 1. Create a initialState
export const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

//2. Create a reducer
export function reducer(state: State, action : Action){
    const { type } = action;
    
    if (type === 'INTERCHANGE_LANGUAGES') {
        //logica del estado dentro del reducer
        // Si el idioma de origen es auto, no se puede intercambiar
        if(state.fromLanguage === AUTO_LANGUAGE) return state;
        
        const loading = state.fromText !== ''

        return {
        ...state,
        loading,
        result: '',
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
        }
    }

    if(type === 'SET_FROM_LANGUAGE') {
        if(state.fromLanguage === action.payload) return state

        const loading = state.fromText !== ''

        return {
        ...state,
        fromLanguage: action.payload, // la informacion que le mandamos
        result: '',
        loading
        }
    }

    if(type === 'SET_TO_LANGUAGE') {
        if(state.toLanguage === action.payload) return state

        const loading = state.fromText !== ''

        return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading
        }
    }

    if(type === 'SET_FROM_TEXT') {
        const loading = state.fromText !== ''

        return {
        ...state,
        fromText: action.payload,
        loading,
        result: ''
        }
    }

    if(type === 'SET_RESULT') {
        return {
        ...state,
        result: action.payload,
        loading: false
        }
    }

    return state;
}

export function useStore() {
    // 3. Usar el hook useReducer
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState)

    const interchangeLanguages = () => {
        dispatch({ type: 'INTERCHANGE_LANGUAGES'})
    }

    const setFromLanguage = (language: FromLanguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload: language })
    }

    const setToLanguage = (language: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload: language })
    }

    const setFromText = (text: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload: text })
    }

    const setResult = (result: string) => {
        dispatch({ type: 'SET_RESULT', payload: result })
    }


    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        dispatch,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult
    }
}