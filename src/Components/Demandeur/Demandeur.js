import React from 'react';

const Demandeur = ({onInputChange}) => {
    return (
        <div className="container border shadow p-3 mb-5 bg-body rounded">
            <h1>الرجاء إدخال بيانات طالب السكن</h1>
	
            <form >
                <label htmlFor="nom">اللقب:</label>
                <input type="text" id="nom" name="nom" onChange={onInputChange}/>
                <input type="text" id="nom_fr" name="nom_fr" placeholder="اللقب باللاتينية" /><br />
                
                <label htmlFor="prenom">الاسم:</label>
                <input type="text" id="prenom" name="prenom" /> 
                <input type="text" id="prenom_fr" name="prenom_fr" placeholder="الاسم باللاتينية" /><br />

                <label >الجنس</label><br />
                
                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">ذكر</label><br />
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">أنثى</label><br />
                        
                <label htmlFor="num_act">رقم عقد الميلاد</label>
                <input type="number" name="num_act" /><br />
                
                <label htmlFor="date_n">تاريخ الميلاد: </label>
                <input type="date" id="date_n" name="date_n" /><br />

                <label htmlFor="lieu_n">مكان الميلاد:</label>
                <input type="text" id="lieu_n" name="lieu_n" />
                <input type="text" id="lieu_n_fr" name="lieu_n_fr" placeholder="مكان الميلاد باللاتينية" /><br />
                
                <label htmlFor="wil_n">ولاية الميلاد:</label>
                <select id="wil_n"  name="wil_n" defaultValue="">
                    <option  value="" disabled hidden>اختر ولاية الميلاد</option>
                    <option value="wil_n"></option>
                </select><br />

                <label htmlFor="com_n">بلدية الميلاد:</label>
                <select id="com_n" name="com_n" defaultValue="">
                    <option  value="" disabled  hidden>اختر بلدية الميلاد</option>
                    <option value="com_n"></option>
                </select><br />

                <label htmlFor="prenom_p"> اسم الاب:</label>
                <input type="text" id="prenom_p" name="prenom_p" /> 
                <input type="text" id="prenom_p_fr" name="prenom_p_fr" placeholder="اسم الاب باللاتينية" /><br />

                <label htmlFor="nom_m">لقب الأم:</label>
                <input type="text" id="nom_m" name="nom_m" />
                <input type="text" id="nom_m_fr" name="nom_m_fr" placeholder="لقب الأم باللاتينية" /><br />
                
                <label htmlFor="prenom_m"> اسم الأم:</label>
                <input type="text" id="prenom_m" name="prenom_m" /> 
                <input type="text" id="prenom_m_fr" name="prenom_m_fr" placeholder="اسم الأم باللاتينية" /><br />

                <input type="submit" value="حفظ" />  
                <input type="reset" value="إلغاء" />
            </form>
        </div>
    );
}

export default Demandeur;