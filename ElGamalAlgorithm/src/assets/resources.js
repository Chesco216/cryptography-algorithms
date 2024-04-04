export const genKeys = ( primo, gen ) => {

  // PERF: im commenting this line cause they become numbers that are so big that theres a failure
  // const alpriv = 2 + Math.floor(Math.random() * ( primo - 2 ))
  // // setTimeout(() => {
  // //   console.log('interval')
  // // }, 123)
  // let bopriv
  // do {
  //   bopriv = 2 + Math.floor(Math.random() * (primo - 2))
  // } while (bopriv === alpriv);
  // this code is for genrete a randow key
  //but i give them ones cause the values were to high
  //
  const alpriv = 6
  const bopriv = 3

  const alpub = Math.pow( gen, alpriv ) % primo
  const bopub = Math.pow( gen, bopriv ) % primo

  return { alpriv, alpub, bopriv, bopub }
}

export const getAscii = ( message ) => {
  const ascii = []
  for (let i = 0; i < message.length; i++) {
    ascii.push(message.charCodeAt(i))
  }

  return ascii
}

export const encriptMessage = ( primo, message, alpub, bopriv ) => {
  
  const k = Math.pow(alpub, bopriv)
  const encripted = []
  for (let i = 0; i < message.length; i++) {
    encripted.push( (k * message[i]) % primo )
  }

  return encripted
}

export const desencriptMessage = ( message, bobpub, alpriv, primo, setSVal ) => {
  primo = parseInt(primo, 10)
  const exp = primo - 1 - alpriv
  const value = Math.pow( bobpub, exp )
  // console.log({ exp, bobpub, alpriv, primo, value})
  setSVal(value)
  const desencripted = []
  for (let i = 0; i < message.length; i++) {
    desencripted.push((Math.pow( bobpub, exp ) * message[i]) % primo)
  }

  return desencripted
}

export const desencriptedAscii = ( message, setDesencripted) => {
  const desAscii = []
  for (let i = 0; i < message.length; i++) {
    desAscii.push(String.fromCharCode(message[i]))
  }
  setDesencripted(desAscii)
}
