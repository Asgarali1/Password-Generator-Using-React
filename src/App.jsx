import { useState ,useCallback, useEffect, useRef } from 'react';
import './App.css'
import Navbar from './component/navbar'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState();
  const [charAllowed, setCharAllowed] = useState();
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i=1; i<=length; i++){
      let char = Math.floor (Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


}, [length,numberAllowed,charAllowed, setPassword])

useEffect(() =>{
passwordGenerator()
}, [length, numberAllowed, charAllowed, passwordGenerator])


  return (  
  <>
    <Navbar/>
    <div className='container'>
    <div className='pass-contain'>
    <h1>password Generator</h1>
    <br/>
      <input type='text' readOnly placeholder='password' id='pswd'
      value={password}>
      </input>
      <div>
      <input type='range' 
      min={6}
      max={25}
      value={length}
      onChange={(e)=> {setLength(e.target.value)}}
      ></input>
      <label>Length: {length}</label>
      <input type='checkbox'
      defaultChecked = {numberAllowed}
      onChange={()=>{
        setNumberAllowed((prev) => !prev);
      }}
      ></input>
      <label>Number</label>
      <input type="checkbox"
      defaultChecked = {charAllowed}
      onChange={() => {
        setCharAllowed((prev) => !prev)
      }}
      ></input>
      <label>Character</label>
      </div>
   </div>
   </div>
   </>
  )
}
export default App;