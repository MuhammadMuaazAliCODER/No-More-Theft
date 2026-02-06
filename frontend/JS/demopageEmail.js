document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('requestDemoForm');
    const submitBtn = form?.querySelector('.submit-button');

    if (!form || !submitBtn) {
        console.error(' Form or button not found');
        return;
    }

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();

      
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

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

        fetch('http://localhost:5000/api/demo-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(async res => {
            if (!res.ok) throw new Error('Request failed');
            return res.json();
        })
        .then(() => {
            showToast('Demo request submitted successfully!', 'success');
            form.reset();
        })
        .catch(err => {
            console.error(err);
            showToast('Something went wrong. Please try again.', 'error');
        })
        .finally(() => {
            
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    });
});
