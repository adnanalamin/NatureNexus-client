import { useState } from "react";


const AddedPackage = () => {
    const [inputs, setInputs] = useState([{ userInput: '', messageBox: '' }]);

  const handleAddMore = () => {
    setInputs([...inputs, { userInput: '', messageBox: '' }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    
    console.log('Form submitted:', inputs);
    // You can send the data to a backend server or process it further here
  };
    return (
        <div>
            <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            type="text"
            name="userInput"
            value={input.userInput}
            onChange={(event) => handleChange(index, event)}
          />
          <textarea
            name="messageBox"
            rows="4"
            cols="50"
            value={input.messageBox}
            onChange={(event) => handleChange(index, event)}
          ></textarea>
        </div>
      ))}
      <button onClick={handleAddMore}>Add more</button>
      <button>submit</button>
    </form>
        </div>
    );
};

export default AddedPackage;