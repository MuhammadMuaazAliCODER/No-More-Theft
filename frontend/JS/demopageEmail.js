document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('requestDemoForm');

    if (!form) {
        console.error('❌ Form not found');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log(' JS submit handler triggered');

        const formData = {
            name: document.getElementById('name').value,
            companyName: document.getElementById('companyName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            businessType: document.getElementById('businessType').value,
            numCameras: document.getElementById('numCameras').value,
            businessHours: document.getElementById('businessHours').value,
            description: document.getElementById('description').value
        };

        fetch("http://localhost:5000/api/demo-request", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            alert('Thank you! Your demo request has been submitted successfully.');
            form.reset();
        })
        .catch(err => {
            console.error(err);
            alert('Something went wrong');
        });
    });
});
