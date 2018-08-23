export interface ModuleData {
    path: string;
    location: string;
    moduleName: string;
    rootComponent?: string;
    description: string;
    registered?: boolean;
    shouldSendDataToContent: boolean;
    dataInKeysAndFunctions: Array<any>;
    shouldReceiveDataFromContent: boolean;
    dataOutKeysAndFunctions: Array<any>;
}