// import {Worker} from 'worker_threads';
// import {Client, ContentRemovalCampaign} from '../models/index.js';
// import {
//   ClientRepository,
// } from '../repositories/index.js';

// export interface ContentRemovalPdfBuildInfo {
//   client: Client;
//   contentRemovalCampaign: ContentRemovalCampaign;
// }

// export class ContentBuilder {
//   static async getPdf(
//     contentRemovalCampaign: ContentRemovalCampaign,
//     clientRepository: ClientRepository,
//     clientId: string,
//   ): Promise<any> {
//     const client = await clientRepository.findById(clientId);

//     return new Promise((resolve, reject) => {
//       const worker = new Worker(__dirname + '/contentreportpdf.js', {
//         workerData: {
//           client: client,
//           contentRemovalCampaign: contentRemovalCampaign,
//         },
//       });

//       worker.on('message', res => {
//         return resolve({
//           client: client,
//           pdf: res.pdfBuffer,
//         });
//       });
//       worker.on('error', reject);
//       worker.on('exit', code => {
//         if (code !== 0)
//           return reject(new Error('Worker stopped with exit code ' + code));
//       });
//     });
//   }
// }
