import React, { useEffect, useRef, useState } from 'react';
import ArticleDAO from "./Dao.js";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storage } from './firebase.js';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import ArticleBox from './articleBox.jsx';

const AdminArticle = () => {
  const refIMG = useRef(null);
  const [Img, setImg] = useState(null);
  const [title, setTitle] = useState('');
  const [descrip, setDescrip] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [ID_selected, SetId] = useState('');
  const [isUpdate, setUpdated] = useState(false);
  const [selectedType, setselectedType] = useState('');
  const [dao] = useState(new ArticleDAO());

  const handleValueImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
    
  };

  const handleValueTitle = (e) => setTitle(e.target.value);
  const handleValueDescrip = (e) => setDescrip(e.target.value);
  const handleValueDate = (e) => setDate(e.target.value);
  const handleChange = (e, editor) => setContent(editor.getData());
  const change_typeArticle = (e) => setselectedType(e.target.value);

  const clearIMG = () => {
    refIMG.current.value = null;
  };

  const handleImageDelete = async (imgID) => {
    const imageRef = storageRef(storage, `images/image${imgID}`);
    if(imageRef){
          try {
      await deleteObject(imageRef);
      console.log('✅ Image deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting image:', error);
    }
    }

  };

  const saveIMG = async (imgid) => {
    if (!Img) return "";
    const imageRef = storageRef(storage, `images/image${imgid}`);
    await uploadBytes(imageRef, Img);
    const url = await getDownloadURL(imageRef);
    console.log(url);
    return url;
  };

  const generateID = () => Math.floor(1000 + Math.random() * 9000);

  const SaveArticle = async () => {
    if (!title || !descrip || !date || !content || !selectedType ) {
      alert("❗ الرجاء تعبئة جميع الحقول ورفع صورة");
      return;
    }

    const articleId = generateID();
    const imageUrl = await saveIMG(articleId);
    console.log(imageUrl);

    const newArticle = {
      id: articleId,
      title,
      descrip,
      date,
      content,
      img: imageUrl,
      type: selectedType
    };

    await dao.saveArticle(newArticle);
    clearInputs();
  };

  const UpdateِArticleToDatabase = async (e) => {
    if (!title || !descrip || !date || !content || !selectedType || !ID_selected) {
      alert("❗ الرجاء تعبئة جميع الحقول");
      return;
    }

    await handleImageDelete(ID_selected);
    const newImageUrl = await saveIMG(ID_selected);

    const updatedArticle = {
      id: ID_selected,
      title,
      descrip,
      date,
      content,
      img: newImageUrl,
      type: selectedType
    };

    await dao.updateArticle(ID_selected, updatedArticle);
    setUpdated(false);
    clearInputs();
  };

  const clearInputs = () => {
    setTitle("");
    setDescrip("");
    setDate("");
    setContent("");
    setImg(null);
    clearIMG();
    SetId("");
    setselectedType("");
  };

  const handleToUpdate = async (id) => {
    setUpdated(true);
    SetId(id);

    const data = await dao.getArticleID(id);
    setTitle(data.title);
    setDescrip(data.descrip);
    setDate(data.date);
    setContent(data.content);
    setselectedType(data.type);
  };

  const handleRemove = async (id) => {
    await dao.deleteArticle(id);
    await handleImageDelete(id);
    SetId("");
  };

  const editorConfiguration = {
    toolbar: [
      'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
      'link', 'bulletedList', 'numberedList', 'blockQuote',
      'imageUpload', 'insertTable', 'mediaEmbed', '|',
      'undo', 'redo', 'alignment', 'direction'
    ],
    language: 'ar',
    alignment: {
      options: ['left', 'right', 'center', 'justify']
    },
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };

  return (
    <>
      <div className='editor'>
        <div className="address_edit">إداره المقالات</div>
        <input type="file" className='Add_img' onChange={handleValueImg} accept='image/*' ref={refIMG} />
        <textarea className='add_title' placeholder='عنوان المقاله' onChange={handleValueTitle} value={title} />
        <textarea className='add_descrip' placeholder='وصف المقاله' onChange={handleValueDescrip} value={descrip} />
        <input type="date" className='Add_date' onChange={handleValueDate} value={date} />
        <select
          id="articleType"
          value={selectedType}
          onChange={change_typeArticle}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">-- اختر --</option>
          <option value="tech">تقنية</option>
          <option value="stories">روايات</option>
          <option value="self-development">تطوير الذات</option>
          <option value="science">علمي</option>
          <option value="business">ريادة أعمال</option>
          <option value="other">أخرى</option>
        </select>

        <div className="add_content">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={handleChange}
            config={editorConfiguration}
          />
        </div>

        {isUpdate ? (
          <div onClick={()=>{UpdateِArticleToDatabase()}} className="btn_save">تحديث</div>
        ) : (
          <div onClick={()=>{SaveArticle()}} className="btn_save">حفظ</div>
        )}
      </div>

      <ArticleBox
        Prop_handleRemove={handleRemove}
        Prop_handleToUpdate={handleToUpdate}
      />
    </>
  );
};

export default AdminArticle;
