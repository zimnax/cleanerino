import { useEffect, useState } from "react";
import axios from "axios";
const Test = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileT, setSelectedFileT] = useState(null);

  // Обробник зміни вибраного файлу
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileChangetwo = (event) => {
    setSelectedFileT(event.target.files[0]);
  };

  // Обробник відправки файлу на сервер
  const handleSubmit = async () => {
    try {
      let url;
      console.log(selectedFile);
      if (selectedFile) {
        // Відправка файлу на сервер
        const fileFormData = new FormData();
        fileFormData.append("file", selectedFile);

        const fileResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/file/${1}`, // URL для завантаження файлу
          { selectedFile, selectedFileT },
          {
            headers: {
              "Content-Type": selectedFile.type,
            },
          }
        );
        // Отримання URL завантаженого файлу
        url = fileResponse.data.url;
      }
    } catch {
      console.log("erora");
    }
  };

  return (
    <div>
      <h2>Тестувальна компонента</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="file" onChange={handleFileChangetwo} />
      <button onClick={handleSubmit}>Відправити</button>
    </div>
  );
};

export default Test;
