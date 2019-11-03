import React, { Component } from "react";
import "./App.css";
import CreatableSelect from "react-select/creatable";
import addName from "./actions/addName";
import removeName from "./actions/removeName";
import { useSelector, useDispatch } from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import RightPane from './components/rightPane';
import { withTheme } from '@material-ui/core/styles';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
let data = require("./city.json");
let cityNames = data.cities.map(obj => {
  return { value: obj.id, label: obj.name };
});


function App() {
  const selectedList = useSelector( state =>{return  state.left;});
  const dispatch = useDispatch();
  let handleChange = (newValue, actionMeta) => {
    if (actionMeta.action === "select-option") {
      dispatch(addName(actionMeta.option.label));
    } else if (actionMeta.action === "remove-value") {
      dispatch(removeName(actionMeta.removedValue.label));
    }
  };
  return (
    <div>
       
      <CreatableSelect
        isClearable
        options={cityNames}
        isMulti={true}
        onChange={handleChange}
        style={{width: "100vw"}}
      ></CreatableSelect>
        
      <Row> 
      <Col >
      <List>
        {selectedList ?selectedList.map((obj, ind) => {
          return (
            <ListItem key={ind}>
              <ListItemText primary={obj.value} />
            </ListItem>
          );
        }):null}
      </List></Col>
      <Col><RightPane/></Col>
      </Row>
     
    </div>
  );
}

export default App;
