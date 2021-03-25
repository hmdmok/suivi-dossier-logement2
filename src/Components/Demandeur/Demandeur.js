import React from 'react';

const Demandeur = () => {
    return (
        <div className="container border shadow p-3 mb-5 bg-body rounded">
            <h1>الرجاء إدخال بيانات طالب السكن</h1>
	
            <form action="/action_page.php">
                <label for="nom">اللقب:</label>
                <input type="text" id="nom" name="nom" value="" />
                <input type="text" id="nom" name="nom" placeholder="اللقب باللاتينية" /><br />
                
                <label for="prenom">الاسم:</label>
                <input type="text" id="prenom" name="prenom" value="" /> 
                <input type="text" id="prenom" name="prenom" placeholder="الاسم باللاتينية" /><br />

                <label >الجنس</label><br />
                
                <input type="radio" id="male" name="gender" value="male" />
                <label for="male">ذكر</label><br />
                <input type="radio" id="female" name="gender" value="female" />
                <label for="female">أنثى</label><br />
                        
                <label for="num_act">رقم عقد الميلاد</label>
                <input type="number" name="num_act" /><br />
                
                <label for="date_n">تاريخ الميلاد: </label>
                <input type="date" id="date_n" name="date_n" /><br />

                <label for="lieu_n">مكان الميلاد:</label>
                <input type="text" id="lieu_n" name="lieu_n" value="" />
                <input type="text" id="lieu_n" name="lieu_n" placeholder="مكان الميلاد باللاتينية" /><br />
                
                <label for="wil_n">ولاية الميلاد:</label>
                <select id="wil_n"  name="wil_n">
                    <option  value="" disabled selected hidden>اختر ولاية الميلاد</option>
                    <option value="wil_n"></option>
                </select><br />

                <label for="com_n">بلدية الميلاد:</label>
                <select id="com_n" name="com_n">
                    <option  value="" disabled selected hidden>اختر بلدية الميلاد</option>
                    <option value="com_n"></option>
                </select><br />

                <label for="prenom_p"> اسم الاب:</label>
                <input type="text" id="prenom_p" name="prenom_p" value="" /> 
                <input type="text" id="prenom_p" name="prenom_p" placeholder="اسم الاب باللاتينية" /><br />

                <label for="nom_m">لقب الأم:</label>
                <input type="text" id="nom_m" name="nom_m" value="" />
                <input type="text" id="nom_m" name="nom_m" placeholder="لقب الأم باللاتينية" /><br />
                
                <label for="prenom_m"> اسم الأم:</label>
                <input type="text" id="prenom_m" name="prenom_m" value="" /> 
                <input type="text" id="prenom_m" name="prenom_m" placeholder="اسم الأم باللاتينية" /><br />

                <input type="submit" value="حفظ" />  
                <input type="reset" value="إلغاء" />
            </form>
        </div>
    );
}

export default Demandeur;