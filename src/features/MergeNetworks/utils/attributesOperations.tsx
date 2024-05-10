import { IdType } from "../../../models/IdType";
import TableFn, { Column, ValueType } from "../../../models/TableModel";

export function preprocess(toNetwork: IdType, nodeCols: Column[], edgeCols: Column[]) {
    const mergedNodeTable = TableFn.createTable(toNetwork, nodeCols);
    const mergedEdgeTable = TableFn.createTable(toNetwork, edgeCols);
    return {
        mergedNodeTable,
        mergedEdgeTable
    }
}

export function castAttributes(toMergeAttr: Record<string, ValueType> | undefined, attributeMapping: Map<string, Column>): Record<string, ValueType> {
    const castedAttr: Record<string, ValueType> = {};
    if (toMergeAttr !== undefined) {
        for (const [key, value] of Object.entries(toMergeAttr)) {
            const col = attributeMapping.get(key);
            if (col === undefined) {
                throw new Error(`Attribute ${key} not found in the attribute mapping`);
            }
            castedAttr[col.name] = value;
        }
    }
    // Todo: type coercion
    return castedAttr;
}

export function addMergedAtt(castedRecord: Record<string, ValueType>, oriRecord: Record<string, ValueType> | undefined, mergedAttName: string, translatedAtt: string): Record<string, ValueType> {
    if (oriRecord === undefined) {
        throw new Error("Original record not found");
    }
    if (translatedAtt === undefined) {
        throw new Error("Cannot find the translated attribute in the original network");
    }
    let attVal = oriRecord[translatedAtt];
    if (attVal === undefined) {
        console.log("Cannot find the merged attribute in the original network");
        attVal = ''
    }
    castedRecord[mergedAttName] = attVal;
    return castedRecord;

}