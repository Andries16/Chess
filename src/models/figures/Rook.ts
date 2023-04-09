import {Figure, FigureNames} from "./Figure";
import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Rook extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color == Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if(this.cell.board.isAttacked){
            if(target == this.cell.board.Attacker && this.canAttack(this.cell.board.Attacker))
            return true;
            if( this.cell.board.Attacked?.figure?.color == this.color 
                && super.canDefend(target) && this.canAttack(target))
                return true;
        }else{
            if(!super.canMove(target)){
                return false;
            };
            if(this.cell.isEmptyVertical(target))
                return true
            if(this.cell.isEmptyHorizontal(target))
                return true
        }
        return false
    }

    canAttack(target: Cell,without:Cell | null = null): boolean {
        if(!super.canAttack(target)){
            return false;
        };
        if(without ? this.cell.isEmptyVertical(target,without) : this.cell.isEmptyVertical(target))
            return true
        if(without ? this.cell.isEmptyHorizontal(target,without) : this.cell.isEmptyHorizontal(target))
            return true
        return false
    }
}
