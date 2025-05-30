export interface ApiClientInterface {
    get<T>(url: string, on_error: (messages: string[]) => void): Promise<T>;
    post<T>(url: string, on_error: (messages: string[]) => void, data: any): Promise<T>;
    put<T>(url: string, on_error: (messages: string[]) => void, data: any): Promise<T>;
    delete<T = null>(url: string, on_error: (messages: string[]) => void): Promise<T>;
}

export type ApiModuleFactory = (client: ApiClientInterface) => Record<string, Function>;

export interface ApiModuleExports {
    create: ApiModuleFactory;
    isTopLevel?: boolean;
}