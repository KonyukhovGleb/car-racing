/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller/controller.ts":
/*!**************************************!*\
  !*** ./src/controller/controller.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Controller = void 0;
var Controller = /** @class */ (function () {
    function Controller(view, gameModal) {
        this.interval = null;
        this.gameModal = gameModal;
        this.view = view;
        this.isPlaying = false;
        this.interval = null;
    }
    Controller.prototype.startGame = function () {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.gameModal.start();
        this.view.render();
        this.update();
    };
    Controller.prototype.startTimer = function () {
        var _this = this;
        var speed = 400 - this.gameModal.getStateSpeed() * 10;
        if (!this.interval) {
            this.interval = setInterval(function () {
                _this.update();
            }, speed > 0 ? speed : 400);
        }
    };
    Controller.prototype.stopTimer = function () {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };
    Controller.prototype.updateView = function () {
        if (this.gameModal.getStateIsGameOver()) {
            this.gameOver();
        }
        this.view.update(this.gameModal.getStatePlayField(), this.gameModal.getStateCurrentScore(), this.gameModal.getStateSpeed());
    };
    Controller.prototype.pause = function () {
        this.isPlaying = false;
        this.stopTimer();
    };
    Controller.prototype.play = function () {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    };
    Controller.prototype.handleKeyDown = function (event) {
        switch (event.key) {
            case 'Enter':
                if (this.isPlaying) {
                    this.pause();
                }
                else {
                    this.play();
                }
                break;
            case 'ArrowLeft':
                this.gameModal.moveLeft();
                this.updateView();
                break;
            case 'ArrowRight':
                this.gameModal.moveRight();
                this.updateView();
                break;
        }
    };
    Controller.prototype.update = function () {
        this.gameModal.wallsMove();
        this.gameModal.addBarrage();
        this.gameModal.barragesMoveDown();
        this.updateView();
    };
    Controller.prototype.gameOver = function () {
        this.startGame();
    };
    return Controller;
}());
exports.Controller = Controller;


/***/ }),

/***/ "./src/models/barrageModel.ts":
/*!************************************!*\
  !*** ./src/models/barrageModel.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BarrageModel = void 0;
var BarrageModel = /** @class */ (function () {
    function BarrageModel(x, y, model) {
        //coordinates of the upper left corner 
        this.x = 0;
        this.y = 0;
        this.heigthModel = 0;
        this.widthModel = 0;
        this.model = [];
        this.onPlayField = false;
        this.noAddedLines = 0;
        this.x = x;
        this.y = y;
        this.model = model;
        this.heigthModel = model.length;
        this.widthModel = model[0].length;
        this.onPlayField = false;
        this.noAddedLines = 4;
    }
    BarrageModel.prototype.getX = function () {
        return this.x;
    };
    BarrageModel.prototype.getY = function () {
        return this.y;
    };
    BarrageModel.prototype.setX = function (x) {
        this.x = x;
    };
    BarrageModel.prototype.setY = function (y) {
        this.y = y;
    };
    BarrageModel.prototype.getModel = function () {
        return this.model;
    };
    BarrageModel.prototype.setModel = function (model) {
        this.model = model;
    };
    BarrageModel.prototype.getHeigthModel = function () {
        return this.heigthModel;
    };
    BarrageModel.prototype.getWidthModel = function () {
        return this.widthModel;
    };
    BarrageModel.prototype.getOnPlayField = function () {
        return this.onPlayField;
    };
    BarrageModel.prototype.getNoAddedLines = function () {
        return this.noAddedLines;
    };
    BarrageModel.prototype.decrementNoAddedLines = function () {
        if (this.noAddedLines >= 0)
            this.noAddedLines--;
    };
    return BarrageModel;
}());
exports.BarrageModel = BarrageModel;


/***/ }),

/***/ "./src/models/carModel.ts":
/*!********************************!*\
  !*** ./src/models/carModel.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModel = void 0;
var CarModel = /** @class */ (function () {
    function CarModel(x, y, model) {
        //coordinates of the upper left corner 
        this.x = 0;
        this.y = 0;
        this.heigthModel = 0;
        this.widthModel = 0;
        this.model = [];
        this.x = x;
        this.y = y;
        this.model = model;
        this.heigthModel = model.length;
        this.widthModel = model[0].length;
    }
    CarModel.prototype.getX = function () {
        return this.x;
    };
    CarModel.prototype.getY = function () {
        return this.y;
    };
    CarModel.prototype.setX = function (x) {
        this.x = x;
    };
    CarModel.prototype.setY = function (y) {
        this.y = y;
    };
    CarModel.prototype.getModel = function () {
        return this.model;
    };
    CarModel.prototype.setModel = function (model) {
        this.model = model;
    };
    CarModel.prototype.getHeigthModel = function () {
        return this.heigthModel;
    };
    CarModel.prototype.getWidthModel = function () {
        return this.widthModel;
    };
    return CarModel;
}());
exports.CarModel = CarModel;


/***/ }),

