const {ccclass, property} = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    @property
    bestScore: string = '0';

    start () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN,function(event){
            cc.director.loadScene("GameScene");
        },this);
    }
}
