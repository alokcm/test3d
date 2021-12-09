
import { _decorator, Component, Node, Prefab, CCInteger, instantiate, Game, Vec3 } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Thu Dec 09 2021 15:23:54 GMT+0530 (India Standard Time)
 * Author = alokraj0024
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 

enum BlockType{
    BT_NONE,
    BT_STONE,
}

enum GameState{
    GS_INIT,
    GS_PLAYING,
    GS_END,
}

@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({type : Prefab})
    public cubePrefab : Prefab|null = null;
    @property({type : CCInteger})
    public maxRoads : Number = 50;
    @property({type : PlayerController})
    public playCtrl : PlayerController = null;
    @property({type : Node})
    public startMenu : Node = null;

    private _road : number[] = [];
    private _curState: GameState = GameState.GS_INIT;

    start () {
        // [3]

        this._curState = GameState.GS_INIT;

        this.generateRoad();

        if(this.playCtrl)
        {
            this.playCtrl.setInputActive(false);
            this.playCtrl.node.setPosition(Vec3.ZERO);
        }

        this.playCtrl?.node.on('JumpEnd', this.onPlayerJumpEnd, this);
    }


    onPlayerJumpEnd(moveIndex: number) {
        this.checkResult(moveIndex);
    }
    set curState (value: GameState) {
        switch(value)
        {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                if(this.startMenu)
                    this.startMenu.active = false;
                
                    setTimeout(() => {
                        if(this.playCtrl)
                            this.playCtrl.setInputActive(true);
                    },0.1);
                break;
        }
        this.curState = value;
    }

    init() {
        if(this.startMenu)
            this.startMenu.active = true;
    }
    
    generateRoad() {
        this.node.removeAllChildren();
        this._road = [];
        this._road.push(BlockType.BT_STONE);

        for(let i = 1;i< this.maxRoads;i++)
        {
            if(this._road[i-1] === BlockType.BT_NONE)
                this._road.push(BlockType.BT_STONE);
            else
                this._road.push(Math.floor(Math.random() * 2));
        }

        for(let j = 0;j<this.maxRoads;j++)
        {
            if(this._road[j])
            {
                let block = instantiate(this.cubePrefab);
                this.node.addChild(block);
                block.setPosition(j,-1.5,0);

            }
        }
    }

    onStartButtonClicked() {
        this.curState = GameState.GS_PLAYING;
    }

    checkResult(moveIndex: number) {
        if (moveIndex <= this.maxRoads) {
            // Jump to the empty square
            if (this._road[moveIndex] == BlockType.BT_NONE)
                this.curState = GameState.GS_INIT;
        }
        else
            this.curState = GameState.GS_INIT;  // skipped the maximum length
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
