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
import './BusinessTripBlock.scss'

import {pdfStyle} from '../../../const'

Font.register({
  family: "Roboto",
  src: YsabeauSCRegular,
});
const styles = StyleSheet.create(pdfStyle);

const BusinessTripBlock = ({ captionFactory, userName, textinput, textDayCount, texttarget , cheif}) => {
    const formatDate = (date) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('ru-RU', options);
    };
  
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(textDayCount));
  
    return (
        <View className="business-trip-block">
            <Text style={styles.header}>Начальнику отдела</Text>
            <Text style={styles.header}>{cheif ? cheif : "Иванову И.И."}</Text>
            <Text style={styles.header}>от (должность струдника) инженера</Text>
            <Text style={styles.header}> {userName}</Text>

            <Text style={styles.title}>Заявка для направления в командировку/для направления в служебную поездку</Text>
            <Text style={styles.text}>Прошу отправить меня в командировку в организацию "{captionFactory}" , находящуюся по адресу {textinput},</Text>

            <Text style={styles.text}>Сроком на {textDayCount} календарных дней, с {formatDate(today)} по {formatDate(futureDate)}</Text>
            <Text style={styles.text}>Обоснованием для служебной поездки является: {texttarget}</Text>
        </View>
    );
  };
export default BusinessTripBlock;