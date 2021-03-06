import { Source, SchemaPointerSingle, DocumentLoader, SingleFileOptions } from '@graphql-toolkit/common';
export interface JsonFileLoaderOptions extends SingleFileOptions {
    fs?: typeof import('fs');
    path?: typeof import('path');
}
export declare class JsonFileLoader implements DocumentLoader {
    loaderId(): string;
    canLoad(pointer: SchemaPointerSingle, options: JsonFileLoaderOptions): Promise<boolean>;
    canLoadSync(pointer: SchemaPointerSingle, options: JsonFileLoaderOptions): boolean;
    load(pointer: SchemaPointerSingle, options: JsonFileLoaderOptions): Promise<Source>;
    loadSync(pointer: SchemaPointerSingle, options: JsonFileLoaderOptions): Source;
}
