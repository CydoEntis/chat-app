import React from 'react';

import { GooglePlusSquareFilled, GoogleSquareFilled } from '@ant-design/icons';

import firebase from 'firebase/app';

import { auth } from '../firebase';

const Login = () => {
	return (
		<div id="login-page">
			<div id="login-card">
				<h2>Welcome to Discube!</h2>
				<div
					className="login-button google"
					onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
					<GooglePlusSquareFilled className={'googleIcon'} /> Sign In with Google
				</div>
			</div>
		</div>
	);
};

export default Login;
