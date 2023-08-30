import "../../App.css";
import { useNavigate } from "react-router";

interface ItemsProps {
  image: string;
  title: string;
  price: string;
  id: string;
}

const Items = ({ image, title, price, id }: ItemsProps) => {
  const navigate = useNavigate();

  const handlerClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(`/catalog/:${id}`);
  };

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card catalog-item-card">
        <img className="card-img-top img fluid" src={image}></img>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <a
            href="#/"
            className="btn btn-outline-primary"
            onClick={handlerClick}
          >
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
};

export default Items;
