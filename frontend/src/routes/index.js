import React from 'react';
import { Switch } from 'react-router-dom';

import ChatRoom from '../pages/ChatRoom';
import Welcome from '../pages/Welcome';

import Route from './Route';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" isPrivate exact component={ChatRoom} />
			<Route path="/welcome" exact component={Welcome} />
			<Route path="/:room" isPrivate component={ChatRoom} />
		</Switch>
	);
}
