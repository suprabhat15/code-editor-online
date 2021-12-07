import React, { useMemo, useState } from "react";
import { Flex } from "@chakra-ui/layout";
import Output from "../components/Output";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import crypto from "crypto";

const Home = () => {
  const [language, setLanguage] = useState<
    "c" | "c++" | "javascript" | "python"
  >("c");

  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    const formData = {
      language,
      code,
    };

    setLoading(true);

    let requestId = localStorage.getItem("requestId");

    if (!requestId) {
      requestId = crypto.randomBytes(6).toString("hex");

      localStorage.setItem("requestId", requestId);
    }

    await axios.post(
      process.env.REACT_APP_API_URL + `/api/generateCode/${requestId}`,
      formData
    );

    getOutput();
  };

  const getOutput = async () => {
    setLoading(true);
    let requestId = localStorage.getItem("requestId");

    if (!requestId) {
      requestId = crypto.randomBytes(6).toString("hex");

      localStorage.setItem("requestId", requestId);
    }

    setTimeout(async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/output/${requestId}`
      );

      setOutput(response.data);
      setLoading(false);
    }, 1000);
  }

  const clearOutput = () => {
    setOutput("");
  };

  useMemo(() => {
    if (language === "c") {
      setCode(`#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello world");

    return 0;
}`);
    }

    if (language === "javascript") {
      setCode(`console.log("Welcome Developers");`);
    }

    if (language === "python") {
      setCode(`print("Hello world")`);
    }

    if (language === "c++") {
      setCode(`#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "Hello world!";

    return 0;
}`);
    }
  }, [language]);

  return (
    <Flex w="full" h="100vh">
      <CodeEditor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        runCode={runCode}
        loading={loading}
      />
      <Output output={output} clearOutput={clearOutput} getOutput={getOutput} loading={loading} />
    </Flex>
  );
};

export default Home;
