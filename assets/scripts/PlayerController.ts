
import { _decorator, Component, Node, Vec3, systemEvent, SystemEvent, EventMouse, Animation } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerController
 * DateTime = Thu Dec 09 2021 11:52:55 GMT+0530 (India Standard Time)
 * Author = alokraj0024
 * FileBasename = PlayerController.ts
 * FileBasenameNoExtension = PlayerController
 * URL = db://assets/scripts/PlayerController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('PlayerController')
export class PlayerController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({type : Animation})
    public BodyAnim : Animation|null = null;


    private _startJump : boolean = false;
    private _jumpStep : number = 0;
    private _currJumpTime : number = 0;
    private _jumpTime : number = 0.1;
    private _currJumpSpeed : number = 0;
    private _currPos : Vec3 = new Vec3();
    private _deltaPos : Vec3 = new Vec3(0,0,0);
    private _targetPos : Vec3 = new Vec3();
    private _isMoving : boolean = false;
    private _currMoveIndex : number = 0;

    start () {
        // [3]
        //systemEvent.on(SystemEvent.EventType.MOUSE_UP,this.onMouseUp,this);
    }

    onMouseUp(event : EventMouse)
    {
        switch(event.getButton())
        {
            case 0 :
                this.jumpByStep(1);
                break;
            case 2 :
                this.jumpByStep(2);
        }
    }

    jumpByStep(step : number)
    {
        if(this._isMoving)
            return;
        

        if (this.BodyAnim) {
            if (step === 1) {
                this.BodyAnim.play('oneStep');
            }
            else if (step === 2) {
                this.BodyAnim.play('twoStep');
            }
        }    

        this._startJump = true;
        this._jumpStep = step;
        this._currJumpTime = 0;
        this._currJumpSpeed = this._jumpStep / this._jumpTime;
        this.node.getPosition(this._currPos);
        Vec3.add(this._targetPos,this._currPos,new Vec3(this._jumpStep,0,0));

        this._isMoving = true;
        this._currMoveIndex += step;
    }

    onOnceJumpEnd() {
        this._isMoving = false;
        this.node.emit('JumpEnd',this._currMoveIndex);
    }

    update (deltaTime: number) {
        // [4]
        if(this._startJump)
        {
            this._currJumpTime += deltaTime;
            if(this._currJumpTime > this._jumpTime)
            {
                this.node.setPosition(this._targetPos);
                this._startJump = false;
                this.onOnceJumpEnd();
            }
            
            else
            {
                this.node.getPosition(this._currPos);
                this._deltaPos.x = this._currJumpSpeed * deltaTime;
                Vec3.add(this._currPos,this._currPos,this._deltaPos);
                this.node.setPosition(this._currPos);
            }
        }
    }

    setInputActive(active: boolean) {
        if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        }
    }

    reset() {
        this._currMoveIndex = 0;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
