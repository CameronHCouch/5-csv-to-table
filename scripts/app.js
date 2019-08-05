function readFile(inputElement) {
    let reader = new FileReader();
    let file = inputElement.files[0];
    reader.readAsText(file);

    reader.onload = () => {
        clearCurrentResults();
        let data = parseResults(reader.result); // the async nature of file reading means we need to work in here
        appendResultToTable(data);
    }
    reader.onerror = () => console.log(reader.error);
}

function clearCurrentResults() {
    let tbody = document.getElementsByTagName('tbody')[0];
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function parseResults(res){
    return res.split(/[\n,]+/);
}

function appendResultToTable(res){
    let colIdx = 0;
    let rowIdx = 0;

    for (itemIdx in res) {
        let newTR;
        if ( colIdx === 0 ) buildNewRow(rowIdx);
        if (!newTR) newTR = grabCurrentRow();

        buildNewItem(itemIdx, res, newTR);

        if (colIdx === 5) {
            colIdx = 0;
            rowIdx++;
        } else {
            colIdx++;
        }
    }
}

function buildNewRow(rowIdx) {
    let tbody = document.getElementsByTagName('tbody')[0];
    newTR = document.createElement('tr');
    rowIdx % 2 === 0 ? newTR.setAttribute('class', 'light-blue') : newTR.setAttribute('class', 'light-grey');
    tbody.appendChild(newTR);
}

function grabCurrentRow() {
    newTR = document.getElementsByTagName('tr');
    return newTR[newTR.length - 1];
}

function buildNewItem(itemIdx, res, newTR) {
    let itemTD = document.createElement('td');
    let itemText = document.createTextNode(res[itemIdx]);
    itemTD.appendChild(itemText);
    newTR.appendChild(itemTD);
}