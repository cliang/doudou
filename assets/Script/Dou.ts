const {ccclass, property} = cc._decorator;

@ccclass
export default class Dou extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    dou: cc.Sprite = null;

    @property
    posX: number = 0;

    @property
    frames:cc.SpriteFrame[];

    @property
    posY: number = 0;

    @property
    id: number = 0;

    start () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,function(event:cc.Event){
            this.node.emit("touch_dou",this.posX,this.posY);
        },this);
    }

    init(x:number,y:number){
        this.id = 0;
        this.posX = x;
        this.posY = y;
    }

    setData(value:number){
        this.id = value;
        this.render();
    }

    getId(){
        return this.id
    }
    
    render(){
        if (this.id == 0) {
            this.dou.enabled = false;
        }
        else{
            this.dou.enabled = true;
            this.dou.spriteFrame.setTexture(frames[this.id + 1]);
        }
    }

    clear(){
        this.setData(0);
    }
}
