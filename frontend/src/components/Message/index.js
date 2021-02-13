import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import br from 'date-fns/locale/pt-BR';
import './styles.css';

function Message({ message, sent, received }) {
	const { message: content, timestamp } = message;
	return (
		<Grid
			container
			className="message-container"
			justify={`flex-${sent ? 'end' : 'start'}`}
		>
			<Grid
				item
				className={`message
			${sent ? 'sent' : ''} ${received ? 'received' : ''}`}
			>
				<Typography>{content}</Typography>
				<Typography variant="caption" align="right">
					{formatDistanceToNow(new Date(timestamp), {
						addSuffix: true,
						locale: br,
					})}
				</Typography>
			</Grid>
		</Grid>
	);
}

Message.propTypes = {
	message: PropTypes.shape({
		message: PropTypes.string,
		timestamp: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string,
		]),
	}),
	sent: PropTypes.bool,
	received: PropTypes.bool,
};

export default Message;
