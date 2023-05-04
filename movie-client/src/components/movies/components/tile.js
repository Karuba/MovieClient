import { useEffect } from "react";
import './tile.css'
import { NIGHT_COLOR } from '../../../common/designConst'

const Tile = ({ content }) => {

   const { name, description, rating, image } = content;

   useEffect(() => {
      console.log('Tile');
      console.log(name);

   }, [])

   return (
      <div className="movie-tile" style={{ backgroundColor: NIGHT_COLOR }}>
         {name}, {description}
      </div>
   );
}
export default Tile;