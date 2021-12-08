import { Injectable, NotFoundException, StreamableFile,  } from '@nestjs/common';
import { createReadStream, ReadStream, existsSync} from 'fs';
import { join } from 'path';

@Injectable()
export class TokenService {

  getData(id: number): string {

    const metadatas = require("../../data/data.json");

    if(!metadatas[id])
      throw new NotFoundException('Invalid token');
    return metadatas[id];
  }

  getImage(id: number): ReadStream {
    try{
      const imagePath = "../im_out/"+id+".png";

      if (!existsSync(imagePath))
        throw new NotFoundException('Invalid token or image not found');

      const file = createReadStream(imagePath);
      return file;
    }catch(e){
      throw new NotFoundException('Invalid token or image not found');
    }
  }
}
