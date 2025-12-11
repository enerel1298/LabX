const input = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

if (input && toggle) {
    toggle.addEventListener("click", () =>  {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        toggle.textContent = isPassword ? "Hide" : "Show";
    });
}
