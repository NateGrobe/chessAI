// classic minimax algorithm
// maybe make this a feature later when displaying stats

// function minimax(game, depth, isMaximizingPlayer, sum, color) {
//   let maxVal = Number.NEGATIVE_INFINITY;
//   let minVal = Number.POSITIVE_INFINITY;
//   let currentMove, bestMove;
//   positionCount++;

//   const children = game.ugly_moves({ verbose: true });
//   children.sort(() => 0.5 - Math.random());
  
//   if (depth === 0 || children.length === 0) return [null, sum];

//   for (let i = 0; i < children.length; i++) {
//     currentMove = children[i];

//     const currPrettyMove = game.ugly_move(currentMove);
//     const newSum = evaluateBoard(game, currPrettyMove, sum, color);
//     const [_, childVal] = minimax(
//       game,
//       depth - 1,
//       !isMaximizingPlayer,
//       newSum,
//       color
//     );

//     game.undo();

//     if (isMaximizingPlayer) {
//       if (childVal > maxVal) {
//         maxVal = childVal;
//         bestMove = currPrettyMove;
//       }
//     } else {
//       if (childVal < minVal) {
//         minVal = childVal;
//         bestMove = currPrettyMove;
//       }
//     }
//   }

//   if (isMaximizingPlayer) return [bestMove, maxVal];
//   return [bestMove, minVal];
// }

// minimax with alpha beta pruning
function minimaxAB(game, depth, alpha, beta, isMaximizingPlayer, sum, color) {
  let maxVal = Number.NEGATIVE_INFINITY;
  let minVal = Number.POSITIVE_INFINITY;
  let currentMove, bestMove;
  positionCount++;
  const children = game.ugly_moves({ verbose: true });

  children.sort(() => 0.5 - Math.random());

  if (depth === 0 || children.length === 0) {
    return [null, sum];
  }

  for (let i = 0; i < children.length; i++) {
    currentMove = children[i];

    const currPrettyMove = game.ugly_move(currentMove);
    const newSum = evaluateBoard(game, currPrettyMove, sum, color);
    const [_, childValue] = minimaxAB(
      game,
      depth - 1,
      alpha,
      beta,
      !isMaximizingPlayer,
      newSum,
      color
    );

    game.undo();

    if (isMaximizingPlayer) {
      if (childValue > maxVal) {
        maxVal = childValue;
        bestMove = currPrettyMove;
      }
      if (childValue > alpha) {
        alpha = childValue;
      }
    } else {
      if (childValue < minVal) {
        minVal = childValue;
        bestMove = currPrettyMove;
      }
      if (childValue < beta) {
        beta = childValue;
      }
    }

    if (alpha >= beta) break;
  }

  if (isMaximizingPlayer) return [bestMove, maxVal];

  return [bestMove, minVal];
}

// optimization attempt, in progress...
function wikiMax(game, depth, maximizingPlayer, sum, color) {
  positionCount++;

  const children = game.ugly_moves({ verbose: true });
  children.sort(() => 0.5 - Math.random());

  if (depth === 0 || children.length === 0) return [null, sum];

  if (maximizingPlayer) {
    let value = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < children.length; i++) {
      value = Math.max(value, wikiMax(game,));
    }
  } else {
  }
}