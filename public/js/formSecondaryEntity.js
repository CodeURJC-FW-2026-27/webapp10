const rangeInputs = ['jugability', 'graphics', 'history', 'price'];
// This is an example script, please modify as needed

rangeInputs.forEach(id => {
  const rangeInput = document.getElementById(id);
  const rangeOutput = document.getElementById(`rangeValue${id}`);

  // Set initial value
  rangeOutput.textContent = rangeInput.value;

  rangeInput.addEventListener('input', function () {
    rangeOutput.textContent = this.value;
  });
});