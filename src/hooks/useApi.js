import React,  { useEffect, useReducer } from "react";
const basicReducer = (state, action) => {
    switch(action.type){
        case 'EDIT_RESPONSE':
            return {
                ...state,
                response: action.payload
            }
        case 'ERROR':
            return {...state, error: true, errorMessage: action.payload?.message, isLoading:false }
        case 'SUCCESS':
            return {...state, error: false, errorMessage: null, response: action.payload, isLoading: false}
        case 'PENDING':
            return {...state, error: false, errorMessage: null, isLoading: true}
        default:
            return state;
    }
}

// Object.values(newData).forEach(val => {
//     favList.push(val)
//   });

const initState = {
    isLoading: true,
    error: false, 
    errorMessage: null,
    response: null
}
export function useApi(
    url, //endpoint to hit 
    runCondition, //boolean value to control api call 
    options = null,//options object to change the api call type 
    dataNormalizeCallback, // callback to transform data if wanted before saving to reducer- param is data / return is new altered data
    reducer = basicReducer, // optional reducer --> should include ['PENDING' , 'ERROR', 'SUCCESS'] cases
    initialState = initState //initial state  --> to be used in conjuction with custom reducer 
    ){
    const [{ error, errorMessage, isLoading, response }, dispatch] = useReducer(reducer, initialState )

    const cachedRes = React.useRef(response)

    useEffect(() => {
        cachedRes.current = response
    },[response])

    useEffect(()=>{
      const fetchData = async () => {
          try{
            dispatch({type:'PENDING'})

            const res = await fetch(url,options);

            if(!res.ok) return dispatch({type:'ERROR', payload: res})

            const newData = await res.json();

            let finalData = null

            if(dataNormalizeCallback && typeof dataNormalizeCallback === 'function'){
                if(options.method && options.method !== 'GET'){

                    finalData = dataNormalizeCallback(cachedRes.current)
                }else{
                    finalData = dataNormalizeCallback(newData)
                }
            }else{
                finalData = newData
            }
             return dispatch({type: 'SUCCESS', payload: finalData})

          }catch(e){
            return dispatch({type:'ERROR', payload: e})
          }
        
      };
      if(runCondition){
        fetchData()
      }
  }, [runCondition, url, dataNormalizeCallback, options ])

  return { error, errorMessage, isLoading, response,  dispatch}
}