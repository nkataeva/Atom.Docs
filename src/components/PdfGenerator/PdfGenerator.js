import React ,{ useState } from "react";
import './PdfGenerator.css'
import NewPDF from "../NewPDF/NewPDF"; 

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
      {
        captionRequest: 'Заявление на увольнение',
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