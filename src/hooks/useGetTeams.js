import { useEffect, useState } from "react";

export function useGetTeams(){
    const teamUrl = "https://nba-app-cfa32-default-rtdb.firebaseio.com/data.json";
    const [teams, setTeams ] = useState(null)
    useEffect(()=>{
      const fetchData = async () => {
        const response = await fetch(teamUrl);
        const newData = await response.json();
        console.log(newData)
        setTeams(newData)
      };
      fetchData()
  }, [])

  return teams
}