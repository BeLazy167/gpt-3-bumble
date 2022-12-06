import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
    const [userInput, setUserInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [apiOutput, setApiOutput] = useState("");
    const callGenerateEndpoint = async () => {
        setIsGenerating(true);
        const response = await fetch("/api/hello", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
            cors: "no-cors",
        });
        const { output } = await response.json();
        setApiOutput(output.text);
        setIsGenerating(false);
    };
    const onUserChangedText = (e) => {
        setUserInput(e.target.value);
    };
    return (
        <div className="root">
            <Head>
                <title>Bumble Reply | Dhruv Khara</title>
            </Head>
            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <h1>How to reply to Bumble message ...</h1>
                    </div>
                    <div className="header-subtitle">
                        <h2>insert your message that you want to reply here</h2>
                    </div>
                </div>
                <div className="prompt-container">
                    <textarea
                        placeholder="start typing here"
                        className="prompt-box"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    <div className="prompt-buttons">
                        <a
                            className={
                                isGenerating
                                    ? "generate-button loading"
                                    : "generate-button"
                            }
                            onClick={callGenerateEndpoint}
                        >
                            <div className="generate">
                                {isGenerating ? (
                                    <span className="loader"></span>
                                ) : (
                                    <p>Generate</p>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {apiOutput && (
                <div className="output">
                    <div className="output-content">
                        <p>{apiOutput}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
