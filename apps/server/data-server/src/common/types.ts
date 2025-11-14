export interface ResponseBody {
    code: number,
    message: string,
    data?: any
}

export enum Code {
    SUCCESS = 0,
    ERROR = -1
}

export interface Paging {
    pageNum: number,
    pageSize: number
}

export interface htmlTemplateTypes {
    id: number,
    html: string
}