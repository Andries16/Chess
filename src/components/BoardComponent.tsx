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
                        board.Attacked = theKing;
                        return true;
                    }
                    break;
                }
            }
        }
        return false;    
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    function isOver(){
        board.isDefeat(currentPlayer?.color);
        return board.isOver;
    }

    function capitalize(s:string)
    {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    function locationRestart(){
        window.location.reload();
    }

    return (
        <div> 
            <div className='inFront' style={isOver() ? {left:"0"}:{}}>
                <h1>Game Over !!</h1>
                <h1>{board.Winner+" is the "}<span style={{color:"lightgreen"}}> Winner</span></h1>
                <button className='restart' onClick={locationRestart}>Restart game</button>
            </div>
            <h1 style={{color:"coral",paddingBottom:"50px",textAlign:"center"}}>{kingIsUnderAttack() && !isOver() && board.Attacked && board.Attacked.figure ? capitalize(board.Attacked?.figure.color)+" king is under Attack": ""} </h1>
            <h2>{!isOver() && currentPlayer ? "Player "+currentPlayer?.color : ""}</h2>
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
