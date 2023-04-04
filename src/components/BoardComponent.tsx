import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps{
    board:Board;
    setBoard : (board:Board)=>void;
    currentPlayer : Player | null;
    swapPlayer: ()=>void;
}

const BoardComponent: FC<BoardProps> = ({board,setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell,setSelectedCell] = useState<Cell | null> (null);

    function click(cell:Cell){
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        }else
            if(cell.figure?.color === currentPlayer?.color)
                setSelectedCell(cell);
    }

    useEffect(()=>{
        hightlightCells();
    },[selectedCell])

    function hightlightCells(){
        board.hightlightCells(selectedCell);
        updateBoard();
    }

    function kingIsUnderAttack(){
        var theKing;
        for(let i = 0;i<board.cells.length;i++){
            for(let j = 0;j<8;j++){
                if(board.cells[i][j].figure?.name === "king" ){
                    theKing = board.cells[i][j];
                    if(theKing.isAttack){
                        return true;
                    }
                    break;
                }
            }
        }
        return false;    
    }

    function isOver(){
        return board.isOver;
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h1>{isOver() ? "Game Over":""}</h1>
            <h1 style={{color:"red",paddingBottom:"50px",textAlign:"center"}}>{kingIsUnderAttack() ? "King is under Attack": ""}</h1>
            <h2>Player {currentPlayer?.color}</h2>
            <div className="board">
                {board.cells.map((row,index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key = {cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}

                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;