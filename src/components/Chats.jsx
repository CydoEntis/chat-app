import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
	const history = useHistory();
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	const getFile = async (url) => {
		const response = await fetch(url);
		const data = await response.blob();

		return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
	};

	useEffect(() => {
		if (!user) {
			history.push('/');
			return;
		}

		axios
			.get('https://api.chatengine.io/users/me', {
				headers: {
					'project-id': '7173afc9-7f26-42c4-86cf-90c0e1ae2a97',
					'user-name': user.email,
					'user-secret': user.uid,
				},
			})
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				let formdata = new FormData();
				formdata.append('email', user.email);
				formdata.append('username', user.displayName);
				formdata.append('secret', user.uid);

				getFile(user.photoURL).then((avatar) => {
					formdata.append('avatar', avatar, avatar.name);

					axios
						.post('https://api/chatengine.io/users', formdata, {
							headers: {
								'private-key': '8f5b3226-dead-4085-a282-68484b9ef235',
							},
						})
						.then(() => setLoading(false))
						.catch((error) => console.log(error));
				});
			});
	}, []);

	const handleLogout = async () => {
		await auth.signOut();
		history.push('/');
	};

	if (!user || loading) return 'Loading';

	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">Discube</div>
				<div className="logout-tab" onClick={handleLogout}>
					Logout
				</div>
			</div>
			<ChatEngine
				height="calc(100vh - 66px)"
				projectID="7173afc9-7f26-42c4-86cf-90c0e1ae2a97"
				userName={user.email}
				userSecret={user.uid}
			/>
		</div>
	);
};

export default Chats;
