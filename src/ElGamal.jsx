import React, { useState } from 'react'
import { desencriptMessage, desencriptedAscii, encriptMessage, genKeys } from './assets/resources'
import { getAscii } from './assets/resources'

export const ElGamal = () => {

  const [generator, setGenerator] = useState(0)
  const [alicePriv, setAlicePriv] = useState(0)
  const [bobPriv, setBobPriv] = useState(0)
  const [alicePub, setAlicePub] = useState(0)
  const [bobPub, setBobPub] = useState(0)
  const [message, setMessage] = useState('')
  const [primo, setPrimo] = useState(0)
  const [mesAscii, setMesAscii] = useState([])
  const [encripted, setEncripted] = useState([])
  const [desencripted, setDesencripted] = useState([])
  const [sVal, setSVal] = useState(0)
  const [messageDesencripted, setMessageDesencripted] = useState([])

  const encriptar = ( event ) => {
    event.preventDefault()
    const fields = new FormData( event.target )

    const pval = fields.get('pval')
    const gval = fields.get('gval')
    const mesval = fields.get('mesval')
    setPrimo(pval)
    setGenerator(gval)
    setMessage(mesval)

    const { alpriv, alpub, bopriv, bopub } = genKeys( pval, gval )
    setAlicePriv(alpriv)
    setAlicePub(alpub)
    setBobPriv(bopriv)
    setBobPub(bopub)

    setMesAscii(getAscii(mesval))
    setEncripted(encriptMessage(primo, mesAscii, alpub, bopriv))
  }

  const desencriptar = ( event ) => {
    event.preventDefault()
    setDesencripted(
      desencriptMessage(encripted, bobPub, alicePriv, primo, setSVal)
    )
    desencriptedAscii(desencripted, setMessageDesencripted)
  }
  
  return (
    <>
      <h1 style={{marginTop:20}}>El Gamal</h1>
      <div style={{marginTop:40}}>

        <form onSubmit={ encriptar } onReset={ desencriptar }>
          <span>
            <label> mensaje:</label>
            <input type='text' name='mesval'/>
          </span>
          <span>
            <label> p(numero primo):</label>
            <input type='number' name='pval'/>
          </span>
          <span>
            <label> g(generador de orden q):</label>
            <input type='number' name='gval'/>
          </span>

          <button type='submit'>encriptar</button>
          <button type='reset'>desencriptar</button>
        </form>

        <label>Mensaje a encriptar: { message }</label> <br/>
        <label>Numero primo: { primo }</label> <br/>
        <label>Generador: { generator } </label> <br/>

        <label>Clave privada del Alice: { alicePriv }</label> <br/>
        <label>Clave publica del Alice: { alicePub }</label> <br/>

        <label>Clave privada del Bob: { bobPriv }</label> <br/>
        <label>Clave publica del Bob: { bobPub }</label> <br/>
        
        <h4>mensaje en ascii: { `[ ${mesAscii.join(', ')} ]` }</h4>
        <h4>mensaje encriptado: { `[ ${encripted.join(', ')} ]` }</h4> <br/>

        <h4>Mensaje que se envia: { `[ ${bobPub}, [ ${encripted.join(', ')} ] ]` }</h4>

        <h3>Desencriptacion</h3>
        <h4>Valor calculado para desencriptar: {sVal}</h4>
        <h4>mensaje desencriptado en ascii: {`[ ${desencripted.join(', ')} ]`}</h4>
        <h4>mensaje desencriptado: { messageDesencripted } </h4>
      </div>
    </>
  )
}
