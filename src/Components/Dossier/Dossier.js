import React from 'react';

const Dossier = () => {
    return (
        <div className="container border shadow p-3 mb-5 bg-body rounded">
            <div class="">
                <h1>الرجاء إدخال بيانات ملف طلب السكن</h1>
                <label htmlFor="date_depo"> تاريخ الإيداع : </label>
                <input type="date" id="date_depo" name="date_depo" /><br />

                <label htmlFor="num_dos"> رقم الملف : </label>
                <input type="number" id="num_dos" name="num_dos" /><br />

                <div className="intro"><label >الحالة العائلية</label> </div> <br />

                <input type="radio" id="cilib" name="stuation_f" value="cilib" />
                <label htmlFor="cilib">أعزب\عزباء </label><br />

                <input type="radio" id="marie" name="stuation_f" value="marie" />
                <label htmlFor="marie">متزوج\ة</label><br />

                

                <input type="radio" id="divor" name="stuation_f" value="divor" />
                <label htmlFor="divor">مطلق\ة</label><br />

                <input type="radio" id="veuf" name="stuation_f" value="veuf" />
                <label htmlFor="veuf">أرمل\ة</label><br />

                <label >عدد الأولاد</label><br />
                <label htmlFor="num_enf"></label>
                <input type="number" name="num_enf" /><br />
                

                <label htmlFor="nom_c">لقب الزوج(ة):</label>
                <input type="text" id="nom_c_ar" name="nom_c_ar" />
                <input type="text" id="nom_c" name="nom_c" placeholder="اللقب باللاتينية" /><br />
                
                <label htmlFor="prenom_c"> اسم الزوج(ة):</label>
                <input type="text" id="prenom_c_ar" name="prenom_c_ar" /> 
                <input type="text" id="prenom_c" name="prenom_c" placeholder="الاسم باللاتينية" /><br />

                
                        
                <label htmlFor="num_act_c"> رقم عقد الميلاد الزوج(ة)</label>
                <input type="number" name="num_act_c" /><br />
                
                <label htmlFor="date_n_c"> تاريخ ميلاد الزوج(ة) : </label>
                <input type="date" id="date_n_c" name="date_n_c" /><br />

                <label htmlFor="lieu_n_c">مكان ميلاد الزوج(ة):</label><br />
                

                <label htmlFor="wil_n_c"> ولاية الميلاد للزوج(ة):</label>
                <select id="wil_n_c"  name="wil_n_c" defaultValue="">
                    <option  value="" disabled hidden> اختر ولاية الميلاد</option>
                    <option value="wil_n_c"></option>
                </select><br />

                <label htmlFor="com_n_c">بلدية الميلاد للزوج(ة):</label>
                <select id="com_n_c" name="com_n_c" defaultValue="">
                    <option  value="" disabled  hidden>اختر بلدية الميلاد</option>
                    <option value="com_n_c"></option>
                </select><br />

                <label htmlFor="nom_p_c">لقب الأب للزوج(ة):</label>
                <input type="text" id="nom_p_c_ar" name="nom_p_c_ar" />
                <input type="text" id="nom_p_c" name="nom_p_c" placeholder="لقب الأب باللاتينية" /><br />
                
                <label htmlFor="prenom_p_c">اسم الاب للزوج(ة):</label>
                <input type="text" id="prenom_p_c_ar" name="prenom_p_c_ar" /> 
                <input type="text" id="prenom_p_c" name="prenom_p_c" placeholder="اسم الاب باللاتينية" /><br />


                <label htmlFor="nom_m_c">لقب الأم للزوج(ة):</label>
                <input type="text" id="nom_m_c_ar" name="nom_m_c_ar" />
                <input type="text" id="nom_m_c" name="nom_m_c" placeholder="لقب الأم باللاتينية" /><br />
                
                <label htmlFor="prenom_m_c">اسم الأم للزوج(ة):</label>
                <input type="text" id="prenom_m_c_ar" name="prenom_m_c_ar" /> 
                <input type="text" id="prenom_m_c" name="prenom_m_c" placeholder="اسم الأم باللاتينية" /><br />

                <div className="intro">	<label >الحالة الشخصية</label></div><br />

                <input type="checkbox" id="neant" name="neant" value="0" />
                <label htmlFor="neant"> لاشيء </label><br />

                <input type="checkbox" id="avec_d" name="avec_d" value="30" />
                <label htmlFor="avec_d"> ذوي حقوق</label><br />

                <input type="checkbox" id="andicap" name="andicap" value="30" />
                <label htmlFor="andicap"> معاق</label><br /><br />

                <div className="intro">	<label >ظروف السكن</label></div><br />

                <input type="radio" id="garage" name="stuation_d" value="50" />
                <label htmlFor="garage">محل غير مخصص للسكن </label><br />

                <input type="radio" id="legem_1" name="stuation_d" value="50" />
                <label htmlFor="legem_1">سكن خطر مهدد بالانهيار ملك جماعي</label><br />

                <input type="radio" id="legem_2" name="stuation_d" value="30" />
                <label htmlFor="legem_2">سكن خطر مهدد بالانهيار ملك فردي</label><br />

                <input type="radio" id="legem_3" name="stuation_d" value="25" />
                <label htmlFor="legem_3">سكن عند الأقارب او مستأجر</label><br />

                <input type="radio" id="leg_f" name="stuation_d" value="15" />
                <label htmlFor="leg_f">سكن وظيفي</label><br />
             
                <div className="intro">	<label >هل يوجد أشخاص متكفل بهم</label></div><br />

                <select id="personne_s" defaultValue="non">
                    
                    <option value="non" >لا</option>
                    <option value="oui">نعم</option>
                </select><br />

                <label >عدد الأشخاص المتكفل بهم</label><br />
                <label htmlFor="numb_p"></label>
                <input type="number" name="numb_p" /><br />
                
                
                <input type="submit" value="حفظ" />  
                <input type="reset" value="إلغاء" />

            </div>
        </div>
    );
}

export default Dossier;