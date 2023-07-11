import React from 'react'
import { useEffect,useState } from 'react';

import Animeresultcard from './Animeresultcard';
import { Text } from '@nextui-org/react';

const Recommendations = ({results,name}) => {
   
    // console.log(results,name);

   
  return (
    <div style={{minHeight:"200px"}}>
        <Text size={20} style={{marginLeft:"3rem", fontFamily:"bold"}}>Anime Similar to {name}</Text>


<div style={{display:"flex",justifyContent:"space-evenly", flexWrap:"wrap"}}>
                {results &&
                  results.map((result, i) => {

                    return (
                    <Animeresultcard key={i} detail={result} />
                    );
                  })}
              </div>

    </div>
  )
}

export default Recommendations;