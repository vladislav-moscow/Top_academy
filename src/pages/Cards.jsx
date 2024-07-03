import { Card } from "../components/ui/Card/Card.jsx";
import { initialProducts } from "../../data.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();

  // Стейт для продуктов (начальное значение из data.js)
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    // Получаем данные из localStorage
    const storedFavoriteProducts = localStorage.getItem("favorite");

    // Если данные есть в localStorage, устанавливаем начальное состояние продуктов
    if (storedFavoriteProducts) {
      const favoriteProducts = JSON.parse(storedFavoriteProducts);

      const updatedProducts = initialProducts?.map((product) => {
        return {
          ...product,
          isFavorite: favoriteProducts?.includes(product?.id),
        };
      });
      setProducts(updatedProducts);
    } else {
      // Иначе, используем начальные данные из data.js
      setProducts(initialProducts);
    }
  }, []);

  // Обработчик клика по карточке (для открытия сайдбара, например)
  const handleCardClick = (id) => {
    navigate(`/cards/${id}`);
  };

  /**
   * Обработка изменений в Stepper
   * @param {string} id - id товара
   * @param {string} newValue - Новое значение из Stepper
   */
  // const handleStepperUpdate = (id, newValue) => {
  //   const updatedProducts = initialProducts?.map((product) => {
  //     if (product?.id === id) {
  //       return { ...product, cartQuantity: newValue };
  //     }

  //     return product;
  //   });

  //   console.log(updatedProducts);

  //   // Обновляем стейт
  //   setProducts(updatedProducts);
  // };

  /**
   * Обработка добавления товара в избранное
   * @param {string} id - id товара
   */
  const handleToggleFavorite = (id) => {
    // Создании поверхностной копии массива
    const currentProducts = [...products];

    // Находим товара по id
    const product = currentProducts?.find((product) => product?.id === id);

    if (product) {
      // Обновляем значение isFavorite у найденного товара
      product.isFavorite = !product?.isFavorite;

      // Обновляем стейт
      setProducts(currentProducts);

      // Получаем список избранных товаров
      const favoriteProducts = currentProducts
        ?.filter((product) => product?.isFavorite)
        ?.map((product) => product?.id);

      // Записываем избранные товары в localStorage
      localStorage.setItem("favorite", JSON.stringify(favoriteProducts));
    }

    console.log("сохраненки", products);
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
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Cards;
