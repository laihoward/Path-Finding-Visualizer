import React,{useState,useEffect}  from "react";
import Node from "./Node";
import "./pathfind.css"
const cols = 25;
const rows = 10;

const NODE_START_ROW = 0
const NODE_START_COL = 0
const NODE_END_ROW = rows-1
const NODE_END_COL = cols-1

const Pathfind = ()=>{
    const[Grid,setGrid]=useState([]);
    //每執行一次render都會執行useEffect
    useEffect(()=>{
        initalizeGrid();
    },[]);

    const initalizeGrid = ()=>{
        //grid為長度rows的list
        const grid = new Array(rows);
        //grid為[[長度cols],[長度cols],.......]
        for(let i =0;i<rows;i++)
        {
            grid[i]=new Array(cols);
        }
        
        createSpot(grid);
        setGrid(grid);
        addNeighbours(grid);
    }
    //create the spot
    const createSpot=(grid)=>{
        for(let i =0;i<rows;i++)
        {
            for(let j =0;j<cols;j++)
            {
                grid[i][j]=new Spot(i,j);
            }
        }
    }

    //add neighbours
    const addNeighbours = (grid)=>{
        for(let i =0;i<rows;i++){
            for(let j =0;j<cols;j++){
                grid[i][j].addneighbours(grid);
            }
        }
    }

    //Spot constructor
    //每個spot的數據
    function Spot(i,j){
        this.x=i;
        this.y=j;
        //判斷起點與終點
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.g=0;
        this.f=0;
        this.h=0;
        this.neighbours =[];
        this.previouss;
        this.addneighbours=function(grid){
            let i =this.x
            let j =this.y
            if (i>0)this.neighbours.push(grid[i-1][j]);
            if (i<rows-1)this.neighbours.push(grid[i+1][j]);
            if (j>0)this.neighbours.push(grid[i][j-1]);
            if (j<cols-1)this.neighbours.push(grid[i][j+1]);
        };
    }
    //grid with node
    const gridwithnode = (
        <div>
            {Grid.map((row,rowIndex)=>{

                return(
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col,colIndex)=>{
                            //col為每個點的Spot , colIndex為index
                            const {isStart,isEnd}=col;
                            //建立node座標 以及標示出起點與終點
                            return (
                                <Node 
                                    key={colIndex} 
                                    isStart={isStart} 
                                    isEnd={isEnd} 
                                    row={rowIndex}  
                                    col={colIndex}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
    console.log(Grid)
    return(
        <div className="wrapper">
            <h1>Pathfind Component</h1>
            {gridwithnode}
        </div>
    )
}

export default Pathfind;