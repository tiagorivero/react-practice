import {WINNER_COMBOS} from '../constants';

export const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    for(const combo of WINNER_COMBOS){
        // extraemos el valor de cada posición del tablero
        const [a,b,c] = combo;
        // si alguna de las posiciones es nula, no hay ganador
        if(boardToCheck[a] && 
            boardToCheck[a] === boardToCheck[b] 
            && boardToCheck[a] === boardToCheck[c]){
            return boardToCheck[a];
        }
    }
        return null;
    }

export const checkEndGame = (newBoard) => {
    // revisamos si no hay más espacios vacíos
    return newBoard.every(square => square !== null);
}