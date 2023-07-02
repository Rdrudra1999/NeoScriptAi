'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

const BlogGenerator = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [customPrompt, setCustomPrompt] = useState('');
    const [generatedBlog, setGeneratedBlog] = useState('');

    const generatedBlogs = async () => {
        const prompt = `**Title:** ${title}\n**Category:** ${category}\n**Author:** ${author}\n**Content:** ${content}\n**Custom Prompt:** ${customPrompt}`;

        try {
            const configuration = new Configuration({
                apiKey: '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',
            });

            let convo = [
                {
                    role: 'system',
                    content: 'You are a virtual assistant for content creation. You will be provided with some pointers based on which you need to create a blog article body.',
                },
                {
                    role: 'user',
                    content: `Create a blog article for me based on these parameters: 
            - Topic: ${title}
            - Category: ${category}
            ${customPrompt}`,
                },
            ];

            const openai = new OpenAIApi(configuration);
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: convo,
            });

            const generatedContent = completion.data.choices[0].message.content;
            setGeneratedBlog(generatedContent);
        } catch (error) {
            console.error('Error generating blogs:', error);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Blog Generator</h2>
            <div className="space-y-4">
                <label htmlFor="title" className="font-bold">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered"
                />

                <label htmlFor="category" className="font-bold">
                    Category:
                </label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input input-bordered"
                />

                <label htmlFor="author" className="font-bold">
                    Author:
                </label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input input-bordered"
                />

                <label htmlFor="content" className="font-bold">
                    Content:
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="input input-bordered"
                ></textarea>

                <label htmlFor="customPrompt" className="font-bold">
                    Custom Prompt:
                </label>
                <input
                    type="text"
                    id="customPrompt"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="input input-bordered"
                />

                <button onClick={generatedBlogs} className="btn btn-primary btn-sm">
                    Generate
                </button>
            </div>

            {generatedBlog && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Generated Blog:</h3>
                    <pre className="prose">{generatedBlog}</pre>
                </div>
            )}
        </div>
    );
};

export default BlogGenerator;
