import PDFGenerator from "../../components/componets_for_pdf/PdfGenerator/PdfGenerator";
import style from "./CreaturePDF.module.scss";

const CreaturePDF = () => {
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

  const randomIndex = Math.floor(Math.random() * data.length);
  const randomObject = data[randomIndex];

  return (
    <div className={style.container}>
      <h1 className={style.title}>Создание заявки</h1>
      <PDFGenerator obj={randomObject} />
    </div>
  );
};

export default CreaturePDF;
