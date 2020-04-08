import EventEmitter = PIXI.utils.EventEmitter;

export class NetworkProvider extends EventEmitter
{
    // ==== Params ============================================= //
    public static EVENT_CONNECTED: string = 'Connected';
    public static EVENT_DISCONNECTED: string = 'Disconnected';
    public static EVENT_DATA: string = 'Data';
    public static EVENT_ERROR: string = 'Error';
    public static EVENT_GAME_IS_WAITING: string = 'GameIsWaiting';
    public static EVENT_GAME_IS_BUSY: string = 'GameIsBusy';


    private _gameIsBusy: boolean;
    private _socket: WebSocket;
    private _queue: any[] = [];

    // ==== Init ============================================= //
    /**
     * @private
     */
    constructor()
    {
        super();
        this.on(NetworkProvider.EVENT_GAME_IS_WAITING, this.popData);
        this.on(NetworkProvider.EVENT_GAME_IS_BUSY, this.storeData);
    }

    // ==== Base ============================================= //

    public getSocket(): WebSocket
    {
        return this._socket;
    }

    public openConnection(url: any): void
    {
        this._socket = new WebSocket(url);        
        this._socket.addEventListener('close', this.onClose.bind(this));
        this._socket.addEventListener('message', this.onMessage.bind(this));
        this._socket.addEventListener('error', this.onError.bind(this));
        this._socket.addEventListener('open', this.onOpen.bind(this));
    }

    private closeConnection(event: any): void
    {
        this._socket.close();
        this.emit(NetworkProvider.EVENT_DISCONNECTED);
    }

    public send(data: any): void
    {
        console.log(JSON.stringify(data));
        this._socket.send(JSON.stringify(data));
    }

    private storeData(): void
    {
        this._gameIsBusy = true;
    }

    private popData(): void
    {
        this._gameIsBusy = false;
        this.emit(NetworkProvider.EVENT_DATA, this._queue.shift());
    }

    // ==== Events ============================================= //

    private onError(event: any)
    {
        this.emit(NetworkProvider.EVENT_ERROR);
        this.closeConnection(event);
    }

    private onOpen(): void
    {
        this.emit(NetworkProvider.EVENT_CONNECTED);
    }

    private onClose(event: any): void
    {
        if (event.wasClean) {
            // console.log('Соединение закрыто чисто');
            this.emit(NetworkProvider.EVENT_DISCONNECTED, {
                status: 'wasClean'
            });

        } else {
            // console.log('Обрыв соединения сообщение из класса Network');
            this.emit(NetworkProvider.EVENT_DISCONNECTED, {
                status: 'disconnection'
            });
        }
        // console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }

    private onMessage(event: any): void
    {
        try 
        {
            let data = JSON.parse(event.data);
            if (this._gameIsBusy)
                this._queue.push(data);
            else
                this.emit(NetworkProvider.EVENT_DATA, data);
        }
        catch
        {
            return;
        }
    }
}