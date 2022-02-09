import API from "../../api/api";
import {useState} from "react";
import styled from "styled-components";

const Label = styled.label`
    display:flex;
    flex-flow: column;
    margin-bottom: 1rem;
`
const Submit = styled.input.attrs({ type: 'submit' })`
    display:block;
    width:100%;
`
const FormTitle = styled.h4`
    margin-bottom:2rem;
    text-align:center;
`


const PostCreator = ({user}) => {

    const [title,setPostTitle] = useState('');
    const [content,setPostContent] = useState('');

    const createPost = ({title,content}) => {
        API.addPost({title,content})
            .then((response)=> console.log(response))
    }

    return (
        <form onSubmit={(e)=>{e.preventDefault(); createPost({title, content}) }} action="">
            <FormTitle> Create Post </FormTitle>
            <Label>
                <span>Post Title</span>
                <input type="text" value={title} onChange={(e)=>{e.preventDefault(); setPostTitle(() => e.target.value)}}/>
            </Label>
            <Label>
                <span>Post Content</span>
                <input type="text" value={content} onChange={(e)=>{e.preventDefault(); setPostContent(() => e.target.value)}}/>
            </Label>
            <Submit type="submit" value={`create post`}/>
        </form>
    )
}

export default PostCreator;
