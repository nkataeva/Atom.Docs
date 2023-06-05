import React from "react";
import { Link } from 'react-router-dom'
import './request.css'
export function Request ({ term, data, update }) {

    const dataSearch = e => {
      const value = e.target.value.toLowerCase();
  
      const filter = data.filter(doc => {
        return doc.toLowerCase().includes(value);
      });
  
      update({
        data: filter,
        active: 0,
        term: value
      });
      
    };
    return (
       
        <div class="container">
             <div class="header">
            <img src="./logo.svg"/>
             </div>
        <div class="first">
        
            <h1 class="text">Заявки</h1>
            <div class="one">
                <button>Создать</button>
            <div classe="Search">
      <span class="SearchSpan">
       
      </span>
      <input class="SearchInput"
      value={term}
        type="text"
        onChange={dataSearch}
        placeholder="Поиск"
      />
      </div>
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
    <tbody>
        
        <tr>
			<th>1</th>
			<th>first app</th>
			<th>not</th>
			<th>file</th>
			
		</tr>
        <tr>
			<th>2</th>
			<th>two app</th>
			<th>active</th>
			<th>not</th>
			
		</tr>
        <tr>
			<th>3</th>
			<th>three app</th>
			<th>active</th>
			<th>file</th>
			
		</tr>
        </tbody>
	
	
        
</table>   
</div>
        </div>
    )
}