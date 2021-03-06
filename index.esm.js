import { isValidPath, parseGraphQLJSON } from '@graphql-toolkit/common';

const FILE_EXTENSIONS = ['.json'];
class JsonFileLoader {
    loaderId() {
        return 'json-file';
    }
    async canLoad(pointer, options) {
        return this.canLoadSync(pointer, options);
    }
    canLoadSync(pointer, options) {
        if (isValidPath(pointer) && options.path && options.fs) {
            const { resolve, isAbsolute } = options.path;
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || process.cwd(), pointer);
                const { existsSync } = options.fs;
                if (existsSync(normalizedFilePath)) {
                    return true;
                }
            }
        }
        return false;
    }
    async load(pointer, options) {
        return this.loadSync(pointer, options);
    }
    loadSync(pointer, options) {
        const { resolve: resolvePath, isAbsolute } = options.path;
        const normalizedFilepath = isAbsolute(pointer) ? pointer : resolvePath(options.cwd || process.cwd(), pointer);
        try {
            const { readFileSync } = options.fs;
            const jsonContent = readFileSync(normalizedFilepath, 'utf8');
            return parseGraphQLJSON(pointer, jsonContent, options);
        }
        catch (e) {
            throw new Error(`Unable to read JSON file: ${normalizedFilepath}: ${e.message || e}`);
        }
    }
}

export { JsonFileLoader };
