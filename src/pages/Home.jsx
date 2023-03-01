//import { UserAuth } from '../context/AuthContext';
import { logOut } from '/src/firebase/auth.jsx';
import { useNavigate } from 'react-router-dom';

export function Home(props) {
	const user = props.user;
	//const logOut = props.logOut;
	console.log('Home user: ' + user.email);
	const toNavigate = useNavigate();
	const handleLogOut = async () => {
		try {
			await logOut();
			toNavigate('/');
		} catch (error) {
			console.error(error.message);
		}
	};
	return (
		<div className='w-full max-w-xs m-auto text-black'>
			<div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
				<p className='text-xl mb-4'>welcome {user.displayName || user.email}</p>
				<button
					className='bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black'
					onClick={handleLogOut}
				>
					logout
				</button>
			</div>
		</div>
	);
}
