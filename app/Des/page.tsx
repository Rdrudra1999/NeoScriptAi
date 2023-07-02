"use client"
import React, { useState } from 'react';
import Github from '../../components/Github';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
const { Configuration, OpenAIApi } = require('openai');
import {TbClipboardHeart } from 'react-icons/tb'; // Import the copy icon
import { toast } from 'react-toastify';
const ProductDescriptionGenerator = () => {
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedDescriptions, setGeneratedDescriptions] = useState<string[]>([]);
  const [previousDescription, setPreviousDescription] = useState('');
  const [previousProductName, setPreviousProductName] = useState('');

  const logoGradient = "bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 ";
  const secondaryGradient = "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 ";
  const tertiaryGradient = "bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 ";



  const generateDescription = async () => {
    if (!productName) return; // Don't generate if product name is empty

    const prompt = `Generate a product description between 20-30 words based on the following: ${productName}. This product is a [description of features/benefits/target audience/unique selling point].`;

    try {
      setLoading(true);

      const temperature = 0.8; // Experiment with different values
      const topP = 0.9; // Experiment with different values

      const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: temperature,
        max_tokens: 256,
        top_p: topP,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const descriptions = response.data.choices.map((choice: { text: string; }) => choice.text.trim());
      const bestDescription = descriptions[0]; // Choose the first description as the best for now
      console.log(bestDescription); // The generated product description
      
      const updatedDescriptions = [...generatedDescriptions, bestDescription];
      setGeneratedDescriptions(updatedDescriptions); // Update the generated descriptions array
      setPreviousDescription(bestDescription); // Store the previous description
      setPreviousProductName(productName); // Store the previous product name
      setLoading(false);
    } catch (error) {
      console.error('Error generating product descriptions:', error);
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
      <a
        className={`flex max-w-fit items-center justify-center space-x-2 rounded-full border px-4 py-2 text-sm text-black shadow-md mb-5 ${tertiaryGradient}`}
        href="https://github.com/Rdrudra99"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
        <p>Star on GitHub</p>
      </a>
      <h2 className="text-5xl font-bold">
        <span className={`${tertiaryGradient} text-transparent bg-clip-text`}>
          Generate your product description in seconds
        </span>
      </h2>
      <p className="text-slate-500 mt-5">47,118 products generated so far.</p>
      <div className="max-w-xl w-full">
        <div className="flex mt-10 items-center space-x-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
            1
          </div>
          <p className="text-left font-medium">
            Enter Your product Name{' '}
            <span className="text-slate-500">(or write a few sentences about your product)</span>
          </p>
        </div>
        <textarea
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          rows={2}
          className="w-full rounded-md shadow-sm text-lg focus:border-black focus:ring-black my-5 textarea textarea-bordered textarea-info"
          placeholder="e.g EpicXcelence Pro"
        />
      </div>
      <div className="flex mb-5 items-center space-x-3">
        <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
          2
        </div>
        <p className="text-left font-medium">Copy Your Product Description.</p>
      </div>
      <div className="flex mt-5 items-center space-x-3">
        {loading ? (
          <button className={`btn ${tertiaryGradient} text-black`}>
            <span className="loading loading-spinner text-black"></span>
            Generating...
          </button>
        ) : (
          <button
            className={`group flex w-44 cursor-pointer select-none items-center justify-center rounded-md px-6 py-2 text-black transition ${tertiaryGradient} `}
            onClick={generateDescription}
          >
            Generate
            <BsArrowRight className="text-white ml-2" />
          </button>
        )}
      </div>
      {generatedDescriptions.length > 0 && (
        <>
          <div className="py-5">
            {/* <h2 className="tertiaryGradient sm:text-2xl text-xl font-bold text-white mx-auto">
              Description
            </h2> */}
          </div>
          <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
            {generatedDescriptions.map((description, index) => (
              <div
                className="text-black bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                onClick={() => {
                  navigator.clipboard.writeText(description);
                  toast.success('Copied to clipboard!');
                }}
                key={index}
              >
                <div className="flex items-center justify-between">
                  <p className="text-md font-semibold tracking-wide uppercase truncate">{productName}</p>
                  <TbClipboardHeart className="text-black text-2xl cursor-pointer " />
                </div>
                <hr className="my-3" />
                <p className="text-start font-mono text-sm">{description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default ProductDescriptionGenerator;
