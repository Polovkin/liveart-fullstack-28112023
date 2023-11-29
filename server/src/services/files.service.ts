import {BindingScope, injectable} from '@loopback/core';
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
export interface FilesServiceInterface {
    uploadFile(fileBase64: string): Promise<string>

    readFile(fileName: string): Promise<string>
}

@injectable({scope: BindingScope.TRANSIENT})
export class FilesService implements FilesServiceInterface {
    private uploadsFolder: string = '';

    constructor() {
        this.uploadsFolder = 'public/uploads'
    }


    readFile(fileName: string): Promise<string> {
        const filePath = path.join(this.uploadsFolder, fileName);

        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    uploadFile(fileBase64: string): Promise<string> {
        const supportedExtensions = ['jpg','jpeg', 'png'];
        const base64MimeType = fileBase64.substring('data:image/'.length, fileBase64.indexOf(';base64'));

        if (!supportedExtensions.includes(base64MimeType)) {
            return Promise.reject('This file extension is not supported');
        }

        const uniqueFileName = `${uuidv4()}.${base64MimeType}`;
        const filePath = path.join(this.uploadsFolder, uniqueFileName);
        const fileBuffer = Buffer.from(fileBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, fileBuffer, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(uniqueFileName);
                }
            });
        });
    }

}
