const {ccclass, property} = cc._decorator;

@ccclass
export default class Panel extends cc.Component {

    @property(cc.Label)
    btnReset: cc.Button = null;

    start () {
        this.btnReset.node.on(cc.Node.EventType.MOUSE_DOWN,function(event:cc.Event){
            (this.node as cc.Sprite).enabled = false;
            this.node.emit("reset_game",this.posX,this.posY);
        },this);
    }
}
