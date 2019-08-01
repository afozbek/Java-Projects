import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Director = props => {
    const { directorId, name, surname, birthPlace } = props.directorData;

    return (
        <tr>
            <td>{directorId}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{birthPlace}</td>
            <td>
                <Link to={`/update-director/${directorId}`}>
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
            </td>
            <td>
                <Link to={`/delete-director-confirm/${directorId}`}>
                    <FontAwesomeIcon icon={faTrash} />
                </Link>
            </td>
        </tr>
    );
};

export default Director;
