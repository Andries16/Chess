import {Colors} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Board} from "./Board";

export class Cell{
    readonly x:number;
    readonly y:number;
    readonly color : Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;
    isAttack:boolean;
    isAttacker:boolean;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.board = board;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = Math.random();
        this.isAttack = false;
        this.isAttacker = false;
    }

    isEmpty(){
        return this.figure === null;
    }

    isEmptyVertical(target: Cell, without:Cell | null = null):boolean{
        if(this.x !== target.x)
            return false

        const  min = Math.min(this.y, target.y);
        const  max = Math.max(this.y, target.y);
        for(let i=min+1;i<max;i++){
            if(!this.board.getCell(this.x,i).isEmpty() &&  (without ? this.board.getCell(this.x,i)!==without:true))
                return false;
        }
        return true
    }

    isEmptyHorizontal(target: Cell, without:Cell | null = null):boolean{
        if(this.y !== target.y)
            return false
        const  min = Math.min(this.x, target.x);
        const  max = Math.max(this.x, target.x);
        for(let i=min+1;i<max;i++){
            if(!this.board.getCell(i,this.y).isEmpty()&&  (without ? this.board.getCell(i,this.y)!==without:true))
                return false;
        }
        return true;
    }

    isEnemy(target:Cell):boolean{
        if(target.figure){
            return target.figure?.color !== this.figure?.color
        }
        return false;
    }

    isEmptyDiagonal(target: Cell, without:Cell | null = null):boolean{
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absY !== absX) return false;
        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1


        for (let i = 1; i < absY;i++)
            if(!this.board.getCell(this.x + dx*i, this.y+dy*i).isEmpty() &&  (without ? this.board.getCell(this.x + dx*i, this.y+dy*i)!==without:true))
                return false;
        return true;
    }

    setFigure(figure:Figure){
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure:Figure){
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }

    canAttack(target:Cell, theKing:Cell){
        theKing.isAttack = true;
        target.isAttacker = true;
        target.board.isAttacked = true;
        target.board.Attacker = target;
        target.board.Attacked = theKing;
    }

    moveFigure(target:Cell){
        if(this.figure && this.figure?.canMove(target)){
            this.figure?.moveFigure(target);
            if(target.figure){
                this.addLostFigure(target.figure);
            }
            target.setFigure(this.figure);
            if(this === this.board.Attacked){
                this.isAttack = false;
                if(this.board.Attacker)this.board.Attacker.isAttacker = false;
                this.board.Attacked = null;
                this.board.Attacker = null;
                this.board.isAttacked = false;
            }
            this.figure = null;
            var theKing = this.board.cells[0][0];
            for(let i = 0;i<this.board.cells.length;i++)
                for(let j = 0;j<8;j++)
                    if(this.board.cells[i][j].figure?.name === FigureNames.KING 
                        && this.board.cells[i][j].figure?.color !== target.figure?.color){
                        theKing = this.board.cells[i][j];
                        break;
                    }
            if(target.figure?.canAttack(theKing)){
              this.canAttack(target,theKing);
            };
            for(let i = 0;i<8;i++)
                 for(let j = 0;j<8;j++){
                        let cell = this.board.cells[i][j];
                        if(cell.isAttack){
                            if(!cell.isAttacked()){
                                cell.isAttack = false;
                                if(cell.board.Attacker)cell.board.Attacker.isAttacker = false;
                                cell.board.Attacked = null;
                                cell.board.Attacker = null;
                                cell.board.isAttacked = false;
                               
                            }
                        }
                    }
            let color;
            switch(target.figure?.color){
                case "white":  color = Colors.BLACK;break;
                case "black":  color = Colors.WHITE;break;
            }
           target.board.isDefeat(color);
        }
    }

    canBeAttacked(target:Cell){
        for(let i = 0;i<8;i++)
            for(let j = 0;j<8;j++)
                if(this.board.cells[i][j].figure?.color !== this.figure?.color 
                    && this.board.cells[i][j].figure?.canAttack(target,this,true) && this.board.cells[i][j] !== target)
                        return true;
        return false;
    }

    isAttacked():boolean{
        for(let i = 0;i<8;i++)
        for(let j = 0;j<8;j++)
            if(this.board.cells[i][j].figure?.color !== this.figure?.color 
                && this.board.cells[i][j].figure?.canAttack(this))return true;
          return false;
    }

}