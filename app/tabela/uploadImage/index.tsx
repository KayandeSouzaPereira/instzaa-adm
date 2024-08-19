import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 5
};

const thumb = {
  display: 'flex',
  borderRadius: 30,
  border: '0,3px solid #eaeaea',
  width: 150,
  height: 150,
  padding: 1,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};


const imgS = {
  display: 'block',
  width: 'auto',
  height: '100%'
};





export default function Previews({img}) {
  
  const [files, setFiles] = useState([]);
  const [ret, setRet] = useState("");
  const [pedido, setPedido] = useState(false);
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
    if(img.value){
      const imgs = [img]
      setFiles(imgs);
    }
    if(img && img.value == undefined && img.name != "imagem"){
      setPedido(true);
      let ig = {
        name: "capa",
        value: img
      }
      const imgs = [ig]
      setFiles(imgs)
    }
  },[])

  useEffect(() => {
    img = ret;
  },[ret])


  useEffect(() => {
    if(files[0] != undefined){
    const bs64 = convertToBase64(files[0]);
    if (bs64 != undefined){
      bs64.then(
        function (value) {
          setRet(value) 
        },
        function (reason) {
        },)
      
    }}
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
        reject(error);
      };
    });
  };
  
  const thumbs = files.map(file => (
    <div rounded>
      <div class="rounded" style={thumb} key={file.name}>
        <div class="rounded" style={thumbInner}>
          { file.preview?
          <img
          class="rounded"
          src={file.preview}
          style={imgS}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
        :
        <img
            src={file.value}
            style={imgS}
            onLoad={() => { URL.revokeObjectURL(file.value) }}
          />

          }
          <Button class="absolute bottom-12 hover:bg-cyan-600 bg-zinc-950 content-center rounded h-[30px] w-[150px]" onClick={() => {setFiles([]);}} variant="outline" size="icon"><TrashIcon className="relative left-[65px] h-6 w-6"/></Button>
        </div>
        
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        { files.length > 0 || pedido == true ?
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