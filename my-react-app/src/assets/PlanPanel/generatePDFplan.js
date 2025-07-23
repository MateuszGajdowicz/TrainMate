import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
export default function generatePDF(array){
  const docDefinition = {
    content: [
      { 
        text: 'Twój plan treningowy', 
        style: 'header',
        alignment: 'center',
        color: '#d35400'  // ładny pomarańczowy kolor
      },
      { 
        text: '\n', // trochę przestrzeni pod nagłówkiem
      },
      array.length === 0
        ? { text: 'Brak treningów do wyświetlenia.', style: 'emptyMsg', alignment: 'center' }
        : {
            style: 'tableExample',
            table: {
              widths: ['*', 'auto', 'auto', 'auto', 'auto'],
              body: [
                [
                  { text: 'Aktywność', style: 'tableHeader' },
                  { text: 'Cel', style: 'tableHeader' },
                  { text: 'Jednostka', style: 'tableHeader' },
                  { text: 'Dzień', style: 'tableHeader' },
                  { text: 'Godzina', style: 'tableHeader' }
                ],
                ...array.map(item => [
                  { text: item.activity, style: 'tableCell' },
                  { text: item.trainingGoalValue.toString(), style: 'tableCell' },
                  { text: item.trainingUnit, style: 'tableCell' },
                    { text: item.trainingDays, style: 'tableCell' },

                  { text: item.timeOfDay, style: 'tableCell' },
                ])
              ]
            },
            layout: {
              fillColor: (rowIndex) => rowIndex % 2 === 0 ? '#f9e79f' : null // naprzemienny kolor wierszy
            }
          },
      { 
        text: '\nDzięki za korzystanie z TrainMate! Trenuj dalej!', 
        style: 'footer',
        alignment: 'center',
        color: '#7d6608'
      }
    ],
    styles: {
      header: {
        fontSize: 26,
        bold: true,
        marginBottom: 10,
      },
      emptyMsg: {
        fontSize: 16,
        italics: true,
        color: '#7f8c8d',
        margin: [0, 20, 0, 20]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 14,
        color: 'white',
        fillColor: '#d35400',
        alignment: 'center',
        margin: [0, 5, 0, 5]
      },
      tableCell: {
        fontSize: 12,
        margin: [0, 5, 0, 5],
        alignment: 'center'
      },
      footer: {
        fontSize: 12,
        italics: true,
        marginTop: 20
      }
    },
defaultStyle: {
  font: 'Roboto'
}

  };

  pdfMake.createPdf(docDefinition).download('plan-treningowy.pdf');
};
