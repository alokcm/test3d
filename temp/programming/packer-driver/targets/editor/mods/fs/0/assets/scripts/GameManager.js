System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _decorator, Component, Node, Prefab, CCInteger, instantiate, Vec3, PlayerController, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _crd, ccclass, property, BlockType, GameState, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlayerController(extras) {
    _reporterNs.report("PlayerController", "./PlayerController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      CCInteger = _cc.CCInteger;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      PlayerController = _unresolved_2.PlayerController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1c98bu8RyFCo5A9qYtnai5S", "GameManager", undefined);

      ({
        ccclass,
        property
      } = _decorator);
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

      (function (BlockType) {
        BlockType[BlockType["BT_NONE"] = 0] = "BT_NONE";
        BlockType[BlockType["BT_STONE"] = 1] = "BT_STONE";
      })(BlockType || (BlockType = {}));

      (function (GameState) {
        GameState[GameState["GS_INIT"] = 0] = "GS_INIT";
        GameState[GameState["GS_PLAYING"] = 1] = "GS_PLAYING";
        GameState[GameState["GS_END"] = 2] = "GS_END";
      })(GameState || (GameState = {}));

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: CCInteger
      }), _dec4 = property({
        type: _crd && PlayerController === void 0 ? (_reportPossibleCrUseOfPlayerController({
          error: Error()
        }), PlayerController) : PlayerController
      }), _dec5 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "cubePrefab", _descriptor, this);

          _initializerDefineProperty(this, "maxRoads", _descriptor2, this);

          _initializerDefineProperty(this, "playCtrl", _descriptor3, this);

          _initializerDefineProperty(this, "startMenu", _descriptor4, this);

          _defineProperty(this, "_road", []);

          _defineProperty(this, "_curState", GameState.GS_INIT);
        }

        start() {
          var _this$playCtrl;

          // [3]
          this._curState = GameState.GS_INIT;
          this.generateRoad();

          if (this.playCtrl) {
            this.playCtrl.setInputActive(false);
            this.playCtrl.node.setPosition(Vec3.ZERO);
          }

          (_this$playCtrl = this.playCtrl) === null || _this$playCtrl === void 0 ? void 0 : _this$playCtrl.node.on('JumpEnd', this.onPlayerJumpEnd, this);
        }

        onPlayerJumpEnd(moveIndex) {
          this.checkResult(moveIndex);
        }

        set curState(value) {
          switch (value) {
            case GameState.GS_INIT:
              this.init();
              break;

            case GameState.GS_PLAYING:
              if (this.startMenu) this.startMenu.active = false;
              setTimeout(() => {
                if (this.playCtrl) this.playCtrl.setInputActive(true);
              }, 0.1);
              break;
          }

          this.curState = value;
        }

        init() {
          if (this.startMenu) this.startMenu.active = true;
        }

        generateRoad() {
          this.node.removeAllChildren();
          this._road = [];

          this._road.push(BlockType.BT_STONE);

          for (let i = 1; i < this.maxRoads; i++) {
            if (this._road[i - 1] === BlockType.BT_NONE) this._road.push(BlockType.BT_STONE);else this._road.push(Math.floor(Math.random() * 2));
          }

          for (let j = 0; j < this.maxRoads; j++) {
            if (this._road[j]) {
              let block = instantiate(this.cubePrefab);
              this.node.addChild(block);
              block.setPosition(j, -1.5, 0);
            }
          }
        }

        onStartButtonClicked() {
          this.curState = GameState.GS_PLAYING;
        }

        checkResult(moveIndex) {
          if (moveIndex <= this.maxRoads) {
            // Jump to the empty square
            if (this._road[moveIndex] == BlockType.BT_NONE) this.curState = GameState.GS_INIT;
          } else this.curState = GameState.GS_INIT; // skipped the maximum length

        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cubePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxRoads", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playCtrl", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startMenu", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=GameManager.js.map