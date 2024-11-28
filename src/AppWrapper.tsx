import './App.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';


function AppWrapper() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}

export default AppWrapper;
