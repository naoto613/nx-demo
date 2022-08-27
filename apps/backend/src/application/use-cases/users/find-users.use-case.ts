import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domain/models/user.model';
import { SearchUsersInput } from '../../../dto/users/search-users.input';
import { UsersRepository } from '../../repositories/users.repository';
import * as fs from 'fs';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class FindUsersUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(
    input: Readonly<SearchUsersInput>,
  ): Promise<UserModel[] | null> {
    // fs.writeFileSync("./temp/gcp-key.json", process.env.GCP_KEY_FILE_TEXT)
    
    // const query = "select * from test.members";
    
    // await new BigQuery().query(query)
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(error => {
    //       console.log(error);
    //   });
        
    // fs.unlink("./temp/gcp-key.json", (err) => {
    //   if (err) {
    //     console.log('ファイルの削除に失敗しました。');  
    //   };
    //   console.log('ファイルを削除しました。');
    // });
  
    return this.repository.findMany(input);
  }
}
