import { useState } from "react";

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const validateContactNumber = (contactNumber) => {
    const contactNumberRegex = /^\+?[1-9]\d{1,14}$/;
    return contactNumberRegex.test(contactNumber);
};



export const ValidateName = (name) => {
    var res={}
    if (name.length < 3 || name.length > 50) {

        res.msg="Size Should be greater than 3 "
        res.val=false
        return res;
    }

    const namePattern = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/;
    const isPatternMatch = namePattern.test(name);
    if (!isPatternMatch) {
        
        res.msg="Invalid"
        res.val=false
        return res;
    }

    const words = name.trim().split(/\s+/);
    if (words.length < 1 || words[0].length < 3) {
        
        res.msg="First word should be at least 3 characters"
        res.val=false
        return res;
    }


    res.msg="Name is valid"
        res.val=true
        return res;
};

export const IsValidISBN = (isbn) => {
    console.log(`Validating ISBN: '${isbn}'`);
    const tenDig = /^[0-9]{10}$/.test(isbn);
    const thirteenDig = /^[0-9]{13}$/.test(isbn);
    console.log(tenDig || thirteenDig)
    return tenDig || thirteenDig;
};