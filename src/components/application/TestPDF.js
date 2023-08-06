import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDocument, rgb } from 'pdf-lib';

const PdfTemplate = ({ formNameProp, field1Prop, field2Prop }) => {
  const [name, setName] = useState('');
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  // ... (добавьте другие поля, если нужно)

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
    const { width, height } = page.getSize();

    const drawText = (text, x, y) => {
      const textWidth = font.widthOfTextAtSize(text, 12);
      page.drawText(text, { x: (width - textWidth) / 2 + x, y: height - y, size: 12 });
    };

    drawText('Form Data:', 0, 30);
    drawText('Name: ' + name, 0, 50);
    drawText('Field 1: ' + field1, 0, 70);
    drawText('Field 2: ' + field2, 0, 90);
    // ... (добавьте другие поля, если нужно)

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  return (
      <PDFViewer width={600} height={800}>
        <Document>
          <Page size="A4">
            <View style={styles.container}>
              <Text style={styles.title}>Form Data:</Text>
              <Text style={styles.text}>Name: {formNameProp}</Text>
              <Text style={styles.text}>Field 1: {field1Prop}</Text>
              <Text style={styles.text}>Field 2: {field2Prop}</Text>
              {/* ... (добавьте другие поля, если нужно) */}
            </View>
          </Page>
        </Document>
      </PDFViewer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const PdfGenerator = () => {
  const [formData, setFormData] = React.useState([
    { formName: 'Form 1', field1: 'Field 1 Value 1', field2: 'Field 2 Value 1' },
    { formName: 'Form 2', field1: 'Field 1 Value 2', field2: 'Field 2 Value 2' },
    // Добавьте другие формы в массив, если нужно
  ]);

  const [selectedForm, setSelectedForm] = React.useState(formData[0]);

  const handleFormChange = (e) => {
    const selectedFormName = e.target.value;
    const form = formData.find((item) => item.formName === selectedFormName);
    setSelectedForm(form);
  };

  return (
      <div>
        <select value={selectedForm.formName} onChange={handleFormChange}>
          {formData.map((form) => (
              <option key={form.formName} value={form.formName}>
                {form.formName}
              </option>
          ))}
        </select>
        <PdfTemplate formNameProp={selectedForm.formName} field1Prop={selectedForm.field1} field2Prop={selectedForm.field2} />
      </div>
  );
};

export default PdfGenerator;
