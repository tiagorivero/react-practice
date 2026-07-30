import { useEffect, useState } from 'react'
import confeti from 'canvas-confetti';
import {Square} from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinner } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { checkEndGame } from './logic/board.js';

function App() {
  const [board, setBoard] = useState(() => {
    // obtenemos el tablero guardado en localStorage o inicializamos uno nuevo
    const boardFromStorage = window.localStorage.getItem('board');
    // si hay un tablero guardado, lo parseamos y lo usamos, sino creamos uno nuevo con 9 espacios vacíos
    if(boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    // obtenemos el turno guardado en localStorage o inicializamos con X
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const updateBoard = (index) => {
    // no actualizar si ya hay algo en esa posición
    if(board[index] || winner) return;
    
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn; 
    setBoard(newBoard);

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar aqui partida
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    // chequear si hay ganador
    const newWinner = checkWinner(newBoard);

    if(newWinner){
      setWinner(newWinner);
      confeti();
    } else if(checkEndGame(newBoard)){
      setWinner(false); // empate
    } 
  }

  useEffect(() => {
    console.log('useEffect')
  }, [winner])

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
              {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
