var freeLine = (function () {
'use strict';

var events = [
    'mouseover','touchstart','touchend',
    'mouseleave','mousedown','mouseup'
];

var Grabber = function Grabber(element, ref){
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var defaultCursor = ref.defaultCursor; if ( defaultCursor === void 0 ) defaultCursor = 'default';


    this.hovered = false;
    this.down = false;
    this.defaultCursor = defaultCursor;
    this.originalCursor = null;
    this.isTouch = false;
    this.element = element;

    this.handleEvent = function(event){
        return this['_' + event.type](event);
    };

    events.forEach(function (event){
        element.addEventListener(event, this$1);
    });
};

var prototypeAccessors = { cursor: {} };
Grabber.prototype.destroy = function destroy (){
        var this$1 = this;


    events.forEach(function (event){
        this$1.element.removeEventListener(event, this$1);
    });

    Object.keys(this)
    .forEach(function (n){ return this$1[n] = null; });
};
prototypeAccessors.cursor.get = function (){
    return this.element.style.cursor;
};
prototypeAccessors.cursor.set = function (v){
    this.element.style.cursor = v;
};
Grabber.prototype._touchstart = function _touchstart (){
    if(this.originalCursor === null){
        this._save();
    }
    this.cursor = 'grabbing';
    this.down = true;
};
Grabber.prototype._touchend = function _touchend (){
    this.down = false;
    this._restore();
};
Grabber.prototype._mouseover = function _mouseover (){
    if(!this.hovered){
        this._save();
        this.cursor = 'grab';
    }

    this.hovered = true;
};
Grabber.prototype._mouseleave = function _mouseleave (){
    this.hovered = false;
};
Grabber.prototype._mousedown = function _mousedown (){
    if(!this.down){
        this.cursor = 'grabbing';
    }
    this.down = true;
};
Grabber.prototype._mouseup = function _mouseup (){
    this.cursor = 'grab';
    this.down = false;
};
Grabber.prototype._save = function _save (){
    if(this.defaultCursor){
        this.originalCursor = this.defaultCursor;
        return;
    }
    this.originalCursor = this.cursor;
};
Grabber.prototype._restore = function _restore (){
    if(this.originalCursor){
        this.cursor = this.originalCursor;
    }else{
        this.cursor = this.defaultCursor;
    }
    this.originalCursor = null;
};

Object.defineProperties( Grabber.prototype, prototypeAccessors );

function setGrabber(element){
    return new Grabber(element);
}

return setGrabber;

}());
//# sourceMappingURL=dom-set-grabber.js.map
