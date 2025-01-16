// Function to validate email
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Function to validate mobile number
function validateMobile(mobile) {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(mobile);
}

// Function to validate password
function validatePassword(password) {
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{6,}$/;
return passwordPattern.test(password);
}
//Function to validate loginId
function validateLoginId(loginId) {
const loginIdPattern = /^[a-zA-Z0-9]{8}$/;
return loginIdPattern.test(loginId);
}

// Function to validate the entire form and save data
function saveData() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let mobileNo = document.getElementById('mobileNo').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let street = document.getElementById('street').value;
    let city = document.getElementById('city').value;
    let state = document.getElementById('state').value;
    let country = document.getElementById('country').value;
    let loginId = document.getElementById('loginId').value;
    let password = document.getElementById('password').value;

    // Basic field validation
    if (!firstName || !lastName || !mobileNo || !email || !address || !street || !city || !state || !country || !loginId || !password) {
        alert("All fields are required.");
        return;
    }

    if (!validateMobile(mobileNo)) {
        alert("Please enter a valid mobile number.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one special character.");
        return;
    }

    if (!validateLoginId(loginId)) {
        alert("Login ID must be 8 alphanumeric characters.");
        return;
    }

    // Prepare the data to send to the server
    const formData = {
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo,
        email: email,
        address: address,
        street: street,
        city: city,
        state: state,
        country: country,
        loginId: loginId,
        password: password
    };

    // Call the WebService/API to save the data in MongoDB
    fetch('https://new-1-zfbk.onrender.com/saveUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Data saved successfully!");
        // Optionally reset the form or handle success response
        document.getElementById("myForm").reset();
    })
    // .catch(error => {
    //     console.error('Error:', error);
    //     alert("An error occurred while saving the data.");
    // });
}
