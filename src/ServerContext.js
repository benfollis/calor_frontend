/*
A simple context that stores what the active server's URL is
 */

import React, {useState} from 'react';


const EMPTY_STATE = ['', () => {}];
const ServerContext = React.createContext(EMPTY_STATE);

function ServerProvider(props) {
    const [serverUrl, setServerUrl] = useState('');

    const { children } = props;
    return (
        <ServerContext.Provider value={[serverUrl, setServerUrl]}>
            {children}
        </ServerContext.Provider>
    );
}
export {ServerContext, ServerProvider };