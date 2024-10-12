document.getElementById('add').addEventListener('click', function() {
    let num1 = parseInt(document.getElementById('num1').value);
    let num2 = parseInt(document.getElementById('num2').value);
    let result = num1 + num2;
    document.getElementById('result').innerText = 'Result: ' + result;
});

document.getElementById('subtract').addEventListener('click', function() {
    let num1 = parseInt(document.getElementById('num1').value);
    let num2 = parseInt(document.getElementById('num2').value);
    let result = num1 - num2;
    document.getElementById('result').innerText = 'Result: ' + result;
});

document.getElementById('num1').addEventListener('input', toggleButtons);
document.getElementById('num2').addEventListener('input', toggleButtons);

function toggleButtons() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;

    const addButton = document.getElementById('add');
    const subtractButton = document.getElementById('subtract');

    if (num1 && num2) {
        addButton.disabled = false;
        subtractButton.disabled = false;
    } else {
        addButton.disabled = true;
        subtractButton.disabled = true;
    }
}
