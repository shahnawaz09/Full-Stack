import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  images: any[];
  searching:boolean = false;
  title = 'Image Search';
  imagesFound:boolean = false;
  resultLabel: boolean = false;
  constructor(private _imagesService: ImagesService) {}

  ngOnInit() {
   
  }

  searchImages(query){
    this.searching = true;
    this._imagesService.getImages(query)
      .subscribe(
        data => {
          if(data.hits.length === 0){
            this.imagesFound = true;
          }
          else{
            this.imagesFound = false;
          }
          this.resultLabel = true;
          this.images = data.hits;
        },
        Error => console.log(Error),
        () => this.searching = false
      );
  }

}