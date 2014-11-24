/**
 * Created by wangjiewen on 14-11-2.
 */

var AnimationLayer = cc.Layer.extend({

    //当前老鼠的list
    mouseList : [],

    ctor : function () {
        this._super();
        this.init();
    },

    init : function () {
        var self = this;
        this._super();

        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width/2, winSize.height/2);

        //底色背景
        var background = new cc.Sprite(resource.bg_dirt);
        background.setPosition(centerPos);
        background.setScale(2.0);
        this.addChild(background, -2);

        //下面草的背景
        var grassLower1 = new cc.Sprite(resource.lower);
        grassLower1.setAnchorPoint(cc.p(0, 0));
        grassLower1.setPosition(0, 0);
        this.addChild(grassLower1, 1);

        //上面草的背景
        var grassUpper1 = new cc.Sprite(resource.upper);
        grassUpper1.setAnchorPoint(cc.p(0, 0));
        grassUpper1.setPosition(0, 102);
        this.addChild(grassUpper1, -1);

        //下面草的背景
        var grassLower2 = new cc.Sprite(resource.lower);
        grassLower2.setAnchorPoint(cc.p(0, 0));
        grassLower2.setPosition(0, 160);
        this.addChild(grassLower2, 1)

        //上面草的背景
        var grassUpper2 = new cc.Sprite(resource.upper);
        grassUpper2.setAnchorPoint(cc.p(0, 0));
        grassUpper2.setPosition(0, 262);
        this.addChild(grassUpper2, -1);


        //下面草的背景
        var grassLower3 = new cc.Sprite(resource.lower);
        grassLower3.setAnchorPoint(cc.p(0, 0));
        grassLower3.setPosition(0, 320);
        this.addChild(grassLower3, 1)

        //上面草的背景
        var grassUpper3 = new cc.Sprite(resource.upper);
        grassUpper3.setAnchorPoint(cc.p(0, 0));
        grassUpper3.setPosition(0,422);
        this.addChild(grassUpper3, -1);

        //老鼠
        var mouse1 = new cc.Sprite(resource.mole_1);
        mouse1.attr({x : 200, y: 370,height:120});
        mouse1.setTag(0);
        mouse1.setScale(0.8);
        self.mouseList.push(mouse1);
        this.addChild(mouse1, 0);

        var mouse2 = new cc.Sprite(resource.mole_1);
        mouse2.attr({x : 515, y: 370,height:120});
        mouse2.setScale(0.8);
        mouse2.setTag(0);
        self.mouseList.push(mouse2);
        this.addChild(mouse2, 0);

        var mouse3 = new cc.Sprite(resource.mole_1);
        mouse3.attr({x : 815,  y: 370,height:120});
        mouse3.setScale(0.8);
        mouse3.setTag(0);
        self.mouseList.push(mouse3);
        this.addChild(mouse3, 0);

        var mouse4 = new cc.Sprite(resource.mole_1);
        mouse4.attr({x : 200, y: 210,height:120});
        mouse4.setScale(0.8);
        mouse4.setTag(0);
        self.mouseList.push(mouse4);
        this.addChild(mouse4, 0);

        var mouse5 = new cc.Sprite(resource.mole_1);
        mouse5.attr({x : 515, y: 210,height:120});
        mouse5.setScale(0.8);
        mouse5.setTag(0);
        self.mouseList.push(mouse5);
        this.addChild(mouse5, 0);

        var mouse6 = new cc.Sprite(resource.mole_1);
        mouse6.attr({x : 815,  y: 210,height:120});
        mouse6.setScale(0.8);
        mouse6.setTag(0);
        self.mouseList.push(mouse6);
        this.addChild(mouse6, 0);

        var mouse7 = new cc.Sprite(resource.mole_1);
        mouse7.attr({x : 200, y: 50,height:120});
        mouse7.setScale(0.8);
        mouse7.setTag(0);
        self.mouseList.push(mouse7);
        this.addChild(mouse7, 0);

        var mouse8 = new cc.Sprite(resource.mole_1);
        mouse8.attr({x : 515, y: 50,height:120});
        mouse8.setScale(0.8);
        mouse8.setTag(0);
        self.mouseList.push(mouse8);
        this.addChild(mouse8, 0);

        var mouse9 = new cc.Sprite(resource.mole_1);
        mouse9.attr({x : 815,  y: 50,height:120});
        mouse9.setScale(0.8);
        mouse9.setTag(0);
        self.mouseList.push(mouse9);
        this.addChild(mouse9, 0);

        //this.schedule(function () {
            self.tryPopMouse();
        //}, 1);


        //this.scheduleUpdate();

    },

    /**
     * 每帧的更新图 由scheduleUpdate()调用
     * @param dt
     */
    update : function (dt) {
    },

    /**
     * 控制地鼠的弹出
     */
    tryPopMouse : function () {
        var self = this;
        var len = self.mouseList.length;

        //setInterval(function () {
            var index = parseInt(Math.random()*10000) % len;
            var mouse = self.mouseList[index];
            if(mouse.getNumberOfRunningActions() == 0){
                self.popMouse(mouse);
            }
        //}, 1000)
    },

    /**
     * 弹出一个地鼠
     * @param {cc.Sprite} mouse
     */
    popMouse : function (mouse) {
        var self = this;

        var x = mouse.x;
        var y = mouse.y;
        console.log(mouse);
        //return;
        var moveUp = cc.MoveBy.create(0.8, cc.p(x,y));
        var easeMoveUp = cc.EaseInOut.create(moveUp, 3);
        //var easeMoveDown = easeMoveUp.reverse();
        var easeMoveDown = cc.callFunc(function(){
            console.log(mouse);
        });
        var laugh = self.createAnimation('mole_laugh', [1,2,3]);

        //向上移动的回调
        var moveUpCallback = cc.CallFunc.create(function () {
            mouse.setTag(1); //刚刚冒出来的时候可以敲地鼠
        }, this);

        var laughCallback = cc.callFunc(function () {
            mouse.setTag(0); //笑完了之后开始下落了不能敲
        }, this);

        mouse.runAction(cc.Sequence.create(easeMoveUp, moveUpCallback, laugh, laughCallback, easeMoveDown));
    },

    /**
     *
     * @param {String} prefixName 前缀
     * @param {int[]} frameNum
     */
    createAnimation : function (prefixName, frameArr) {
        var animation = cc.Animation.create();
        for(var i = 0; i < frameArr.length; i++){
            var img = prefixName + frameArr[i];
            animation.addSpriteFrameWithFile(resource[img]);
        }
        animation.setDelayPerUnit(2.8/14);
        animation.setRestoreOriginalFrame(true);

        return cc.Animate.create(animation);
    },


    /**
     * 3.1版本之后需要在PlayScene调用，因为它已经集成在EventManager中
     * @param {Object} touch
     * @param {Object} event
     * @returns {boolean}
     */
    onTouchBegan : function(touch, event) {
        var self = this;
        var localPos = this.convertTouchToNodeSpace(touch);
        for(var i=0; i<self.mouseList.length; i++){
            var mouse = self.mouseList[i];
            if(mouse.getTag() == 0){
                continue;
            }
            var rect = mouse.getBoundingBox();
            var isHit = cc.rectContainsPoint(rect, localPos);
            if(isHit){
                mouse.setTag(0);
                mouse.stopAllActions();
                var hitAnimation = self.createAnimation('mole_thump',[1,2,3,4]);
                var moveDown = cc.MoveBy.create(1, cc.p(0, -mouse.getContentSize().height + 60));
                var easeMoveDown = cc.EaseInOut.create(moveDown, 1.0);
                mouse.runAction(cc.Sequence.create(hitAnimation, easeMoveDown, null));
            }

        }
        return true;
    },

    onTouchMoved : function(touch, event) {
        var pos = touch.getLocation();
        debugger;
    },

    onTouchEnded : function(touch, event) {
       debugger;
    }


});