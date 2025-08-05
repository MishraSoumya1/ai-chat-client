import { useState } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // <-- ADD THIS
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./style.css";

const MarkdownRenderer = ({ content }) => {
  const [copiedLine, setCopiedLine] = useState(null);

  const handleCopy = (code) => {
    setCopiedLine(code);
    setTimeout(() => setCopiedLine(null), 5000);
  };

  return (
    <Markdown
      rehypePlugins={[rehypeRaw]} // <-- ADD THIS
      components={{
        code({  inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const codeString = String(children).trim();

          return !inline && match ? (
            <div className="code-block">
              <CopyToClipboard text={codeString} onCopy={() => handleCopy(codeString)}>
                <button className="copy-button">
                  {copiedLine === codeString ? 'Copied!' : 'Copy'}
                </button>
              </CopyToClipboard>
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
