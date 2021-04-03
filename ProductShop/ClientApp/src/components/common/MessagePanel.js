import PropTypes from 'prop-types';
import { StyledList } from '../commonStyleComponents/lists';

const MessagePanel = ({ messages }) => {
    if(messages && messages.length > 0){
        return (            
            <StyledList>
                { messages.map((itm, index) => {
                    return <li key={index}>{itm}</li>
                })}
            </StyledList>            
        )
    } else {
        return null;
    }
}

MessagePanel.propTypes = {
    messages: PropTypes.array.isRequired,
};

export default MessagePanel;