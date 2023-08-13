import React ,{ useState ,useEffect} from "react";
import './PdfGenerator.scss'
import NewPDF from "../NewPDF/NewPDF";
import Select from 'react-select';
import userStore from "../../../stores/UserStore";

const PdfGenerator = ({ obj }) => {
    const { getAllUser,user,users } = userStore;
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

    const options = users.length > 0 ? users.map(user => ({ value: user.id, label: user.fio })) : [];
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        getAllUser();
    }, [getAllUser]);
    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption);
    };

    return (
        <div className="pdf-generator-container">
            <div className="form-select">
                <select value={selectedForm.captionRequest} onChange={handleFormChange}>
                    {typeTemplate.map((form) => (
                        <option key={form.captionRequest} value={form.captionRequest}>
                            {form.captionRequest}
                        </option>
                    ))}
                </select>
            </div>
            <div className="user-select">
                <Select
                    options={options}
                    value={selectedUser}
                    onChange={handleUserChange}
                    placeholder="Выберите пользователя"
                />
            </div>
            <div className="pdf-preview">
                <NewPDF
                    captionRequest={selectedForm.captionRequest}
                    userName={user? user.label : ""}
                    chief={selectedUser ? selectedUser.label : ""}
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