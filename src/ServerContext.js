/*
A simple context that stores what the active server's URL is
 */

import React, {useEffect, useState} from 'react';


const EMPTY_STATE = ['', () => {}];
const ServerContext = React.createContext(EMPTY_STATE);

function ServerProvider(props) {

    const storedValue = localStorage.getItem("serverUrl") || '';
    const [serverUrl, setServerUrl] = useState(storedValue);

    useEffect(() => {
        localStorage.setItem("serverUrl", serverUrl);
    }, [serverUrl]);

    const { children } = props;
    return (
        <ServerContext.Provider value={[serverUrl, setServerUrl]}>
            {children}
        </ServerContext.Provider>
    );
}
export {ServerContext, ServerProvider };