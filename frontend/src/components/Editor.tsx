import React, { useMemo } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-terminal";

interface IProps {
  code: string;
  setCode: (code: string) => void;
  language: "c" | "c++" | "javascript" | "python";
}

const Editor = ({ language, code, setCode }: IProps) => {
  //dynamic import for the language selected, so other language don't have overlapped syntax/ snippets
  useMemo(() => {
    if (language === "c" || language === "c++") {
      import("ace-builds/src-noconflict/mode-c_cpp");
    }

    if (language === "javascript") {
      import("ace-builds/src-noconflict/mode-javascript");
    }

    if (language === "python") {
      import("ace-builds/src-noconflict/mode-python");
    }
  }, [language]);

  return (
    <>
    <div id="blah2"></div>
    <AceEditor
      placeholder="Placeholder Text"
      mode={language === "c" || language === "c++" ? "c_cpp" : language}
      theme="terminal"
      name="blah2"
      onChange={setCode}
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={code}
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
    </>
  );
};

export default Editor;