/***/ "./src/models/gameModal.ts":
/*!*********************************!*\
  !*** ./src/models/gameModal.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameModal = void 0;
var carModel_1 = __webpack_require__(/*! ./carModel */ "./src/models/carModel.ts");
var barrageModel_1 = __webpack_require__(/*! ./barrageModel */ "./src/models/barrageModel.ts");
var GameModal = /** @class */ (function () {
    function GameModal() {
        this.currentScore = 0;
        this.speed = 1;
        this.isGameOver = false;
        this.widthGameField = 10;
        this.heigthGameField = 20;
        this.playField = [];
        this.arrayBarrages = [];
        this.tick = 0;
        this.arrayCarModel = [
            [0, 2, 0],
            [2, 2, 2],
            [0, 2, 0],
            [2, 0, 2]
        ];
        this.arrayBarrageModel = [
            [1, 0, 1],
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
        this.carModel = new carModel_1.CarModel(2, 16, this.arrayCarModel);
        this.randomSide = function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            if (Math.round(rand) == 0) {
                return 2;
            }
            return 5;
        };
        this.tick = 0;
        this.speed = 1;
        this.isGameOver = false;
        this.arrayBarrages = [];
        this.playField = [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }
    ///////////////////////////////////////////////////////////////////////
    GameModal.prototype.getStatePlayField = function () {
        var playFieldState = this.playField.slice();
        return playFieldState;
    };
    GameModal.prototype.getStateIsGameOver = function () {
        return this.isGameOver;
    };
    GameModal.prototype.getStateCurrentScore = function () {
        return this.currentScore;
    };
    GameModal.prototype.getStateSpeed = function () {
        return this.speed;
    };
    GameModal.prototype.moveLeft = function () {
        this.carModel.setX(2);
        this.update();
    };
    GameModal.prototype.moveRight = function () {
        this.carModel.setX(5);
        this.update();
    };
    GameModal.prototype.restart = function () {
        this.constructor();
        this.start();
    };
    GameModal.prototype.checkCollision = function () {
        var widthCar = this.carModel.getWidthModel();
        var coordX = this.carModel.getX();
        for (var y = 16; y < 20; y++) {
            for (var x = coordX; x < coordX + widthCar; x++) {
                if (this.carModel.getModel()[this.heigthGameField - 1 - y][x - coordX] == 2 &&
                    this.playField[y][x] == 1) {
                    this.isGameOver = true;
                }
            }
        }
    };
    GameModal.prototype.carInit = function () {
        var randomValue = this.randomSide(0, 1);
        this.carModel = new carModel_1.CarModel(randomValue, 16, this.arrayCarModel);
    };
    GameModal.prototype.lockCarPosition = function () {
        var widthCar = this.carModel.getWidthModel();
        var coordY = this.carModel.getY();
        var coordX = this.carModel.getX();
        this.checkCollision();
        for (var y = coordY; y < this.heigthGameField; y++) {
            for (var x = coordX; x < coordX + widthCar; x++) {
                if (this.carModel.getModel()[y - coordY][x - coordX] == 2)
                    this.playField[y][x] = 2;
            }
        }
    };
    GameModal.prototype.start = function () {
        this.carInit();
        this.arrayBarrages = [];
        this.pushBarrage();
        this.update();
    };
    GameModal.prototype.wallsMove = function () {
        var lastItem = this.playField[0][0];
        for (var y = 0; y < this.heigthGameField - 1; y++) {
            this.playField[y][0] = this.playField[y + 1][0];
            this.playField[y][9] = this.playField[y + 1][9];
        }
        this.playField[this.heigthGameField - 1][0] = lastItem;
        this.playField[this.heigthGameField - 1][9] = lastItem;
    };
    GameModal.prototype.addBarrage = function () {
        this.tick++;
        if (this.tick == 9) {
            this.tick = 0;
            this.currentScore += 100;
            this.speed += 1;
            this.pushBarrage();
        }
    };
    GameModal.prototype.barragesMoveDown = function () {
        for (var i = 0; i < this.arrayBarrages.length; i++) {
            var element = this.arrayBarrages[i];
            var coordY = element.getY();
            coordY++;
            element.setY(coordY);
            this.lockBarrage(element);
            this.update();
        }
    };
    GameModal.prototype.gameOver = function () {
        this.currentScore = 0;
        this.speed = 0;
        this.restart();
    };
    GameModal.prototype.lockBarrage = function (barrage) {
        var widthBarrage = this.carModel.getWidthModel();
        var heigthBarrage = this.carModel.getHeigthModel();
        var blocks = barrage.getModel();
        var coordX = barrage.getX();
        var coordY = barrage.getY();
        this.checkCollision();
        if (this.isGameOver) {
            this.gameOver();
            return;
        }
        for (var y = coordY; y < coordY + heigthBarrage; y++) {
            for (var x = coordX; x < coordX + widthBarrage; x++) {
                if (this.playField[y] === undefined) {
                    break;
                }
                else {
                    if (blocks[coordY + heigthBarrage - 1 - y][x - coordX] == 1)
                        this.playField[y][x] = 1;
                }
            }
        }
    };
    GameModal.prototype.pushBarrage = function () {
        var barrage = this.generateBarrage();
        this.arrayBarrages.push(barrage);
        return barrage;
    };
    GameModal.prototype.generateBarrage = function () {
        var randomValue = this.randomSide(0, 1);
        var barrage = new barrageModel_1.BarrageModel(randomValue, -5, this.arrayBarrageModel);
        return barrage;
    };
    GameModal.prototype.clearRoad = function () {
        for (var y = 0; y < this.heigthGameField; y++) {
            for (var x = 1; x < this.playField[0].length - 1; x++) {
                if (this.playField[y][x] == 1 || 2) {
                    this.playField[y][x] = 0;
                }
            }
        }
    };
    GameModal.prototype.update = function () {
        if (this.isGameOver) {
            this.gameOver();
            this.start();
            return;
        }
        this.clearRoad();
        this.lockCarPosition();
        for (var i = 0; i < this.arrayBarrages.length; i++) {
            this.lockBarrage(this.arrayBarrages[i]);
        }
    };
    return GameModal;
}());
exports.GameModal = GameModal;


/***/ }),

