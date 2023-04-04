import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-bishop.png";
import blackLogo from "../../assets/black-bishop.png";
import { Board } from "../Board";

export class Bishop extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color == Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell): boolean {
        if(this.cell.board.isAttacked){
            if(target == this.cell.board.Attacker && this.canAttack(this.cell.board.Attacker))
                return true;
            if( this.cell.board.Attacked?.figure?.color == this.color 
                && super.canDefend(target)  && this.canAttack(target))
                return true;
        }else{
        if(!super.canMove(target)){
            return false;
        };
         
        if(this.cell.isEmptyDiagonal(target))
            return true;
        }  
        return false
    }

    canAttack(target: Cell): boolean {
        if(!super.canAttack(target)){
            return false;
        };
        if(this.cell.isEmptyDiagonal(target))
            return true;
        return false
    }
}