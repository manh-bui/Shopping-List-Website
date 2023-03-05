import { executeQuery } from "../database/database.js";

const createList = async(name) => {
    await executeQuery(
        "INSERT INTO shopping_lists (name) VALUES ($name);",
        {
            name: name,
        }
    );
};

const findById = async(list_id) => {
    const result = await executeQuery(
        "SELECT * FROM shopping_lists WHERE id = $listId;",
        {
            listId: list_id
        }
    );

    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    }

    return {id:0, name:"Unknow"};
};

const findAlllActiveList = async () => {
    const result = await executeQuery(
        "SELECT * FROM shopping_lists WHERE active = TRUE;"
    );
    
    return result.rows;
};

const findNumberOfList = async() => {
    const result = await executeQuery(
        "SELECT COUNT(*) as count FROM shopping_lists;"
    );

    if (result.rows && result.rows.length > 0) {
        return result.rows[0].count;
    }

    return false;
};

const deactiveById = async (list_id) => {
    await executeQuery(
        `UPDATE shopping_lists SET active = false WHERE id = $listId`,
        {
            listid: list_id,
        }
    );
};

export{ findAlllActiveList, createList, findNumberOfList, deactiveById, findById };
