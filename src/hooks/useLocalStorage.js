import { useState, useEffect} from "react"

export default function useLocalStorage(key, defaultValue) {
    // declare a state variable and function using userState hook
    const [value, setValue] = useState(() => {
        // initial state value is determined by callback function below
        // attempts to retrieve a vlaue from local storage based on provided key
        const jsonValue = localStorage.getItem(key)
        // means we have something in local storagae
        if (jsonValue != null) return JSON.parse(jsonValue)
        // otherwise use default value
        if (typeof defaultValue === "function"){
            return defaultValue()
        } else {
            return defaultValue
        }
    })

    useEffect(() => {
        // sets value in local storage after stringifying it
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    // returns a value representing the current state value and setValue is the function to update it
    return [value, setValue]
}