import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

const setItemId = () => {
	const currentDate = new Date();

	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = String(currentDate.getFullYear());

	const hours = String(currentDate.getHours()).padStart(2, '0');
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	const seconds = String(currentDate.getSeconds()).padStart(2, '0');
	const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

	const id = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

	return id;
};

const AddItem = () => {
	const [itemName, setItemName] = useState('');
	const [quantity, setQuantity] = useState('');
	const [totalPrice, setTotalPrice] = useState('');
	const navigate = useNavigate();

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'itemName') {
			setItemName(value);
		} else if (name === 'quantity') {
			setQuantity(value);
		} else if (name === 'totalPrice') {
			setTotalPrice(value);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const itemId = setItemId();

		const newItem = {
			itemId,
			itemName,
			totalPrice,
		};

		axios.post('/api/menuItems', newItem)
			.then(() => {
				setItemName('');
				setTotalPrice('');
			})
			.catch(error => console.error('Error adding item:', error));

		const newItemInfo = {
			itemId,
			quantity,
		};

		axios.post('/api/menus', newItemInfo)
			.then(() => {
				setQuantity('');
			})
			.catch(error => console.error('Error adding item info:', error));
	};

	useEffect(() => {
		const storedUser = window.localStorage.getItem("curUser");
		if (storedUser === null || storedUser === 'null') {
			navigate('/');
		}
	});

	return (
		<>
			<div className='addNewItem'>
				<h3>
					Add New Item
					<Link to="/orders-list">
						<button>
							<img src='https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png' alt='' className='button-page' />
						</button>
					</Link>
				</h3>
				<form onSubmit={onSubmit} className='add-form'>
					<label htmlFor='itemName'><div className='form-labels'>Item Name:</div></label>
					<input
						type="text"
						name="itemName"
						id="itemName"
						value={itemName}
						onChange={onChange} />
					<br />
					<label htmlFor='quantity'><div className='form-labels'>Quantity: </div></label>
					<input
						type="text"
						name="quantity"
						id="quantity"
						value={quantity}
						onChange={onChange} />
					<br />
					<label htmlFor='totalPrice'><div className='form-labels'>Price per Item: </div></label>
					<input
						type="text"
						name="totalPrice"
						id="totalPrice"
						value={totalPrice}
						onChange={onChange} />
					<br />
					<button type="submit" className='submitButton'>Add Item</button>
				</form>
			</div>
		</>
	);
};

export default AddItem;
