import React from "react";
import { Button, Flex, Text, Spinner } from "@chakra-ui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-tomorrow";

interface IProps {
  output: string;
  clearOutput: () => void;
  loading: boolean;
  getOutput: () => void;
}

const Output = ({ output, clearOutput, loading, getOutput }: IProps) => {

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
        <Text>Output</Text>
        <Flex>
        <Button onClick={getOutput} mr="3" isLoading={loading}>
          Refresh
        </Button>
        <Button onClick={clearOutput} colorScheme="red">
          Clear
        </Button>
        </Flex>
      </Flex>
      <Flex w="full" h="full" bg="whitesmoke">
        {loading ? <Spinner/>: <AceEditor
          placeholder="Write and run the program to show output"
          theme="tomorrow"
          fontSize={20}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={false}
          value={output}
          readOnly={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
        }
        
      </Flex>
    </Flex>
  );
};

export default Output;
