const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property
    bestScoreLabel:cc.Label = null;

    @property
    scoreLabel:cc.Label = null;

    @property
    timeLabel:cc.Label = null;

    @property
    bestScore:number = null;

    @property
    score:number = null;

    @property
    time:number = null;

    @property
    douPrefab:cc.Prefab = null;

    @property
    douList:cc.Node[][];

    @property
    panel:cc.Sprite;

    @property
    wNum:number = 8;

    @property
    hNum:number = 10;

    @property
    idNum:number[] = [8,8,8];

    start () {
        this.douList = [];
        for (let i = 0; i < this.hNum; i++) {
            this.douList[i] = [];
            for (let j = 0; j < this.wNum; j++) {
                this.douList[i][j] = cc.instantiate(this.douPrefab);
                this.node.on("touch_dou",this.touchDou,this);
            }
        }
        this.panel.enabled = false;
        this.panel.node.on("reset_game",this.reset,this);
    }

    touchDou(posx:number,posy:number){
        var x:number = posx;
        var y:number = posy;
        var aroundList:cc.Sprite[] = this.findAround(x,y);
        var sameList:cc.Sprite[] = this.getSameId(aroundList);
        this.clearList(sameList);
        this.score += this.score + sameList.length;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
        }
        this.render();
        if (this.isOver()) {
            this.panel.enabled = true;
        }
    }

    clearList(aroundList:cc.Sprite[]){
        for (let index = 0; index < aroundList.length; index++) {
            const element = aroundList[index];
            var dou = element.getComponent("Dou");
            dou.clear();
        }
    }

    getSameId(aroundList:cc.Sprite[]):cc.Sprite[]{
        var clearList:cc.Sprite[] = [];
        for (let index = 0; index < aroundList.length; index++) {
            const element = aroundList[index];
            var dou = element.getComponent("Dou");
            for (let index2 = 0; index2 < aroundList.length; index2++) {
                const elemen2t = aroundList[index2];
                var dou2 = elemen2t.getComponent("Dou");
                if (index2 != index && dou2.getId() == dou.getId()) {
                    clearList.push(dou);
                    break;
                }
            }
        }
        return clearList
    }

    findAround(x:number,y:number):cc.Sprite[]{
        var node:cc.Node = this.douList[y][x];
        var dou = node.getComponent("Dou");
        if (dou.getId() != 0) {
            return null;
        }
    }

    reset(){
        for (let i = 0; i < this.hNum; i++) {
            for (let j = 0; j < this.wNum; j++) {
                var node:cc.Node = this.douList[i][j];
                var dou = node.getComponent("Dou");
                dou.clear();
            }
        }

        for (let index = 0; index < this.idNum.length; index++) {
            const element = this.idNum[index];
            for (let i = 0; i < element; i++) {
                var hasSetData:boolean = false;
                while (hasSetData) {
                    var randomX:number = Math.floor(Math.random()*this.wNum);
                    var randomY:number = Math.floor(Math.random()*this.hNum);
                    var node:cc.Node = this.douList[randomY][randomX];
                    var dou = node.getComponent("Dou");
                    if (dou.getId() == 0) {
                        hasSetData = true;
                        dou.setData(index);
                    }
                }          
            }
        }
    }

    isOver():boolean{
        for (let i = 0; i < this.hNum; i++) {
            for (let j = 0; j < this.wNum; j++) {
                var node:cc.Node = this.douList[i][j];
                var dou = node.getComponent("Dou");
                var aroundList:cc.Sprite[] = this.findAround(i,j);
                var sameList:cc.Sprite[] = this.getSameId(aroundList);
                if (sameList.length > 0) {
                    return false
                }
            }
        }
        return true;
    }

    render(){
        this.bestScoreLabel.string = this.bestScore.toString();
        this.scoreLabel.string = this.score.toString();
        this.timeLabel.string = this.time.toString();
    }
}
