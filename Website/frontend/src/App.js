import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Comps/HomePage';
import AddItem from './Comps/AddItem';
import ItemsList from './Comps/ItemsList';
import NotFound from './Comps/NotFound';
import Payment from './Comps/Payment';

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='' element={<HomePage />} />
				<Route path='/add-order' element={<AddItem />} />
				<Route path='/orders-list' element={<ItemsList />} />
				<Route path='/sorry' element={<NotFound />} />
				<Route path='/payment' element={<Payment />} />
				<Route path="*" element={<Navigate to="/sorry" />} />
			</Routes>
		</BrowserRouter>
	)
};

export default App;
