import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import {withRouter} from 'next/router'
import { getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'

const ReactQuill = dynamic(()=>import('react-quill', {ssr:false}))
import '../../node_modules/react-quill/dist/quill.snow.css'

const CreateBlog = ({router}) => {
  const blogFormLS = () => {
    if(typeof window === 'undefined') {
      return false
    }

    if(localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  }

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  
  const [body, setBody] = useState(blogFormLS())
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });

  const {error, sizeError, success, formData, title, hidePublishButton} = values;

  useEffect(() => {
    setValues({...values, formData: new FormData()})
    initCategories()
    initTags()
  }, [router]);

  const initCategories = ()=> {
    getCategories().then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setCategories(data)
      }
    })
  }

  const initTags = ()=> {
    getTags().then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setTags(data)
      }
    })
  }

  const publishBlog = (e) => {
    e.preventDefault()
  }

  const handleChane = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({...values, [name]:value, formData, error: ''})
  }

  const handleBody = e => {
    setBody(e)
    formData.set('body', e)
    if(typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e))
    }
  }

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input className='form-control' value={title} onChange={handleChane('title')}></input>
        </div>

        <div className='form-group'>
          <ReactQuill 
            modules={CreateBlog.modules} 
            formats={CreateBlog.formats}
            value={body} 
            placeholder="Write something amazing..." 
            onChange={handleBody} 
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Publish
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          {createBlogForm()}
          <div>
            {JSON.stringify(title)}
            <hr />
            {JSON.stringify(body)}
          </div>
        </div>
        <div className='col-md-4'>
          <h5>Categories</h5>
          <hr />
          {JSON.stringify(categories)}

          <h5>Tags</h5>
          <hr/>
          {JSON.stringify(tags)}
        </div>
      </div>
    </div>
  )
}

CreateBlog.modules = {
  toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
  ]
};

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(CreateBlog)