import React from 'react'

export default function NavBar({
    handleClick,
    routes = ['Favorites','All Teams']
}) {
  return (
    <div style={{backgroundColor:'grey', display:'flex'}}>
        <ul style={{display:'flex' , listStyle:'none', width: '50vw', justifyContent:'space-around', margin:'auto'}}>
            {routes.map((r, i ) => (
                <li 
                    className='navList' 
                    onClick={() => handleClick(r)} 
                    key={i}>
                    {r}
                </li>
            )
            )}
        </ul>
    </div>
  )
}
