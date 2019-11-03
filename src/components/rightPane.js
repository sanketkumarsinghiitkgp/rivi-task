import React, { Component } from "react";

import "react-virtualized/styles.css";
import { InfiniteLoader, List } from "react-virtualized";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import load from "../actions/activitiesViewLoad";
import cityListReducer from "../reducers/cityListReducer";
import dataloaded from "../actions/dataLoaded";
import rowrendered from "../actions/rowRendered";
import { promised } from "q";
const remoteRowCount = 100;

function RightPane() {
  let ll = useSelector(state => {return state.right});
  const dispatch = useDispatch();
   let loadedRowsMap= useSelector(state=> {return state.dp.loadedRowsMap});
   let done= useSelector(state=> {return state.dp.done});
    let list=[]
  if (ll)
  list=ll.flat();
  
  
  let loadMoreRows = ({ startIndex, stopIndex }) => {
      let x=1;
      let acc=0;
      console.log("index is "+startIndex+" "+stopIndex);
      startIndex=stopIndex-27;
      if(startIndex<10){
          x=1;
          acc=0;
      }
      else if(startIndex<40){
          x=2;
          acc=10;
      }
      else if(startIndex<70){
          x=3;
          acc=40;
      }
      else{
          x=4;
          acc=70;
      }
      let donInd=0;
      let end=20;
      if(x>1){
          donInd=Math.floor(((startIndex-10)/10));
          end=startIndex+10;
      }
      if(done[donInd]) return null;
      console.log("haha " + donInd);
      dispatch(dataloaded(donInd));
      console.log(done);
      console.log(startIndex-acc+" "+end);
    return fetch(
        `http://my-json-server.typicode.com/rivitest001/task0${x}/posts`
      ).then(res=>res.json())
      .then(res=>dispatch(load(res.splice(startIndex-acc,end))));
  };
  let rowRenderer =  ({ key, index, style }) => {
   // dispatch(rowrendered(index));
    return (
      <div key={key} style={style}>
        {list[index]?list[index].activity:null}
      </div>
    );
  };
  let isRowLoaded = ({ index }) => {
       return !!loadedRowsMap[index]&&index<list.length
  }
  return (
    <div>{
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={remoteRowCount}
        threshold={15}
      >
        {({ onRowsRendered, registerChild }) => (
          <List
          overscanRowCount={0}
            height={500}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={remoteRowCount}
            rowHeight={40}
            rowRenderer={rowRenderer}
            width={300}
          />
        )}
      </InfiniteLoader>
      }
    </div>
  );
}

export default RightPane;
