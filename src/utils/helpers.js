/**
 * @param String uuid and array of objects. Objects must have uuid field.
 * @returns object(s) with a matching uuid. In most cases there should only be one.
 */
export const filterByUuid = (uuid,array) => {
    return array.filter((entity) => {
        return entity.uuid === uuid;
    });
}