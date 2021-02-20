import React , { useState, useEffect } from 'react';
import './Notes.css';
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import {Button, TextField} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let randomColor = require("randomcolor");
function Notes() {
    const [item, setItem] = useState("");
    const [items, setItems] = useState(
      JSON.parse(localStorage.getItem("items")) || []
    );
    
    const errNotify = () => toast.error("Treba niečo napísať! prázdnu poznámku systém nezoberie");

    const newitem = () => {
      if (item.trim() !== "") {
        const newitem = {
          id: uuidv4(),
          item: item,
          color: randomColor({
            luminosity: "light",
          }),
          defaultPos: { x: 100, y: 0 },
        };
        setItems((items) => [...items, newitem]);
        setItem("");
      } else {
        errNotify();
        setItem("");
      }
    };
  
    const keyPress = (event) => {
      var code = event.keyCode || event.which;
      if (code === 13) {
        newitem();
      }
    };
  
    useEffect(() => {
      localStorage.setItem("items", JSON.stringify(items));
    }, [items]);
  
    const updatePos = (data, index) => {
      let newArr = [...items];
      newArr[index].defaultPos = { x: data.x, y: data.y };
      setItems(newArr);
    };
  
    const deleteNote = (id) => {
      setItems(items.filter((item) => item.id !== id));
    };
  
    return (
      <div className="notes__site">
        <ToastContainer />
        <div id="new-item">
          <TextField
            value={item}
            className='notes__input'
            onChange={(e) => setItem(e.target.value)}
            placeholder="Napíš poznámku..."
            onKeyPress={(e) => keyPress(e)}
          />
          <Button className="edit-note" onClick={newitem}>ENTER</Button>
        </div>
        {items.map((item, index) => {
          return (
            <Draggable
              key={item.id}
              defaultPosition={item.defaultPos}
              onStop={(e, data) => {
                updatePos(data, index);
              }}
            >
              <div style={{ backgroundColor: item.color }} className="box">
                {`${item.item}`}
                <Button id="delete" onClick={(e) => deleteNote(item.id)}>
                  X
                </Button>
              </div>
            </Draggable>
          );
        })}
      </div>
    );
}

export default Notes
