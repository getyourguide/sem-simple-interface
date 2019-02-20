import 'bootstrap/dist/css/bootstrap.min.css';
import 'handsontable/dist/handsontable.full.min.css';

import 'bootstrap';
import $ from 'jquery';
import Handsontable from 'handsontable';
import Papa from 'papaparse';

$(document).ready(function () {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  function convertResults(items) {
    return items.map((item) => {
      item.search_query = `<a href="https://www.google.com/search?q=${encodeURI(item.search_query)}" target='_blank'>${item.search_query}</a>`;
      item.landing_page = `<a href="${item.landing_page}" target='_blank'><pre>${item.landing_page}</pre></a>`;
      item.negate_for_location = false;
      return item;
    });
  }

  function negativeRenderer(instance, td) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.className = 'make-me-red';
  }

  function handleFileSelect(evt) {
    let inputCsv = evt.target.files[0]; // FileList object
    let config = {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        let container = document.getElementById('inputTable');
        let rows = convertResults(results.data.slice(0, results.data.length - 1));
        let table = new Handsontable(container, {
          data: rows,
          width: 960,
          fixedRowsTop: 1,
          rowHeaders: true,
          colHeaders: ['Search Query', 'Landing Page', 'Cost', 'Negative', 'Negate For Location'],
          colWidths: [200, 410, 50, 200, 200],
          columns: [
            {
              data: 'search_query',
              readOnly: true,
              renderer: 'html'
            },
            {
              data: 'landing_page',
              readOnly: true,
              renderer: 'html'
            },
            {
              data: 'cost',
              readOnly: true
            },
            {
              data: 'negative',
            },
            {
              data: 'negate_for_location',
              type: 'checkbox'
            }
          ],
          afterSelection: function (row, col, row2, col2) {
            let meta = this.getCellMeta(row2, col2);

            if (meta.readOnly) {
              this.updateSettings({fillHandle: false});
            }
            else {
              this.updateSettings({fillHandle: true});
            }
          },
          cells: function (row, col) {
            let cellProperties = {};

            if (col === 3 && rows[row][col] === '') {
              rows[row][4] = false;
            }

            if (col === 3) {
              cellProperties.renderer = 'negativeRenderer';
            }

            return cellProperties;
          }
        });

        $('#download').on('click', () => {
          let sheet = JSON.stringify({data: table.getData()});
          let output = Papa.unparse(sheet);
          const blob = new Blob([output]);

          // Create link to final output
          const link = window.URL.createObjectURL(blob);
          const linkToOutput = document.createElement('a');
          document.body.appendChild(linkToOutput);
          linkToOutput.href = link;
          linkToOutput.download = 'output.csv';

          // Download
          linkToOutput.click();
          window.URL.revokeObjectURL(link);
        });
      }
    };

    Papa.parse(inputCsv, config);
  }

  $('#searchQueryInput').on('change', handleFileSelect);
  Handsontable.renderers.registerRenderer('negativeRenderer', negativeRenderer);

});
