import React,{useEffect,useRef,useState} from 'react'
import Head from 'next/head'
import Image from 'next/image';

export default function Home() {
  const ref = useRef();

  const [images,setImages] = useState(null)

  useEffect(() => import('@smile_identity/smart-camera-web'), []);
  useEffect(() => {
        const {current} = ref

        current.addEventListener('imagesComputed', (e) => {
          const data = e.detail;

          // console.log(data);
          setImages(data.images)
          // enhance data as necessary for the required job type
        });
  }, [ref]);



  return (
    <div className="max-w-7xl mx-auto p-10">
      <Head>
        <title>Smile ID Demo</title>
        <meta name="description" content="Demo testing SmileID WebSDK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col md:flex-row">
        <div className="xs:w-full md:w-1/2 flex flex-col">
          <h1 className="pb-2 text-center">Smile ID Demo</h1>
          <smart-camera-web ref={ref} />
          {
            images &&
          <button onClick={()=>{window?.location.reload()}} className="btn btn-blue cursor-pointer text-center">Restart</button>
          }
        </div>

        <div className="xs:full md:w-1/2">
          <h1 className="pb-2 text-center">Images</h1>
          {images ? (
            <div className="grid auto-rows-max grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((image, index) => {
                console.log(typeof image.image);
                return (
                  <div key={index} className="mx-auto">
                    <img
                      // width={200}
                      // height={200}
                      src={`data:image/jpeg;base64,${image.image}`}
                    />
                    <div className="text-md font-bold text-blue-600 text-center">{index==0 ? "Full Image":`#${image.image_type_id}`}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-md">Images Taken will load here</p>
          )}
        </div>
      </div>
    </div>
  );
}
