/**
 * Компонент карточка.
 * @param {object} props - Свойства компонента.
 * @param {object} props.details - Детали карточки.
 * @param {string} props.details.id - Идентификатор карточки.
 * @param {string} props.details.title - Название карточки.
 * @param {string} props.details.category - Категория карточки (необязательно).
 * @param {string} props.details.description - Описание карточки (необязательно).
 * @param {string} [props.details.price] - Цена карточки (необязательно).
 * @param {number} [props.details.rating] - Рейтинг карточки (необязательно).
 * @param {string} props.details.imgSrc - Путь к изображению.
 * @param {function} props.onClick - Обработчик клика по карточке (необязательно).
 * @param {boolean} props.isFavorite - Карточка добавлена в сохраненки или нет (необязательно).
 * @returns {JSX.Element} Элемент JSX.
 */
export const Card = (props) => {
  const {
    id,
    title,
    category,
    description,
    price,
    rating,
    imgSrc,
    isFavorite,
  } = props.details;

  const { onCardClick, onToggleFavorite } = props;

  // Обработчик клика на иконку сердечка
  const handleFavorite = (event) => {
    event.stopPropagation(); // Предотвр. всплытие события
    onToggleFavorite(id);
  };

  return (
    <div
      onClick={() => onCardClick(id)}
      className="max-w-sm md:max-w-sm lg:max-w-sm rounded-md overflow-hidden shadow-md hover:shadow-lg mb-8 cursor-pointer"
    >
      <div className="relative">
        <img className="w-full max-h-44" src={imgSrc} alt={title} />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 transition-opacity duration-300 hover:opacity-50"></div>
        {price && (
          <div className="absolute top-0 right-0 bg-indigo-500 text-white px-2 py-1 m-2 rounded-md text-sm font-normal">
            SALE
          </div>
        )}
        <button
          onClick={handleFavorite}
          className={`absolute top-0 left-0 m-2 p-2 rounded-full z-0 ${
            isFavorite ? "text-indigo-500" : "text-white"
          }`}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}
        {category && <p className="text-gray-600 text-sm mb-4">{category}</p>}
        {rating && (
          <div className="text-yellow-500 mb-4">
            {"★".repeat(Math.floor(rating)) +
              "☆".repeat(5 - Math.floor(rating))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">{price}$</span>
        </div>
      </div>
    </div>
  );
};
