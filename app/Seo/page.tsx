"use client"
import React, { useState } from 'react';
import Github from '../../components/Github';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const { Configuration, OpenAIApi } = require('openai');

const SEOMetaTagsGenerator = () => {
  const [pageTitle, setPageTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedMetaTags, setGeneratedMetaTags] = useState<string[]>([]);
  const [previousMetaTags, setPreviousMetaTags] = useState('');

  const generateMetaTags = async () => {
    if (!pageTitle) return; // Don't generate if page title is empty

    const prompt = `Generate SEO meta tags for page with title: ${pageTitle}`;

    try {
      setLoading(true);

      const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const metaTags = response.data.choices[0].text.trim();
      console.log(metaTags); // The generated meta tags

      const updatedMetaTags = [...generatedMetaTags, metaTags];
      setGeneratedMetaTags(updatedMetaTags); // Update the generated meta tags array
      setPreviousMetaTags(metaTags); // Store the previous meta tags
      setLoading(false);
    } catch (error) {
      console.error('Error generating meta tags:', error);
      setLoading(false);
    }
  };

  const deleteMetaTag = ({ index }: any) => {
    const updatedMetaTags = [...generatedMetaTags];
    updatedMetaTags.splice(index, 1);
    setGeneratedMetaTags(updatedMetaTags);
  };

  const handleCopy = (metaTags: string) => {
    navigator.clipboard.writeText(metaTags);
    // react toastify
    toast('🦄 copied!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
      <a
        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
        href="https://github.com/Rdrudra99"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
        <p>Star on GitHub</p>
      </a>
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
        Generate SEO Meta Tags for your Website
      </h1>
      <p className="text-slate-500 mt-5">47,118 meta tags generated so far.</p>
      <div className="max-w-xl w-full">
        <div className="flex mt-10 items-center space-x-3">
          <Image
            src="https://github.com/Nutlope/twitterbio/blob/main/public/1-black.png?raw=true"
            width={30}
            height={30}
            alt="1 icon"
            className="mb-5 sm:mb-0"
          />
          <p className="text-left font-medium">
            Enter the Page Title for which you want to generate meta tags
          </p>
        </div>
        <textarea
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          rows={2}
          className="w-full rounded-md shadow-sm focus:border-black focus:ring-black my-5 textarea textarea-bordered textarea-info"
          placeholder="e.g. My Website | Home"
        />
      </div>
      <div className="flex mb-5 items-center space-x-3">
        <Image
          src="https://github.com/Nutlope/twitterbio/blob/main/public/2-black.png?raw=true"
          width={30}
          height={30}
          alt="1 icon"
        />
        <p className="text-left font-medium">Copy Your Generated Meta Tags.</p>
      </div>
      <div className="flex mt-5 items-center space-x-3">
        {loading ? (
          <button className="btn">
            <span className="loading loading-spinner"></span>
            Loading
          </button>
        ) : (
          <button
            className="group flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
            onClick={generateMetaTags}
          >
            Generate
            <BsArrowRight className="text-white ml-2" />
          </button>
        )}
      </div>
      {generatedMetaTags.length > 0 && (
        <>
          <div className="py-5">
            <h2 className="sm:text-2xl text-xl font-bold text-slate-900 mx-auto">Generated Meta Tags</h2>
          </div>
          <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto bg-white text-black">
            {generatedMetaTags.map((metaTags, index) => (
              <div
                className="relative rounded-xl shadow-md p-4 transition cursor-copy border mockup-code flex justify-between items-center"
                key={index}
                onClick={() => handleCopy(metaTags)}
              >
                <MdDeleteForever
                  className="text-red-400 cursor-pointer hover:text-red-500 text-2xl absolute top-2 right-2"
                  onClick={() => deleteMetaTag(index)}
                />
                <p className="text-start font-mono text-sm">{metaTags}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default SEOMetaTagsGenerator;
 