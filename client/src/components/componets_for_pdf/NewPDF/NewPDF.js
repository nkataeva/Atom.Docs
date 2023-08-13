import React, { useState } from "react";
import {
  Document,
  Text,
  Page,
  PDFViewer,
  Font,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import YsabeauSCRegular from "../../../fonts/YsabeauSC/YsabeauSC-Regular.ttf";
import "./NewPDF.scss";
import ResignationBlock from "../ResignationBlock/ResignationBlock";
import VacationBlock from "../VacationBlock/VacationBlock";
import BusinessTripBlock from "../BusinessTripBlock/BusinessTripBlock";
import InfoExchangeBlock from "../InfoExchangeBlock/InfoExchangeBlock";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import signsStore from "../../../stores/SignStore";
import { useNavigate } from "react-router-dom";
import { APPRoute } from "../../../const";

Font.register({
  family: "Roboto",
  src: YsabeauSCRegular,
});

const NewPDF = (props) => {
  const [textinput, setTextinput] = useState("");
  const [textfactory, setTextfactory] = useState("");
  const [textDayCount, setTextDayCount] = useState("");
  const [texttarget, setTexttarget] = useState("");
  const [content, setContent] = useState("");
  const [justification, setJustification] = useState("");
  const [startDate, setStartDate] = useState(null);

  const navigate = useNavigate();


  const formattedDate = startDate?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const openModal = () => {
    props.setIsOpen(true);
  };
  const closeModal = () => {
    props.setIsOpen(false);
  };
  const savePDF = () => {
    props.formData.extra.content = content;
    props.formData.extra.name_org = textfactory;
    props.formData.extra.dt_start = formattedDate;
    props.formData.extra.duration=parseInt(textDayCount);
    props.formData.extra.reason = justification;
    props.formData.name = props.captionRequest;
    signsStore.createSign(props.formData);
    navigate(APPRoute.MAIN);
  };
  return (
    <div>
      {props.visible && <div>
        {props.captionRequest === "Заявка на информационный обмен" && (
          <div className="text-field">
            <input
              className="text-field__input"
              type="text"
              value={textfactory}
              onChange={(e) => setTextfactory(e.target.value)}
              placeholder="Адрес организации"
            />
            <input
              className="text-field__input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Содержание"
            />
            <input
              className="text-field__input"
              type="text"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Обоснование"
            />
          </div>
        )}
        {props.captionRequest ===
          "Заявка для направления в командировку/для направления в служебную поездку" && (
            <div className="text-field">
              <input
                className="text-field__input"
                type="text"
                value={textfactory}
                onChange={(e) => setTextfactory(e.target.value)}
                placeholder="Адрес организации"
              />
              <DatePicker
                className="text-field__input"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Выберите дату"
              />
              <input
                className="text-field__input"
                type="text"
                value={textDayCount}
                onChange={(e) => setTextDayCount(e.target.value)}
                placeholder="Количество дней"
              />

              <input
                className="text-field__input"
                type="text"
                value={texttarget}
                onChange={(e) => setTexttarget(e.target.value)}
                placeholder="Цель поездки"
              />
            </div>
          )}
        {props.captionRequest === "Заявка на предоставление отпуска" && (
          <div className="text-field">
            <DatePicker
              className="text-field__input"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Выберите дату"
            />
            <input
              className="text-field__input"
              type="text"
              value={textDayCount}
              onChange={(e) => setTextDayCount(e.target.value)}
              placeholder="Количество дней"
            />
          </div>
        )}
        {props.captionRequest === "Заявление на увольнение" && (
          <div className="text-field">
            <DatePicker
              className="text-field__input"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Выберите дату"
            />
            <input
              className="text-field__input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Содержание"
            />
          </div>
        )}
      </div>}

      {props.visible && <div className="button-container">
        <button className="btn" onClick={savePDF}>
          Сохранить
        </button>
        <button className="btn" onClick={openModal}>
          Предосмотр
        </button>
      </div>}

      <div className="pdf-container">
        <Modal
          isOpen={props.isOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            },
            content: {
              width: "90%",
              maxWidth: "800px",
              margin: "auto",
              padding: 0,
              border: "none",
              borderRadius: 0,
              background: "transparent",
              overflow: "hidden",
            },
          }}
        >
          <div className="modal-content">
            <PDFViewer width={700} height={700}>
              <Document>
                <Page size="A4">
                  <View style="container">
                    {props.captionRequest ===
                      "Заявка на информационный обмен" && (
                        <InfoExchangeBlock
                          cheif={props.chief}
                          textfactory={textfactory}
                          textinput={textinput}
                          content={content}
                          justification={justification}
                          userName={props.userName}
                        />
                      )}

                    {props.captionRequest ===
                      "Заявка для направления в командировку/для направления в служебную поездку" && (
                        <BusinessTripBlock
                          cheif={props.chief}
                          captionFactory={props.captionFactory}
                          userName={props.userName}
                          textinput={textinput}
                          startDate={startDate}
                          textDayCount={textDayCount}
                          texttarget={texttarget}
                        />
                      )}
                    {props.captionRequest ===
                      "Заявка на предоставление отпуска" && (
                        <VacationBlock
                          cheif={props.chief}
                          startDate={startDate}
                          userName={props.userName}
                          textDayCount={textDayCount}
                        />
                      )}
                    {props.captionRequest === "Заявление на увольнение" && (
                      <ResignationBlock
                        cheif={props.chief}
                        startDate={startDate}
                        userName={props.userName}
                        content={content}
                      />
                    )}
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NewPDF;
