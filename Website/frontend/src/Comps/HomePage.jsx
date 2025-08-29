import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const [adminID, setAdminID] = useState('');
	const [pswd, setPswd] = useState('');
	const navigate = useNavigate();

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'adminID') {
			setAdminID(value);
		} else if (name === 'pswd') {
			setPswd(value);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const loginUser = {
			adminID,
			pswd,
		};

		try {
			const curUser = await axios.get('/api/users', { params: loginUser });
			window.localStorage.setItem("curUser", curUser.data.adminID);
			navigate('/add-order');
		} catch (error) {
			console.error('Login failed:', error);
		}

		setAdminID('');
		setPswd('');
	};

	useEffect(() => {
		const storedUser = window.localStorage.getItem("curUser");
		if (storedUser !== null && storedUser !== undefined && storedUser !== "null") {
			navigate('/add-order');
		}
	});

	return (
		<>
			<div className='addNewItem'>
				<h3>Login</h3>
				<form onSubmit={onSubmit} className='add-form'>
					<label htmlFor='adminID'><div className='form-labels'>Enter ID: </div></label>
					<input
						type="text"
						name="adminID"
						id="adminID"
						value={adminID}
						onChange={onChange} />
					<br />
					<label htmlFor='pswd'><div className='form-labels'>Enter Password: </div></label>
					<input
						type="password"
						name="pswd"
						id="pswd"
						value={pswd}
						onChange={onChange} />
					<br />
					<button type="submit" className='submitButton'>Log In</button>
				</form>
			</div>
		</>
	);
};

export default HomePage;
