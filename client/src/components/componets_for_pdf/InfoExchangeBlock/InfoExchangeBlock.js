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
import './InfoExchangeBlock.css'

import {pdfStyle} from '../../../const'

Font.register({
  family: "Roboto",
  src: YsabeauSCRegular,
});

const styles = StyleSheet.create(pdfStyle);

const InfoExchangeBlock = ({ textinput, textfactory,content, justification, userName }) => (
  <View>
    <Text style={styles.header}>Такому - то</Text>
    <Text style={styles.header}>Иванову И.И.</Text>
    <Text style={styles.header}>от (должность струдника) {userName}</Text>
    <Text style={styles.header}> {userName}</Text>
    <Text style={styles.title}>Заявка на информационный обмен</Text>
    <Text style={styles.text}>Прошу предоставить мне разрешение на информационный обмен с организацией {textfactory} с представленными тезисами : {textinput}</Text>
    <Text style={styles.text}>Содержание: {content}</Text>
    <Text style={styles.text}>Обоснованием для обмена считать : {justification}</Text>
  </View>
);

export default InfoExchangeBlock;