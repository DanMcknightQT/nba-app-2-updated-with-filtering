import './App.css';
import AppRoutes from './router/AppRoutes';
import Filters from './components/Filters';
import NavBar from './components/NavBar';
import { useApi } from './hooks/useApi';
import React, {  useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import lang from './util/lang';

function App() {
 const [isValidUser, setIsValidUser] = useState('PENDING')
 
 const [view, setView] = useState('All Teams')
 const { 
  error: teamError, 
  isLoading: isTeamsLoading, 
  response: teams ,  
  dispatch: teamsDispatch} = useApi("https://nba-app-cfa32-default-rtdb.firebaseio.com/data.json", true);

const [favParams, setFavsParams] = useState({})
const [favsDataCallback, setFavsDataCallback] = useState({fn:(data) => Object.values(data)})
const [favsUrl, setFavsUrl] = useState("https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams.json")

const { 
  error: favsError, 
  isLoading: isFavsLoading, 
  response: favs ,  
  dispatch: favsDispatch}  = useApi(favsUrl, true, favParams ,favsDataCallback.fn)

  const [filteredTeams, setFilteredTeams] = useState(null)
 
 const validCheck = () => {
   return setTimeout(() => { setIsValidUser( "VALID")}, 2000)
 }

 React.useEffect(() => {
  validCheck()
 }, [])

  const toggleDisplay = (route) => {
    setView(route)
  }

  const addOption = React.useCallback((data) =>{
    setFavsUrl("https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams.json")
    setFavsParams({
      method: 'PATCH',
      body: JSON.stringify({
        [data.abbreviation] : data,
      })})
    setFavsDataCallback({fn:(favs) => {
      alert('data added')
      return[...favs, data]
    }})

},[])

const deleteOption = React.useCallback((data) => {
  const teamAbbrv = data.abbreviation
  let func = function(oldState){
    if(!this.data) throw Error('Must bind data')
    return oldState.filter(el => JSON.stringify(this.data) !== JSON.stringify(el))
  }
  const url = "https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams/"+teamAbbrv+"/.json"
  const options = {method: "DELETE"}
  setFavsUrl(url)
  setFavsParams(options)
  setFavsDataCallback({fn:func.bind({data})})
},[])



const routeData = React.useMemo(() => {
  if(view === lang.TEAMS_ROUTE) return {dataArr:filteredTeams ? filteredTeams: teams, handleClick:addOption ,actionText:'Add Favorite'}
  if(view === lang.FAVS_ROUTE) return {dataArr:favs, handleClick:deleteOption ,actionText:'Delete Option'}
  return {}
}, [view, teams, favs, addOption, deleteOption, filteredTeams])

if(isValidUser === 'PENDING'){
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}

if(isValidUser === 'ERROR'){
  return(
    <div>
      <p>Fuck Off</p>
    </div>
  )
}


return <>
  <NavBar handleClick={toggleDisplay} />
  {view === lang.TEAMS_ROUTE && <Filters setFilteredTeams={setFilteredTeams} teams={teams}/>}
  <AppRoutes route = {view} routeData={routeData}/>
</>
  
// }else if(showAll){
//   return (
//     <div>
//     <button onClick={toggleDisplay}>Show Favs</button>
//     <NavBar/>
//     <MemoizedCardCollection 
//       dataArr={teams} 
//       handleClick={addOption} 
//       actionText='Add Favorite'/> 
//     </div>
//   )
// }else{
//   return (
//     <div>
//     <button onClick={toggleDisplay}>Show All</button>
//     <MemoizedCardCollection 
//       dataArr={favs||[]} 
//       handleClick={deleteOption} 
//       actionText='Delete Option'
//       /> 
//     </div>
//   )
// }
}

export default App;
