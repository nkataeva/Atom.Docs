import React from "react";
import {
  Document,
  Text,
  Page,
  PDFViewer,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
// import RobotoRegular from "../../fonts/Roboto-Regular.ttf";
import YsabeauSCRegular from "../../fonts/YsabeauSC/YsabeauSC-Regular.ttf";

Font.register({
  family: "Roboto",
  src: YsabeauSCRegular,
});

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
  },
});

const NewPDF = () => (
  <PDFViewer width={600} height={800}>
    <Document>
      <Page>
        <Text style={styles.text}>Привет мир!</Text>
      </Page>
    </Document>
  </PDFViewer>
);

export default NewPDF;
