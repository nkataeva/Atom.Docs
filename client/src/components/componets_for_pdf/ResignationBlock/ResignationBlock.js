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
import './ResignationBlock.css'

import {pdfStyle} from '../../../const'

Font.register({
    family: "Roboto",
    src: YsabeauSCRegular,
  });
  
  const styles = StyleSheet.create(pdfStyle);
const ResignationBlock = ({ userName, content }) => {

    const formatDate = (date) => {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('ru-RU', options);
    };
  
    const today = new Date();
    return (
      <View>
        <Text style={styles.header}>Такому - то</Text>
        <Text style={styles.header}>Иванову И.И.</Text>
        <Text style={styles.header}>от (должность струдника) {userName}</Text>
        <Text style={styles.header}> {userName}</Text>
  
        <Text style={styles.title}>Заявление на увольнение</Text>
        <Text style={styles.text}>Прошу уволить меня с должности с {formatDate(today)}</Text>
        <Text style={styles.text}>Причина увольнения: {content}</Text>
      </View>
    );
  };
  export default ResignationBlock;