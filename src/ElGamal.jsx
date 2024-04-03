import React, { useState, useEffect } from 'react'
import { Header } from './Header'

export const ElGamal = () => {
  
  // public keys
  const [emPubKey, setEmPubKey] = useState(0)
  const [rePubKey, setRePubKey] = useState(0)
  //private keys
  const [emPrivKey, setEmPrivKey] = useState(0)
  const [rePrivKey, setRePrivKey] = useState(0)
  //messaje
  let [messajeAscii, setMessajeAscii] = useState([])
  const [messajeEncripted, setMessajeEncripted] = useState([])
  const [messajeDesencripted, setMessajeDesencripted] = useState([])
  //desencriptacion
  const [sval, setSval] = useState(0)

  // NOTE: onFormSubmit
  const encriptar = ( event ) => {
    event.preventDefault()

    const values = new FormData(event.target)
    const primo = values.get('pval')
    const clave = values.get('qval')
    const generador = values.get('gval')
    
    //emisor
    const { privKey: privem, pubKey: pubem } = genKeys(clave, generador, primo)
    setEmPrivKey(privem)
    setEmPubKey(pubem)

    //receptor
    const { privKey: privre, pubKey: pubre } = genKeys(clave, generador, primo)
    setRePrivKey(privre)
    setRePubKey(pubre)
    const encripted = encriptMesssage(pubre, privem, primo) 
    setMessajeEncripted(encripted)
  }

  const genKeys = ( clave, generador, primo ) => {
    const privKey = 2 + Math.floor(Math.random() * (clave - 2))
    const pubKey = Math.pow(generador, privKey) % primo 
    
    return { privKey, pubKey }
  }

  // NOTE: messaje to ASCII
  const messaje = 'ElGamal'

  const mesToAscii = (messaje) => {
    messajeAscii = []
    for (let i = 0; i < messaje.length; i++) {
      const element = messaje.charCodeAt(i);
      messajeAscii.push(element)
    }
  }
  mesToAscii(messaje)

  // NOTE: encript messaje
  const encriptMesssage = ( pubre, privem, primo ) => {
    const encripted = []
    const aux = Math.pow(pubre, privem)
    for (let i = 0; i < messajeAscii.length; i++) {
      const op = (messajeAscii[i] * aux) % primo
      encripted.push(op)
    }
    return encripted
  }


  // PERF: medio rara la we esta
  // this must desencript the mssage but it just returns a random value
  // (it is nt a random value but it is no the expected value)
  
  
  
  const desencriptar = () => {
    event.preventDefault()

    const values = new FormData(event.target)
    const primo = values.get('pval')
    const clave = values.get('qval')

    const desencripted = desencriptMessage(primo, clave)
    setMessajeDesencripted(desencripted)

  }

  const calcularS = (primo, clave ) => {
    console.log({primo, clave})
    const aux = rePrivKey - 1 - clave
    console.log(aux)
    const s = 1 / Math.pow(emPubKey, aux) % primo
    setSval(s)
    return s
  }

  const desencriptMessage = (primo, clave) => {
    const desencripted = []
    const s = calcularS(primo ,clave)
    for (let i = 0; i < messajeEncripted.length; i++) {
      const op = (messajeEncripted[i] * s) % primo
      desencripted.push(op)
    }

    return desencripted
  }

  return (
    <>
      <Header/>
      <h1 style={{marginTop:20}}>El Gamal</h1>
      <div style={{marginTop:40}}>

        <form onSubmit={ encriptar } onReset={desencriptar}>
          <label>mensaje: '{messaje}'</label> <br/>
          <span>
            <label> p(numero primo):</label>
            <input type='number' name='pval'/>
          </span>
          <span>
            <label> q(divisor de p-1):</label>
            <input type='number' name='qval'/>
          </span>
          <span>
            <label> g(generador de orden q):</label>
            <input type='number' name='gval'/>
          </span>

          <button type='submit'>encriptar</button>
          <button type='reset'>desencriptar</button>
        </form>
        <label>Clave privada del emisor: {emPrivKey}</label> <br/>
        <label>Clave publica del emisor: {emPubKey}</label> <br/>

        <label>Clave privada del receptor: {rePrivKey}</label> <br/>
        <label>Clave publica del receptor: {rePubKey}</label> <br/>
        
        <h4>mensaje en ascii: {`[ ${messajeAscii.join(', ')} ]`}</h4>
        <h4>mensaje encriptado: {`[ ${messajeEncripted.join(', ')} ]`}</h4> <br/>

        <h4>Mensaje que se envia: {`[ ${emPubKey}, [ ${messajeEncripted.join(', ')} ] ]`}</h4>

        <h3>Desencriptacion</h3>
        <h4>Valor calculado para desencriptar: {sval}</h4>
        <h4>mensaje desencriptado: {`[ ${messajeDesencripted.join(', ')} ]`}</h4>
      </div>
    </>
  )
}
