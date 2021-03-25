import React from 'react';

const Dossier = () => {
    return (
        <div className="container border shadow p-3 mb-5 bg-body rounded">
            <form> 
                <h1>الرجاء إدخال بيانات ملف طلب السكن</h1>
                <label for="date_depo"> تاريخ الإيداع : </label>
                <input type="date" id="date_depo" name="date_depo" /><br />

                <label for="num_dos"> رقم الملف : </label>
                <input type="number" id="num_dos" name="num_dos" /><br />

                <div class="intro"><label >الحالة العائلية</label> </div> <br />

                <input type="radio" id="cilib" name="stuation_f" value="cilib" />
                <label for="cilib">أعزب\عزباء </label><br />

                <input type="radio" id="marie" name="stuation_f" value="marie" />
                <label for="marie">متزوج\ة</label><br />

                

                <input type="radio" id="divor" name="stuation_f" value="divor" />
                <label for="divor">مطلق\ة</label><br />

                <input type="radio" id="veuf" name="stuation_f" value="veuf" />
                <label for="veuf">أرمل\ة</label><br />

                <label >عدد الأولاد</label><br />
                <label for="num_enf"></label>
                <input type="number" name="num_enf" /><br />
                

                <label for="nom_c">لقب الزوج(ة):</label>
                <input type="text" id="nom_c_ar" name="nom_c_ar" value="" />
                <input type="text" id="nom_c" name="nom_c" placeholder="اللقب باللاتينية" /><br />
                
                <label for="prenom_c"> اسم الزوج(ة):</label>
                <input type="text" id="prenom_c_ar" name="prenom_c_ar" value="" /> 
                <input type="text" id="prenom_c" name="prenom_c" placeholder="الاسم باللاتينية" /><br />

                
                        
                <label for="num_act_c"> رقم عقد الميلاد الزوج(ة)</label>
                <input type="number" name="num_act_c" /><br />
                
                <label for="date_n_c"> تاريخ ميلاد الزوج(ة) : </label>
                <input type="date" id="date_n_c" name="date_n_c" /><br />

                <label for="lieu_n_c">مكان ميلاد الزوج(ة):</label><br />
                

                <label for="wil_n_c"> ولاية الميلاد للزوج(ة):</label>
                <select id="wil_n_c"  name="wil_n_c">
                    <option  value="" disabled selected hidden> اختر ولاية الميلاد</option>
                    <option value="wil_n_c"></option>
                </select><br />

                <label for="com_n_c">بلدية الميلاد للزوج(ة):</label>
                <select id="com_n_c" name="com_n_c">
                    <option  value="" disabled selected hidden>اختر بلدية الميلاد</option>
                    <option value="com_n_c"></option>
                </select><br />

                <label for="nom_p_c">لقب الأب للزوج(ة):</label>
                <input type="text" id="nom_p_c_ar" name="nom_p_c_ar" value="" />
                <input type="text" id="nom_p_c" name="nom_p_c" placeholder="لقب الأب باللاتينية" /><br />
                
                <label for="prenom_p_c">اسم الاب للزوج(ة):</label>
                <input type="text" id="prenom_p_c_ar" name="prenom_p_c_ar" value="" /> 
                <input type="text" id="prenom_p_c" name="prenom_p_c" placeholder="اسم الاب باللاتينية" /><br />


                <label for="nom_m_c">لقب الأم للزوج(ة):</label>
                <input type="text" id="nom_m_c_ar" name="nom_m_c_ar" value="" />
                <input type="text" id="nom_m_c" name="nom_m_c" placeholder="لقب الأم باللاتينية" /><br />
                
                <label for="prenom_m_c">اسم الأم للزوج(ة):</label>
                <input type="text" id="prenom_m_c_ar" name="prenom_m_c_ar" value="" /> 
                <input type="text" id="prenom_m_c" name="prenom_m_c" placeholder="اسم الأم باللاتينية" /><br />

                <input type="submit" value="حفظ" />  
                <input type="reset" value="إلغاء" /><br />


                
                <div class="intro">	<label >الحالة الشخصية</label></div><br />

                <input type="checkbox" id="neant" name="neant" value="0" />
                <label for="neant"> لاشيء </label><br />

                <input type="checkbox" id="avec_d" name="avec_d" value="30" />
                <label for="avec_d"> ذوي حقوق</label><br />

                <input type="checkbox" id="andicap" name="andicap" value="30" />
                <label for="andicap"> معاق</label><br /><br />

                <input type="submit" value="حفظ" /> 

                <div class="intro">	<label >ظروف السكن</label></div><br />

                <input type="radio" id="garage" name="stuation_d" value="50" />
                <label for="garage">محل غير مخصص للسكن </label><br />

                <input type="radio" id="legem_1" name="stuation_d" value="50" />
                <label for="legem_1">سكن خطر مهدد بالانهيار ملك جماعي</label><br />

                <input type="radio" id="legem_2" name="stuation_d" value="30" />
                <label for="legem_2">سكن خطر مهدد بالانهيار ملك فردي</label><br />

                <input type="radio" id="legem_3" name="stuation_d" value="25" />
                <label for="legem_3">سكن عند الأقارب او مستأجر</label><br />

                <input type="radio" id="leg_f" name="stuation_d" value="15" />
                <label for="leg_f">سكن وظيفي</label><br />
                
                <input type="submit" value="حفظ" />

                <div class="intro">	<label >هل يوجد أشخاص متكفل بهم</label></div><br />

                <select id="personne_s">
                    
                    <option value="non" selected>لا</option>
                    <option value="oui">نعم</option>
                </select><br />

                <label >عدد الأشخاص المتكفل بهم</label><br />
                <label for="numb_p"></label>
                <input type="number" name="numb_p" /><br />
                


            </form>
        </div>
    );
}

export default Dossier;