import bcrypt from "bcryptjs";
import { dbDrizzle } from "./db";
import { folder, InsertFolder, InsertUser, user } from "./schema";

const users: InsertUser[] = [
  {
    id_user: '77bdff46-a875-488a-aa36-8d9fed1581f1',
    email: 'test@gmail.com',
    password: 'Abc123',
  },
  {
    id_user: '0182a0f2-97a3-4cbb-88ab-425f4a54ee87',
    email: 'mi_prueba@gmail.com',
    password: 'Abc123',
  },
  {
    id_user: '09e9d5c9-60ab-43fb-9ea6-8151b779b8c8',
    email: 'test_0@gmail.com',
    password: 'Abc123',
  },
  {
    id_user: '314b20cd-ff5e-4439-a012-d0c787de77a5',
    email: 'mi_prueba_0@gmail.com',
    password: 'Abc123',
  },
  {
    id_user: 'f7aa086e-3521-4473-b4a8-9f67ce84bc3d',
    email: 'mi_prueba_1@gmail.com',
    password: 'Abc123',
  },
]

const folders: InsertFolder[] = [
  {
    id_folder: 'd42091d9-d7bf-458c-bfc7-6831a97d4801',
    id_user: users.at(0)!.id_user,
    id_parent: null,
    folder_name: 'mi_folder',
  },
  {
    id_folder: '6c937aef-bdc1-4533-96ad-e53242a27d60',
    id_user: users.at(0)!.id_user,
    id_parent: null,
    folder_name: 'otro_folder',
  },
  {
    id_folder: 'fb826044-16b6-4b3d-b399-18bc8e20dca4',
    id_user: users.at(0)!.id_user,
    id_parent: 'd42091d9-d7bf-458c-bfc7-6831a97d4801',
    folder_name: 'sub_folder',
  },
  {
    id_folder: '55b3621d-d4c8-4bc8-965a-938a3fc24e90',
    id_user: users.at(0)!.id_user,
    id_parent: 'd42091d9-d7bf-458c-bfc7-6831a97d4801',
    folder_name: 'otro_sub_folder',
  },
]

const pupulateUsers = async () => {
  const usersWithHashedPassword = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password),
  }));
  const result = await dbDrizzle.insert(user).values(usersWithHashedPassword);
  return result;
}

const pupulateFolders = async () => {
  const result = await dbDrizzle.insert(folder).values(folders);
  return result;
}

const populateDatabase = async () => {
  await pupulateUsers();
  await pupulateFolders();
  console.log('Database populated!');
}

populateDatabase()