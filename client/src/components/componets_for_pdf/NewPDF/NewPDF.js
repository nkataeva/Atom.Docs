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
// import RobotoRegular from "../../fonts/Roboto-Regular.ttf";
import YsabeauSCRegular from "../../../fonts/YsabeauSC/YsabeauSC-Regular.ttf";
import "./NewPDF.scss";
import ResignationBlock from "../ResignationBlock/ResignationBlock";
import VacationBlock from "../VacationBlock/VacationBlock";
import BusinessTripBlock from "../BusinessTripBlock/BusinessTripBlock";
import InfoExchangeBlock from "../InfoExchangeBlock/InfoExchangeBlock";
import Modal from "react-modal";

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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const savePDF = () => {};
  return (
    <div>
      <div>
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
              value={textinput}
              onChange={(e) => setTextinput(e.target.value)}
              placeholder="Тезисы"
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
            <input
              className="text-field__input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Содержание"
            />
          </div>
        )}
      </div>
      <div className="pdf-container">
        <div className="button-container">
          <button className="btn" onClick={savePDF}>
            Сохранить
          </button>
          <button className="btn" onClick={openModal}>
            Предосмотр
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 1000,
            },
            content: {
              width: "600px",
              height: "400px",
              margin: "auto",
            },
          }}
        >
          <PDFViewer width={580} height={300}>
            <Document>
              <Page size="A4">
                <View style="container">
                  {props.captionRequest ===
                    "Заявка на информационный обмен" && (
                    <InfoExchangeBlock
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
                      captionFactory={props.captionFactory}
                      userName={props.userName}
                      textinput={textinput}
                      textDayCount={textDayCount}
                      texttarget={texttarget}
                    />
                  )}
                  {props.captionRequest ===
                    "Заявка на предоставление отпуска" && (
                    <VacationBlock
                      userName={props.userName}
                      textDayCount={textDayCount}
                    />
                  )}
                  {props.captionRequest === "Заявление на увольнение" && (
                    <ResignationBlock
                      userName={props.userName}
                      content={content}
                    />
                  )}
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Modal>
      </div>
    </div>
  );
};

export default NewPDF;
