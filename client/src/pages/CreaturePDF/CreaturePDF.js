import { useEffect } from "react";
import PDFGenerator from "../../components/componets_for_pdf/PdfGenerator/PdfGenerator";
import "./CreaturePDF.scss";
import userStore from "../../stores/UserStore";

const CreaturePDF = () => {
  const { getAllUser } = userStore;
  const data = [
    {
      userName: "John",
      chief: "Michael",
      captionFactory: "Manager",
      content: "Lorem ipsum dolor sit amet",
      justification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      status: "Active",
    },
    {
      userName: "Jane",
      chief: "Michael",
      captionFactory: "Developer",
      content: "Lorem ipsum dolor sit amet",
      justification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      status: "Active",
    },
    {
      userName: "Alice",
      chief: "John",
      captionFactory: "Designer",
      content: "Lorem ipsum dolor sit amet",
      justification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      status: "Inactive",
    },
    // добавьте еще объекты по аналогии
  ];

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomObject = data[randomIndex];

  return (
    <div className="creature-pdf-container">
      <div className="pdf-generator">
        <h1 className="pdf-title">Сгенерированное заявление</h1>
        <PDFGenerator obj={randomObject} />
        <button className="pdf-button">Сгенерировать новое</button>
      </div>
    </div>
  );
};

export default CreaturePDF;
