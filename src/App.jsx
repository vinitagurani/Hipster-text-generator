import React, { useEffect, useState } from 'react'
import './App.css';
import './index.css';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
const App = () => {
  const [params, setParams] = useState({
    type: "hipster-centric",
    paras: 3,
    sentences: 0,
    startsWithLorem: false,
  })
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSampleText = async () => {
      setLoading(true);
      const response = await axios.get('http://hipsum.co/api/', {
        params: {
          type: params.type,
          paras: params.paras || undefined,
          sentences: params.sentences || undefined,
          'starts-with-lorem': params.startsWithLorem ? 1 : undefined
        }
      })
      const formattedText = Array.isArray(response.data) ? response.data.join('\n\n') : response.data;
      console.log("API reponse:", response.data);
      setText(formattedText);
      console.log("Formatted text is", formattedText);
      setLoading(false);
    }
    getSampleText();
  }, [params])
  const handleParamChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  return (
    <div className='w-full'>
      <h1 className='bg-gray-800 text-center font-bold text-2xl p-4 text-white'>
        Text Generator
      </h1>
      <div>
        <div className='mt-5'>
          <label className='p-3'>
            <span className='font-semibold text-xl mr-3'>Text Type:</span>
            <select name="type" className='w-1/2 p-3 focus:outline-none border border-gray-300' onChange={handleParamChange} value={params.type}>
              <option value="hipster-centric">
                Hipster Centric
              </option>
              <option value="hipster-latin">
                Hipster Latin
              </option>
            </select>
          </label>
        </div>
        <div className='p-3 flex md:flex-row flex-col gap-3'>
          <label>
            <span className='font-semibold text-xl mr-3'>Paragraphs:</span>
            <input type="number" name='paras' min={1} max={10} value={params.paras} className='mr-3 focus:outline-none border border-gray-300 text-center' onChange={handleParamChange} />
          </label>
          <label>
            <span className='font-semibold text-xl mr-3'>Sentences:</span>
            <input type="number" min={1} max={50} value={params.sentences} name='sentences' className='mr-3 focus:outline-none border border-gray-300 text-center' onChange={handleParamChange} />
          </label>
          <label className='flex items-center'>
            <span className='font-semibold text-xl mr-3'>Starts with lorem:</span>
            <input type="checkbox" value={params.startsWithLorem} name='startsWithLorem' className='w-5 h-5' onChange={handleParamChange} />
          </label>
        </div>
      </div>

      {!loading &&
        <div className='p-3 container'>
          {text}
        </div>
      }
      {loading &&
        <div className='flex items-center justify-center'>
          <FaSpinner className='animate-spin text-blue-500 text-5xl'/>
        </div>
      }
    </div>
  )
}

export default App