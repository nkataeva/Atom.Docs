import React from "react";
import { Link } from 'react-router-dom'
import './request.css'
export function Request() {
    return (
        <div class="main">
            <h1>Заявки</h1>
            <div class="one">
                    <Link to='/creature'>Создать заявку</Link> 
                    <button>Поиск заявок</button>
            </div>
            <table class="table">
	<thead>
		<tr>
			<th>№</th>
			<th>Название</th>
			<th>Статус</th>
			<th>Документ</th>
			
		</tr>
	</thead>
	
        
</table>   
            
        </div>
    )
}