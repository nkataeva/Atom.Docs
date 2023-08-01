import React from "react";
import styles from './Search.module.scss';

const Search = (props) => {

    const handleInputChange = (event) => {
        props.setInput(event.target.value);
    };

    return (
        <div>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Введите название документа"
                    value={props.input}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default Search;