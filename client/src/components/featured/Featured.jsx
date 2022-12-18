import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hospitals/countByCity?cities=quito,guayaquil,cuenca"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/10824355/pexels-photo-10824355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Quito</h1>
              <h2>{data[0]} centros de salud</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Guayaquil</h1>
              <h2>{data[1]} centros de salud</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/2873419/pexels-photo-2873419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Cuenca</h1>
              <h2>{data[2]} centros de salud</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
