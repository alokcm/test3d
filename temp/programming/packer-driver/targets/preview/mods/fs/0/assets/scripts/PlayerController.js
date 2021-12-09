System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Vec3, systemEvent, SystemEvent, Animation, _dec, _dec2, _class, _class2, _descriptor, _temp, _crd, ccclass, property, PlayerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

      ccclass = _decorator.ccclass;
      property = _decorator.property;
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
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerController, _Component);

        function PlayerController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "BodyAnim", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_startJump", false);

          _defineProperty(_assertThisInitialized(_this), "_jumpStep", 0);

          _defineProperty(_assertThisInitialized(_this), "_currJumpTime", 0);

          _defineProperty(_assertThisInitialized(_this), "_jumpTime", 0.1);

          _defineProperty(_assertThisInitialized(_this), "_currJumpSpeed", 0);

          _defineProperty(_assertThisInitialized(_this), "_currPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_deltaPos", new Vec3(0, 0, 0));

          _defineProperty(_assertThisInitialized(_this), "_targetPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_isMoving", false);

          _defineProperty(_assertThisInitialized(_this), "_currMoveIndex", 0);

          return _this;
        }

        var _proto = PlayerController.prototype;

        _proto.start = function start() {// [3]
          //systemEvent.on(SystemEvent.EventType.MOUSE_UP,this.onMouseUp,this);
        };

        _proto.onMouseUp = function onMouseUp(event) {
          switch (event.getButton()) {
            case 0:
              this.jumpByStep(1);
              break;

            case 2:
              this.jumpByStep(2);
          }
        };

        _proto.jumpByStep = function jumpByStep(step) {
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
        };

        _proto.onOnceJumpEnd = function onOnceJumpEnd() {
          this._isMoving = false;
          this.node.emit('JumpEnd', this._currMoveIndex);
        };

        _proto.update = function update(deltaTime) {
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
        };

        _proto.setInputActive = function setInputActive(active) {
          if (active) {
            systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          } else {
            systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
          }
        };

        _proto.reset = function reset() {
          this._currMoveIndex = 0;
        };

        return PlayerController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "BodyAnim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
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