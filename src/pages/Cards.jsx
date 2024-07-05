import { Card } from "../components/ui/Card/Card.jsx";
import useProductsStore from "../store/useProductsStore.js";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate(); // хук для роутинга

  // Стор для работы с продуктами
  const { products, setFavorite } = useProductsStore();

  // Обработчик клика по карточке (для открытия сайдбара, например)
  const handleCardClick = (id) => {
    navigate(`/cards/${id}`);
  };

  return (
    <section className="products">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {!!products &&
            products.map((product) => (
              <Card
                key={product?.id}
                details={product}
                onCardClick={handleCardClick}
                onToggleFavorite={setFavorite}
              />
            ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Cards;
