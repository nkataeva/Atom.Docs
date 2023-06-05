import React from "react";
import { Link } from "react-router-dom";
import styles from "./sign.module.scss";
import withLayout from "../../hocs/with-layout";

const SignApplication = () => {

    const testData = [
        {
            name: 'lala',
            date: '21.09.2023',
            type: 'application'
        },
        {
            name: '12jhwe',
            date: '21.09.2023',
            type: 'application'
        },
        {
            name: 'asf',
            date: '21.09.2023',
            type: 'application'
        },
        {
            name: 'abcd',
            date: '21.09.2023',
            type: 'application'
        },
        {
            name: 'Aniuer',
            date: '21.09.2023',
            type: 'application'
        }
    ]

    const [inputValue, setInputValue] = React.useState('');

    const filteredData = testData.filter((value) => {
        return value.name.toLowerCase().includes(inputValue);
    })

    const handleSubmit = (event) => {
        setInputValue('');
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <Link to="/signing" activeStyle>
                Подписать
            </Link>
            <h1 className={styles.title}>Список заявок на подписание</h1>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Введите название документа"
                    value={inputValue}
                    onChange={handleInputChange} />
                <button onClick={handleSubmit}>Поиск</button>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>date</th>
                            <th>type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default withLayout(SignApplication);