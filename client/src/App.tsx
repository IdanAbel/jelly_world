import React from "react";
import PostsList from "./PostsList"
import { useState } from "react"

function App() {
  const [index1, setIndex1] = useState(-1);
  const items1 = ["Item 1", "Item 2", "Item 3"];
  const items2 = ["Item 11", "Item 12", "Item 13"];
  return (
    <div>
      <PostsList title="My Items" items={items1} onItemSelected={
        (index) => {
          setIndex1(index)
          console.log("selected " + index)
        }
      } />
      {index1 != -1 && <p>item {index1} was selected</p>}
      <PostsList title="My Second Items" items={items2} onItemSelected={
        (index) => {
          console.log("selected " + index)
        }
      } />
      {index1 == 0 &&
        <div className="alert alert-primary" role="alert">
          A simple primary alert—check it out!
        </div>
      }
    </div>
  )
}

function App2() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'red',
        height: '100%',
        width: '0',
        flex: 1,

      }}>
      </div>
      <div style={{
        backgroundColor: 'blue',
        height: '100px',
        width: '100px',
        flex: 1,
        position: 'absolute',
        top: '-20px',
        right: '-20px',
      }}>
      </div>
      <div style={{
        backgroundColor: 'green',
        height: '100px',
        width: '0',
        flex: 1,
      }}>
      </div>
    </div>
  )
}

export default App