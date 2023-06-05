import React, {useEffect, useState} from 'react';
import {  PDFViewer ,PDFDownloadLink ,Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import './PDF.css'
import {  PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export function Preview  ()  {
    const [value, setValue] = useState(false)

    if(value)
    {
        return (
            <div style={{flexGrow: 1}}>
                <PDFViewer
                    showToolbar={false}
                    style={{
                        width: '100%',
                        height: '95%',
                    }}
                >
                    <CreatePDF />
                </PDFViewer>
                <PDFDownloadLink
                    document={<CreatePDF />}
                    fileName='some name.pdf'
                >
                    {({loading}) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
            </div>
        )
    }
    else {
        return (<div></div>);
    }
}


export const CreatePDF = ({ onChange },{profile} ) => {
    const [name, setName] = React.useState("name");
    const [corp, setCorp] = React.useState("corp");
    const [date, setDate] = React.useState("date");
    const [type_request, setTypeRequest] = React.useState("type_request");
    const [type_template, setTypeTemplate] = React.useState("type_template");
    const [numberDoc, setNumberDoc] = React.useState("");

    const onChangeName = (e) => {
        setName(e.target.value);
        console.log(name)
    }
    const onChangeCorp = (e) => {
        setCorp(e.target.value);
    }
    const onChangeDate = (e) => {
        setDate(e.target.value);
    }
    const onChangeTypeRequest = (e) => {
        setTypeRequest(e.target.value);
    }
    const onChangeTypeTemplate = (e) => {
        setTypeTemplate(e.target.value);
    }
    let array =[]
    const [boolCheckTest,setBoolCheckTest]=useState(false)
    let data_pdf = { name: {name},
                corp: {corp},
                type_request: {type_request},
                type_template: {type_template},
                date: {date}
    } ;
    const handlerClickSender=(e)=> {
        data_pdf.date=date
        data_pdf.name=name
        data_pdf.corp=corp
        data_pdf.type_template=type_template
        data_pdf.type_request=type_request
    }

    const [pdfData, setPdfData] = useState([]);

    useEffect(() => {
        generatePDF(data_pdf);
    }, []);

    const generatePDF = async (data_pdf) => {

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const font = await pdfDoc.embedFont('Times-Roman');

        const { width, height } = page.getSize();
        const fontSize = 16;

        page.drawText('Caption - '+data_pdf.name, {
            x: 20,
            y: height - 4 * fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0.53, 0.71),
        });
        page.drawText('Type request - '+{type_request}, {
            x: 20,
            y: height - 5 * fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0.53, 0.71),
        });
        page.drawText('Type template - '+type_template, {
            x: 20,
            y: height - 6 * fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0.53, 0.71),
        });
        page.drawText('Date of approval - '+date, {
            x: 20,
            y: height - 7 * fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0.53, 0.71),
        });
        page.drawText('Corporation - '+corp, {
            x: 20,
            y: height - 8 * fontSize,
            size: fontSize,
            font: font,
            color: rgb(0, 0.53, 0.71),
        });

        const pdfBytes = await pdfDoc.save();

        setPdfData(pdfBytes);
    };

        return (
            <div className='MainCLassPDF'>
                <div className="container">
                    <ul className='input_form'>
                        <li>
                            <label>Название</label>
                            <input
                                type="text"
                                name="name"
                                onChange={onChangeName}
                                value={name}
                            />
                        </li>
                        <li>
                            <label>Тип заявки</label>
                            <select name="name" className='listbox' size="1"
                                    onClick={onChangeTypeRequest}>
                                <option value="Type requests 1">Тип какой то 1</option>
                                <option value="Тип какой то 2">Тип какой то 2</option>
                                <option value="Тип какой то 3">Тип какой то 3</option>
                                >
                            </select>
                        </li>
                        <li>
                            <label>Тип шаблона</label>
                            <select name="name" className='listbox' size="1"
                                    onClick={onChangeTypeTemplate}>
                                <option value="Type Template 1">Тип шаблона какой то 1</option>
                                <option value="Тип шаблона какой то 2">Тип шаблона какой то 2</option>
                                <option value="Тип шаблона какой то 3">Тип шаблона какой то 3</option>
                                >
                            </select>
                        </li>
                        <li>
                            <label>Дата согласования</label>
                            <input
                                type="date"
                                name="name"
                                onChange={onChangeDate}
                                value={date}
                            />
                        </li>
                        <li>
                            <label>Организация</label>
                            <input
                                type="text"
                                name="name"
                                onChange={onChangeCorp}
                                value={corp}
                            />
                        </li>
                        <li>
                            <button onClick={handlerClickSender}>Отправить</button>
                        </li>
                    </ul>
                </div>
                <div className="container">
                    {pdfData && (
                        <object
                            data={`data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(pdfData)))}`}
                            type="application/pdf"
                            width="500px"
                            height="600px"
                        >
                            <p>
                                Ваш браузер не поддерживает просмотр PDF. Вы можете <a href={`data:application/pdf;base64,${btoa(String.fromCharCode(...new Uint8Array(pdfData)))}`}>скачать PDF</a>.
                            </p>
                        </object>
                    )}
                </div>
                {/*<div  className='pdfWindow'>
                    <Document class='PDF'>
                        <Page size="A4">
                            <View>
                                <Text>Название : {name}</Text>
                            </View>
                            <br/>
                            <View>
                                <Text>Тип заявки : {type_request}</Text>
                            </View>
                            <br/>
                            <View>
                                <Text>Тип шаблона : {type_template}</Text>
                            </View>
                            <br/>
                            <View>
                                <Text>Дата согласования : {date}</Text>
                            </View>
                            <br/>
                            <View>
                                <Text>Номер документа № {numberDoc}</Text>
                            </View>
                            <br/>
                            <View>
                                <Text>Организация : {corp}</Text>
                            </View>
                            <br/>
                        </Page>
                    </Document>
                </div>*/}
            </div>
        )

}
const Test =( {name},{corp},{date},{type_request},{type_template},{numberDoc})=> {
    return(
    <Document class='PDF'>
        <Page size="A4">
            <View>
                <Text>Название : {name}</Text>
            </View>
            <br/>
            <View>
                <Text>Тип заявки : {type_request}</Text>
            </View>
            <br/>
            <View>
                <Text>Тип шаблона : {type_template}</Text>
            </View>
            <br/>
            <View>
                <Text>Дата согласования : {date}</Text>
            </View>
            <br/>
            <View>
                <Text>Номер документа № {numberDoc}</Text>
            </View>
            <br/>
            <View>
                <Text>Организация : {corp}</Text>
            </View>
            <br/>
        </Page>
    </Document>
    )
}