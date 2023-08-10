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

const NewPDF = (props) => {
  const [name, setName] = useState('');
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  const[textinput,setTextinput]= useState('');
  const[textDayCount,setTextDayCount]= useState(7);
  const[texttarget,setTexttarget]= useState('');

 
  let captionFactory=props.captionFactory
  let userName=props.userName

  //для Заявки направления в командировку
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + parseInt(textDayCount)); // 

  return(
  <div>
    <div>
    {props.captionRequest === 'Заявка на информационный обмен' && (
      <div class="text-field">
        <label class="text-field__label">Введите информацию про ваши тезисы :</label>
        <input class="text-field__input" type="text" value={textinput} onChange={e => setTextinput(e.target.value)} />
      </div>
      )}
      {props.captionRequest === 'Заявка для направления в командировку/для направления в служебную поездку' && (
      <div class="text-field">
        <label class="text-field__label">Введите информацию про ваше место назначения : </label>
        <input  class="text-field__input" type="text" value={textinput} onChange={e => setTextinput(e.target.value)} />
        <p/>
        <label class="text-field__label">Введите информацию про количество календарных дней для пребывания :  </label>
        <input  class="text-field__input" type="text" value={textDayCount} onChange={e => setTextDayCount(e.target.value)} />
        <p/>
        <label class="text-field__label">Введите информацию про цель поездки:  </label>
        <input  class="text-field__input" type="text" value={texttarget} onChange={e => setTexttarget(e.target.value)} />
      </div>
      )}
    </div>
    <div>
    <PDFViewer width={600} height={300}>
    <Document>
      <Page size="A4">
            <View style={styles.container}>

            {props.captionRequest === 'Заявка на информационный обмен' && (
              <div>
                <Text style={styles.title}>Заявка на информационный обмен</Text>
                <Text style={styles.text}>Тезисы, содержащие информацию: {textinput}</Text>
              </div>
              )}
             {props.captionRequest === 'Заявка для направления в командировку/для направления в служебную поездку' && (
              <div>
                <Text style={styles.header}> Такому - то</Text>
                <Text style={styles.header}> Иванову И.И.</Text>
                <Text style={styles.title}>Заявка для направления в командировку/для направления в служебную поездку</Text>
                <Text style={styles.text}>Наименование организации: {captionFactory}</Text>
                <Text style={styles.text}>Фамилия, имя, отчество сотрудника : {userName}</Text>
                <Text style={styles.text}>Долнжость сотрудника : {userName}</Text>
                <Text style={styles.text}>Место назначения : {textinput}</Text>
                <Text style={styles.text}>Сроком на {textDayCount} календарных дней</Text>
                <Text style={styles.text}>с {formatDate(today)} по {formatDate(futureDate)}</Text>
                <Text style={styles.text}>Цель поездки : {texttarget} </Text>

              </div>
              )}
              {props.captionRequest === 'Заявка на предоставление отпуска' && (
              <Text style={styles.title}>Заявка на предоставление отпуска</Text>
              )}
            </View>
          </Page>
    </Document>
      </PDFViewer>
    </div>
  </div>);
};

const PdfGenerator = ( userName,
  chief,
  captionFactory,
  content,
  justification,
  status
                      ) => {
                        
                        console.log("in PdfGenerator - "+userName)
  const [typeTemplate, setTypeTemplatea] = React.useState([
    { 
      captionRequest: 'Заявка на информационный обмен', 
      userName: {userName} ,
      chief: {chief}, 
      captionFactory: {captionFactory}, 
      content: {content}, 
      justification: {justification}, 
      status: {status}, 
    },
    { 
      captionRequest: 'Заявка для направления в командировку/для направления в служебную поездку', 
      userName: {userName} ,
      chief: {chief}, 
      captionFactory: {captionFactory}, 
      content: {content}, 
      justification: {justification}, 
      status: {status}, 
    },
    { 
      captionRequest: 'Заявка на предоставление отпуска',
      userName: {userName} ,
      chief: {chief}, 
      captionFactory: {captionFactory}, 
      content: {content}, 
      justification: {justification}, 
      status: {status}, 
    },
  ]);

  const [selectedForm, setSelectedForm] = React.useState(typeTemplate[0]);

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
        <NewPDF captionRequest ={selectedForm?.captionRequest} 
         userName = {selectedForm?.userName} 
        chief ={selectedForm?.chief}  
        captionFactory = {selectedForm?.captionFactory}
        content = {selectedForm?.content}
        justification = {selectedForm?.justification}
        status = {selectedForm?.status} 
        />
      </div>
    </div>
  );
};

export default PdfGenerator;
