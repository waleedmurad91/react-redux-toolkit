import About from "./components/About";
import Addtodo from "./components/addtodo";
import Howto from "./components/Howto";
import Navbar from "./components/Navbar";
import Todo from "./components/todo";
import { useState } from "react";
import './App.css';
function App() {
  const [showoverlay, setShowoverlay] = useState(false);
  const [aboutOverlay, setaboutOverlay] = useState(false);
  const [howtoOverlay, setHowtoOverlay] = useState(false);
  return (
    <>
    <div className="container">
      <Navbar
       onNewNoteClick={() => setShowoverlay(true)}
          onaboutClick={() => setaboutOverlay(true)}
          onHowtoClick={() => setHowtoOverlay(true)}
      />
      <Addtodo 
      visible={showoverlay}
      onClose={() => setShowoverlay(false)}
      />
      <Todo/>
      <About 
      aboutVisible={aboutOverlay}
      onAboutclose ={()=> setaboutOverlay(false)}
      />
      <Howto 
      howtovisible={howtoOverlay}
      onhowtoClose ={()=> setHowtoOverlay(false)}
      />
      </div>
    </>
  );
}

export default App;
