import React, { useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor(props) {
	const value = null;
	function setContent(contents) {
		props.func1(contents);
	}
	function setImage(image) {
		props.func2(image);
	}
	const imageHandler = () => {
		//input 파일 태그 생성
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*')
		input.click();

		// input change
		input.addEventListener('change',(e) => {
			const file = input.files[0];
			const formData = new FormData();
			formData.append('img', file);

			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				setImage(reader.result);
   			};

		});
	}
	

	const modules = useMemo(()=> ({
		toolbar: {
			container : [
				["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
		}
		
	}), [])
	return (
		<div style={{ height : "650px", marginTop : 18, width : "600px", align : "center"}}>
			<ReactQuill
				style={{ height : "600px"}}
				theme="snow"
				modules={modules}
				onChange={setContent}
			/>
		</div>
  );
}
