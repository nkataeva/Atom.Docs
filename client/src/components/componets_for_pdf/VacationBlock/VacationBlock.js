import React ,{ useState } from "react";
import {
  Document,
  Text,
  Page,
  PDFViewer,
  Font,
  StyleSheet,
  View
} from "@react-pdf/renderer";
import YsabeauSCRegular from "../../../fonts/YsabeauSC/YsabeauSC-Regular.ttf";
import './VacationBlock.css'

import {pdfStyle} from '../../../const'

Font.register({
  family: "Roboto",
  src: YsabeauSCRegular,
});

const styles = StyleSheet.create(pdfStyle);

const VacationBlock = ({ userName ,textDayCount}) => {
    const formatDate = (date) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('ru-RU', options);
    };
  
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(textDayCount));
  
    return (
      <View>
        <Text style={styles.header}>Такому - то</Text>
        <Text style={styles.header}>Иванову И.И.</Text>
        <Text style={styles.header}>от (должность струдника) {userName}</Text>
        <Text style={styles.header}> {userName}</Text>
  
        <Text style={styles.title}>Заявка на предоставление отпуска</Text>
        <Text style={styles.text}>Прошу предоставить мне отпуск сроком на {textDayCount} календарных дней , с {formatDate(today)} по {formatDate(futureDate)}</Text>
        
      </View>
    );
  };

  export default VacationBlock;