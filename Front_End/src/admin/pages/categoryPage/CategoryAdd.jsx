import { useState } from 'react';

const CategoryAdd = () => {
    const [category, setCategory] = useState({ Category_Name: '', Show_Hidden: false });
   
    const Submit = (evt) => {
        evt.preventDefault();
        let data = {
            Category_Name: category.Category_Name,
            Show_Hidden: category.Show_Hidden
        };
        
        let url = `http://localhost:3000/admin/categoryAdd`;
        let opt = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' 
            },
            body: JSON.stringify(data) 
        };
        
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    alert(data.thongbao); 
                } else {
                    setCategory({ Category_Name: '', Show_Hidden: false });
                    console.log("data", data);
                    window.location.href = '/admin/category'; 
                }
            })
            .catch(error => {
                console.error("Đã có lỗi thêm danh mục", error);
                alert("Đã có lỗi thêm danh mục");
            });
    }

    return (
        <div className="form-container-category-add">
            <div className="form-header">
                <h2>THÊM DANH MỤC</h2>
            </div>
            <form className="category-add-form" onSubmit={Submit}>
                <div className="input-category-add">
                    <div className="form-group-left">
                        <div className="form-group">
                            <label htmlFor="category-name">Tên danh mục</label>
                            <input
                                type="text"
                                id="category-name"
                                placeholder="Nhập tên danh mục..."
                                value={category.Category_Name}
                                onChange={e =>
                                    setCategory({ ...category, Category_Name: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>Ẩn / Hiện</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value={false}
                                        checked={category.Show_Hidden === false}
                                        onChange={() => 
                                            setCategory({ ...category, Show_Hidden: false })
                                        }
                                    /> Ẩn
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value={true}
                                        checked={category.Show_Hidden === true}
                                        onChange={() => 
                                            setCategory({ ...category, Show_Hidden: true })
                                        }
                                    /> Hiện
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-btn">SUBMIT</button>
            </form>
        </div>
    );
}
export default CategoryAdd;
