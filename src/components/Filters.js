import React from 'react'

const filterBaseOnString = (data, searchString) => {
    return data.filter(el => el.full_name.toLowerCase().includes(searchString.toLowerCase()))
}

const filterBasedOnConference = (data, conferenceSelection) => {
    return data.filter(el => el.conference.toLowerCase() === conferenceSelection.toLowerCase())
}

const filterBasedOnDivision = (data, divisionSelection) => {
    return data.filter(el => el.division.toLowerCase() === divisionSelection.toLowerCase())
}

const filter = ( searchString, conference, division, fullData) => {
    let d = JSON.parse(JSON.stringify(fullData))
    if(searchString){
        d = filterBaseOnString(d, searchString)
    }

    if(conference){
        d = filterBasedOnConference(d, conference)
    }

    if(division){
        d= filterBasedOnDivision(d, division)
    }

    return d
}

export default function Filters({
    teams, 
    setFilteredTeams
}) {
    const [searchString, setSearchString] = React.useState('')
    const [conference, setConference] = React.useState('');
    const [division, setDivision] = React.useState('')

React.useEffect(() => {
    if(!searchString && !conference && !division ){
        setFilteredTeams(null)
    }else{
        setFilteredTeams(filter(searchString,conference,division,teams))
    }

}, 
[teams,setFilteredTeams, searchString, conference, division ])


  return (
    <div style={{width: '50vw', minWidth: '300px', display:'flex', justifyContent:'space-around', height: 50, alignItems:'center' }}>
        <input style={{height: '75%'}}placeholder='Search name' value={searchString} onChange={e => setSearchString(e.target.value)}/>
        <div>
            <label htmlFor='conferance'>Filter Conferance:</label>
            <select id='conferance' onChange={e=> {
                e.stopPropagation()
                setConference(e.target.value)}} value={conference}>
                <option value={''}>None</option>
                <option value={'East'}>East</option>
                <option value={'West'}>West</option>
            </select>
        </div>
        <div>
            <label htmlFor='division'>Filter Divison:</label>
            <select id='division'onChange={e=> {
                e.stopPropagation()
                setDivision(e.target.value)}} value={division}>
                <option value={''}>None</option>
                <option value={'Atlantic'}>Atlantic</option>
                <option value={'Pacific'}>Pacific</option>
                <option value={'Northwest'}>Northwest</option>
                <option value={'Southeast'}>Southeast</option>
                <option value={'Central'}>Central</option>
                <option value={'East'}>East</option>
            </select>
        </div>

    </div>
  )
}
