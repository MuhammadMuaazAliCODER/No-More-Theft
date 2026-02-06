document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('requestDemoForm');
    const submitBtn = form?.querySelector('.submit-button');

    if (!form || !submitBtn) {
        console.error('Form or button not found');
        return;
    }

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    };

    form.addEventListener('submit', async function (e) {
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

        try {
            const res = await fetch('http://localhost:5000/api/demo-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            let data;
            const contentType = res.headers.get('content-type');

           
            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
               
                const text = await res.text();
                data = { message: text };
            }

           
            if (!res.ok) {
                if (data.errors && data.errors.length > 0) {
                    data.errors.forEach(err => showToast(err.msg, 'error'));
                } else {
                    showToast(data.message || 'Something went wrong', 'error');
                }
                return; 
            }

            
            showToast(data.message || 'Demo request submitted successfully!', 'success');
            form.reset();

        } catch (err) {
            console.error('Fetch error:', err);
            showToast('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
});
