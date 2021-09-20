import createUsersTable from "./createTables/users";
import createClubsTable from "./createTables/club";

import insertAllToTables from "../seeders/seed";

(async () => {
  try {
    await createUsersTable();
    await createClubsTable();
    await insertAllToTables();
  } catch (error) {
    console.log(error);
  }
})();
