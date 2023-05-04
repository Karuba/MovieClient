import { useEffect } from "react";

const Movie = () => {

   useEffect(() => {
      console.log('Movie');

   }, [])

   return (
      <div>
         Movie
      </div>
   )

}

export default Movie;