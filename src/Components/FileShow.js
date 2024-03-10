import React, { useEffect, useState } from 'react';

const FileShow = ({ content,isOpen }) => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(content.download_url,
        )
        if (!response.ok) {
          throw new Error(`Failed to fetch file content: ${response.status} ${response.statusText}`);
        }

        const fetchedContent = await response.text();

        // Check if the content is encoded in base64
        if (content.encoding === 'base64') {
          const decodedContent = atob(fetchedContent);
          setFileContent(decodedContent);
        } else {
          setFileContent(fetchedContent);
        }
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    };

    fetchData();
  }, [content.download_url, content.encoding]);

  return (
    <div style={{display:(isOpen)?'block':'none'}}>
      {
      fileContent ? (
        <pre style={{position:'absolute',top:"214px",left:"712px",border:"2px solid",width:'48%',minHeight:'400px',padding:"20px 20px 20px 20px"}}>{fileContent}</pre>):''
      }
    </div>
  );
};

export default FileShow;

