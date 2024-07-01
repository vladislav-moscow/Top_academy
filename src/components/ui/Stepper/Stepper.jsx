import { useState } from 'react';

/**
 * Компонент увеличения/уменьшения количества товара.
 * @param {object} props - Свойства компонента.
 * @param {string} [props.minValue = 1] - Минимальное значение.
 * @param {string} [props.maxValue = 10] - Максимальное значение.
 * @param {function} props.onQuantityUpdate - Функция коллбек для передачи данных родителю.
 * @returns {JSX.Element} Элемент JSX.
 */
export const Stepper = ({ minValue = 1, maxValue = 10, onQuantityUpdate }) => {
	// Стейт для увеличения/уменьшения значения в компоненте.
	const [value, setValue] = useState(minValue);

	/**
	 * Обработчик увеличения значения
	 */
	const handleBtnIncrement = () => {
		if (value < maxValue) {
			setValue(value + 1);

			onQuantityUpdate && onQuantityUpdate(value + 1);
		}
	};

	/**
	 * Обработчик уменьшения значения
	 */
	const handleBtnDecrement = () => {
		if (value > minValue) {
			setValue(value - 1);

			onQuantityUpdate && onQuantityUpdate(value - 1);
		}
	};

	return (
		<div className='flex items-center justify-end mb-4'>
			<button
				disabled={value === 1}
				onClick={handleBtnDecrement}
				type='button'
				className='w-10 h-10 px-4 rounded-l py-2 bg-gray-200 text-gray-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed'
			>
				-
			</button>
			<span className='inline-flex items-center w-10 h-10 px-4 py-2 text-gray-600 text-sm pointer-events-none'>
				{value}
			</span>
			<button
				onClick={handleBtnIncrement}
				disabled={value === 10}
				type='button'
				className='w-10 h-10 px-4 rounded-r py-2 bg-gray-200 text-gray-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed'
			>
				+
			</button>
		</div>
	);
};

export default Stepper;
