System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Vec3, systemEvent, SystemEvent, Animation, _dec, _dec2, _class, _class2, _descriptor, _temp, _crd, ccclass, property, PlayerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      systemEvent = _cc.systemEvent;
      SystemEvent = _cc.SystemEvent;
      Animation = _cc.Animation;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "36038ABNHZPVqGKwH1T0cMB", "PlayerController", undefined);

      ({
        ccclass,
        property
      } = _decorator);
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

      _export("PlayerController", PlayerController = (_dec = ccclass('PlayerController'), _dec2 = property({
        type: Animation
      }), _dec(_class = (_class2 = (_temp = class PlayerController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "BodyAnim", _descriptor, this);

          _defineProperty(this, "_startJump", false);

          _defineProperty(this, "_jumpStep", 0);

          _defineProperty(this, "_currJumpTime", 0);

          _defineProperty(this, "_jumpTime", 0.1);

          _defineProperty(this, "_currJumpSpeed", 0);

          _defineProperty(this, "_currPos", new Vec3());

          _defineProperty(this, "_deltaPos", new Vec3(0, 0, 0));

          _defineProperty(this, "_targetPos", new Vec3());

          _defineProperty(this, "_isMoving", false);

          _defineProperty(this, "_currMoveIndex", 0);
        }

        start() {// [3]
          //systemEvent.on(SystemEvent.EventType.MOUSE_UP,this.onMouseUp,this);
        }

        onMouseUp(event) {
          switch (event.getButton()) {
            case 0:
              this.jumpByStep(1);
              break;

            case 2:
              this.jumpByStep(2);
          }
        }

        jumpByStep(step) {
          if (this._isMoving) return;

          if (this.BodyAnim) {
            if (step === 1) {
              this.BodyAnim.play('oneStep');
            } else if (step === 2) {
              this.BodyAnim.play('twoStep');
            }
          }

          this._startJump = true;
          this._jumpStep = step;
          this._currJumpTime = 0;
          this._currJumpSpeed = this._jumpStep / this._jumpTime;
          this.node.getPosition(this._currPos);
          Vec3.add(this._targetPos, this._currPos, new Vec3(this._jumpStep, 0, 0));
          this._isMoving = true;
          this._currMoveIndex += step;
        }

        onOnceJumpEnd() {
          this._isMoving = false;
          this.node.emit('JumpEnd', this._currMoveIndex);
        }

        update(deltaTime) {
          // [4]
          if (this._startJump) {
            this._currJumpTime += deltaTime;

            if (this._currJumpTime > this._jumpTime) {
              this.node.setPosition(this._targetPos);
              this._startJump = false;
              this.onOnceJumpEnd();
            } else {
              this.node.getPosition(this._currPos);
              this._deltaPos.x = this._currJumpSpeed * deltaTime;
              Vec3.add(this._currPos, this._currPos, this._deltaPos);
              this.node.setPosition(this._currPos);
            }
          }
        }

        setInputActive(active) {
          if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          }
        }

        reset() {
          this._currMoveIndex = 0;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "BodyAnim", [_dec2], {
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
//# sourceMappingURL=PlayerController.js.map