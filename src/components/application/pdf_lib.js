import React, { useEffect, useState } from 'react';
import {  PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const PDFViewer = () => {
    /*
    const [pdfData, setPdfData] = useState([]);

    useEffect(() => {
        generatePDF();
    }, []);

    const generatePDF = async () => {

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        // Загрузка пользовательского шрифта
        const fontBytes = await fetch('/path/to/font.ttf').then((res) => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        const { width, height } = page.getSize();
        const fontSize = 30;

        page.drawText('Привет', {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            color: rgb(0, 0.53, 0.71),
        });

        const pdfBytes = await pdfDoc.save();

        setPdfData(pdfBytes);
    };

    return (
        <div>
            {pdfData && (
                <object
                    data={`data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(pdfData)))}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                >
                    <p>
                        Ваш браузер не поддерживает просмотр PDF. Вы можете <a href={`data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(pdfData)))}`}>скачать PDF</a>.
                    </p>
                </object>
            )}
        </div>
    );

     */
};

export default PDFViewer;