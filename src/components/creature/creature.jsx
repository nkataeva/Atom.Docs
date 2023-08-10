import { CreatePDF } from "../application/CreatePDF";
import PdfGenerator from "../pdf/newPdf";

const Creature = () => {
  const data = [
    {
      userName: "John",
      chief: "Michael",
      captionFactory: "Manager",
      content: "Lorem ipsum dolor sit amet",
      justification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      status: "Active"
    },
    {
      userName: "Jane",
      chief: "Michael",
      captionFactory: "Developer",
      content: "Lorem ipsum dolor sit amet",
      justification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      status: "Active"
    },
    {
      userName: "Alice",
      chief: "John",
      captionFactory: "Designer",
      content: "Lorem ipsum dolor sit amet",
      justification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      status: "Inactive"
    },
    // добавьте еще объекты по аналогии
  ];

  
const randomObject = data[0];

console.log("in Creature "+randomObject)
  return (
    <div>
      {/* <Link to='/creature' activeStyle></Link>
            <h1>Creature page</h1> */}
      {/* <CreatePDF /> */}
      <PdfGenerator 
                      obj={randomObject}//от кого
                      
    />
    </div>
  );
};

export default Creature;
