import React, { useEffect, useRef, useState } from 'react';
import ArticleDAO from "./Dao.js"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { database } from './firebase.js';
import { ref, set } from "firebase/database";
import { storage } from './firebase.js'; // استيراد إعدادات Firebase
import { ref as storageRef, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';
import ArticleBox from './articleBox.jsx';
import updata from "./refresh-page-option.png";
import remove from './remove.png';
import axios from 'axios';


const AdminArticle = () => {
  const refIMG = useRef(null)
  const [Img, setImg] = useState(null);
  const [ImgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState('');
  const [descrip, setDescrip] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [ID_selected, SetId] = useState('');
  const [isUpdate, setUpdated] = useState(false);
  const [selectedType, setselectedType] = useState('');
  const [dao] = useState(new ArticleDAO());

  // Handle content change
  const handleValueImg = (e) => {
      setImg(e.target.files[0]);
  };
  // Handle content change
  const handleValueTitle = (event) => {
    setTitle(event.target.value);
};
// Handle content change
const handleValueDescrip = (event) => {
    setDescrip(event.target.value);
};
// Handle content change
const handleValueDate = (event) => {
    setDate(event.target.value);
};
// Handle content change
const handleChange = (e,value) => {
    setContent(value.getData());
};

//handle chacge type
const change_typeArticle = (event) => {
  setselectedType(event.target.value);
  console.log('نوع المقال المختار:', event.target.value);
};
console.log(descrip)

  //generate id article
  function generateID() {
      const randomNumbers = Math.floor(1000 + Math.random() * 9000);
      const id = randomNumbers;
      return id;
      }
const articleId = generateID();


//save Img
const saveIMG= async(imgid)=>{
  let imageUrl = "";
  if(Img){
      const imageRef = storageRef(storage,`images/image${imgid}`);
      await uploadBytes(imageRef, Img);
      imageUrl = await getDownloadURL(imageRef);
  }
  setImgUrl(imageUrl)
}

      // functiom delete IMG
      const handleImageDelete = async (imgID) => {
        const imageRef = storageRef(storage, `images/image${imgID}`);
          try {
              await deleteObject(imageRef);
              setImgUrl('');
              console.log('Image deleted successfully');
          } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
//clear img from input img 
const clearIMG=()=>{
  refIMG.current.value = null;
}
//update img
const updateIMG=()=>{
  handleImageDelete(ID_selected); //delete img
  saveIMG(ID_selected); //save img
  setImg(null);
  clearIMG()

}
// Function to save content to Firebase
const SaveArticle = async () =>{
  if(title && descrip && date && content && selectedType){
    const newArticle = {
          id: articleId,
          title: title,
          descrip: descrip,
          date: date,
          content: content,
          img: ImgUrl,
          type:selectedType
        }
        dao.saveArticle(newArticle);
        saveIMG(articleId) //save img
        setTitle("")
        setDescrip("")
        setDate("")
        setContent("")
        setImgUrl('')
        clearIMG()
    }
  }

  const handleToUpdate =(e)=>{
    e.preventDefault();
    setUpdated(true);
    dao.getArticleID(ID_selected).then((data)=>{
      setTitle(data.title)
      setDescrip(data.descrip)
      setDate(data.date)
      setContent(data.content)
      console.log(ID_selected)
      console.log(data)
    })
    // dao.updateArticle(ID_selected)

  }

    // delete article
  const handleRemove =(e)=>{
    e.preventDefault();
  dao.deleteArticle(ID_selected);
  handleImageDelete(ID_selected) //delete img

  }
  const UpdateِArticleToDatabase =(e)=>{
    e.preventDefault();
    if(title && descrip && date && content && ImgUrl && selectedType){
      const UpdatedArticle = {
        id: ID_selected,
        title: title,
        descrip: descrip,
        date: date,
        content: content,
        img: ImgUrl,
        type:selectedType
      }
      dao.updateArticle(ID_selected,UpdatedArticle);
      setTitle("")
      setDescrip("")
      setDate("")
      setContent("")
      setImgUrl('')
    }
    updateIMG()
  }

//editor setting
const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline', // إضافة زر التنسيق تحت
      'strikethrough', // إضافة زر خط متقاطع
      '|',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'imageUpload', // إضافة زر رفع الصورة
      'insertTable', // إضافة زر إدراج جدول
      'mediaEmbed', // إضافة زر تضمين الوسائط
      '|',
      'undo',
      'redo',
      'alignment', // إضافة خيارات المحاذاة
      'direction' // إضافة زر لتغيير الاتجاه بين LTR و RTL
    ],
    language: 'ar', // تحديد اللغة العربية للمحرر
    alignment: {
      options: [ 'left', 'right', 'center', 'justify' ] // إعداد المحاذاة
    },
    // إعدادات إضافية يمكن تخصيصها حسب الحاجة
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };



  
//   async function askClaude(prompt) {
    
//       try {
//         const response = await fetch('http://localhost:4000/generate-article', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ prompt })
//         });
        
//         const data = await response.json();
    
//         if (response.ok) {
//           console.log('المقالة:', data.result);
//           // استخدم المقالة في حالتك (عرضها مثلاً)
//         } else {
//           console.error('خطأ:', data.error);
//         }
//       } catch (err) {
//         console.error('خطأ في الاتصال بالسيرفر:', err);
//       }
//   }
  
 
  
  

// async function translateText(text) {
//   try {
//     const response = await fetch("https://libretranslate.de/translate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         q: text,
//         source: "ar",
//         target: "en",
//         format: "text"
//       })
//     });

//     const data = await response.json();
//     return data.translatedText;
//   } catch (err) {
//     console.error("فشل الترجمة:", err.message);
//     return "books"; // fallback
//   }
// }

// async function getImage(keyword) {
//   try {
//     const translated = await translateText(keyword);
//     const res = await fetch(`https://api.unsplash.com/photos/random?query=${translated}&client_id=MsSDf1nJ5BTxx_ENxxGn4eqcSIQ1zStdvw6Co0pzPBI`);
//     const data = await res.json();
//     return data?.urls?.small || "";
//   } catch (err) {
//     console.error("خطأ في جلب الصورة:", err.message);
//     return "";
//   }
// }

// const autoSaveArticle = async () => {
//   const now = new Date();
//   const categories = ['تطوير الذات', 'تقنية', 'علمي', 'ريادة اعمال'];
//   const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//   const articleId = `${now.getTime()}`;

//   const titlePrompt = `اعطني عنوان قصير مفهوم وجذاب باللغة العربية عن موضوع نوعه ${randomCategory} في 150 حرف`;
//   const title = await  askClaude(titlePrompt);
//   const descriptionPrompt = `  اكتب وصفًا موجزًا مفهوم للمقال في 250 حرف حول هذا العنوان ${title} `;
//   const desc = await askClaude(descriptionPrompt);
//   const contentPrompt = `اكتب مقالا كاملا بدون عنونه بمقدمة عن المقال مشوقة ومحتوي وادله ان تحتاج ذلك ومصطلحات وخاتمه مفهومة باللغة العربية في ${Math.floor(Math.random() * (5000 - 1000)) + 1000} عن ${title}، يتكون من مقدمة وشرح ونهاية.`;
//   const content = await askClaude(contentPrompt);
//   const image = await getImage(randomCategory);

//   const newArticleAi = {
//     id: articleId,
//     title,
//     descrip: desc,
//     date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
//     content,
//     img: image,
//     type: randomCategory
//   };

//   console.log("📦 مقال جديد:", newArticleAi);
//   dao.saveArticle(newArticleAi);
//   saveIMG(articleId);
// }

// autoSaveArticle();
// setInterval(() => {
// }, 60000); // يتحقق كل 6 ساعات
// // 21600000

  return (<>

    <div className='editor'>
        <div className="address_edit">إداره المقالات</div>
        <input type="file" className='Add_img' onChange={handleValueImg} accept='image/*' ref={refIMG}/>
        <textarea className='add_title' placeholder='عنوان المقاله' onChange ={handleValueTitle} value={title}/>
        <textarea className='add_descrip' placeholder='وصف المقاله' onChange={handleValueDescrip} value={descrip}/>
        <input type="date" className='Add_date' onChange={handleValueDate} value={date}/>

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
        <option value="ohter">اخري</option>
      </select>

        <div className="add_content">


        <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={handleChange}
        config={editorConfiguration} 
        />
        </div>
      {isUpdate? (<div onClick={UpdateِArticleToDatabase} className="btn_save">تحديث</div>
      ):(<div onClick={SaveArticle} className="btn_save">حفظ</div>)}
    </div>


<ArticleBox 
  Buttons={
    <div className='button_mange'>
      <div className="updateArticle" onClick={handleToUpdate}><img src={updata} /></div>
      <div className="removeArticle" onClick={handleRemove}><img src={remove} /></div>
    </div>
  }
  idItem={(e)=>{SetId(e)}
  }
/>  
  </>
  );
};

export default AdminArticle ;