import React, {useState} from "react";
import {Typography, Button, Form,  Input} from "antd";
import {useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
 import {PlusSquareTwoTone} from "@ant-design/icons";
import axios from "axios";
const {TextArea} = Input;
const {Title} = Typography;

const PrivateOptions = [
    {value:0, label:"Private"},
    {value:1, label:"Public"}
]
const CategoryOptions = [
    {value:0, label:'Film & Animation'},
    {value:1, label:'Autos & Vehicles'},
    {value:2, label:'Music'},
    {value:3, label:'Pets & Animals'},
]
function VideoUploadPage() {
    const[VideoTitle, setVideoTitle] =useState('')
    const[Description, setDescription] =useState('')
    const[Private,setPrivate] = useState(0)
    const[Category,setCategory] = useState('Film & Animation')

    const onTitleChange = (e) => {
            setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange =(e) =>{
            setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) =>{
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])

        console.log(files);

        // axios({
        //     url: '/api/video/uploadfiles',
        //     method: 'post',
        //     data: formData,
        //     headers: {
        //         'content-type' : 'multipart/form-data'
        //     }
        // }).then(response => {
        //     if(response.data.success){
        //
        //     }else{
        //         alert('비디오 업로드 실패했습니다.')
        //     }
        // })

        axios.post('http://localhost:8080/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                } else {
                    alert('비디오 업로드 실패했습니다.')
                }
            });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const RootProps = {
        ...getRootProps(),
    };

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video </Title>
            </div>

            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'center'}}>
                    {/*<Dropzone {...RootProps} maxSize={100} multiple={false}>*/}
                    <div
                        style={{
                            width: "300px",
                            height: "240px",
                            border: "1px solid lightgray",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <PlusSquareTwoTone  style={{fontSize:'5rem', position:'absolute', left:'47.5%',
                            top:'24%'
                        }}/>
                    </div>
                    {/*</Dropzone>*/}
                    <div>
                        <img src alt="" />
                    </div>
                </div>
                <br/>
                <br/>
                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle} />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description} />
                <br/>
                <br/>
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item,index) =>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item,index)=>
                        <option key={index} value={item.value}>{item.label}</option>
                    )}
                </select>

                <br/>
                <br/>

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage;

