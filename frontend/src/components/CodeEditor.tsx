import { Flex } from "@chakra-ui/layout";
import { Select, Button } from "@chakra-ui/react";
import React from "react";
import Editor from "./Editor";

interface IProps {
  language: "c" | "c++" | "javascript" | "python";
  setLanguage: (language: "c" | "c++" | "javascript" | "python") => void;
  code: string;
  setCode: (code: string) => void;
  runCode: () => void;
  loading: boolean;
}

const CodeEditor = ({
  language,
  setLanguage,
  code,
  setCode,
  runCode,
  loading,
}: IProps) => {
  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === "c" ||
      e.target.value === "c++" ||
      e.target.value === "javascript" ||
      e.target.value === "python"
    ) {
      return setLanguage(e.target.value);
    }

    return false;
  };

  return (
    <Flex
      w="full"
      h="full"
      flexDir="column"
      borderWidth="1px"
      borderColor="#D3DCE6"
    >
      <Flex
        h="60px"
        p="3"
        borderBottomWidth="1px"
        borderBottomColor="#D3DCE6"
        align="center"
        w="full"
        justify="space-between"
      >
        <Flex>
          <Select
            placeholder="Select language"
            value={language}
            onChange={onLanguageChange}
          >
            <option value="c">C</option>
            <option value="c++">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </Select>
        </Flex>
        <Button colorScheme="blue" onClick={runCode} isLoading={loading}>
          Run
        </Button>
      </Flex>
      <Flex w="full" h="full">
        <Editor language={language} code={code} setCode={setCode} />
      </Flex>
    </Flex>
  );
};

export default CodeEditor;
