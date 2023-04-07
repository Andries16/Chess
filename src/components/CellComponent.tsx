import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps{
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent:FC<CellProps> = ({cell,selected, click}) => {
    return (
        <div
            className={["cell",cell.color, selected ? "selected":""].join(' ')}
             onClick={()=>click(cell)}
            style={{background:cell.isAttack ? 'coral' : cell.available && cell.figure ? 'palegreen': ''}}
        >
            {cell.available && !cell.figure && <div className="available"></div>}
            {cell.figure?.logo && <img src={cell.figure.logo}/>}
        </div>
    );
};

export default CellComponent;