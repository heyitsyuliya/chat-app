import { useEffect, useState } from 'react'

// unique identifier for this app, for debugging purposes only
const PREFIX = 'chat-app-'

// key will be the information we need to store in local storage
// initialValue is what is being passsed as state
export default function useLocalStorage(key, initialValue = null) {

  const prefixedKey = PREFIX + key

  // checking if we have anything saved in local storage
  const [value, setValue] = useState(() => {

    const jsonValue = localStorage.getItem(prefixedKey)

    // if we do, then we return the value stored
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === 'function'){
      return initialValue()
    }
    else {
      return initialValue;
    }
  })

  // getting the value and actually storing it in the local storage
  useEffect(() => {
    // this will be saved in local storage as chat-app-userId as key and a random UUID as a value
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
