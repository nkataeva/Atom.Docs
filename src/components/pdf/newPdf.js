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
import YsabeauSCRegular from "../../fonts/YsabeauSC/YsabeauSC-Regular.ttf";
import moment from 'moment'; 
import './styleinput.css'

Font.register({
  family: "Roboto",
  src: YsabeauSCRegular,
});

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  header: {
    fontFamily: "Roboto",
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'right',
    flexDirection: 'row', 
    justifyContent: 'flex-end' 
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 12,
    marginBottom: 5,
  },
});

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



const BusinessTripBlock = ({ captionFactory, userName, textinput, textDayCount, texttarget }) => {
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
      
      <Text style={styles.title}>Заявка для направления в командировку/для направления в служебную поездку</Text>
      <Text style={styles.text}>Прошу отправить меня в командировку в организацию " {captionFactory}" , находящуюся по адресу {textinput},</Text>
      
      <Text style={styles.text}>сроком на {textDayCount} календарных дней , с {formatDate(today)} по {formatDate(futureDate)}</Text>
      <Text style={styles.text}>Обоснованием для служебной поездки является : {texttarget}</Text>
    </View>
  );
};
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


const NewPDF = (props) => {
  const [textinput, setTextinput] = useState('');
  const [textfactory, setTextfactory] = useState('');
  const [textDayCount, setTextDayCount] = useState(7);
  const [texttarget, setTexttarget] = useState('');
  const [content, setContent] = useState(''); 
  const [justification, setJustification] = useState('');

  const [vacationStartDate, setVacationStartDate] = useState('');
  const [vacationEndDate, setVacationEndDate] = useState('');
  const [vacationType, setVacationType] = useState('');
  const [vacationReason, setVacationReason] = useState('');
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
      </div>
      <div>
        <PDFViewer width={600} height={300}>
          <Document>
            <Page size="A4">
              <View style={styles.container}>
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
                    startDate={props.startDate}
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


const PdfGenerator = ({ obj }) => {
  const { userName, chief, captionFactory, content, justification, status } = obj;
const typeTemplate = [
    {
      captionRequest: 'Заявка на информационный обмен',
    },
    {
      captionRequest: 'Заявка для направления в командировку/для направления в служебную поездку',
    },
    {
      captionRequest: 'Заявка на предоставление отпуска',
    },
  ];

  const [selectedForm, setSelectedForm] = useState(typeTemplate[0]);

  const handleFormChange = (e) => {
    const selectedFormName = e.target.value;
    const form = typeTemplate.find((item) => item.captionRequest === selectedFormName);
    setSelectedForm(form);
  };

  return (
    <div>
      <div>
        <select value={selectedForm.captionRequest} onChange={handleFormChange}>
          {typeTemplate.map((form) => (
            <option key={form.captionRequest} value={form.captionRequest}>
              {form.captionRequest}
            </option>
          ))}
        </select>
      </div>
      <div>
        <NewPDF
          captionRequest={selectedForm.captionRequest}
          userName={userName}
          chief={chief}
          captionFactory={captionFactory}
          content={content}
          justification={justification}
          status={status}
        />
      </div>
    </div>
  );
};

export default PdfGenerator;
