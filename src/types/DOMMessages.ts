export type DOMMessage = {
    type: 'GET_DOM'
}

export type DOMLOADMESSAGE = {
    type: 'PAGE_LOAD'
}
export type DOMMessageResponse = {
    title: string;
    headlines: string[];
}