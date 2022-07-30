import { db } from "../db/pgdb";
import { v4 as uuidv4 } from "uuid";

interface Args {
  input: {
    item: string;
    amount: number;
    value: number;
    client_id: string;
  };
}

const getAllItems = async () => {
  const data = await db.query("SELECT * FROM sold_items");

  if (!data.rowCount) {
    throw new Error("No Items");
  }

  return data.rows;
};

const addItem = async ({ input: { item, amount, value, client_id } }: Args) => {
  const id = uuidv4();
  const data = await db.query(
    "INSERT INTO sold_items(_id, item, amount, value, client_id, createdat) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [id, item, amount, value, client_id, new Date()]
  );

  return data.rows[0];
};

const updateItem = async ({
  input,
}: {
  input: { _id: string; amount: number; value: number };
}) => {
  const data = await db.query(
    "UPDATE sold_items SET amount = $1, value = $2, updatedat = $3 WHERE _id = $4 RETURNING *",
    [input.amount, input.value, new Date(), input._id]
  );

  return data.rows[0];
};

const deleteItem = async ({ input: _id }: { input: string }) => {
  console.log(_id);
  const data = await db.query(
    "DELETE FROM sold_items WHERE _id = $1 RETURNING *",
    [_id]
  );
  return data.rows[0];
};

export default { addItem, getAllItems, updateItem, deleteItem };
