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

const NewPDF = ({ formNameProp, captionOrganization, userFIO, user_job_title}) => {
  const [name, setName] = useState('');
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  const[textinput,setTextinput]= useState('');
  const[textDayCount,setTextDayCount]= useState('');
  const[texttarget,setTexttarget]= useState('');

  //для Заявки направления в командировку
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + textDayCount); // 

  return(
  <div>
    <div>
    {formNameProp === 'Заявка на информационный обмен' && (
      <div class="text-field">
        <label class="text-field__label">Введите информацию про ваши тезисы :</label>
        <input class="text-field__input" type="text" value={textinput} onChange={e => setTextinput(e.target.value)} />
      </div>
      )}
      {formNameProp === 'Заявка для направления в командировку/для направления в служебную поездку' && (
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

            {formNameProp === 'Заявка на информационный обмен' && (
              <div>
                <Text style={styles.title}>Заявка на информационный обмен</Text>
                <Text style={styles.text}>Тезисы, содержащие информацию: {textinput}</Text>
              </div>
              )}
             {formNameProp === 'Заявка для направления в командировку/для направления в служебную поездку' && (
              <div>
                <Text style={styles.header}> Такому - то</Text>
                <Text style={styles.header}> Иванову И.И.</Text>
                <Text style={styles.title}>Заявка для направления в командировку/для направления в служебную поездку</Text>
                <Text style={styles.text}>Наименование организации: {captionOrganization}</Text>
                <Text style={styles.text}>Фамилия, имя, отчество сотрудника : {userFIO}</Text>
                <Text style={styles.text}>Долнжость сотрудника : {user_job_title}</Text>
                <Text style={styles.text}>Место назначения : {textinput}</Text>
                <Text style={styles.text}>Сроком на {textDayCount} календарных дней</Text>
                <Text style={styles.text}>с {formatDate(today)} по {formatDate(futureDate)}</Text>
                <Text style={styles.text}>Цель поездки : {texttarget} </Text>

              </div>
              )}
              {formNameProp === 'Заявка на предоставление отпуска' && (
              <Text style={styles.title}>Заявка на предоставление отпуска</Text>
              )}

              

             
              {/* ... (добавьте другие поля, если нужно) */}
            </View>
          </Page>
    </Document>
      </PDFViewer>
    </div>
  </div>);
};

const PdfGenerator = (userName) => {
  const [formData, setFormData] = React.useState([
    { formName: 'Заявка на информационный обмен', field1: 'Field 1 Value 1', field2: 'Field 2 Value 1' },
    { formName: 'Заявка для направления в командировку/для направления в служебную поездку', field1: 'Field 1 Value 2', field2: 'Field 2 Value 2' },
    { formName: 'Заявка на предоставление отпуска', field1: 'Field 1 Value 2', field2: 'Field 2 Value 2' },
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
      <div>
        <select value={selectedForm.formName} onChange={handleFormChange}>
          {formData.map((form) => (
              <option key={form.formName} value={form.formName}>
                {form.formName}
              </option>
          ))}
        </select>
      </div>
      <div>
        <NewPDF formNameProp={selectedForm.formName} field1Prop={selectedForm.field1} field2Prop={selectedForm.field2} />
      </div>
    </div>
  );
};

export default PdfGenerator;
