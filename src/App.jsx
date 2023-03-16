//definir multiples rutas
import { Routes, Route } from 'react-router-dom';
import { Inicio } from '/src/pages/Inicio';
import { Login } from '/src/pages/Login';
import { Menu } from '/src/pages/Menu';
import { Orders } from '/src/pages/Orders.jsx';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '/src/firebase/firebase-init.js';
import { addOrder, onGetOrders } from './firestore/firestore-funct';

const App = () => {
	const [user, setUser] = useState(null);
	const [userEmail, setUserEmail] = useState('');
	const [orders, setOrders] = useState([]);

	console.log('User: ' + user);
	//Ejecuta algo ni bien carga el componente
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			console.log('currentUser: ' + { user });
			if (user) {
				setUser(true);
				setUserEmail(user.email);
				localStorage.setItem('employee', user.email);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

useEffect(() => {
	const unsubscribe = onGetOrders((query) => {
		const newOrders = query.docs.map((doc) => doc.data());
		setOrders(newOrders);
	});
	return () => {
		unsubscribe();
	};
}, []);

	if (user === null) {
		return (
			<Routes>
				<Route path='/' element={<Inicio />} />
				<Route path='/login' element={<Login setUser={setUser} />} />
			</Routes>
		);
	}
	console.log('Estoy logueada');

	return (
		<Routes>
			<Route
				path='/menu'
				element={<Menu userEmail={userEmail} addOrder={addOrder} />}
			/>
			<Route
				path='/orders'
				element={<Orders userEmail={userEmail} orders={orders} />}
			/>
		</Routes>
	);
};

export { App };
