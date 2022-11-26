import { useState } from 'react';
import './App.css';
import { uppercaseLetters, lowercaseLetters, numbers, special } from './data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(4);
  const [isuppercase, setIsUppercase] = useState(false);
  const [islowercase, setIsLowercase] = useState(false);
  const [isnumber, setIsNumber] = useState(false);
  const [issymbol, setIsSymbol] = useState(false);

  //Generate Password
  const generatePassword = (e) => {
    e.preventDefault();
    let password = "";

    if(!isuppercase && !islowercase && !isnumber && !issymbol) {
      toast.error("Please select at least one option.!!", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    for (let i = 0; i < counter; i++) {
      password += getRandomPass();
    }

    setPassword(password);

  }

  
  //Get Random Password
  const getRandomPass = () => {
    const chars = [];

    if (isuppercase) {
      chars.push(
        uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]
      );
    }

    if (islowercase) {
      chars.push(
        lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]
      );
    }

    if (isnumber) {
      chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }

    if (issymbol) {
      chars.push(special[Math.floor(Math.random() * special.length)]);
    }

    if (chars.length === 0) return "";

    return chars[Math.floor(Math.random() * chars.length)];
  };

  //Increase Counter
  const increaseCounter = (e) => {
    e.preventDefault();

    if (counter < 12) {
      setCounter((prevCounter) => prevCounter + 1);
    }
  };

  //Decrease Counter
  const decreaseCounter = (e) => {
    e.preventDefault();

    if (counter > 4) {
      setCounter((prevCounter) => prevCounter - 1);
    }
  };

  //Copy Password to Clipboard
  const createCopy = () => {
    const textAreaEl = document.createElement("textarea");
    textAreaEl.innerText = password;
    document.body.appendChild(textAreaEl);
    textAreaEl.select();
    document.execCommand("copy");
    textAreaEl.remove();
  };

  //Show Error Message if no Password is Generated
  const copyPasswordHandler = (e) => {
    e.preventDefault();

    if (password.trim().length === 0) {
      toast.error("Password cannot be empty",{
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Copied to clipboard successfully.!!",{
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      createCopy();
    }

    createCopy();
  };

  return (
    <>
      <div className="App">
        <div className='generator'>
          <h2 className='generatorTitle'>Random Password Generator</h2>
          <h4 className='password'>{password}</h4>

          <form className='generatorForm'>
            <div className='generatorFormControls'>
              <div className='generatorFormControl'>
                <label htmlFor='uppercase'>Uppercase</label>
                <input checked={isuppercase} onChange={(e) => { setIsUppercase(e.target.checked) }} type='checkbox' name='uppercase' id='uppercase' />
              </div>

              <div className='generatorFormControl'>
                <label htmlFor='lowercase'>Lowercase</label>
                <input checked={islowercase} onChange={(e) => { setIsLowercase(e.target.checked) }} type='checkbox' name='lowercase' id='lowercase' />
              </div>

              <div className='generatorFormControl'>
                <label htmlFor='numbers'>Numbers</label>
                <input checked={isnumber} onChange={(e) => { setIsNumber(e.target.checked) }} type='checkbox' name='numbers' id='numbers' />
              </div>


              <div className='generatorFormControl'>
                <label htmlFor='symbols'>Symbols</label>
                <input checked={issymbol}
                  onChange={(e) => { setIsSymbol(e.target.checked) }} type='checkbox' name='symbols' id='symbols' />
              </div>

              <div className='passwordLength'>
                <h4 className='passwordLengthTitle'>Password Length</h4>
                <div className='passwordLengthCounter'>
                  <button onClick={decreaseCounter}>-</button>
                  <span>{counter}</span>
                  <button onClick={increaseCounter}>+</button>
                </div>
              </div>

              <div className='generatorFormAction'>
                <button onClick={generatePassword} className='btn generateBtn'>Generate Password</button>
                <button onClick={copyPasswordHandler} className='btn copyBtn'>Copy Password</button>

              </div>

            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
