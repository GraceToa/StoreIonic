import { Pipe, PipeTransform } from '@angular/core';

//configuration Api Rest
import {URL_IMG} from '../config/url.services';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {

  transform(codigo: string) {
    return URL_IMG+ codigo +".jpg";
  }

}
