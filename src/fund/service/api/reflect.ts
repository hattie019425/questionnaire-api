import "reflect-metadata";
export function format(formatString: string) {
    console.log('format ', formatString);

    return Reflect.metadata('format', formatString);
}

export function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata('format', target, propertyKey);
}


export function service(remote?: boolean, interfaces?: [string]) {
    return (constructor: Function) => {
        let match = /^function\s+([\w\$]+)\s*\(/.exec(constructor.toString());
        let className = match != null && match.length > 1 ? match[1] : null;
        console.log(className);
        console.log(interfaces);
    }
}