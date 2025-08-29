import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ItemsList = () => {
	const [menus, setMenus] = useState([]);
	const [editingMenuId, setEditingMenuId] = useState(null);
	const [editedMenu, setEditedMenu] = useState({});
	// const [editedMenu, setEditedMenu] = useState({
	// 	itemName: '',
	// 	quantity: 0,
	// 	totalPrice: 0
	// });

	const navigate = useNavigate();

	useEffect(() => {
		axios.get('/api/menus')
			.then(resMenu => {
				axios.get('/api/menuItems')
					.then(resMenuItems => {
						setMenus(resMenu.data.map((menu, index) => ({
							...menu,
							...resMenuItems.data[index]
						})));
					})
					.catch(error => console.error('Error fetching menu items:', error));
			})
			.catch(error => console.error('Error fetching menus:', error));
	}, []);

	const handleEditClick = (menu) => {
		setEditingMenuId(menu.itemId);
		setEditedMenu({ ...menu });
	};

	const handleChange = (e, field) => {
		setEditedMenu({
			...editedMenu,
			[field]: e.target.value,
		});
	};


	const handleSaveClick = async () => {
		try {
			const updatedMenu = await axios.put(`/api/menus/${editedMenu.itemId}`, {
				quantity: editedMenu.quantity,
				addedAt: new Date().toISOString(),
			});
			const updatedMenuItem = await axios.put(`/api/menuItems/${editedMenu.itemId}`, {
				itemName: editedMenu.itemName,
				totalPrice: editedMenu.totalPrice,
			});
			setMenus(menus.map(menu =>
				menu.itemId === editedMenu.itemId ? { ...menu, ...updatedMenu.data } : menu
			));
			setEditingMenuId(null);
			setEditedMenu({});
		} catch (error) {
			console.error('Error updating menu:', error);
		}
	};



	const handleDeleteClick = (id) => {
		axios.delete(`/api/menus/${id}`)
			.then(() => {
				setMenus(menus.filter(menu => menu.itemId !== id));
			})
			.catch(error => console.error('Error deleting menu:', error));
		axios.delete(`/api/menuItems/${id}`)
			.then(() => {
				setMenus(menus.filter(menu => menu.itemId !== id));
			})
			.catch(error => console.error('Error deleting menu:', error));
	};

	useEffect(() => {
		const storedUser = window.localStorage.getItem("curUser");
		if (storedUser === null || storedUser === "null") {
			navigate('/');
		}
	});

	return (
		<>
			<div className='ordersList'>
				<h3>
					Menu List
					<Link to="/add-order">
						<button>
							<img src='https://cdn-icons-png.freepik.com/512/6500/6500779.png' alt='' className='button-page' />
						</button>
					</Link>
				</h3>
				<table>
					<thead>
						<tr>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Price per Piece</th>
							<th>Last Updated At</th>
							<th colSpan={2}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{menus.map(menu => {
							return (
								<tr key={menu.itemId}>
									{editingMenuId === menu.itemId ? (
										<>
											<td>
												<input
													type="text"
													value={editedMenu.itemName}
													onChange={(e) => handleChange(e, 'itemName')}
												/>
											</td>
											<td>
												<input
													type="number"
													value={editedMenu.quantity || ''}
													onChange={(e) => handleChange(e, 'quantity')}
												/>
											</td>
											<td>
												<input
													type="number"
													value={editedMenu.totalPrice}
													onChange={(e) => handleChange(e, 'totalPrice')}
												/>
											</td>
											<td>Date: {menu.addedAt.slice(0, 10)}<br />Time: {new Date(menu.addedAt).toLocaleString("hi-IN").slice(11, 19)}</td>
											<td>
												<button onClick={handleSaveClick}>
													Save
												</button>
											</td>
										</>
									) : (
										<>
											<td>{menu.itemName}</td>
											<td style={{ textAlign: 'center' }}>{menu.quantity}</td>
											<td style={{ textAlign: 'center' }}>₹{menu.totalPrice}</td>
											<td>Date: {menu.addedAt.slice(0, 10)}<br />Time: {new Date(menu.addedAt).toLocaleString("hi-IN").slice(11, 19)}</td>
											<td>
												<button onClick={() => handleEditClick(menu)}>
													<img src={'https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png'} alt='Edit' />
												</button>
											</td>
										</>
									)}
									<td>
										<button onClick={() => handleDeleteClick(menu.itemId)}>
											<img src='https://cdn-icons-png.freepik.com/512/1345/1345874.png' alt='Delete' />
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ItemsList;
