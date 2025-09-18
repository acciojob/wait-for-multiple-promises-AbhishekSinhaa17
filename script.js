function createPromise(id) {
  const delay = Math.random() * 2000 + 1000;
  return new Promise(resolve => {
    setTimeout(() => {
      const timeTaken = delay / 1000;
      resolve({ id, timeTaken });
    }, delay);
  });
}

function showLoading() {
  const outputBody = document.getElementById("output");
  outputBody.innerHTML = "";

  const row = outputBody.insertRow();
  row.id = "loading"; 
  const cell = row.insertCell();
  cell.colSpan = 2;
  cell.textContent = "Loading...";
}

function populateTable(results, totalTime) {
  const outputBody = document.getElementById("output");
  outputBody.innerHTML = ""; // clear the loading row

  results.forEach(result => {
    const row = outputBody.insertRow();
    const promiseCell = row.insertCell();
    const timeCell = row.insertCell();

    promiseCell.textContent = `Promise ${result.id}`;
    timeCell.textContent = result.timeTaken.toFixed(3);
  });

  const totalRow = outputBody.insertRow();
  const totalLabelCell = totalRow.insertCell();
  const totalTimeCell = totalRow.insertCell();

  totalLabelCell.textContent = "Total";
  totalTimeCell.textContent = totalTime.toFixed(3);
}

async function runPromises() {
  showLoading();

  const promises = [createPromise(1), createPromise(2), createPromise(3)];
  const results = await Promise.all(promises);
  const totalTime = Math.max(...results.map(r => r.timeTaken));
  populateTable(results, totalTime);
}

runPromises();
