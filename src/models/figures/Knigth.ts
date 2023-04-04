import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-knight.png";
import blackLogo from "../../assets/black-knight.png";

export class Knigth extends Figure{
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color == Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KNIGTH;
    }

    canMove(target: Cell): boolean {
        if(this.cell.board.isAttacked){
            if(target == this.cell.board.Attacker && this.canAttack(this.cell.board.Attacker))
            return true;
            if( this.cell.board.Attacked?.figure?.color == this.color 
                && super.canDefend(target) && this.canAttack(target))
                return true;
            return false
        }else{
            if(!super.canMove(target)){
                return false;
            };
            
            const dx = Math.abs(this.cell.x - target.x);
            const dy = Math.abs(this.cell.y - target.y);

            return (dx === 1 && dy === 2 ) || (dx === 2 && dy === 1)
        }
    }

    canAttack(target: Cell): boolean {
        if(!super.canAttack(target)){
            return false;
        };
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return (dx === 1 && dy === 2 ) || (dx === 2 && dy === 1)
    }
}