import { useState, useEffect } from "react";
import axios from 'axios';

const PaymentDetails = () => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [splash, setSplash] = useState(true);

	// const makePayment = () => {
	// 	window.close();
	// 	window.parent.postMessage("PaymentConfirmed", "*");
	// };

	useEffect(() => {
		const getURLParameter = (name) => {
			const params = new URLSearchParams(window.location.search);
			return params.get(name);
		};

		const nameParam = getURLParameter('name');
		const amountParam = getURLParameter('amount');

		setName(nameParam);
		setAmount(amountParam);

		setTimeout(() => {
			setSplash(false);
		}, 3000);

	}, []);

	return (
		<>
			{splash ?
				<div>
					Redirecting...<br />Please don't close the window
				</div> :
				<h3 style={{ position: "absolute", top: "50%", transform: "translate(0, -50%)", width: "100vw", margin: "0 1rem", textAlign: "center" }}>
					{/* <h2>Payment Details</h2>
					<p>Name: {name}</p>
					<p>Amount: {amount}</p>
					<button style={{
						cursor: "pointer",
						position: "relative",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						marginTop: "2rem",
						padding: "0.5rem 1rem",
						fontSize: "large",
						border: "1.5px solid black",
						borderRadius: "0.5rem",
					}}>Confirm Purchase</button> */}
					YOUR ORDER HAS BEEN CONFIRMED.<br />KINDLY RETURN BACK :)
				</h3>
			}
		</>
	);
};

export default PaymentDetails;
