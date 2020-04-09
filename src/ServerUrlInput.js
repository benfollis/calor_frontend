import React, {useContext, useState} from 'react';
import {ServerContext} from "./ServerContext";
import {TextField, Button} from "@material-ui/core";


function ServerUrlInput(props) {
    const [, setCalorUrl] = useContext(ServerContext);
    const [url, setUrl] = useState('');

    function handleUrlChange(event) {
        const {value} = event.target;
        setUrl(value);
    }

    return (
        <div>
            <TextField
                value={url}
                onChange={handleUrlChange}
            />
            <Button
                onClick={() => setCalorUrl(url)}
            >
                Load Server Graphs
            </Button>
        </div>
    );
}

export default ServerUrlInput;