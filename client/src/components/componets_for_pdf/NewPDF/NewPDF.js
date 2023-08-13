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
// import RobotoRegular from "../../fonts/Roboto-Regular.ttf";
import YsabeauSCRegular from "../../../fonts/YsabeauSC/YsabeauSC-Regular.ttf";
import './NewPDF.scss'
import ResignationBlock from "../ResignationBlock/ResignationBlock"; 
import VacationBlock from "../VacationBlock/VacationBlock";
import BusinessTripBlock from "../BusinessTripBlock/BusinessTripBlock";
import InfoExchangeBlock from "../InfoExchangeBlock/InfoExchangeBlock";


Font.register({
    family: "Roboto",
    src: YsabeauSCRegular,
  });
  

const NewPDF = (props) => {
    const [textinput, setTextinput] = useState('');
    const [textfactory, setTextfactory] = useState('');
    const [textDayCount, setTextDayCount] = useState(7);
    const [texttarget, setTexttarget] = useState('');
    const [content, setContent] = useState(''); 
    const [justification, setJustification] = useState('');
    return (
      <div>
        <div>
          {props.captionRequest === 'Заявка на информационный обмен' && (
            <div className="text-field">
              <label className="text-field__label">Введите информацию про ваше место назначения (адрес организации) :</label>
              <input className="text-field__input" type="text" value={textfactory} onChange={e => setTextfactory(e.target.value)} />
              <p />
              <label className="text-field__label">Введите информацию про ваши тезисы :</label>
              <input className="text-field__input" type="text" value={textinput} onChange={e => setTextinput(e.target.value)} />
              <p/>
              <label className="text-field__label">Введите содержание :</label>
              <input className="text-field__input" type="text" value={content} onChange={e => setContent(e.target.value)} />
              <p/>
              <label className="text-field__label">Введите обоснование :</label>
              <input className="text-field__input" type="text" value={justification} onChange={e => setJustification(e.target.value)} />
            </div>
          )}
          {props.captionRequest === 'Заявка для направления в командировку/для направления в служебную поездку' && (
            <div className="text-field">
              <label className="text-field__label">Введите информацию про ваше место назначения (адрес организации) :</label>
              <input className="text-field__input" type="text" value={textinput} onChange={e => setTextinput(e.target.value)} />
              <p />
              <label className="text-field__label">Введите информацию про количество календарных дней для пребывания :</label>
              <input className="text-field__input" type="text" value={textDayCount} onChange={e => setTextDayCount(e.target.value)} />
              <p />
              <label className="text-field__label">Введите информацию про цель поездки:</label>
              <input className="text-field__input" type="text" value={texttarget} onChange={e => setTexttarget(e.target.value)} />
            </div>
          )}
          {props.captionRequest === 'Заявка на предоставление отпуска' && (
          <div className="text-field">
            <label className="text-field__label">Введите информацию про начало отпуска:</label>
            <input className="text-field__input" type="text" value={textDayCount} onChange={e => setTextDayCount(e.target.value)} />
            <p />
            </div>
          )}
          {props.captionRequest === 'Заявление на увольнение' && (
          <div className="text-field">
            <label className="text-field__label">Введите информацию про причину увольнения :</label>
            <input className="text-field__input" type="text" value={content} onChange={e => setContent(e.target.value)} />
            <p />
            </div>
          )}
        </div>
          <div className="pdf-container">
              <PDFViewer width={580} height={300}>
            <Document>
              <Page size="A4">
                <View style="container">
                {props.captionRequest === 'Заявка на информационный обмен' && (
                    <InfoExchangeBlock
                      textfactory={textfactory}
                      textinput={textinput}
                      content={content}
                      justification={justification}
                      userName={props.userName}
                    />
                  )}
  
                  {props.captionRequest === 'Заявка для направления в командировку/для направления в служебную поездку' && (
                    <BusinessTripBlock
                      captionFactory={props.captionFactory}
                      userName={props.userName}
                      textinput={textinput}
                      textDayCount={textDayCount}
                      texttarget={texttarget}
                    />
                  )}
                  {props.captionRequest === 'Заявка на предоставление отпуска' && (
                      <VacationBlock
                        userName={props.userName}
                        textDayCount={textDayCount}
                      />
                    )}
                  {props.captionRequest === 'Заявление на увольнение' && (
                    <ResignationBlock
                      userName={props.userName}
                      content={content}
                    />
                  )}
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      </div>
    );
  };

  export default NewPDF;