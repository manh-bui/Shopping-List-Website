import { executeQuery } from "../database/database.js";

const findNumberOfItem = async() => {
    const result = await executeQuery(
        "SELECT COUNT(*) AS count FROM shopping_list_items;"
    )

    if (result.rows && result.rows.length > 0) {
        return result.rows[0].count;
    }

    return false;
};

const addItem = async (list_id,name) => {
    await executeQuery(
        "INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($listId, $name);",{
            listId: list_id,
            name: name,
        }
    );
};

const viewNonCollectedItem = async (list_id) => {
    const result = await executeQuery(
        "SELECT * FROM shopping_list_items WHERE shopping_list_id = $listId AND collected = false ORDER BY name;",
        {
            listId: list_id,
        }
    );

    return result.rows;
};

const viewCollectedItem = async (list_id) => {
    const result = await executeQuery(
        "SELECT * FROM shopping_list_items WHERE shopping_list_id = $listId AND collected = true ORDER BY name;",
        {
            listId: list_id,
        }
    );

    return result.rows;
};

const collectedById = async (list_id, item_id) => {
    await executeQuery(
        "UPDATE shopping_list_items SET collected = true WHERE shopping_list_id = $listId AND id = $itemId;",
        {
            listId: list_id,
            itemId: item_id,
        }
    );
};

export { findNumberOfItem, addItem, viewNonCollectedItem, collectedById, viewCollectedItem };