var Tile = (function () {
    function Tile(index) {
        this.index = index;
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
        for (var i = 0; i < 64; i++) {
            this.tiles.push(new Tile(i));
        }
    }
    Board.prototype.draw = function (pieces, whiteTurn) {
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var x = 125 * i;
                var y = 125 * j;
                var colour = (i - j) % 2 == 0 ? color(255, 255, 255) : color(0, 0, 0);
                var activePiece = pieces.filter(function (p) { return p.loc === i + j * 8; })[0];
                if (this_1.tiles[i + j * 8].active && (activePiece.colour === 'white') === whiteTurn) {
                    colour = (i - j) % 2 == 0 ? color(200, 200, 200) : color(55, 55, 55);
                }
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
        var coords = this.convertCoord(this.loc);
        fill(this.colorToString(this.colour));
        strokeWeight(2);
        this.colour === 'white' ? stroke(0) : stroke(255);
        textSize(50);
        text(this.name, coords[0], coords[1]);
    };
    Piece.prototype.convertCoord = function (coord) {
        var x;
        var y;
        if (coord === 0) {
            x = coord;
            y = Math.floor((coord + 1) / 8);
        }
        else if ((coord + 1) % 8 === 0) {
            x = 7;
            y = Math.floor((coord + 1) / 8) - 1;
        }
        else {
            x = ((coord + 1) % 8) - 1;
            y = Math.floor((coord + 1) / 8);
        }
        return [x * 125 + 50, y * 125 + 125 - 45];
    };
    Piece.prototype.inCheck = function (pieces, newLoc) {
        return false;
    };
    Piece.prototype.colorToString = function (colour) {
        return colour === 'black' ? color(0, 0, 0) : color(255, 255, 255);
    };
    Piece.prototype.movePiece = function (newLoc, pieces) {
        return pieces;
    };
    return Piece;
}());
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(colour, sp) {
        var _this = _super.call(this) || this;
        _this.name = 'P';
        _this.colour = colour;
        _this.loc = sp;
        return _this;
    }
    Pawn.prototype.movePiece = function (newLoc, pieces) {
        var blocked = false;
        if (this.colour === 'white') {
            if (this.loc >= 7 && this.loc < 16 && (newLoc === this.loc + 8 || newLoc === this.loc + 16)) {
                for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
                    var p = pieces_1[_i];
                    if (p.loc === this.loc + 8 || p.loc === newLoc) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newLoc === this.loc + 8) {
                for (var _a = 0, pieces_2 = pieces; _a < pieces_2.length; _a++) {
                    var p = pieces_2[_a];
                    if (p.loc === newLoc) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newLoc === this.loc + 9 || newLoc === this.loc + 7) {
                var _loop_3 = function (p) {
                    if (p.loc === newLoc && p.colour !== this_2.colour) {
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
            if (this.loc >= 47 && this.loc < 56 && (newLoc === this.loc - 8 || newLoc === this.loc - 16)) {
                for (var _c = 0, pieces_4 = pieces; _c < pieces_4.length; _c++) {
                    var p = pieces_4[_c];
                    if (p.loc === this.loc - 8 || p.loc === newLoc) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newLoc === this.loc - 8) {
                for (var _d = 0, pieces_5 = pieces; _d < pieces_5.length; _d++) {
                    var p = pieces_5[_d];
                    if (p.loc === newLoc) {
                        blocked = true;
                        break;
                    }
                }
            }
            else if (newLoc === this.loc - 9 || newLoc === this.loc - 7) {
                var _loop_4 = function (p) {
                    if (p.loc === newLoc && p.colour !== this_3.colour) {
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
        if (!blocked)
            this.loc = newLoc;
        return pieces;
    };
    return Pawn;
}(Piece));
var Rook = (function (_super) {
    __extends(Rook, _super);
    function Rook(colour, sp) {
        var _this = _super.call(this) || this;
        _this.name = 'R';
        _this.colour = colour;
        _this.loc = sp;
        return _this;
    }
    Rook.prototype.movePiece = function (newLoc, pieces) {
        var blocked = false;
        var piecesCopy = pieces;
        if (newLoc > this.loc && newLoc % 8 === this.loc % 8) {
            for (var i = this.loc; i <= newLoc; i += 8) {
                var _loop_5 = function (p) {
                    if (p.loc === i && i != this_4.loc) {
                        if (p.loc === newLoc && p.colour !== this_4.colour) {
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
        else if (newLoc < this.loc && newLoc % 8 === this.loc % 8) {
            for (var i = this.loc; i >= newLoc; i -= 8) {
                var _loop_6 = function (p) {
                    if (p.loc === i && i != this_5.loc) {
                        if (p.loc === newLoc && p.colour !== this_5.colour) {
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
        else if (newLoc > this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
            for (var i = this.loc; i <= newLoc; i++) {
                var _loop_7 = function (p) {
                    if (p.loc === i && i != this_6.loc) {
                        if (p.loc === newLoc && p.colour !== this_6.colour) {
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
        else if (newLoc < this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
            for (var i = this.loc; i >= newLoc; i--) {
                var _loop_8 = function (p) {
                    if (p.loc === i && i != this_7.loc) {
                        if (p.loc === newLoc && p.colour !== this_7.colour) {
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
            this.loc = newLoc;
            return pieces;
        }
        return piecesCopy;
    };
    return Rook;
}(Piece));
var Bishop = (function (_super) {
    __extends(Bishop, _super);
    function Bishop(colour, sp) {
        var _this = _super.call(this) || this;
        _this.name = 'B';
        _this.colour = colour;
        _this.loc = sp;
        return _this;
    }
    Bishop.prototype.movePiece = function (newLoc, pieces) {
        var blocked = false;
        var piecesCopy = pieces;
        if (newLoc > this.loc && (newLoc - this.loc) % 9 === 0) {
            for (var i = this.loc; i <= newLoc; i += 9) {
                var _loop_9 = function (p) {
                    if (p.loc === i && i != this_8.loc) {
                        if (p.loc === newLoc && p.colour !== this_8.colour) {
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
        else if (newLoc < this.loc && (this.loc - newLoc) % 7 === 0) {
            for (var i = this.loc; i >= newLoc; i -= 7) {
                var _loop_10 = function (p) {
                    if (p.loc === i && i != this_9.loc) {
                        if (p.loc === newLoc && p.colour !== this_9.colour) {
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
        else if (newLoc > this.loc && (newLoc - this.loc) % 7 === 0) {
            for (var i = this.loc; i <= newLoc; i += 7) {
                var _loop_11 = function (p) {
                    if (p.loc === i && i != this_10.loc) {
                        if (p.loc === newLoc && p.colour !== this_10.colour) {
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
        else if (newLoc < this.loc && (this.loc - newLoc) % 9 === 0) {
            for (var i = this.loc; i >= newLoc; i -= 9) {
                var _loop_12 = function (p) {
                    if (p.loc === i && i != this_11.loc) {
                        if (p.loc === newLoc && p.colour !== this_11.colour) {
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
            this.loc = newLoc;
            return pieces;
        }
        return piecesCopy;
    };
    return Bishop;
}(Piece));
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(colour, sp) {
        var _this = _super.call(this) || this;
        _this.name = 'H';
        _this.colour = colour;
        _this.loc = sp;
        return _this;
    }
    Knight.prototype.movePiece = function (newLoc, pieces) {
        var absDiff = Math.abs(newLoc - this.loc);
        var blocked = false;
        if (absDiff === 6 || absDiff === 10 || absDiff === 15 || absDiff === 17) {
            var _loop_13 = function (p) {
                if (p.loc === newLoc && p.colour !== this_12.colour) {
                    pieces = pieces.filter(function (rp) { return rp !== p; });
                    return "break";
                }
                else if (p.loc === newLoc && p.colour === this_12.colour) {
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
        if (!blocked)
            this.loc = newLoc;
        return pieces;
    };
    return Knight;
}(Piece));
var Queen = (function (_super) {
    __extends(Queen, _super);
    function Queen(colour, sp) {
        var _this = _super.call(this) || this;
        _this.name = 'Q';
        _this.colour = colour;
        _this.loc = sp;
        return _this;
    }
    Queen.prototype.movePiece = function (newLoc, pieces) {
        var blocked = false;
        var piecesCopy = pieces;
        if (newLoc > this.loc && (newLoc - this.loc) % 9 === 0) {
            for (var i = this.loc; i <= newLoc; i += 9) {
                var _loop_14 = function (p) {
                    if (p.loc === i && i != this_13.loc) {
                        if (p.loc === newLoc && p.colour !== this_13.colour) {
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
        else if (newLoc < this.loc && (this.loc - newLoc) % 7 === 0) {
            for (var i = this.loc; i >= newLoc; i -= 7) {
                var _loop_15 = function (p) {
                    if (p.loc === i && i != this_14.loc) {
                        if (p.loc === newLoc && p.colour !== this_14.colour) {
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
        else if (newLoc > this.loc && (newLoc - this.loc) % 7 === 0) {
            for (var i = this.loc; i <= newLoc; i += 7) {
                var _loop_16 = function (p) {
                    if (p.loc === i && i != this_15.loc) {
                        if (p.loc === newLoc && p.colour !== this_15.colour) {
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
        else if (newLoc < this.loc && (this.loc - newLoc) % 9 === 0) {
            for (var i = this.loc; i >= newLoc; i -= 9) {
                var _loop_17 = function (p) {
                    if (p.loc === i && i != this_16.loc) {
                        if (p.loc === newLoc && p.colour !== this_16.colour) {
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
        else if (newLoc > this.loc && newLoc % 8 === this.loc % 8) {
            for (var i = this.loc; i <= newLoc; i += 8) {
                var _loop_18 = function (p) {
                    if (p.loc === i && i != this_17.loc) {
                        if (p.loc === newLoc && p.colour !== this_17.colour) {
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
        else if (newLoc < this.loc && newLoc % 8 === this.loc % 8) {
            for (var i = this.loc; i >= newLoc; i -= 8) {
                var _loop_19 = function (p) {
                    if (p.loc === i && i != this_18.loc) {
                        if (p.loc === newLoc && p.colour !== this_18.colour) {
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
        else if (newLoc > this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
            for (var i = this.loc; i <= newLoc; i++) {
                var _loop_20 = function (p) {
                    if (p.loc === i && i != this_19.loc) {
                        if (p.loc === newLoc && p.colour !== this_19.colour) {
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
        else if (newLoc < this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
            for (var i = this.loc; i >= newLoc; i--) {
                var _loop_21 = function (p) {
                    if (p.loc === i && i != this_20.loc) {
                        if (p.loc === newLoc && p.colour !== this_20.colour) {
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
            this.loc = newLoc;
            return pieces;
        }
        return piecesCopy;
    };
    return Queen;
}(Piece));
var King = (function (_super) {
    __extends(King, _super);
    function King(colour, sp) {
        var _this = _super.call(this) || this;
        _this.name = 'K';
        _this.colour = colour;
        _this.loc = sp;
        _this.check = false;
        return _this;
    }
    King.prototype.movePiece = function (newLoc, pieces) {
        var blocked;
        var absDiff = Math.abs(newLoc - this.loc);
        if (absDiff === 1 || absDiff === 7 || absDiff === 8 || absDiff === 9) {
            var _loop_22 = function (p) {
                if (p.loc === newLoc && p.colour !== this_21.colour) {
                    pieces = pieces.filter(function (rp) { return rp !== p; });
                    return "break";
                }
                else if (p.loc === newLoc && p.colour === this_21.colour) {
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
        if (!blocked)
            this.loc = newLoc;
        return pieces;
    };
    King.prototype.inCheck = function (pieces, newLoc) {
        var _this = this;
        var nl = newLoc > -1 ? newLoc : this.loc;
        var pawns = pieces.filter(function (p) { return p.colour !== _this.colour && p.name === 'P'; });
        for (var i = 0; i < pawns.length; i++) {
            var p = pawns[i];
            if (nl + 9 === p.loc && p.colour === 'black') {
                this.check = true;
                return true;
            }
            else if (nl + 7 === p.loc && p.colour === 'black') {
                this.check = true;
                return true;
            }
            else if (nl - 7 === p.loc && p.colour === 'white') {
                this.check = true;
                return true;
            }
            else if (nl - 9 === p.loc && p.colour === 'white') {
                this.check = true;
                return true;
            }
        }
        var hPieces = pieces.filter(function (p) { return Math.floor(p.loc / 8) === Math.floor(nl / 8); });
        var threats = hPieces.filter(function (p) { return p.colour !== _this.colour && (p.name === 'R' || p.name === 'Q'); });
        if (threats.length > 0) {
            var _loop_23 = function (i) {
                var t = threats[i];
                if (t.loc < nl) {
                    var buffers = hPieces.filter(function (p) { return p.loc < nl && p.loc > t.loc; });
                    if (buffers.length === 0 && threats.length > 0) {
                        console.log('2');
                        this_22.check = true;
                        return { value: true };
                    }
                }
                else if (t.loc > nl) {
                    var buffers = hPieces.filter(function (p) { return p.loc > nl && p.loc < t.loc; });
                    if (buffers.length === 0 && threats.length > 0) {
                        console.log('3');
                        this_22.check = true;
                        return { value: true };
                    }
                }
            };
            var this_22 = this;
            for (var i = 0; i < threats.length; i++) {
                var state_21 = _loop_23(i);
                if (typeof state_21 === "object")
                    return state_21.value;
            }
        }
        this.check = false;
        return false;
    };
    return King;
}(Piece));
var board;
var pieces;
var active;
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
    for (var i = 0; i < 16; i++) {
        if (i < 8) {
            pieces.push(new Pawn('black', i + 48));
        }
        else {
            pieces.push(new Pawn('white', i));
        }
    }
    pieces.push(new Rook('black', 56));
    pieces.push(new Rook('black', 63));
    pieces.push(new Rook('white', 0));
    pieces.push(new Rook('white', 7));
    pieces.push(new Knight('black', 57));
    pieces.push(new Knight('black', 62));
    pieces.push(new Knight('white', 1));
    pieces.push(new Knight('white', 6));
    pieces.push(new Bishop('black', 58));
    pieces.push(new Bishop('black', 61));
    pieces.push(new Bishop('white', 2));
    pieces.push(new Bishop('white', 5));
    pieces.push(new King('black', 59));
    pieces.push(new King('white', 3));
    pieces.push(new Queen('black', 60));
    pieces.push(new Queen('white', 4));
    startButton = createButton('Start');
    startButton.position(1100, 100);
    startButton.size(100, 30);
    startButton.mousePressed(startGame);
    wCheckMsg = createP("");
    bCheckMsg = createP("");
}
function draw() {
    background(255);
    square(0, 0, 1000);
    board.draw(pieces, whiteTurn);
    pieces.forEach(function (p) { return p.draw(); });
}
function mouseClicked() {
    if (!started)
        return false;
    if (mouseX <= 1000 && mouseY <= 1000) {
        var x = Math.floor(mouseX / 125);
        var y = Math.floor(mouseY / 125);
        var z = x + y * 8;
        var tile_1 = board.tiles[z];
        if (active === undefined) {
            var piece = pieces.filter(function (p) { return p.loc === tile_1.index; })[0];
            if (piece) {
                if ((piece.colour === 'white') === whiteTurn) {
                    active = tile_1.index;
                    tile_1.setActive();
                }
            }
        }
        else {
            if (board.tiles[active].index === tile_1.index) {
                tile_1.setInactive();
                active = undefined;
            }
            else {
                board.tiles[active].setInactive();
                var piece_1;
                pieces.forEach(function (p) {
                    if (p.loc === active) {
                        piece_1 = p;
                    }
                });
                if (piece_1.name === 'K') {
                    if (piece_1.inCheck(pieces, z)) {
                        piece_1 = undefined;
                        tile_1.setInactive;
                        active = undefined;
                    }
                }
                if (piece_1) {
                    if ((piece_1.colour === 'white') === whiteTurn) {
                        pieces = piece_1.movePiece(z, pieces);
                        active = undefined;
                        if (piece_1.loc === z)
                            whiteTurn = !whiteTurn;
                    }
                    else {
                        active = undefined;
                    }
                }
            }
        }
    }
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
    if (kings[0].inCheck(pieces, -1))
        wCheckMsg.html('Black in check!');
    else
        wCheckMsg.html('');
    if (kings[1].inCheck(pieces, -1))
        bCheckMsg.html('White in check!');
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