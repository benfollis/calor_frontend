import React, {useContext, useState} from 'react';
import {ServerContext} from "./ServerContext";
import {TextField, Button} from "@material-ui/core";
import {canonicalize} from "./charts/utils/urlFunctions";


function ServerUrlInput(props) {
    const [calorUrl, setCalorUrl] = useContext(ServerContext);
    const [url, setUrl] = useState(calorUrl);

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
                onClick={() => setCalorUrl(canonicalize(url))}
            >
                Load Server Graphs
            </Button>
        </div>
    );
}

export default ServerUrlInput;