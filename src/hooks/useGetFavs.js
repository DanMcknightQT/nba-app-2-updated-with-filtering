import { useEffect, useState } from "react";

export function useGetFavs(){
    const favList = [];
    const teamUrl = "https://nba-app-cfa32-default-rtdb.firebaseio.com/user/teams.json";
    const [favs, setFavs ] = useState(null)
    useEffect(()=>{
      const fetchData = async () => {
        const response = await fetch(teamUrl);
        const newData = await response.json();
        console.log(newData)
        Object.values(newData).forEach(val => {
          favList.push(val)
        });
        setFavs(favList)
      };
      fetchData()
  }, [])

  return favs
}