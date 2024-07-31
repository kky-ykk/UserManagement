
export default function Validation(values) {
    
    const error={};

    // regular expression
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]{2,15}$/;
    const password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,20}$/;
    const phone_pattern=/^[789]\d{9}$/;

    if(values.name=="")
        error.name="Name is required";

    if(values.email=="")
        error.email="email is required";
    else if(!email_pattern.test(values.email))
        error.email="enter valid email id";

    if(values.mobile=="")
        error.mobile="phone number is required!";
    else if(!phone_pattern.test(values.mobile))
        error.mobile="Enter valid phone number with start with 7 or 8 or 9 and length should be 10";

    if(values.address==="")
        error.address="addres is required!";

    
    if(values.password=="")
        error.password="password is required";
    else if(!password_pattern.test(values.password))
        error.password="Enter valid password,which will have at least one capital, small leter, special symbol, total length 8 - 15";

    return error;

}