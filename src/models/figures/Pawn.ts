import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-pawn.png";
import blackLogo from "../../assets/black-pawn.png";
import { dir } from "console";

export class Pawn extends Figure{

    isFirstStep : boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color == Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN;
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
            const direction = this.cell.figure?.color === Colors.WHITE ? -1 : 1;
            const firstStep = this.cell.figure?.color === Colors.WHITE ? -2 : 2;

            if((target.y === this.cell.y + direction || this.isFirstStep
                && (target.y === this.cell.y+firstStep && this.cell.board.getCell(target.x,this.cell.y+direction).isEmpty()))
                && target.x == this.cell.x
                && this.cell.board.getCell(target.x,target.y).isEmpty()
            )return true

            if(target.y === this.cell.y + direction
                && (target.x == this.cell.x+1 || target.x ===this.cell.x-1)
                && this.cell.isEnemy(target)
            )return true
        }
        return  false
    }


    canAttack(target: Cell,without:Cell | null = null,isTest:boolean = false): boolean {
        if(!super.canAttack(target)){
            return false;
        };
        const direction = this.cell.figure?.color === Colors.WHITE ? -1 : 1;
        const firstStep = this.cell.figure?.color === Colors.WHITE ? -2 : 2;

        if((target.y === this.cell.y + direction || this.isFirstStep
            && (target.y === this.cell.y+firstStep))
            && target.x == this.cell.x
            && this.cell.board.getCell(target.x,target.y).isEmpty()
            && !isTest
        )return true

        if(target.y === this.cell.y + direction
            && (target.x === this.cell.x+1 || target.x ===this.cell.x-1)
            && (isTest ? true : this.cell.isEnemy(target))
        )return true
        return  false
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}