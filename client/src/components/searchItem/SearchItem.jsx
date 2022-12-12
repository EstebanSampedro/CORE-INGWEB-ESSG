import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m desde el centro</span>
        <span className="siTaxiOp">Consultas Médicas</span>
        
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Profesionales cualificados </span>
        <span className="siCancelOpSubtitle">
          Abierto las 24 horas!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Precio aprox. de consultas</span>
          <Link to={`/hospitals/${item._id}`}>
          <button className="siCheckButton">Más Detalles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
