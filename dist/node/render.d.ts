import { ComponentRef, Type } from '@angular/core';
export declare function renderDocument(documentHtml: string, componentType: Type, nodeProviders?: any): Promise<string>;
export declare function renderDocumentWithPreboot(documentHtml: string, componentType: Type, nodeProviders?: any, prebootConfig?: any): Promise<string>;
export declare function serializeApplication(element: any, styles: string[], cache?: any): string;
export declare function appRefSyncRender(appRef: any): string;
export declare function applicationToString(appRef: ComponentRef<any>): string;
export declare function renderToString(componentType: any, nodeProviders?: any): Promise<string>;
export declare function renderToStringWithPreboot(componentType: any, nodeProviders?: any, prebootConfig?: any): Promise<string>;