/***/ "./src/view/view.ts":
/*!**************************!*\
  !*** ./src/view/view.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
var View = /** @class */ (function () {
    function View(nameRootElement, widthGameField, heigthGameField) {
        this.rootDOMElement = null;
        this.widthGameField = 0;
        this.heigthGameField = 0;
        this.rootDOMElement = this.getDOMElement(nameRootElement);
        this.widthGameField = widthGameField;
        this.heigthGameField = heigthGameField;
    }
    View.prototype.getDOMElement = function (nameElement) {
        var DOMelement = document.getElementById(nameElement);
        return DOMelement;
    };
    View.prototype.render = function () {
        var stringHTML = this.generatePlayField(this.widthGameField, this.heigthGameField)
            + this.generateSideBar();
        this.rootDOMElement.innerHTML = stringHTML;
    };
    View.prototype.update = function (playField, currentScore, speed) {
        var currentScoreHTML = document.getElementById('current-score');
        var speedHTML = document.getElementById('speed');
        currentScoreHTML.innerHTML = "<span> score: " + currentScore + "</span>";
        speedHTML.innerHTML = "<span> speed: " + speed + "</span>";
        for (var y = 0; y < this.heigthGameField; y++) {
            for (var x = 0; x < this.widthGameField; x++) {
                var elem = document.getElementById(y + "-" + x);
                if (playField[y][x] == 1 || playField[y][x] == 2) {
                    elem.classList.remove("no-active-field");
                    elem.classList.add("active-field");
                }
                else {
                    elem.classList.remove("active-field");
                    elem.classList.add("no-active-field");
                }
            }
        }
    };
    View.prototype.generatePlayField = function (widthGameField, heigthGameField) {
        var stringHTML = "<div class='conainer'><table>";
        for (var y = 0; y < heigthGameField; y++) {
            stringHTML += "<tr>";
            for (var x = 0; x < widthGameField; x++) {
                stringHTML += "<td id=" + y + "-" + x + "></td>";
            }
            stringHTML += "</tr>";
        }
        stringHTML += "</table></div>";
        return stringHTML;
    };
    View.prototype.generateSideBar = function () {
        var stringHTML = "<div class=\"side-bar\">\n            <div class=\"table-scores\">\n                <span>Results</span>\n                <div>\n                    <div id=\"current-score\"></div>\n                    <div id=\"speed\"></div>\n                <div>\n            </div>\n            <div>\n                </br>\n                <span> Enter - pause</span>\n                </br>\n                <span> Arrows - left / right</span>\n            </div>\n        </div>";
        return stringHTML;
    };
    return View;
}());
exports.View = View;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var gameModal_1 = __webpack_require__(/*! ./models/gameModal */ "./src/models/gameModal.ts");
var view_1 = __webpack_require__(/*! ./view/view */ "./src/view/view.ts");
var controller_1 = __webpack_require__(/*! ./controller/controller */ "./src/controller/controller.ts");
var gameModal = new gameModal_1.GameModal();
var view = new view_1.View("root", 10, 20);
var controller = new controller_1.Controller(view, gameModal);
controller.startGame();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LWNhci1yYWNpbmcvLi9zcmMvY29udHJvbGxlci9jb250cm9sbGVyLnRzIiwid2VicGFjazovL3Rlc3QtY2FyLXJhY2luZy8uL3NyYy9tb2RlbHMvYmFycmFnZU1vZGVsLnRzIiwid2VicGFjazovL3Rlc3QtY2FyLXJhY2luZy8uL3NyYy9tb2RlbHMvY2FyTW9kZWwudHMiLCJ3ZWJwYWNrOi8vdGVzdC1jYXItcmFjaW5nLy4vc3JjL21vZGVscy9nYW1lTW9kYWwudHMiLCJ3ZWJwYWNrOi8vdGVzdC1jYXItcmFjaW5nLy4vc3JjL3ZpZXcvdmlldy50cyIsIndlYnBhY2s6Ly90ZXN0LWNhci1yYWNpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC1jYXItcmFjaW5nLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQTtJQU1JLG9CQUFZLElBQVUsRUFBRSxTQUFvQjtRQURwQyxhQUFRLEdBQVEsSUFBSSxDQUFDO1FBRXpCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSTtJQUN4QixDQUFDO0lBRUQsOEJBQVMsR0FBVDtRQUVJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWxCLENBQUM7SUFFRCwrQkFBVSxHQUFWO1FBQUEsaUJBUUM7UUFQRyxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFB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LENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqQztJQUVMLENBQUM7SUFnQkQsdUVBQXVFO0lBRXZFLHFDQUFpQixHQUFqQjtRQUNJLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxF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RDtBQUVsRCxJQUFNLFNBQVMsR0FBYyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztBQUU3QyxJQUFNLElBQUksR0FBUyxJQUFJLFdBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRTVDLElBQU0sVUFBVSxHQUFlLElBQUksdUJBQVUsQ0FBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFaEUsVUFBVSxDQUFDLFNBQVMsRUFBRSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZpZXd9IGZyb20gJy4uL3ZpZXcvdmlldyc7XG5pbXBvcnQge0dhbWVNb2RhbH0gZnJvbSAnLi4vbW9kZWxzL2dhbWVNb2RhbCc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgICBcbiAgICBwcml2YXRlIGdhbWVNb2RhbDogR2FtZU1vZGFsO1xuICAgIHByaXZhdGUgdmlldzogVmlldztcbiAgICBwcml2YXRlIGlzUGxheWluZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIGludGVydmFsOiBhbnkgPSBudWxsO1xuICAgIGNvbnN0cnVjdG9yKHZpZXc6IFZpZXcsIGdhbWVNb2RhbDogR2FtZU1vZGFsKSB7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGFsID0gZ2FtZU1vZGFsO1xuICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmludGVydmFsID0gbnVsbFxuICAgIH1cbiAgICBcbiAgICBzdGFydEdhbWUoKSB7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpKSAgICBcblxuICAgICAgICB0aGlzLmdhbWVNb2RhbC5zdGFydCgpXG4gICAgICAgIHRoaXMudmlldy5yZW5kZXIoKVxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydFRpbWVyKCkge1xuICAgICAgICBsZXQgc3BlZWQgPSA0MDAgLSB0aGlzLmdhbWVNb2RhbC5nZXRTdGF0ZVNwZWVkKCkgKiAxMDtcblxuICAgICAgICBpZighdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+e1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9LCBzcGVlZCA+IDAgPyBzcGVlZCA6IDQwMClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3BUaW1lcigpIHtcbiAgICAgICAgaWYodGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU1vZGFsLmdldFN0YXRlSXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7ICAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlldy51cGRhdGUodGhpcy5nYW1lTW9kYWwuZ2V0U3RhdGVQbGF5RmllbGQoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVNb2RhbC5nZXRTdGF0ZUN1cnJlbnRTY29yZSgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGFsLmdldFN0YXRlU3BlZWQoKSk7XG4gICAgfVxuICAgIFxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuXG5cbiAgICB9XG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOiBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVNb2RhbC5tb3ZlTGVmdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiBcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVNb2RhbC5tb3ZlUmlnaHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kYWwud2FsbHNNb3ZlKCk7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGFsLmFkZEJhcnJhZ2UoKTtcbiAgICAgICAgdGhpcy5nYW1lTW9kYWwuYmFycmFnZXNNb3ZlRG93bigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcblxuICAgIH1cbiAgICBnYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEJhcnJhZ2VNb2RlbCB7XG5cbiAgICAvL2Nvb3JkaW5hdGVzIG9mIHRoZSB1cHBlciBsZWZ0IGNvcm5lciBcbiAgICBwcml2YXRlIHg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSB5OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBoZWlndGhNb2RlbDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHdpZHRoTW9kZWw6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIG1vZGVsOiBBcnJheTxBcnJheTxudW1iZXI+PiA9IFtdO1xuICAgIFxuICAgIHByaXZhdGUgb25QbGF5RmllbGQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG5vQWRkZWRMaW5lczogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBtb2RlbDogQXJyYXk8QXJyYXk8bnVtYmVyPj4pIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgICAgICB0aGlzLmhlaWd0aE1vZGVsID0gbW9kZWwubGVuZ3RoXG4gICAgICAgIHRoaXMud2lkdGhNb2RlbCA9IG1vZGVsWzBdLmxlbmd0aFxuICAgICAgICB0aGlzLm9uUGxheUZpZWxkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9BZGRlZExpbmVzID0gNDtcbiAgICB9XG5cbiAgIFxuICAgIGdldFgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueDtcbiAgICB9XG4gICAgZ2V0WSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy55O1xuICAgIH1cbiAgICBzZXRYKHg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgIH1cbiAgICBzZXRZKHk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbiAgICBcbiAgICBnZXRNb2RlbCgpOiBBcnJheTxBcnJheTxudW1iZXI+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsO1xuICAgIH1cbiAgICBcbiAgICBzZXRNb2RlbChtb2RlbDpBcnJheTxBcnJheTxudW1iZXI+Pik6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgfVxuXG4gICAgZ2V0SGVpZ3RoTW9kZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ3RoTW9kZWw7XG4gICAgfVxuICAgIGdldFdpZHRoTW9kZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGhNb2RlbDtcbiAgICB9XG4gICAgZ2V0T25QbGF5RmllbGQoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub25QbGF5RmllbGRcbiAgICB9XG4gICAgZ2V0Tm9BZGRlZExpbmVzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vQWRkZWRMaW5lcztcbiAgICB9XG4gICAgZGVjcmVtZW50Tm9BZGRlZExpbmVzKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLm5vQWRkZWRMaW5lcyA+PSAwKVxuICAgICAgICAgICAgdGhpcy5ub0FkZGVkTGluZXMtLTtcbiAgICB9XG4gICAgXG4gICAgXG5cbn0iLCJleHBvcnQgY2xhc3MgQ2FyTW9kZWwge1xuXG4gICAgLy9jb29yZGluYXRlcyBvZiB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgXG4gICAgcHJpdmF0ZSB4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgeTogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgaGVpZ3RoTW9kZWw6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSB3aWR0aE1vZGVsOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBtb2RlbDogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXVxuXG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgbW9kZWw6IEFycmF5PEFycmF5PG51bWJlcj4+KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5oZWlndGhNb2RlbCA9IG1vZGVsLmxlbmd0aFxuICAgICAgICB0aGlzLndpZHRoTW9kZWwgPSBtb2RlbFswXS5sZW5ndGhcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0WCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy54O1xuICAgIH1cbiAgICBnZXRZKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnk7XG4gICAgfVxuICAgIHNldFgoeDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgfVxuICAgIHNldFkoeTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuICAgIFxuICAgIGdldE1vZGVsKCk6IEFycmF5PEFycmF5PG51bWJlcj4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWw7XG4gICAgfVxuICAgIFxuICAgIHNldE1vZGVsKG1vZGVsOkFycmF5PEFycmF5PG51bWJlcj4+KTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB9XG5cbiAgICBnZXRIZWlndGhNb2RlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlndGhNb2RlbDtcbiAgICB9XG4gICAgZ2V0V2lkdGhNb2RlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aE1vZGVsO1xuICAgIH1cbiAgICBcblxufSIsImltcG9ydCB7Q2FyTW9kZWx9IGZyb20gJy4vY2FyTW9kZWwnO1xuaW1wb3J0IHtCYXJyYWdlTW9kZWx9IGZyb20gJy4vYmFycmFnZU1vZGVsJztcblxuZXhwb3J0IGNsYXNzIEdhbWVNb2RhbCB7XG4gICAgXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NvcmU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIGlzR2FtZU92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgd2lkdGhHYW1lRmllbGQ6IG51bWJlciA9IDEwO1xuICAgIHByaXZhdGUgaGVpZ3RoR2FtZUZpZWxkOiBudW1iZXIgPSAyMDtcbiAgICBwcml2YXRlIHBsYXlGaWVsZDogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcbiAgICBwcml2YXRlIGFycmF5QmFycmFnZXM6IEFycmF5PEJhcnJhZ2VNb2RlbD4gPSBbXTtcbiAgICBwcml2YXRlIHRpY2s6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50aWNrID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFycmF5QmFycmFnZXMgPSBbXTsgXG4gICAgICAgIHRoaXMucGxheUZpZWxkID0gW1xuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDFdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdXG4gICAgICAgIF1cblxuICAgIH1cblxuICAgIGFycmF5Q2FyTW9kZWw6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW1xuICAgICAgICBbMCwgMiwgMF0sXG4gICAgICAgIFsyLCAyLCAyXSxcbiAgICAgICAgWzAsIDIsIDBdLFxuICAgICAgICBbMiwgMCwgMl1cbiAgICBdXG4gICAgYXJyYXlCYXJyYWdlTW9kZWw6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW1xuICAgICAgICBbMSwgMCwgMV0sXG4gICAgICAgIFswLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDFdLFxuICAgICAgICBbMCwgMSwgMF1cbiAgICBdXG5cbiAgICBjYXJNb2RlbDogQ2FyTW9kZWwgPSBuZXcgQ2FyTW9kZWwoMiwgMTYsIHRoaXMuYXJyYXlDYXJNb2RlbCk7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIGdldFN0YXRlUGxheUZpZWxkKCk6IEFycmF5PEFycmF5PG51bWJlcj4+IHtcbiAgICAgICAgY29uc3QgcGxheUZpZWxkU3RhdGUgPSB0aGlzLnBsYXlGaWVsZC5zbGljZSgpXG4gICAgICAgIHJldHVybiBwbGF5RmllbGRTdGF0ZTtcbiAgICB9XG4gICAgZ2V0U3RhdGVJc0dhbWVPdmVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0dhbWVPdmVyO1xuICAgIH1cbiAgICBnZXRTdGF0ZUN1cnJlbnRTY29yZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgfVxuICAgIFxuICAgIGdldFN0YXRlU3BlZWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlZWQ7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2FyTW9kZWwuc2V0WCgyKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKVxuICAgIH0gICBcblxuICAgIG1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYXJNb2RlbC5zZXRYKDUpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICByZXN0YXJ0KCkge1xuICAgICAgIHRoaXMuY29uc3RydWN0b3IoKTtcbiAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb24oKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB3aWR0aENhciA9IHRoaXMuY2FyTW9kZWwuZ2V0V2lkdGhNb2RlbCgpO1xuICAgICAgICBjb25zdCBjb29yZFggPSB0aGlzLmNhck1vZGVsLmdldFgoKTtcbiAgICAgICAgZm9yKGxldCB5ID0gMTY7IHkgPCAyMDsgeSsrKXtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBjb29yZFg7IHggPCBjb29yZFggKyB3aWR0aENhcjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5jYXJNb2RlbC5nZXRNb2RlbCgpW3RoaXMuaGVpZ3RoR2FtZUZpZWxkIC0gMSAtIHldW3ggLSBjb29yZFhdID09IDIgJiYgXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RmllbGRbeV1beF0gPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhckluaXQoKSB7XG4gICAgICAgIGxldCByYW5kb21WYWx1ZSA9IHRoaXMucmFuZG9tU2lkZSgwLCAxKSBcbiAgICAgICAgdGhpcy5jYXJNb2RlbCA9IG5ldyBDYXJNb2RlbChyYW5kb21WYWx1ZSwgMTYsIHRoaXMuYXJyYXlDYXJNb2RlbCkgXG4gICAgfVxuXG4gICAgbG9ja0NhclBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB3aWR0aENhciA9IHRoaXMuY2FyTW9kZWwuZ2V0V2lkdGhNb2RlbCgpO1xuICAgICAgICBsZXQgY29vcmRZID0gdGhpcy5jYXJNb2RlbC5nZXRZKClcbiAgICAgICAgbGV0IGNvb3JkWCA9IHRoaXMuY2FyTW9kZWwuZ2V0WCgpO1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgIGZvcihsZXQgeSA9IGNvb3JkWTsgeSA8IHRoaXMuaGVpZ3RoR2FtZUZpZWxkOyB5Kyspe1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGNvb3JkWDsgeCA8IGNvb3JkWCArIHdpZHRoQ2FyOyB4KyspIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNhck1vZGVsLmdldE1vZGVsKClbeSAtIGNvb3JkWV1beCAtIGNvb3JkWF0gPT0gMilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5RmllbGRbeV1beF0gPSAyOyAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2FySW5pdCgpO1xuICAgICAgICB0aGlzLmFycmF5QmFycmFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5wdXNoQmFycmFnZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgfVxuXG4gICAgd2FsbHNNb3ZlKCk6IHZvaWQge1xuICAgICAgICBsZXQgbGFzdEl0ZW06IG51bWJlciA9IHRoaXMucGxheUZpZWxkWzBdWzBdXG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlndGhHYW1lRmllbGQgLSAxOyB5KyspIHtcbiAgICAgICAgICAgIHRoaXMucGxheUZpZWxkW3ldWzBdID0gdGhpcy5wbGF5RmllbGRbeSsxXVswXSBcbiAgICAgICAgICAgIHRoaXMucGxheUZpZWxkW3ldWzldID0gdGhpcy5wbGF5RmllbGRbeSsxXVs5XVxuICAgICAgICB9ICAgIFxuXG4gICAgICAgIHRoaXMucGxheUZpZWxkW3RoaXMuaGVpZ3RoR2FtZUZpZWxkLTFdWzBdID0gbGFzdEl0ZW07ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgdGhpcy5wbGF5RmllbGRbdGhpcy5oZWlndGhHYW1lRmllbGQtMV1bOV0gPSBsYXN0SXRlbTsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgYWRkQmFycmFnZSgpIHtcbiAgICAgICAgdGhpcy50aWNrKytcbiAgICAgICAgaWYodGhpcy50aWNrID09IDkpIHtcbiAgICAgICAgICAgIHRoaXMudGljayA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY29yZSArPSAxMDA7XG4gICAgICAgICAgICB0aGlzLnNwZWVkICs9IDE7XG4gICAgICAgICAgICB0aGlzLnB1c2hCYXJyYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmFycmFnZXNNb3ZlRG93bigpOiB2b2lkIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXJyYXlCYXJyYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuYXJyYXlCYXJyYWdlc1tpXTtcbiAgICAgICAgICAgIGxldCBjb29yZFkgPSBlbGVtZW50LmdldFkoKVxuICAgICAgICAgICAgY29vcmRZKys7XG4gICAgICAgICAgICBlbGVtZW50LnNldFkoY29vcmRZKVxuICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubG9ja0JhcnJhZ2UoZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZ2FtZU92ZXIoKTp2b2lkIHsgICBcbiAgICAgICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5yZXN0YXJ0KCk7XG4gICAgfVxuXG4gICAgbG9ja0JhcnJhZ2UoYmFycmFnZTogQmFycmFnZU1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoQmFycmFnZSA9IHRoaXMuY2FyTW9kZWwuZ2V0V2lkdGhNb2RlbCgpO1xuICAgICAgICBjb25zdCBoZWlndGhCYXJyYWdlID0gdGhpcy5jYXJNb2RlbC5nZXRIZWlndGhNb2RlbCgpO1xuICAgICAgICBjb25zdCBibG9ja3MgPSBiYXJyYWdlLmdldE1vZGVsKCk7XG5cbiAgICAgICAgbGV0IGNvb3JkWCA9IGJhcnJhZ2UuZ2V0WCgpO1xuICAgICAgICBsZXQgY29vcmRZID0gYmFycmFnZS5nZXRZKCk7XG5cbiAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuXG4gICAgICAgIGlmKHRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAgICAgcmV0dXJuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgeSA9IGNvb3JkWTsgeSA8IGNvb3JkWSArIGhlaWd0aEJhcnJhZ2U7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGNvb3JkWDsgeCA8IGNvb3JkWCArIHdpZHRoQmFycmFnZTsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wbGF5RmllbGRbeV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoYmxvY2tzW2Nvb3JkWSArIGhlaWd0aEJhcnJhZ2UgLSAxIC0geV1beCAtIGNvb3JkWF0gPT0gMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5RmllbGRbeV1beF0gPSAxOyAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIHB1c2hCYXJyYWdlKCk6IEJhcnJhZ2VNb2RlbCB7XG4gICAgICAgIGxldCBiYXJyYWdlOiBCYXJyYWdlTW9kZWwgPSB0aGlzLmdlbmVyYXRlQmFycmFnZSgpOyBcbiAgICAgICAgdGhpcy5hcnJheUJhcnJhZ2VzLnB1c2goYmFycmFnZSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYmFycmFnZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUJhcnJhZ2UoKTogQmFycmFnZU1vZGVsIHtcbiAgICAgICAgbGV0IHJhbmRvbVZhbHVlID0gdGhpcy5yYW5kb21TaWRlKDAsIDEpIFxuICAgICAgICBsZXQgYmFycmFnZSA9IG5ldyBCYXJyYWdlTW9kZWwocmFuZG9tVmFsdWUsIC01LCB0aGlzLmFycmF5QmFycmFnZU1vZGVsKTsgXG5cbiAgICAgICAgcmV0dXJuIGJhcnJhZ2U7XG4gICAgfVxuICAgIFxuICAgIHJhbmRvbVNpZGUgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGxldCByYW5kID0gbWluIC0gMC41ICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKTtcbiAgICAgICAgaWYoTWF0aC5yb3VuZChyYW5kKSA9PSAwKXtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA1O1xuXG4gICAgfVxuICAgICAgICBcbiAgICBjbGVhclJvYWQoKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlndGhHYW1lRmllbGQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPCB0aGlzLnBsYXlGaWVsZFswXS5sZW5ndGggLTE7IHgrKykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheUZpZWxkW3ldW3hdID09IDEgfHwgMil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUZpZWxkW3ldW3hdID0gMDsgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gICAgICAgIFxuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyUm9hZCgpO1xuICAgICAgICB0aGlzLmxvY2tDYXJQb3NpdGlvbigpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnJheUJhcnJhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2tCYXJyYWdlKHRoaXMuYXJyYXlCYXJyYWdlc1tpXSk7ICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxufSIsImV4cG9ydCBjbGFzcyBWaWV3IHtcbiAgICBcbiAgICByb290RE9NRWxlbWVudDogYW55ID0gbnVsbDtcbiAgICB3aWR0aEdhbWVGaWVsZDogbnVtYmVyID0gMDtcbiAgICBoZWlndGhHYW1lRmllbGQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lUm9vdEVsZW1lbnQ6IHN0cmluZywgd2lkdGhHYW1lRmllbGQ6IG51bWJlciwgaGVpZ3RoR2FtZUZpZWxkOiBudW1iZXIgKSB7XG4gICAgICAgIHRoaXMucm9vdERPTUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQobmFtZVJvb3RFbGVtZW50KTtcbiAgICAgICAgdGhpcy53aWR0aEdhbWVGaWVsZCA9IHdpZHRoR2FtZUZpZWxkO1xuICAgICAgICB0aGlzLmhlaWd0aEdhbWVGaWVsZCA9IGhlaWd0aEdhbWVGaWVsZDtcbiAgICB9XG5cbiAgICBnZXRET01FbGVtZW50KG5hbWVFbGVtZW50OiBzdHJpbmcpOiAgSFRNTEVsZW1lbnQgfCBudWxsIHsgXG4gICAgICAgIGxldCBET01lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZUVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gRE9NZWxlbWVudDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBzdHJpbmdIVE1MOmFueSA9IHRoaXMuZ2VuZXJhdGVQbGF5RmllbGQodGhpcy53aWR0aEdhbWVGaWVsZCwgdGhpcy5oZWlndGhHYW1lRmllbGQpIFxuICAgICAgICAgICAgICAgICAgICAgICAgKyB0aGlzLmdlbmVyYXRlU2lkZUJhcigpO1xuICAgICAgICB0aGlzLnJvb3RET01FbGVtZW50LmlubmVySFRNTCA9IHN0cmluZ0hUTUw7XG4gICAgfVxuXG4gICAgdXBkYXRlKHBsYXlGaWVsZDpBcnJheTxBcnJheTxudW1iZXI+PiwgY3VycmVudFNjb3JlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBjdXJyZW50U2NvcmVIVE1MOmFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50LXNjb3JlJyk7XG4gICAgICAgIGxldCBzcGVlZEhUTUw6YW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwZWVkJyk7XG5cbiAgICAgICAgY3VycmVudFNjb3JlSFRNTC5pbm5lckhUTUwgPSBgPHNwYW4+IHNjb3JlOiAke2N1cnJlbnRTY29yZX08L3NwYW4+YCBcbiAgICAgICAgc3BlZWRIVE1MLmlubmVySFRNTCA9IGA8c3Bhbj4gc3BlZWQ6ICR7c3BlZWR9PC9zcGFuPmBcblxuICAgICAgICBmb3IobGV0IHk6IG51bWJlciA9IDA7IHkgPCB0aGlzLmhlaWd0aEdhbWVGaWVsZDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4OiBudW1iZXIgPSAwOyB4IDwgdGhpcy53aWR0aEdhbWVGaWVsZDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVsZW06YW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7eX0tJHt4fWApO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5RmllbGRbeV1beF0gPT0gMSB8fCBwbGF5RmllbGRbeV1beF0gPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJuby1hY3RpdmUtZmllbGRcIilcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWZpZWxkXCIpXG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtZmllbGRcIilcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKFwibm8tYWN0aXZlLWZpZWxkXCIpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVBsYXlGaWVsZCh3aWR0aEdhbWVGaWVsZDogbnVtYmVyLCBoZWlndGhHYW1lRmllbGQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHJpbmdIVE1MOiBzdHJpbmcgPSBcIjxkaXYgY2xhc3M9J2NvbmFpbmVyJz48dGFibGU+XCI7IFxuICAgICAgICBmb3IgKGxldCB5OiBudW1iZXIgPSAwOyB5IDwgaGVpZ3RoR2FtZUZpZWxkOyB5KyspIHtcbiAgICAgICAgICAgIHN0cmluZ0hUTUwgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgICBmb3IgKGxldCB4OiBudW1iZXIgPSAwOyB4IDwgd2lkdGhHYW1lRmllbGQ7IHgrKykge1xuXG4gICAgICAgICAgICAgICAgc3RyaW5nSFRNTCArPSBgPHRkIGlkPSR7eX0tJHt4fT48L3RkPmAgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyaW5nSFRNTCArPSBcIjwvdHI+XCJcbiAgICAgICAgfVxuICAgICAgICBzdHJpbmdIVE1MICs9IFwiPC90YWJsZT48L2Rpdj5cIlxuICAgICAgICByZXR1cm4gc3RyaW5nSFRNTDtcbiAgICB9XG4gICAgZ2VuZXJhdGVTaWRlQmFyKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHJpbmdIVE1MOiBzdHJpbmcgPSBcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJzaWRlLWJhclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLXNjb3Jlc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlJlc3VsdHM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImN1cnJlbnQtc2NvcmVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInNwZWVkXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8L2JyPlxuICAgICAgICAgICAgICAgIDxzcGFuPiBFbnRlciAtIHBhdXNlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnI+XG4gICAgICAgICAgICAgICAgPHNwYW4+IEFycm93cyAtIGxlZnQgLyByaWdodDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gOyBcbiAgICAgICAgcmV0dXJuIHN0cmluZ0hUTUw7XG4gICAgfVxuXG59ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQge0dhbWVNb2RhbH0gZnJvbSBcIi4vbW9kZWxzL2dhbWVNb2RhbFwiXG5pbXBvcnQge1ZpZXd9IGZyb20gJy4vdmlldy92aWV3J1xuaW1wb3J0IHtDb250cm9sbGVyfSBmcm9tICcuL2NvbnRyb2xsZXIvY29udHJvbGxlcidcblxuY29uc3QgZ2FtZU1vZGFsOiBHYW1lTW9kYWwgPSBuZXcgR2FtZU1vZGFsKCk7XG5cbmNvbnN0IHZpZXc6IFZpZXcgPSBuZXcgVmlldyhcInJvb3RcIiwgMTAsIDIwKTtcblxuY29uc3QgY29udHJvbGxlcjogQ29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyICh2aWV3LCBnYW1lTW9kYWwpO1xuXG5jb250cm9sbGVyLnN0YXJ0R2FtZSgpIFxuXG5cblxuICBcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==