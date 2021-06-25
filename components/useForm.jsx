import {useState, useEffect} from "react";


function useForm(callback,validate,val,url,method,adminUserUpdate,callbackIsSubmitting){

    //Hook to store states of values
    const [values,setValues] = useState({
       ...val
    });
    //Hook to store errors
    const [errors,setErrors] = useState({});
    //Hook to store submitting status
    const [isSubmitting,setIsSubmitting] = useState(false);

    //This function executes on onChange event of the input box
    const handleChange = e=>{
        const {name,value} = e.target;
        setValues({...values,[name]:value});
    };

    const handleFileSubmit = ({file},name)=>{
        setValues({...values,[name]:file});
    }

    //This function is executed on form submission
    const handleSubmit = e=> {
        e.preventDefault();
        //Sets errors if there are errors
        setErrors(validate(values));
        setIsSubmitting(true);
        console.log(errors);
    }

    useEffect(
        ()=>{
            //Checks if there are no errors and the form is in IsSubmitting state
            if(Object.keys(errors).length === 0 && isSubmitting ){

                // //Submit the form
                if(url){
                    callbackIsSubmitting && callbackIsSubmitting(true);
                    submitForm();
                }else{
                    //Callback the submitForm method
                    callback(values);
                }

            }
        },[errors]
    );

    //This function handles the POST api call to submit the form data
    const submitForm = () => {
        let data = JSON.stringify(values);

        // If an admin user is updated, create the request accordingly
        if (adminUserUpdate) {
            data = new FormData();
            data.append("values", JSON.stringify(values));
        }

        fetch(url,{
            headers: !adminUserUpdate ? {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            } : {},
            method: method ? method : "POST",
            body: data
        }).then(res => res.json())
            .then(data=>callback(data))
            .catch(err=>console.log(err))
            .finally(() => callbackIsSubmitting(false));
    }


    return {handleChange,handleSubmit,values,errors,handleFileSubmit};

}
export default useForm;