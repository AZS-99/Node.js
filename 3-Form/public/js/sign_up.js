document.addEventListener("DOMContentLoaded", () => {
    const password = document.getElementById("password")
    const re_password = document.getElementById("re_password")
    const label = document.getElementById("feedback")

    re_password.addEventListener('focusout', () => {
        if (password.value != re_password.value) {
            label.textContent = "Passwords are not matching!"
        }
    })

    re_password.addEventListener('focusin', () => {
        label.textContent = ""
    })
})