import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDocument, rgb } from 'pdf-lib';

const PdfTemplate = () => {
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
    <div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Field 1:</label>
        <input type="text" value={field1} onChange={(e) => setField1(e.target.value)} />
      </div>
      <div>
        <label>Field 2:</label>
        <input type="text" value={field2} onChange={(e) => setField2(e.target.value)} />
      </div>
      {/* ... (добавьте другие поля, если нужно) */}

      <PDFViewer width={600} height={800}>
        <Document>
          <Page size="A4">
            <View style={styles.container}>
              <Text style={styles.title}>Form Data:</Text>
              <Text style={styles.text}>Name: {name}</Text>
              <Text style={styles.text}>Field 1: {field1}</Text>
              <Text style={styles.text}>Field 2: {field2}</Text>
              {/* ... (добавьте другие поля, если нужно) */}
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <PDFDownloadLink document={<Document />} fileName="generated.pdf" onClick={generatePdf}>
        <button>Generate PDF</button>
      </PDFDownloadLink>
    </div>
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

export default PdfTemplate;
