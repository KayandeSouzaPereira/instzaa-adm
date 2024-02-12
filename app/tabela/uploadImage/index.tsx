import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  width: 150,
  height: 150,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};





export default function Previews({img}) {
  const [files, setFiles] = useState([]);
  const [ret, setRet] = useState("");
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  useEffect(() => {
    img = ret;
  },[ret])

  useEffect(() => {
    const bs64 = convertToBase64(files[0]);
    if (bs64 != undefined){
      bs64.then(
        function (value) {
          setRet(value) // Success!
        },
        function (reason) {
          console.log(reason); // Error!
        },)
      
    }
  },[files])

  function convertToBase64 (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
        localStorage.setItem('base64', fileReader.result);
        return fileReader.result;
      };
      fileReader.onerror = (error) => {
        console.log(error)
        reject(error);
      };
    });
  };
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    console.log(img)
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        { files.length > 0?
        <></>
        :
        <p>Arraste ou Click para adicionar uma Imagem</p>
        }
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

<Previews />