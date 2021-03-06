import { PlatformLocation } from '@angular/common';
import * as nodeUrl from 'url';
export interface LocationConfig {
    pathname?: string;
    search?: string;
    hash?: string;
}
export interface NodeLocationConfig {
    hash?: string;
    host?: string;
    hostname?: string;
    href?: string;
    pathname?: string;
    port?: string;
    protocol?: string;
    search?: string;
}
export declare class NodeLocation implements LocationConfig {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    origin: string;
    constructor(config: NodeLocationConfig & LocationConfig);
    parse(url: string): nodeUrl.Url;
    format(obj: NodeLocationConfig): string;
    assign(parsed: NodeLocationConfig): this;
    toJSON(): NodeLocationConfig;
}
export declare class State {
    state: any;
    title: string;
    url: string;
    constructor(state: any, title: string, url: string);
    toJSON(): {
        state: any;
        title: string;
        url: string;
    };
}
export declare class PopStateEvent {
    state: any;
    type: string;
    constructor(state: any);
    toJSON(): {
        state: any;
    };
}
export declare class NodePlatformLocation extends PlatformLocation {
    private _loc;
    private _stack;
    private _stackIndex;
    private _popStateListeners;
    private _baseUrl;
    private _originUrl;
    constructor(originUrl: string, requestUrl: string, baseUrl?: string);
    search: string;
    hash: string;
    pathname: string;
    getBaseHrefFromDOM(): string;
    getBaseHref(): string;
    path(): string;
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    onPopState(fn: any): void;
    onHashChange(fn: any): void;
    back(): void;
    forward(): void;
    prepareExternalUrl(internal: string): string;
    toJSON(): any;
    private _updateLocation();
    private _setLocationByUrl(url);
    private _callPopStateListeners();
}
export declare function joinWithSlash(start: string, end: string): string;
