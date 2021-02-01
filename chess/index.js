import { Board, Game } from 'wasm_chess';

export function runGreet() {
    const game = new Game();
    const state = JSON.parse(game.get_val());
    console.log(state);
    const new_state = JSON.parse(game.get_val());
    console.log(new_state.test2);
}

export function startGame() {
}