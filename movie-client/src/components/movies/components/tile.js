import { useEffect } from "react";
import './tile.css'
import { NIGHT_COLOR } from '../../../common/designConst'
import { Rate, Tag } from 'antd'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { posterDownload } from "../../../redux/reducers/moviesSlice";

const Tile = ({ content, getPoster }) => {

   const { id, name, description, rating, image, starrings, poster, score } = content;

   const dispatch = useDispatch();

   /*  const getPoster = (id, image) => {
       dispatch(posterDownload({ id, posterName: image }))
    } */

   useEffect(() => {
      /* console.log('Tile: ', name, " - poster: ", poster); */
      if (!poster && image)
         getPoster(id, image);
   }, [])


   return (
      <>
         <span style={{ fontSize: 17 }}>{score && score * 100 / 5 + `% chance you like it (${score})`}</span>
         <Link to={`/movie/${id}`}>
            <div className="movie-card" /* style={{ backgroundColor: NIGHT_COLOR, height: 300, width: 200 }} */>
               <div className="movie-poster">
                  <img src={poster ?? "./dude.webp"} alt={name}></img>
               </div>
               <div className="movie-details">
                  <div className="movie-title" style={{ color: "black" }}>
                     {name.length > 10 ? name.slice(0, 10) + "..." : name}
                  </div>
                  <div className="movie-rating">
                     <Rate disabled allowHalf defaultValue={rating} style={{ margin: 0, padding: 0 }} /> <span style={{ color: NIGHT_COLOR, paddingLeft: 5 }}>{rating}/5</span>
                  </div>
                  <div className="movie-starring-tags">
                     {starrings?.map((starring) => {
                        return (
                           <Tag color="#f50" key={starring.firstName + starring.secondName} style={{ margin: 1 }}>
                              {starring.firstName + " " + starring.secondName}
                           </Tag>
                        );
                     })}
                  </div>
                  <div className="movie-info">
                     <p style={{ color: NIGHT_COLOR }}>
                        {description.length > 100 ? description.slice(0, 100) + "..." : description}
                     </p>
                  </div>
               </div>
            </div>
         </Link>
      </>
   );
}
export default Tile;