import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-queen.png";
import blackLogo from "../../assets/black-queen.png";

export class Queen extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color == Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.QUEEN;
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
            if(this.cell.isEmptyVertical(target))
                return true
            if(this.cell.isEmptyHorizontal(target))
                return true
            if(this.cell.isEmptyDiagonal(target))
                return true
        }
        return false
    }

    canAttack(target: Cell): boolean {
        if(!super.canAttack(target)){
            return false;
        };
        if(this.cell.isEmptyVertical(target))
        return true
        if(this.cell.isEmptyHorizontal(target))
            return true
        if(this.cell.isEmptyDiagonal(target))
            return true
        return false
    }
}