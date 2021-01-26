var Tile = (function () {
    function Tile(x, y) {
        this.x = x;
        this.y = y;
        this.active = false;
    }
    Tile.prototype.setActive = function () {
        this.active = true;
    };
    Tile.prototype.setInactive = function () {
        this.active = false;
    };
    return Tile;
}());
var Board = (function () {
    function Board() {
        this.tiles = [];
        for (var i = 0; i < 8; i++) {
            var row = [];
            for (var j = 0; j < 8; j++) {
                row.push(new Tile(j, i));
            }
            this.tiles.push(row);
        }
    }
    Board.prototype.draw = function (pieces, whiteTurn) {
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var x = 125 * i;
                var y = 125 * j;
                var colour = (i - j) % 2 === 0 ? color(240, 240, 240) : color(15, 15, 15);
                var activePiece = pieces.filter(function (p) { return p.x === j && p.y === i; })[0];
                if (activePiece) {
                    if (this_1.tiles[j][i].active && (activePiece.colour === 'white') === whiteTurn) {
                        colour = (i - j) % 2 === 0 ? color(200, 200, 200) : color(55, 55, 55);
                    }
                }
                stroke(0, 0, 0);
                strokeWeight(1);
                fill(colour);
                square(x, y, 125);
            };
            for (var j = 0; j < 8; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < 8; i++) {
            _loop_1(i);
        }
    };
    return Board;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Piece = (function () {
    function Piece() {
    }
    Piece.prototype.draw = function () {
        var coords = [this.x * 125 + 50, this.y * 125 + 85];
        fill(this.colorToString(this.colour));
        strokeWeight(2);
        this.colour === 'white' ? stroke(0) : stroke(255);
        textSize(50);
        text(this.name, coords[0], coords[1]);
    };
    Piece.prototype.inCheck = function (pieces, newX, newY) {
        return false;
    };
    Piece.prototype.colorToString = function (colour) {
        return colour === 'black' ? color(0, 0, 0) : color(255, 255, 255);
    };
    Piece.prototype.movePiece = function (newX, newY, pieces) {
        return pieces;
    };
    return Piece;
}());
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(colour, x, y) {
        var _this = _super.call(this) || this;
        _this.name = 'P';
        _this.colour = colour;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Pawn.prototype.movePiece = function (newX, newY, pieces) {
        var blocked = false;
        if (this.colour === 'white') {
            if (this.y === 1 && newX === this.x && (newY === this.y + 1 || newY === this.y + 2)) {
                for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                    var p = pieces_1[_i];
                    if ((p.y === this.y + 1 && p.x === this.x) || (p.x === newX && p.y === newY)) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newY === this.y + 1 && newX === this.x) {
                for (var _a = 0, pieces_2 = pieces; _a < pieces_2.length; _a++) {
                    var p = pieces_2[_a];
                    if (p.x === newX && p.y === newY) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newX === this.x + 1 && newY === this.y + 1 || newX === this.x - 1 && newY === this.y + 1) {
                var _loop_3 = function (p) {
                    if ((p.x === newX && p.y === newY) && p.colour !== this_2.colour) {
                        pieces = pieces.filter(function (rp) { return rp !== p; });
                        blocked = false;
                        return "break";
                    }
                    blocked = true;
                };
                var this_2 = this;
                for (var _b = 0, pieces_3 = pieces; _b < pieces_3.length; _b++) {
                    var p = pieces_3[_b];
                    var state_1 = _loop_3(p);
                    if (state_1 === "break")
                        break;
                }
            }
            else {
                blocked = true;
            }
        }
        else {
            if (this.y === 6 && newX === this.x && (newY === this.y - 1 || newY === this.y - 2)) {
                for (var _c = 0, pieces_4 = pieces; _c < pieces_4.length; _c++) {
                    var p = pieces_4[_c];
                    if ((p.y === this.y - 1 && p.x === this.x) || (p.x === newX && p.y === newY)) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newY === this.y - 1 && newX === this.x) {
                for (var _d = 0, pieces_5 = pieces; _d < pieces_5.length; _d++) {
                    var p = pieces_5[_d];
                    if (p.x === newX && p.y === newY) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newX === this.x + 1 && newY === this.y - 1 || newX === this.x - 1 && newY === this.y - 1) {
                var _loop_4 = function (p) {
                    if ((p.x === newX && p.y === newY) && p.colour !== this_3.colour) {
                        pieces = pieces.filter(function (rp) { return rp !== p; });
                        blocked = false;
                        return "break";
                    }
                    blocked = true;
                };
                var this_3 = this;
                for (var _e = 0, pieces_6 = pieces; _e < pieces_6.length; _e++) {
                    var p = pieces_6[_e];
                    var state_2 = _loop_4(p);
                    if (state_2 === "break")
                        break;
                }
            }
            else {
                blocked = true;
            }
        }
        if (!blocked) {
            this.x = newX;
            this.y = newY;
        }
        return pieces;
    };
    return Pawn;
}(Piece));
var Rook = (function (_super) {
    __extends(Rook, _super);
    function Rook(colour, x, y) {
        var _this = _super.call(this) || this;
        _this.name = 'R';
        _this.colour = colour;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Rook.prototype.movePiece = function (newX, newY, pieces) {
        var blocked = false;
        var piecesCopy = pieces;
        if (newY > this.y && newX === this.x) {
            for (var i = this.y; i <= newY; i++) {
                var _loop_5 = function (p) {
                    if ((p.y === i && p.x === this_4.x) && i !== this_4.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_4.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_4 = this;
                for (var _i = 0, pieces_7 = pieces; _i < pieces_7.length; _i++) {
                    var p = pieces_7[_i];
                    var state_3 = _loop_5(p);
                    if (state_3 === "break")
                        break;
                }
            }
        }
        else if (newY < this.y && newX === this.x) {
            for (var i = this.y; i >= newY; i--) {
                var _loop_6 = function (p) {
                    if ((p.y === i && p.x === this_5.x) && i !== this_5.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_5.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_5 = this;
                for (var _a = 0, pieces_8 = pieces; _a < pieces_8.length; _a++) {
                    var p = pieces_8[_a];
                    var state_4 = _loop_6(p);
                    if (state_4 === "break")
                        break;
                }
            }
        }
        else if (newX > this.x && newY === this.y) {
            for (var i = this.x; i <= newX; i++) {
                var _loop_7 = function (p) {
                    if ((p.x === i && p.y === this_6.y) && i !== this_6.x) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_6.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_6 = this;
                for (var _b = 0, pieces_9 = pieces; _b < pieces_9.length; _b++) {
                    var p = pieces_9[_b];
                    var state_5 = _loop_7(p);
                    if (state_5 === "break")
                        break;
                }
            }
        }
        else if (newX < this.x && newY === this.y) {
            for (var i = this.x; i >= newX; i--) {
                var _loop_8 = function (p) {
                    if ((p.x === i && p.y === this_7.y) && i !== this_7.x) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_7.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_7 = this;
                for (var _c = 0, pieces_10 = pieces; _c < pieces_10.length; _c++) {
                    var p = pieces_10[_c];
                    var state_6 = _loop_8(p);
                    if (state_6 === "break")
                        break;
                }
            }
        }
        else {
            blocked = true;
        }
        if (!blocked) {
            this.x = newX;
            this.y = newY;
            return pieces;
        }
        return piecesCopy;
    };
    return Rook;
}(Piece));
var Bishop = (function (_super) {
    __extends(Bishop, _super);
    function Bishop(colour, x, y) {
        var _this = _super.call(this) || this;
        _this.name = 'B';
        _this.colour = colour;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Bishop.prototype.movePiece = function (newX, newY, pieces) {
        var blocked = false;
        var piecesCopy = pieces;
        if (newX > this.x && newY > this.y) {
            for (var i = this.y; i <= newY; i++) {
                var _loop_9 = function (p) {
                    if ((p.y === i && p.x === this_8.x + (i - this_8.y)) && i !== this_8.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_8.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_8 = this;
                for (var _i = 0, pieces_11 = pieces; _i < pieces_11.length; _i++) {
                    var p = pieces_11[_i];
                    var state_7 = _loop_9(p);
                    if (state_7 === "break")
                        break;
                }
            }
        }
        else if (newX > this.x && newY < this.y) {
            for (var i = this.y; i >= newY; i--) {
                var _loop_10 = function (p) {
                    if ((p.y === i && p.x === this_9.x + (this_9.y - i)) && i !== this_9.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_9.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_9 = this;
                for (var _a = 0, pieces_12 = pieces; _a < pieces_12.length; _a++) {
                    var p = pieces_12[_a];
                    var state_8 = _loop_10(p);
                    if (state_8 === "break")
                        break;
                }
            }
        }
        else if (newX < this.x && newY > this.y) {
            for (var i = this.y; i <= newY; i++) {
                var _loop_11 = function (p) {
                    if ((p.y === i && p.x === this_10.x - (i - this_10.y)) && i !== this_10.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_10.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_10 = this;
                for (var _b = 0, pieces_13 = pieces; _b < pieces_13.length; _b++) {
                    var p = pieces_13[_b];
                    var state_9 = _loop_11(p);
                    if (state_9 === "break")
                        break;
                }
            }
        }
        else if (newX < this.x && newY < this.y) {
            for (var i = this.y; i >= newY; i--) {
                var _loop_12 = function (p) {
                    if ((p.y === i && p.x === this_11.x - (this_11.y - i)) && i !== this_11.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_11.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_11 = this;
                for (var _c = 0, pieces_14 = pieces; _c < pieces_14.length; _c++) {
                    var p = pieces_14[_c];
                    var state_10 = _loop_12(p);
                    if (state_10 === "break")
                        break;
                }
            }
        }
        else {
            blocked = true;
        }
        if (!blocked) {
            this.x = newX;
            this.y = newY;
            return pieces;
        }
        return piecesCopy;
    };
    return Bishop;
}(Piece));
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(colour, x, y) {
        var _this = _super.call(this) || this;
        _this.name = 'H';
        _this.colour = colour;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Knight.prototype.movePiece = function (newX, newY, pieces) {
        var blocked = false;
        if ((Math.abs(newX - this.x) === 2 && Math.abs(newY - this.y) === 1) || (Math.abs(newY - this.y) === 2 && Math.abs(newX - this.x) === 1)) {
            var _loop_13 = function (p) {
                if ((p.x === newX && p.y === newY) && p.colour !== this_12.colour) {
                    pieces = pieces.filter(function (rp) { return rp !== p; });
                    return "break";
                }
                else if ((p.x === newX && p.y === newY) && p.colour === this_12.colour) {
                    blocked = true;
                    return "break";
                }
            };
            var this_12 = this;
            for (var _i = 0, pieces_15 = pieces; _i < pieces_15.length; _i++) {
                var p = pieces_15[_i];
                var state_11 = _loop_13(p);
                if (state_11 === "break")
                    break;
            }
        }
        else {
            blocked = true;
        }
        if (!blocked) {
            this.x = newX;
            this.y = newY;
        }
        return pieces;
    };
    return Knight;
}(Piece));
var Queen = (function (_super) {
    __extends(Queen, _super);
    function Queen(colour, x, y) {
        var _this = _super.call(this) || this;
        _this.name = 'Q';
        _this.colour = colour;
        _this.x = x;
        _this.y = y;
        return _this;
    }
    Queen.prototype.movePiece = function (newX, newY, pieces) {
        var blocked = false;
        var piecesCopy = pieces;
        if (newY > this.y && newX === this.x) {
            for (var i = this.y; i <= newY; i++) {
                var _loop_14 = function (p) {
                    if ((p.y === i && p.x === this_13.x) && i !== this_13.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_13.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_13 = this;
                for (var _i = 0, pieces_16 = pieces; _i < pieces_16.length; _i++) {
                    var p = pieces_16[_i];
                    var state_12 = _loop_14(p);
                    if (state_12 === "break")
                        break;
                }
            }
        }
        else if (newY < this.y && newX === this.x) {
            for (var i = this.y; i >= newY; i--) {
                var _loop_15 = function (p) {
                    if ((p.y === i && p.x === this_14.x) && i !== this_14.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_14.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_14 = this;
                for (var _a = 0, pieces_17 = pieces; _a < pieces_17.length; _a++) {
                    var p = pieces_17[_a];
                    var state_13 = _loop_15(p);
                    if (state_13 === "break")
                        break;
                }
            }
        }
        else if (newX > this.x && newY === this.y) {
            for (var i = this.x; i <= newX; i++) {
                var _loop_16 = function (p) {
                    if ((p.x === i && p.y === this_15.y) && i !== this_15.x) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_15.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_15 = this;
                for (var _b = 0, pieces_18 = pieces; _b < pieces_18.length; _b++) {
                    var p = pieces_18[_b];
                    var state_14 = _loop_16(p);
                    if (state_14 === "break")
                        break;
                }
            }
        }
        else if (newX < this.x && newY === this.y) {
            for (var i = this.x; i >= newX; i--) {
                var _loop_17 = function (p) {
                    if ((p.x === i && p.y === this_16.y) && i !== this_16.x) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_16.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_16 = this;
                for (var _c = 0, pieces_19 = pieces; _c < pieces_19.length; _c++) {
                    var p = pieces_19[_c];
                    var state_15 = _loop_17(p);
                    if (state_15 === "break")
                        break;
                }
            }
        }
        else if (newX > this.x && newY > this.y) {
            for (var i = this.y; i <= newY; i++) {
                var _loop_18 = function (p) {
                    if ((p.y === i && p.x === this_17.x + (i - this_17.y)) && i !== this_17.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_17.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_17 = this;
                for (var _d = 0, pieces_20 = pieces; _d < pieces_20.length; _d++) {
                    var p = pieces_20[_d];
                    var state_16 = _loop_18(p);
                    if (state_16 === "break")
                        break;
                }
            }
        }
        else if (newX > this.x && newY < this.y) {
            for (var i = this.y; i >= newY; i--) {
                var _loop_19 = function (p) {
                    if ((p.y === i && p.x === this_18.x + (this_18.y - i)) && i !== this_18.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_18.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_18 = this;
                for (var _e = 0, pieces_21 = pieces; _e < pieces_21.length; _e++) {
                    var p = pieces_21[_e];
                    var state_17 = _loop_19(p);
                    if (state_17 === "break")
                        break;
                }
            }
        }
        else if (newX < this.x && newY > this.y) {
            for (var i = this.y; i <= newY; i++) {
                var _loop_20 = function (p) {
                    if ((p.y === i && p.x === this_19.x - (i - this_19.y)) && i !== this_19.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_19.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_19 = this;
                for (var _f = 0, pieces_22 = pieces; _f < pieces_22.length; _f++) {
                    var p = pieces_22[_f];
                    var state_18 = _loop_20(p);
                    if (state_18 === "break")
                        break;
                }
            }
        }
        else if (newX < this.x && newY < this.y) {
            for (var i = this.y; i >= newY; i--) {
                var _loop_21 = function (p) {
                    if ((p.y === i && p.x === this_20.x - (this_20.y - i)) && i !== this_20.y) {
                        if ((p.x === newX && p.y === newY) && p.colour !== this_20.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_20 = this;
                for (var _g = 0, pieces_23 = pieces; _g < pieces_23.length; _g++) {
                    var p = pieces_23[_g];
                    var state_19 = _loop_21(p);
                    if (state_19 === "break")
                        break;
                }
            }
        }
        else {
            blocked = true;
        }
        if (!blocked) {
            this.x = newX;
            this.y = newY;
            return pieces;
        }
        return piecesCopy;
    };
    return Queen;
}(Piece));
var King = (function (_super) {
    __extends(King, _super);
    function King(colour, x, y) {
        var _this = _super.call(this) || this;
        _this.name = 'K';
        _this.colour = colour;
        _this.x = x;
        _this.y = y;
        _this.check = false;
        return _this;
    }
    King.prototype.movePiece = function (newX, newY, pieces) {
        var blocked;
        if (Math.abs(this.x - newX) < 2 && Math.abs(this.y - newY) < 2) {
            var _loop_22 = function (p) {
                if ((p.x === newX && p.y === newY) && p.colour !== this_21.colour) {
                    pieces = pieces.filter(function (rp) { return rp !== p; });
                    return "break";
                }
                else if ((p.x === newX && p.y === newY) && p.colour === this_21.colour) {
                    blocked = true;
                    return "break";
                }
            };
            var this_21 = this;
            for (var _i = 0, pieces_24 = pieces; _i < pieces_24.length; _i++) {
                var p = pieces_24[_i];
                var state_20 = _loop_22(p);
                if (state_20 === "break")
                    break;
            }
        }
        else {
            blocked = true;
        }
        if (!blocked) {
            this.x = newX;
            this.y = newY;
        }
        return pieces;
    };
    King.prototype.inCheck = function (pieces, newX, newY) {
        var _this = this;
        var pawns = pieces.filter(function (p) { return p.colour !== _this.colour && p.name === 'P'; });
        for (var i = 0; i < pawns.length; i++) {
            var p = pawns[i];
            if ((newX + 1 === p.x && newY + 1 === p.y) && p.colour === 'black') {
                this.check = true;
                console.log('pawn');
                return true;
            }
            else if ((newX - 1 === p.x && newY + 1 === p.y) && p.colour === 'black') {
                this.check = true;
                console.log('pawn');
                return true;
            }
            else if ((newX - 1 === p.x && newY - 1 === p.y) && p.colour === 'white') {
                this.check = true;
                console.log('pawn');
                return true;
            }
            else if ((newX + 1 === p.x && newY - 1 === p.y) && p.colour === 'white') {
                this.check = true;
                console.log('pawn');
                return true;
            }
        }
        this.check = false;
        return false;
    };
    return King;
}(Piece));
var board;
var pieces;
var activeX;
var activeY;
var startButton;
var started;
var ended;
var whiteTurn;
var reset;
var wCheckMsg;
var bCheckMsg;
function setup() {
    createCanvas(1200, 1000);
    board = new Board();
    pieces = [];
    started = false;
    ended = false;
    whiteTurn = false;
    reset = false;
    for (var i = 0; i < 8; i++) {
        pieces.push(new Pawn('white', i, 1));
        pieces.push(new Pawn('black', i, 6));
    }
    pieces.push(new Rook('white', 0, 0));
    pieces.push(new Rook('white', 7, 0));
    pieces.push(new Rook('black', 0, 7));
    pieces.push(new Rook('black', 7, 7));
    pieces.push(new Knight('white', 1, 0));
    pieces.push(new Knight('white', 6, 0));
    pieces.push(new Knight('black', 1, 7));
    pieces.push(new Knight('black', 6, 7));
    pieces.push(new Bishop('white', 2, 0));
    pieces.push(new Bishop('white', 5, 0));
    pieces.push(new Bishop('black', 2, 7));
    pieces.push(new Bishop('black', 5, 7));
    pieces.push(new King('white', 3, 0));
    pieces.push(new King('black', 3, 7));
    pieces.push(new Queen('white', 4, 0));
    pieces.push(new Queen('black', 4, 7));
    startButton = createButton('Start');
    startButton.position(1100, 100);
    startButton.size(100, 30);
    startButton.mousePressed(startGame);
    wCheckMsg = createP('');
    bCheckMsg = createP('');
}
function draw() {
    board.draw(pieces, whiteTurn);
    pieces.forEach(function (p) { return p.draw(); });
}
function mouseClicked() {
    if (!started)
        return false;
    if (mouseX <= 1000 && mouseY <= 1000) {
        var x = Math.floor(mouseX / 125);
        var y = Math.floor(mouseY / 125);
        var tile_1 = board.tiles[y][x];
        if (activeX === undefined && activeY === undefined) {
            var piece = pieces.filter(function (p) { return p.x === tile_1.x && p.y === tile_1.y; })[0];
            if (piece) {
                if ((piece.colour === 'white') === whiteTurn) {
                    activeX = tile_1.x;
                    activeY = tile_1.y;
                    tile_1.setActive();
                }
            }
        }
        else {
            var st = board.tiles[activeY][activeX];
            if (st.x === tile_1.x && st.y === tile_1.y) {
                tile_1.setInactive();
                activeX = undefined;
                activeY = undefined;
            }
            else {
                st.setInactive();
                var piece_1;
                pieces.forEach(function (p) {
                    if (p.x === activeX && p.y === activeY) {
                        piece_1 = p;
                    }
                });
                if (piece_1.name === 'K') {
                    if (piece_1.inCheck(pieces, x, y)) {
                        piece_1 = undefined;
                        tile_1.setInactive;
                        activeX = undefined;
                        activeY = undefined;
                    }
                }
                if (piece_1) {
                    if ((piece_1.colour === 'white') === whiteTurn) {
                        pieces = piece_1.movePiece(x, y, pieces);
                        activeX = undefined;
                        activeY = undefined;
                        if (piece_1.x === x && piece_1.y === y)
                            whiteTurn = !whiteTurn;
                    }
                    else {
                        activeX = undefined;
                        activeY = undefined;
                    }
                }
            }
        }
    }
    console.log(whiteTurn);
    if (checkWinner()) {
        if (!whiteTurn) {
            console.log('White wins!');
        }
        else {
            console.log('Black wins!');
        }
        started = false;
        ended = true;
    }
    if (ended)
        return false;
    var kings = pieces.filter(function (p) { return p.name === 'K'; });
    if (kings[0].inCheck(pieces, kings[0].x, kings[0].y))
        wCheckMsg.html('White in check!');
    else
        wCheckMsg.html('');
    if (kings[1].inCheck(pieces, kings[1].x, kings[1].y))
        bCheckMsg.html('Black in check!');
    else
        bCheckMsg.html('');
    return false;
}
function startGame() {
    if (!started && !ended) {
        started = true;
        whiteTurn = true;
    }
    if (reset) {
        startButton.html('Start');
        setup();
    }
    if (started && !reset) {
        startButton.html('Reset');
        reset = true;
    }
}
function checkWinner() {
    var kings = pieces.filter(function (p) { return p.name === 'K'; });
    if (kings.length < 2)
        return true;
    return false;
}
//# sourceMappingURL=../game/game/build.js.map