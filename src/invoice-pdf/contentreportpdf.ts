// import {promises as fsp} from 'fs';
// import {jsPDF} from 'jspdf';
// import 'jspdf-autotable';
// import process from 'process';
// import {isMainThread, parentPort, workerData} from 'worker_threads';
// import {ContentRemovalLink} from '../models/index.js';
// import {ReportUtil} from './reportutil.js';
// import {ContentRemovalPdfBuildInfo} from './contentbuilder.js';

// export class BuildReviewPdf {
//   static async startWorker() {
//     if (isMainThread) {
//       // do not block the main thread
//     } else {
//       const pdfDoc = await this.buildPdf(workerData);

//       // we must return the final arraybuffer here because this is the most CPU intensive operation that we can't afford to run on the main event loop
//       const arrayBuffer = pdfDoc.output('arraybuffer');

//       if (parentPort && arrayBuffer) {
//         parentPort.postMessage({pdfBuffer: arrayBuffer}, [arrayBuffer]);
//       } else {
//         throw new Error("Couldn't return pdf buffer");
//       }
//     }
//   }

//   static linkStatus(status: string) {
//     if(status === 'pending_removal') {
//       return 'Pending Removal';
//     }
//     else if(status === 'removed') {
//       return 'Removed';
//     }
//     else if(status === 'cannot_remove') {
//       return 'Cannot Remove';
//     }
//     else {
//       return '';
//     }
//   };

//   static importImage(filename: string) {
//     return fsp.readFile(filename);
//   }

//   static async buildPdf(workerData: ContentRemovalPdfBuildInfo) {
//     // images
//     const defaultImages = await ReportUtil.getDefaultImages(this.importImage);

//     // set up the page
//     const format = 'letter';

//     const doc = new jsPDF({
//       orientation: 'landscape',
//       format: format,
//       compress: true,
//     });

//     // add all the fonts we require first
//     ReportUtil.addFonts(doc);

//     // add the introduction page
//     await ReportUtil.fillIntroductionContentRemoval(
//       doc,
//       defaultImages,
//       workerData.client,
//       'content-removal',
//     );
//     // doc.addPage(format);
//     const allContentRemovalLinks =
//       workerData.contentRemovalCampaign.contentRemovalLinks;

//     // allContentRemovalLinks.length > 0 &&
//       // (await Promise.all(
//     if (allContentRemovalLinks && allContentRemovalLinks.length > 0) {
//       doc.addPage(format);
//       await this.tableGenerate(doc, allContentRemovalLinks);
//     }
//     // ));

//     // add the advertising page
//     await ReportUtil.fillAdvertising(doc, defaultImages);
//     // Page footer
//     await ReportUtil.pageFooters(doc, defaultImages);

//     return doc;
//   }


//   static async tableGenerate(
//     doc: any,
//     contentRemovalLinks: ContentRemovalLink[],
//   ) {
//     // add client's name
//     doc.setFontSize(22);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`Links To Remove`, 15, 18);

//     doc.autoTable({
//       startX: 40,
//       startY: 30,
//       head: [['Links', 'Status']],
//       body: contentRemovalLinks.map((src: ContentRemovalLink) => [
//         src.url,
//         this.linkStatus(src.status),
//       ]),
//       styles: {align: 'center', fontSize: 11, cellPadding: 2},
//       headStyles: {
//         fillColor: [216, 234, 211],
//         textColor: [0, 0, 0],
//         lineWidth: 0.05,
//         lineColor: [190, 190, 190],
//       },
//       theme: 'grid',
//       margin: {bottom: 25},
//       columnStyles: {
//         0: {cellWidth: 200},
//         1: {cellWidth: 50},
//       },
//     });
//   }

// }

// BuildReviewPdf.startWorker().catch(e => {
//   // uncaught exception instead of rejected promise will terminate the thread
//   process.nextTick(() => {
//     throw e;
//   });
// });
