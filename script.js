const hambuger = document.getElementById("hamburger");
const navlist = document.getElementById("list");
const overlay = document.getElementById("overlay");
const icon = document.getElementById("icon");
const contactForm = document.getElementById("contact-form");

hambuger.addEventListener("click", () => {
    
    list.classList.toggle("navlist-active");
    overlay.classList.toggle("overlay-active");
    icon.classList.toggle("fa-xmark");
});


contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("Message sent successfully! ✅");
            contactForm.reset();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to send message. Please try again.");
    }
});