import React from 'react'
import { useState } from 'react'



let mesCif = []
let s = 0
let mesdesen = []
let strdesen = []


export const Gamal = () => {

  let pval, gval, qval
  const setPval = ({ target }) => {
    pval = parseInt(target.value, 10)
  }
  const setGval = ({ target }) => {
    gval = parseInt(target.value, 10)
  }
  const setQval = ({ target }) => {
    qval = parseInt(target.value, 10)
  }

  const [ekey, setEkey] = useState(0)
  const [rkey, setRkey] = useState(0)
  const [rprkey, setRprkey] = useState(0)
  const [eprkey, setEprkey] = useState(0)
  const [mesCifrado, setMesCifrado] = useState(0)
  const [mesDesAsc, setMesDesAsc] = useState(0) 
  const [mesDesci, setMesDesci] = useState(0)
  const [sval, setSval] = useState(0)

  const encript = () => {
    getEmKey()
    getReKey()
    genPrKeys()
    cifrarMensaje()
  }


  const getReKey = () => {
    let key = Math.floor(Math.random() * (qval - 1));
    ( key === 0 || key === 1) ? key = key + 1 : null
    setRkey(key)
  }

  const getEmKey = () => {
    let key = Math.floor(Math.random() * (qval - 1));
    ( key === 0 || key === 1) ? key = key + 1 : null
    setEkey(key)
  }

  const message = 'pipipi'
  let asciimes = []

  const strToAscii = () => {
    for (let i = 0; i < message.length; i++) {
      asciimes.push(message.charCodeAt(i))
    }
  }
  strToAscii()
// PERF: no agarra la mierda de ekey ni rkey
  const genPrKeys = () => {
    console.log(gval)
    console.log(ekey)
    console.log(rkey)
    setEprkey(Math.pow(gval, ekey) )
    setRprkey(Math.pow(gval, rkey) )
    console.log(eprkey)
    console.log(rprkey)
  }

  // se cifra multiplicando la el valor del mensaje ascci en i 
  // por la clave publica del receptor elevado a la clave privada del emisor
  
  // let mesCif = []
  const cifrarMensaje = () => {
    for (let i = 0; i < asciimes.length; i++) {
      mesCif.push(asciimes[i] * (Math.pow(rkey, eprkey)) % pval)   
    }
    setMesCifrado(`[${eprkey}, [ ${mesCif.join(', ')} ]]`)
  }

  // let s = 0
  const calcS = () => {
    const aux = Math.pow(ekey, rprkey)
    s = aux
    console.log(s)
    setSval( s )
  }

  // let mesdesen = []
  const desencriptarMen = () => {
    calcS()
    for (let i = 0; i < mesCif.length; i++) {
      mesdesen.push( mesCif[i] * (1/s) )
    }
    setMesDesAsc(`[${mesdesen.join(', ')}]`)
    asciiToString()
  }

  // const strdesen = []
  const asciiToString = () => {
    for (let i = 0; i < mesdesen.length; i++) {
      strdesen.push(String.fromCharCode(mesdesen[i]))
    }
    setMesDesci(strdesen)
  }

  return (
    <div>
      <h1>Gamal</h1>
      <span>
        <label>p: (debe ser un numero primo)</label>
        <input type='number' onChange={ setPval }/>
      </span>

      <span>
        <label>g: ( generador )</label>
        <input type='number' onChange={ setGval } />
      </span>

      <span>
        <label>q: ( divisor de q-1 )</label>
        <input type='number' onChange={ setQval } />
      </span>

      <h3>mensaje: { message }</h3>
      <h3>mensaje ascii: [{ asciimes.join(', ') }]</h3> <br/>
      
      <span>
        <label>Clave publica del emisor(un numero random entre 1 y q): { ekey }</label> <br/>
        <label>Clave publica del receptor(un numero random entre 1 y q): { rkey }</label> <br/>
        <label>Clave privada del emisor(se calcula en base a la publica): { eprkey }</label> <br/>
        <label>Clave privada del receptor(se calcula en base a la publica): { rprkey }</label> <br/>
      </span> <br/>
      <h3>Mensaje cifrado: { mesCifrado }</h3>
      <button onClick={ encript }>encriptar</button>
      
      <h3>Descifrar el mensaje</h3>
      <label>valor s(clave publica del receptor x clave privada del emisor ): { sval }</label> <br/>
      <label>mensaje desencriptado en ascii: { mesDesAsc }</label> <br/>
      <label>mensaje desencriptado: { mesDesci }</label> <br/>

      <button onClick={ desencriptarMen }>desencriptar</button>
    </div>
  )
}
