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
    Board.prototype.draw = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var x = 125 * i;
                var y = 125 * j;
                var colour = (i - j) % 2 == 0 ? color(255, 255, 255) : color(0, 0, 0);
                fill(colour);
                square(x, y, 125);
            }
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
    Pawn.prototype.movePiece = function (newLoc) {
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
                var _loop_1 = function (p) {
                    if (p.loc === newLoc && p.colour !== this_1.colour) {
                        pieces = pieces.filter(function (rp) { return rp !== p; });
                        blocked = false;
                        return "break";
                    }
                    blocked = true;
                };
                var this_1 = this;
                for (var _b = 0, pieces_3 = pieces; _b < pieces_3.length; _b++) {
                    var p = pieces_3[_b];
                    var state_1 = _loop_1(p);
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
                console.log('here');
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
                var _loop_2 = function (p) {
                    if (p.loc === newLoc && p.colour !== this_2.colour) {
                        pieces = pieces.filter(function (rp) { return rp !== p; });
                        blocked = false;
                        return "break";
                    }
                    blocked = true;
                };
                var this_2 = this;
                for (var _e = 0, pieces_6 = pieces; _e < pieces_6.length; _e++) {
                    var p = pieces_6[_e];
                    var state_2 = _loop_2(p);
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
        if (newLoc > this.loc && newLoc % 8 === this.loc % 8) {
            for (var i = this.loc; i <= newLoc; i += 8) {
                var _loop_3 = function (p) {
                    if (p.loc === i && i != this_3.loc) {
                        if (p.loc === newLoc && p.colour !== this_3.colour) {
                            pieces = pieces.filter(function (rp) { return rp !== p; });
                            return "break";
                        }
                        blocked = true;
                        return "break";
                    }
                };
                var this_3 = this;
                for (var _i = 0, pieces_7 = pieces; _i < pieces_7.length; _i++) {
                    var p = pieces_7[_i];
                    var state_3 = _loop_3(p);
                    if (state_3 === "break")
                        break;
                }
            }
        }
        else if (newLoc < this.loc && newLoc % 8 === this.loc % 8) {
            for (var i = this.loc; i >= newLoc; i -= 8) {
                var _loop_4 = function (p) {
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
                for (var _a = 0, pieces_8 = pieces; _a < pieces_8.length; _a++) {
                    var p = pieces_8[_a];
                    var state_4 = _loop_4(p);
                    if (state_4 === "break")
                        break;
                }
            }
        }
        else if (newLoc > this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
            for (var i = this.loc; i <= newLoc; i++) {
                var _loop_5 = function (p) {
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
                for (var _b = 0, pieces_9 = pieces; _b < pieces_9.length; _b++) {
                    var p = pieces_9[_b];
                    var state_5 = _loop_5(p);
                    if (state_5 === "break")
                        break;
                }
            }
        }
        else if (newLoc < this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
            for (var i = this.loc; i >= newLoc; i--) {
                var _loop_6 = function (p) {
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
                for (var _c = 0, pieces_10 = pieces; _c < pieces_10.length; _c++) {
                    var p = pieces_10[_c];
                    var state_6 = _loop_6(p);
                    if (state_6 === "break")
                        break;
                }
            }
        }
        else {
            blocked = true;
        }
        if (!blocked)
            this.loc = newLoc;
        return pieces;
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
        if (newLoc > this.loc && (newLoc - this.loc) % 9 === 0) {
            for (var i = this.loc; i <= newLoc; i += 9) {
                var _loop_7 = function (p) {
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
                for (var _i = 0, pieces_11 = pieces; _i < pieces_11.length; _i++) {
                    var p = pieces_11[_i];
                    var state_7 = _loop_7(p);
                    if (state_7 === "break")
                        break;
                }
            }
        }
        else if (newLoc < this.loc && (this.loc - newLoc) % 7 === 0) {
            for (var i = this.loc; i >= newLoc; i -= 7) {
                var _loop_8 = function (p) {
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
                for (var _a = 0, pieces_12 = pieces; _a < pieces_12.length; _a++) {
                    var p = pieces_12[_a];
                    var state_8 = _loop_8(p);
                    if (state_8 === "break")
                        break;
                }
            }
        }
        else if (newLoc > this.loc && (newLoc - this.loc) % 7 === 0) {
            for (var i = this.loc; i <= newLoc; i += 7) {
                var _loop_9 = function (p) {
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
                for (var _b = 0, pieces_13 = pieces; _b < pieces_13.length; _b++) {
                    var p = pieces_13[_b];
                    var state_9 = _loop_9(p);
                    if (state_9 === "break")
                        break;
                }
            }
        }
        else if (newLoc < this.loc && (this.loc - newLoc) % 9 === 0) {
            for (var i = this.loc; i >= newLoc; i -= 9) {
                var _loop_10 = function (p) {
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
                for (var _c = 0, pieces_14 = pieces; _c < pieces_14.length; _c++) {
                    var p = pieces_14[_c];
                    var state_10 = _loop_10(p);
                    if (state_10 === "break")
                        break;
                }
            }
        }
        else {
            blocked = true;
        }
        if (!blocked)
            this.loc = newLoc;
        return pieces;
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
    return Queen;
}(Piece));
var King = (function (_super) {
    __extends(King, _super);
    function King(colour, sp) {
        var _this = _super.call(this) || this;
        _this.name = 'K';
        _this.colour = colour;
        _this.loc = sp;
        return _this;
    }
    return King;
}(Piece));
var board;
var pieces = [];
var active;
function setup() {
    createCanvas(1000, 1000);
    board = new Board();
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
}
function draw() {
    background(255);
    square(0, 0, 1000);
    board.draw();
    pieces.forEach(function (p) { return p.draw(); });
}
function mouseClicked() {
    if (mouseX <= 1000 && mouseY <= 1000) {
        var x = Math.floor(mouseX / 125);
        var y = Math.floor(mouseY / 125);
        var z = x + y * 8;
        var tile_1 = board.tiles[z];
        if (active === undefined) {
            var tf = pieces.filter(function (p) { return p.loc === tile_1.index; }).length;
            if (tf === 1) {
                active = tile_1.index;
                tile_1.setActive();
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
                if (piece_1) {
                    pieces = piece_1.movePiece(z, pieces);
                    active = undefined;
                }
            }
        }
    }
    return false;
}
//# sourceMappingURL=../game/game/build.js.map