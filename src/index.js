const events = [
    'mouseover','touchstart','touchend',
    'mouseleave','mousedown','mouseup'
];

class Grabber {
    constructor(element, {
        defaultCursor = 'default'
    } = {}){

        this.hovered = false;
        this.down = false;
        this.defaultCursor = defaultCursor;
        this.originalCursor = null;
        this.isTouch = false;
        this.element = element;

        this.handleEvent = function(event){
            return this['_' + event.type](event);
        };

        events.forEach(event=>{
            element.addEventListener(event, this);
        });
    }
    destroy(){

        events.forEach(event=>{
            this.element.removeEventListener(event, this);
        });

        Object.keys(this)
        .forEach(n=>this[n] = null);
    }
    get cursor(){
        return this.element.style.cursor;
    }
    set cursor(v){
        this.element.style.cursor = v;
    }
    _touchstart(){
        if(this.originalCursor === null){
            this._save();
        }
        this.cursor = 'grabbing';
        this.down = true;
    }
    _touchend(){
        this.down = false;
        this._restore();
    }
    _mouseover(){
        if(!this.hovered){
            this._save();
            this.cursor = 'grab';
        }

        this.hovered = true;
    }
    _mouseleave(){
        this.hovered = false;
    }
    _mousedown(){
        if(!this.down){
            this.cursor = 'grabbing';
        }
        this.down = true;
    }
    _mouseup(){
        this.cursor = 'grab';
        this.down = false;
    }
    _save(){
        if(this.defaultCursor){
            this.originalCursor = this.defaultCursor;
            return;
        }
        this.originalCursor = this.cursor;
    }
    _restore(){
        if(this.originalCursor){
            this.cursor = this.originalCursor;
        }else{
            this.cursor = this.defaultCursor;
        }
        this.originalCursor = null;
    }
}

export default function setGrabber(element){
    return new Grabber(element);
}
