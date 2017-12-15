import Container = PIXI.Container;
import {Game} from "./Game";
import {Brick} from "./Brick";
import {Ball} from "./Ball";
import {Rocket} from "./Rocket";
import {PowerUp} from "./PowerUp";

export class Level extends Container
{
    // Params >>------------------------------------------------------------<<<<
    private _levelMatrix: number[][];
    private _bricks: Brick[];
    public powerUps: PowerUp[] = [];
    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this._levelMatrix =
            [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [0,0,0,1,1,1,1,0,1,1,1,1],
                [0,0,0,2,2,0,0,0,0,0,2,2],
                [0,0,0,2,2,0,0,4,0,0,2,2],
                [0,0,0,2,2,0,0,0,0,0,2,2],
                [0,0,0,1,1,1,1,3,1,1,1,1],
            ];
        this.configurate();
    }

    protected configurate():void
    {
        this.setBricks();
    }

    protected setBricks():void
    {
        this._bricks = [];
        for (let i = 0; i < this._levelMatrix.length; i++)
        {
            for (let j = 0; j < this._levelMatrix[i].length; j++)
            {
                if (this._levelMatrix[i][j] != 0)
                {
                    let newBrick = new Brick((j+1) * 32, i * 16 + 84, this._levelMatrix[i][j]);
                    this._bricks.push(newBrick);
                    this.addChild(newBrick);
                }
            }
        }
    }

    protected removeBricks():void
    {
        for (let i = 0; i < this._bricks.length; i++)
        {
            this.removeChild(this._bricks[i]);
        }
    }

    public setStage(stage: any):void
    {
        switch (stage)
        {
            case 1:
                this._levelMatrix =
                    [
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [0,0,0,1,1,1,1,0,1,1,1,1],
                        [0,0,0,2,2,0,0,0,0,0,2,2],
                        [0,0,0,2,2,0,0,4,0,0,2,2],
                        [0,0,0,2,2,0,0,0,0,0,2,2],
                        [0,0,0,1,1,1,1,3,1,1,1,1],
                    ];
                break;
            case 2:
                this._levelMatrix =
                    [
                        [],
                        [],
                        [],
                        [],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                    ];
                break;
            default:
                this._levelMatrix =
                    [
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,3,0,0,3,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,3,0,0,3,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                        [0,0,0,1,1,2,0,0,2,1,1],
                    ];
        }
        this.removeBricks();
        this.setBricks();
    }

    protected rectangleCollision(x1: any, y1: any, width1: any, height1: any, x2: any, y2: any, width2: any, height2: any):boolean
    {
        return y1 <= y2 + height2
            && y1 + height1 >= y2
            && x1 + width1 >= x2
            && x1 <= x2 + width2
    }

    public checkCollision(ball: Ball, rocket: Rocket): void
    {
        let velocityX: number;
        let velocityY: number;
        for (let i = 0; i < this._bricks.length; i++)
        {
            let collision: boolean;
            if (this.rectangleCollision(ball.posX + ball.width/4, ball.posY, ball.width/2, ball.height/4,
                    this._bricks[i].posX, this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height ))
            {
                console.log('Up');
                collision = true;
                velocityX = ball.velocityX;
                velocityY = -ball.velocityY;
            }
            else if (this.rectangleCollision(ball.posX + 3*ball.width/4, ball.posY + ball.height/4, ball.width/4, ball.height/2,
                    this._bricks[i].posX,this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height ))
            {
                console.log('Right');
                collision = true;
                velocityX = -ball.velocityX;
                velocityY = ball.velocityY;
            }
            else if (this.rectangleCollision(ball.posX + ball.width/4, ball.posY + 4*ball.height/4, ball.width/2, ball.height/4,
                    this._bricks[i].posX,this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height ))
            {
                console.log('Down');
                collision = true;
                velocityX = ball.velocityX;
                velocityY = -ball.velocityY;
            }
            else if (this.rectangleCollision(ball.posX, ball.posY + ball.height/4, ball.width/4, ball.height/2,
                    this._bricks[i].posX,this._bricks[i].posY, this._bricks[i].width, this._bricks[i].height ))
            {
                console.log('Left');
                collision = true;
                velocityX = -ball.velocityX;
                velocityY = ball.velocityY;

            }

            if (collision)
            {
                let blockDestroyed = this._bricks[i].dealDamage();
                if (blockDestroyed)
                {
                    if (this._bricks[i].powerBrick)
                    {
                        let newPowerUp = new PowerUp(this._bricks[i].posX + this._bricks[i].width/2,
                            this._bricks[i].posY + this._bricks[i].height);
                        this.powerUps.push(newPowerUp);
                        this.addChild(newPowerUp);
                    }
                    this.removeChild(this._bricks[i]);
                    this._bricks.splice(i, 1);
                    if (this._bricks.length <= 0)
                    {
                        this.emit('NextLevel');
                    }
                }
                createjs.Sound.play('collision');
                this.emit('Collision', velocityX, velocityY, blockDestroyed);
                break;
            }
        }

        if (ball.posY + ball.width > rocket.posY
            && ball.posY + ball.height < rocket.posY + rocket.height
            && ball.posX + ball.width > rocket.posX
            && ball.posX < rocket.posX + rocket.width)
        {
            let velocity = this.calculateVelocity(ball.posX, ball.posY, rocket.posX, rocket.width, rocket.posY, rocket.height);
            createjs.Sound.play('pong');
            this.emit('Collision', velocity[0], velocity[1] * ball.velocityY, false);
        }

        for (let i=0; i<this.powerUps.length;i++)
        {
            if (this.rectangleCollision(this.powerUps[i].posX, this.powerUps[i].posY, this.powerUps[i].width, this.powerUps[i].height,
                rocket.posX, rocket.posY, rocket.width, rocket.height))
            {
                this.powerUps[i].active = false;
                this.emit('PowerUp', this.powerUps[i].power);
                this.removeChild(this.powerUps[i]);
                this.powerUps.splice(i, 1);
            }
            else if (this.powerUps[i].posY > Game.HEIGHT)
            {
                this.removeChild(this.powerUps[i]);
                this.powerUps.splice(i, 1);
            }
        }
    }

    protected calculateVelocity(ballX: number, ballY: number,
                                rectX: number, rectWidth: number, rectY: number, rectHeight: number):number[]
    {
        let sideHit = ballY - 2 <= rectY + rectHeight && ballY >= rectY + 2;
        if (ballX <= rectX + rectWidth / 5)
        {
            if(sideHit)
                return [-1, 1];
            else
                return [-1, -1];
        }
        else if (ballX <= rectX + 2*rectWidth / 5)
        {
            return [-0.5, -1];
        }
        else if (ballX <= rectX + 3*rectWidth / 5)
        {
            return [Math.random() * 0.2 - 0.1, -1];
        }
        else if (ballX <= rectX + 3*rectWidth / 5)
        {
            return [0.5, -1];
        }
        else
        {
            if(sideHit)
                return [1, 1];
            else
                return [1, -1];
        }
    }


    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}