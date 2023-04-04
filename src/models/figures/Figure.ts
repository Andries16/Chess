import {Colors} from "../Colors";
import logo from '../../assets/black-knight.png';
import {Cell} from "../Cell";

export enum FigureNames{
    FIGURE = "figure",
    KING = "king",
    KNIGTH = "knigth",
    PAWN = "pawn",
    QUEEN = "queen",
    ROOK = "rook",
    BISHOP = "bishop",


}

export class Figure{
    color:Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell) : boolean{
      if(target.figure?.color == this.color)
          return false
      if(target.figure?.name == FigureNames.KING)
          return false
      return true
    }

    canAttack(target:Cell) :boolean{
        return true
    }
    moveFigure(target: Cell){

    }

    canDefend(target:Cell):boolean{

        var posibleCells = [];
        switch(this.cell.board.Attacker?.figure?.name){
            case "queen" :
                    if(this.cell.board.Attacked && this.cell.board.Attacker?.isEmptyVertical(this.cell.board.Attacked)){
                            const  min = Math.min(this.cell.board.Attacker.y, this.cell.board.Attacked.y);
                            const  max = Math.max(this.cell.board.Attacker.y, this.cell.board.Attacked.y);
                            for(let i=min+1;i<max;i++){
                                let cell = this.cell.board.getCell(this.cell.board.Attacker.x,i)
                                if(cell.isEmpty())
                                    posibleCells.push(cell);
                            }
                    }
                    if(this.cell.board.Attacked &&this.cell.board.Attacker?.isEmptyHorizontal(this.cell.board.Attacked)){
                        const  min = Math.min(this.cell.board.Attacker.x, this.cell.board.Attacked.x);
                        const  max = Math.max(this.cell.board.Attacker.x, this.cell.board.Attacked.x);
                        for(let i=min+1;i<max;i++){
                            let cell =this.cell.board.getCell(i,this.cell.board.Attacker.y)
                            if(cell.isEmpty())
                                posibleCells.push(cell);
                        }
                    }
                    if(this.cell.board.Attacked && this.cell.board.Attacker?.isEmptyDiagonal(this.cell.board.Attacked)){
                            const absX = Math.abs(this.cell.board.Attacked.x - this.cell.board.Attacker.x);
                            const absY = Math.abs(this.cell.board.Attacked.y - this.cell.board.Attacker.y);
                            if(absY !== absX) return false;
                            const dy = this.cell.board.Attacker.y < this.cell.board.Attacked.y ? 1 : -1
                            const dx = this.cell.board.Attacker.x < this.cell.board.Attacked.x ? 1 : -1
                    
                            for (let i = 1; i < absY;i++){
                                let cell = this.cell.board.getCell(this.cell.board.Attacker.x + dx*i, this.cell.board.Attacker.y+dy*i)
                                if(cell.isEmpty())
                                    posibleCells.push(cell);
                            }
                    }; break;
            case "rook" :  if(this.cell.board.Attacked && this.cell.board.Attacker?.isEmptyVertical(this.cell.board.Attacked)){
                                    const  min = Math.min(this.cell.board.Attacker.y, this.cell.board.Attacked.y);
                                    const  max = Math.max(this.cell.board.Attacker.y, this.cell.board.Attacked.y);
                                    for(let i=min+1;i<max;i++){
                                        let cell = this.cell.board.getCell(this.cell.board.Attacker.x,i)
                                        if(cell.isEmpty())
                                            posibleCells.push(cell);
                                    }
                            }
                            if(this.cell.board.Attacked &&this.cell.board.Attacker?.isEmptyHorizontal(this.cell.board.Attacked)){
                                const  min = Math.min(this.cell.board.Attacker.x, this.cell.board.Attacked.x);
                                const  max = Math.max(this.cell.board.Attacker.x, this.cell.board.Attacked.x);
                                for(let i=min+1;i<max;i++){
                                    let cell =this.cell.board.getCell(i,this.cell.board.Attacker.y)
                                    if(cell.isEmpty())
                                        posibleCells.push(cell);
                                }
                            } break;
            case "bishop" :if(this.cell.board.Attacked && this.cell.board.Attacker?.isEmptyDiagonal(this.cell.board.Attacked)){
                                    const absX = Math.abs(this.cell.board.Attacked.x - this.cell.board.Attacker.x);
                                    const absY = Math.abs(this.cell.board.Attacked.y - this.cell.board.Attacker.y);
                                    if(absY !== absX) return false;
                                    const dy = this.cell.board.Attacker.y < this.cell.board.Attacked.y ? 1 : -1
                                    const dx = this.cell.board.Attacker.x < this.cell.board.Attacked.x ? 1 : -1
                            
                                    for (let i = 1; i < absY;i++){
                                        let cell = this.cell.board.getCell(this.cell.board.Attacker.x + dx*i, this.cell.board.Attacker.y+dy*i)
                                        if(cell.isEmpty())
                                            posibleCells.push(cell);
                                    }
                            }; break;
        }


        for(let i=0;i<posibleCells.length;i++)
            if(target === posibleCells[i]) return true;

        return false;
    }
}