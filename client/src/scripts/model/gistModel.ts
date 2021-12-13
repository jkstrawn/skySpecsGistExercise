export class GistHeader {
    id: string;
    created: string;
    description: string;
}

export class GistDetail extends GistHeader {
    fileNames: string[];
}