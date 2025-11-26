-- Xóa các hàng trùng lặp, chỉ giữ lại hàng có id nhỏ nhấ.
DELETE T1 FROM blood_test T1
INNER JOIN blood_test T2
WHERE T1.id > T2.id AND T1.medical_examination_id = T2.medical_examination_id;
DELETE T1 FROM radiology T1
INNER JOIN radiology T2
WHERE T1.id > T2.id AND T1.medical_examination_id = T2.medical_examination_id;

ALTER TABLE blood_test
    ADD UNIQUE (medical_examination_id);
ALTER TABLE radiology
    ADD UNIQUE (medical_examination_id);