import { CreatePDF } from "../application/CreatePDF";
import PdfGenerator from "../pdf/newPdf";

const Creature = () => {
  return (
    <div>
      {/* <Link to='/creature' activeStyle></Link>
            <h1>Creature page</h1> */}
      {/* <CreatePDF /> */}
      <PdfGenerator />
    </div>
  );
};

export default Creature;
