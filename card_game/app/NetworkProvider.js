var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventEmitter = PIXI.utils.EventEmitter;
    var NetworkProvider = /** @class */ (function (_super) {
        __extends(NetworkProvider, _super);
        // ==== Init ============================================= //
        /**
         * @private
         */
        function NetworkProvider() {
            var _this = _super.call(this) || this;
            _this._queue = [];
            _this.on(NetworkProvider.EVENT_GAME_IS_WAITING, _this.popData);
            _this.on(NetworkProvider.EVENT_GAME_IS_BUSY, _this.storeData);
            return _this;
        }
        // ==== Base ============================================= //
        NetworkProvider.prototype.getSocket = function () {
            return this._socket;
        };
        NetworkProvider.prototype.openConnection = function (url) {
            this._socket = new WebSocket(url);
            this._socket.addEventListener('close', this.onClose.bind(this));
            this._socket.addEventListener('message', this.onMessage.bind(this));
            this._socket.addEventListener('error', this.onError.bind(this));
            this._socket.addEventListener('open', this.onOpen.bind(this));
        };
        NetworkProvider.prototype.closeConnection = function (event) {
            this._socket.close();
            this.emit(NetworkProvider.EVENT_DISCONNECTED);
        };
        NetworkProvider.prototype.send = function (data) {
            console.log(JSON.stringify(data));
            this._socket.send(JSON.stringify(data));
        };
        NetworkProvider.prototype.storeData = function () {
            this._gameIsBusy = true;
        };
        NetworkProvider.prototype.popData = function () {
            this._gameIsBusy = false;
            this.emit(NetworkProvider.EVENT_DATA, this._queue.shift());
        };
        // ==== Events ============================================= //
        NetworkProvider.prototype.onError = function (event) {
            this.emit(NetworkProvider.EVENT_ERROR);
            this.closeConnection(event);
        };
        NetworkProvider.prototype.onOpen = function () {
            this.emit(NetworkProvider.EVENT_CONNECTED);
        };
        NetworkProvider.prototype.onClose = function (event) {
            if (event.wasClean) {
                // console.log('Соединение закрыто чисто');
                this.emit(NetworkProvider.EVENT_DISCONNECTED, {
                    status: 'wasClean'
                });
            }
            else {
                // console.log('Обрыв соединения сообщение из класса Network');
                this.emit(NetworkProvider.EVENT_DISCONNECTED, {
                    status: 'disconnection'
                });
            }
            // console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
        NetworkProvider.prototype.onMessage = function (event) {
            try {
                var data = JSON.parse(event.data);
                if (this._gameIsBusy)
                    this._queue.push(data);
                else
                    this.emit(NetworkProvider.EVENT_DATA, data);
            }
            catch (_a) {
                return;
            }
        };
        // ==== Params ============================================= //
        NetworkProvider.EVENT_CONNECTED = 'Connected';
        NetworkProvider.EVENT_DISCONNECTED = 'Disconnected';
        NetworkProvider.EVENT_DATA = 'Data';
        NetworkProvider.EVENT_ERROR = 'Error';
        NetworkProvider.EVENT_GAME_IS_WAITING = 'GameIsWaiting';
        NetworkProvider.EVENT_GAME_IS_BUSY = 'GameIsBusy';
        return NetworkProvider;
    }(EventEmitter));
    exports.NetworkProvider = NetworkProvider;
});
//# sourceMappingURL=NetworkProvider.js.map